import dns from "node:dns";
import https from "node:https";

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

const DEFAULT_RECIPIENT = "kalansooriya615@gmail.com";
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";
const RESEND_HOST = "api.resend.com";
const RESEND_PATH = "/emails";
const REQUEST_TIMEOUT_MS = 8500;
const MAX_PAYLOAD_BYTES = 32 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_BUCKETS = 1000;
const RATE_LIMIT_SYMBOL = Symbol.for("portfolio-contact-api.rate-limit");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 120,
  email: 254,
  subject: 200,
  message: 5000,
};

function stripHeaderBreaks(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function applySecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store");
}

function getHeaderString(value) {
  if (Array.isArray(value)) {
    return String(value[0] ?? "");
  }
  return typeof value === "string" ? value : "";
}

function isCrossSiteRequest(req) {
  const fetchSite = getHeaderString(req.headers?.["sec-fetch-site"])
    .trim()
    .toLowerCase();
  if (fetchSite === "cross-site") {
    return true;
  }

  const origin = getHeaderString(req.headers?.origin).trim();
  if (!origin) {
    return false;
  }

  const requestHost = (
    getHeaderString(req.headers?.["x-forwarded-host"]) ||
    getHeaderString(req.headers?.host)
  )
    .split(",")[0]
    .trim()
    .toLowerCase();

  if (!requestHost) {
    return false;
  }

  try {
    return new URL(origin).host.toLowerCase() !== requestHost;
  } catch {
    return true;
  }
}

function isJsonContentType(req) {
  const contentType = getHeaderString(req.headers?.["content-type"]);
  return contentType.toLowerCase().split(";")[0].trim() === "application/json";
}

function getClientIp(req) {
  const rawIp =
    getHeaderString(req.headers?.["x-vercel-forwarded-for"]) ||
    getHeaderString(req.headers?.["x-real-ip"]) ||
    getHeaderString(req.headers?.["x-forwarded-for"]) ||
    req.socket?.remoteAddress ||
    "unknown";
  return rawIp.split(",")[0].trim() || "unknown";
}

function checkRateLimit(req) {
  const buckets = (globalThis[RATE_LIMIT_SYMBOL] ??= new Map());
  const ip = getClientIp(req);
  const now = Date.now();
  const existing = buckets.get(ip) ?? [];
  const active = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (active.length >= RATE_LIMIT_MAX_REQUESTS) {
    buckets.set(ip, active);
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((active[0] + RATE_LIMIT_WINDOW_MS - now) / 1000)
    );
    return { limited: true, retryAfterSeconds };
  }

  if (!buckets.has(ip) && buckets.size >= MAX_RATE_LIMIT_BUCKETS) {
    const oldestKey = buckets.keys().next().value;
    if (oldestKey !== undefined) {
      buckets.delete(oldestKey);
    }
  }

  active.push(now);
  buckets.set(ip, active);
  return { limited: false };
}

function parseJsonBody(req) {
  if (!req.body) {
    return { error: "Invalid request payload.", status: 400 };
  }

  let parsed = null;
  if (typeof req.body === "string") {
    if (Buffer.byteLength(req.body, "utf8") > MAX_PAYLOAD_BYTES) {
      return { error: "Request payload is too large.", status: 413 };
    }
    try {
      parsed = JSON.parse(req.body);
    } catch {
      return { error: "Invalid request payload.", status: 400 };
    }
  } else if (typeof req.body === "object") {
    parsed = req.body;
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { error: "Invalid request payload.", status: 400 };
  }

  if (Buffer.byteLength(JSON.stringify(parsed), "utf8") > MAX_PAYLOAD_BYTES) {
    return { error: "Request payload is too large.", status: 413 };
  }

  return { data: parsed };
}

function validatePayload(rawBody) {
  if (
    typeof rawBody.name !== "string" ||
    typeof rawBody.email !== "string" ||
    typeof rawBody.message !== "string" ||
    (rawBody.subject !== undefined &&
      rawBody.subject !== null &&
      typeof rawBody.subject !== "string") ||
    (rawBody.honeypot !== undefined &&
      rawBody.honeypot !== null &&
      typeof rawBody.honeypot !== "string")
  ) {
    return { error: "Invalid request payload." };
  }

  const name = stripHeaderBreaks(rawBody.name).slice(0, LIMITS.name);
  const email = stripHeaderBreaks(rawBody.email).slice(0, LIMITS.email);
  const subject = stripHeaderBreaks(rawBody.subject).slice(0, LIMITS.subject);
  const message = rawBody.message.trim().slice(0, LIMITS.message);
  const honeypot = (rawBody.honeypot ?? "").trim();

  if (honeypot) {
    return { isSpam: true };
  }

  if (!name) {
    return { error: "Please enter your name." };
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!message) {
    return { error: "Please enter a short message." };
  }

  return {
    isSpam: false,
    data: { name, email, subject, message },
  };
}

