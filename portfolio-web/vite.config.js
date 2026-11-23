import { statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const MAX_BODY_BYTES = 100 * 1024;
const INJECTED_ENV_SYMBOL = Symbol.for("local-contact-api.injected-env");

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    if (req.method === "GET" || req.method === "HEAD") {
      resolve("");
      return;
    }

    let settled = false;
    let size = 0;
    const chunks = [];

    req.on("data", (chunk) => {
      if (settled) return;
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buffer.length;
      if (size > MAX_BODY_BYTES) {
        settled = true;
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(buffer);
    });

    req.on("end", () => {
      if (settled) return;
      settled = true;
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    req.on("error", (err) => {
      if (settled) return;
      settled = true;
      reject(err);
    });
  });
}

function createServerlessResponse(nodeRes) {
  const adapter = {
    setHeader(name, value) {
      nodeRes.setHeader(name, value);
      return adapter;
    },
    status(code) {
      nodeRes.statusCode = code;
      return adapter;
    },
    json(payload) {
      if (!nodeRes.getHeader("Content-Type")) {
        nodeRes.setHeader("Content-Type", "application/json");
      }
      nodeRes.end(JSON.stringify(payload));
      return adapter;
    },
  };
  return adapter;
}

function localContactApiPlugin(env) {
  return {
    name: "local-contact-api",
    configureServer(server) {
      const injectedKeys = (globalThis[INJECTED_ENV_SYMBOL] ??= new Set());
      for (const key of [
        "RESEND_API_KEY",
        "CONTACT_RECIPIENT_EMAIL",
        "RESEND_FROM_EMAIL",
      ]) {
        if (env[key] && (!process.env[key] || injectedKeys.has(key))) {
          process.env[key] = env[key];
          injectedKeys.add(key);
        }
      }

      // Resolve via file URL and mtime so edits to api/contact.js reload without restarting Vite.
      const contactHandlerPath = path.resolve(
        server.config.root,
        "api/contact.js"
      );
      const contactHandlerBaseUrl = pathToFileURL(contactHandlerPath).href;

      server.middlewares.use("/api/contact", async (req, res) => {
        try {
          req.body = await readRequestBody(req);
          const { mtimeMs } = statSync(contactHandlerPath);
          const { default: contactHandler } = await import(
            `${contactHandlerBaseUrl}?t=${mtimeMs}`
          );
          await contactHandler(req, createServerlessResponse(res));
        } catch (error) {
          console.error("Local /api/contact middleware error:", error);
          if (!res.headersSent && !res.writableEnded) {
            res.statusCode = error?.message === "Payload too large" ? 413 : 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: "Unable to process contact request locally.",
              })
            );
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), localContactApiPlugin(env)],
  };
});