function buildEmailContent({ name, email, subject, message }) {
  const resolvedSubject = subject
    ? `[Portfolio] ${subject}`
    : `[Portfolio] New inquiry from ${name}`;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "General Inquiry");
  const safeMessageHtml = escapeHtml(message).replace(/\r?\n/g, "<br />");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0c0c0e; max-width: 600px; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; font-size: 20px;">New Portfolio Message</h2>
      <p style="margin: 0 0 8px;"><strong>From:</strong> ${safeName} (${safeEmail})</p>
      <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${safeSubject}</p>
      <div style="padding: 16px; border-radius: 12px; background: #f5f5f7; border: 1px solid #e4e4ea;">
        ${safeMessageHtml}
      </div>
    </div>
  `.trim();

  const text = [
    "New Portfolio Message",
    `From: ${name} (${email})`,
    `Subject: ${subject || "General Inquiry"}`,
    "",
    message,
  ].join("\n");

  return { resolvedSubject, html, text };
}

function extractResendErrorMessage(rawText) {
  if (!rawText) {
    return "";
  }
  try {
    const parsed = JSON.parse(rawText);
    return typeof parsed?.message === "string" ? parsed.message.trim() : rawText.trim();
  } catch {
    return rawText.trim();
  }
}

function postHttpsJson(hostname, path, headers, payloadString, timeoutMs, family) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const bodyBuffer = Buffer.from(payloadString, "utf8");
    let req;

    const finish = (callback, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(wallTimer);
      callback(value);
    };

    const wallTimer = setTimeout(() => {
      const timeoutError = new Error(
        `Request to ${hostname} timed out after ${timeoutMs}ms`
      );
      timeoutError.name = "TimeoutError";
      timeoutError.code = "ETIMEDOUT";
      req?.destroy(timeoutError);
      finish(reject, timeoutError);
    }, timeoutMs);

    req = https.request(
      {
        hostname,
        port: 443,
        path,
        method: "POST",
        family,
        headers: {
          ...headers,
          "Content-Length": bodyBuffer.length,
        },
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });
        response.on("end", () => {
          finish(resolve, {
            status: response.statusCode ?? 0,
            text: Buffer.concat(chunks).toString("utf8"),
          });
        });
        response.on("error", (error) => finish(reject, error));
      }
    );

    req.on("error", (error) => finish(reject, error));
    req.write(bodyBuffer);
    req.end();
  });
}

async function sendResendEmail(apiKey, emailPayload) {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  const serialized = JSON.stringify(emailPayload);

  // Prefer IPv4 first so broken ISP/host IPv6 routes do not stall Node connections.
  try {
    return await postHttpsJson(
      RESEND_HOST,
      RESEND_PATH,
      headers,
      serialized,
      REQUEST_TIMEOUT_MS,
      4
    );
  } catch (error) {
    if (
      error?.code === "ENOTFOUND" ||
      error?.code === "ENETUNREACH" ||
      error?.code === "EHOSTUNREACH"
    ) {
      return postHttpsJson(
        RESEND_HOST,
        RESEND_PATH,
        headers,
        serialized,
        REQUEST_TIMEOUT_MS,
        0
      );
    }
    throw error;
  }
}

/**
 * Vercel Serverless Function forwarding validated portfolio contact submissions via Resend.
 */
export default async function handler(req, res) {
  applySecurityHeaders(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (isCrossSiteRequest(req)) {
    return res.status(403).json({ error: "Cross-site requests are not allowed." });
  }

  if (!isJsonContentType(req)) {
    return res.status(415).json({ error: "Content-Type must be application/json." });
  }

  const rateLimit = checkRateLimit(req);
  if (rateLimit.limited) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: "Too many messages sent. Please wait a few minutes and try again.",
    });
  }

  const parsedBody = parseJsonBody(req);
  if (parsedBody.error) {
    return res.status(parsedBody.status).json({ error: parsedBody.error });
  }

  const validation = validatePayload(parsedBody.data);
  if (validation.isSpam) {
    console.warn("Contact submission skipped: honeypot field was populated.");
    return res.status(200).json({ ok: true });
  }
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return res.status(503).json({
      error: "Email service is not configured on the server yet.",
      code: "NOT_CONFIGURED",
    });
  }

  const recipient =
    process.env.CONTACT_RECIPIENT_EMAIL?.trim() || DEFAULT_RECIPIENT;
  const fromAddress = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const { name, email } = validation.data;
  const { resolvedSubject, html, text } = buildEmailContent(validation.data);

  const emailPayload = {
    from: fromAddress,
    to: [recipient],
    subject: resolvedSubject,
    html,
    text,
  };

  // Avoid setting Reply-To identical to To during owner self-tests to reduce Gmail spam filtering.
  if (email.toLowerCase() !== recipient.toLowerCase()) {
    emailPayload.reply_to = email;
  }

  const isLocalDev =
    process.env.NODE_ENV !== "production" && process.env.VERCEL !== "1";

  try {
    const resendResponse = await sendResendEmail(apiKey, emailPayload);

    if (resendResponse.status < 200 || resendResponse.status >= 300) {
      console.error(
        "Resend delivery failed:",
        resendResponse.status,
        resendResponse.text
      );
      const resendReason = extractResendErrorMessage(resendResponse.text);
      const clientMessage =
        isLocalDev && resendReason
          ? `Resend error (${resendResponse.status}): ${resendReason}`
          : "Unable to send your message right now. Please try again later.";
      return res.status(502).json({
        error: clientMessage,
      });
    }

    let resendData = null;
    try {
      resendData = resendResponse.text ? JSON.parse(resendResponse.text) : null;
    } catch {
      resendData = null;
    }
    if (!resendData?.id) {
      console.error("Resend response missing email id:", resendResponse.text);
      return res.status(502).json({
        error: "Unable to send your message right now. Please try again later.",
      });
    }

    console.info("Resend email queued:", resendData.id);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact delivery error:", error);
    const isTimeout =
      error?.name === "TimeoutError" ||
      error?.name === "AbortError" ||
      error?.code === "ETIMEDOUT";
    const clientMessage =
      isLocalDev && error?.message
        ? `Email request failed: ${error.message}`
        : "Unable to send your message right now. Please try again later.";
    return res.status(isTimeout ? 504 : 502).json({
      error: clientMessage,
    });
  }
}
