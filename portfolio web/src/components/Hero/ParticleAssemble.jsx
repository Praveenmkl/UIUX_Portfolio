import { useEffect, useRef } from "react";
import fingerprintImg from "../../assets/logo2.png";
import "./ParticleAssemble.css";

const ASSEMBLE_DURATION = 3200;
const IDLE_SETTLE_DURATION = 900;
const TOTAL_TIMELINE = ASSEMBLE_DURATION + IDLE_SETTLE_DURATION;
const REVEAL_THRESHOLD = 0.78;
const COMPLETED_OPACITY = 0.50;
const IDLE_OPACITY = 0.40;
const HOVER_RADIUS = 72;
const HOVER_RADIUS_SQ = HOVER_RADIUS * HOVER_RADIUS;

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

/**
 * Converts a dark-on-light or dark-on-transparent mark into a transparent-background
 * pale-yellow (#ffe47a) canvas bitmap for crisp alpha compositing.
 */
function createTintedBitmap(img) {
  const off = document.createElement("canvas");
  off.width = img.width;
  off.height = img.height;
  const offCtx = off.getContext("2d", { willReadFrequently: true });
  offCtx.drawImage(img, 0, 0);

  const src = offCtx.getImageData(0, 0, off.width, off.height).data;
  const tinted = document.createElement("canvas");
  tinted.width = img.width;
  tinted.height = img.height;
  const tintedCtx = tinted.getContext("2d");
  const out = tintedCtx.createImageData(img.width, img.height);
  const dst = out.data;

  for (let i = 0; i < src.length; i += 4) {
    const lum = (src[i] + src[i + 1] + src[i + 2]) / 3;
    const alphaRatio = src[i + 3] / 255;
    const ink = (1 - lum / 255) * alphaRatio;
    dst[i] = 255;
    dst[i + 1] = 228;
    dst[i + 2] = 122;
    dst[i + 3] = Math.round(ink * 255);
  }

  tintedCtx.putImageData(out, 0, 0);
  return { canvas: tinted, data: dst, width: img.width, height: img.height };
}

/**
 * Interactive canvas artwork that assembles scattered particles into the fingerprint mark
 * and settles softly into an idle state while remaining responsive to cursor interaction.
 */
export default function ParticleAssemble({ replaySignal = 0 }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const restartRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    tinted: null,
    drawBox: { x: 0, y: 0, w: 0, h: 0 },
    ready: false,
    dim: { w: 380, h: 380 },
    start: 0,
    elapsed: 0,
    rafId: 0,
    assembled: false,
    settled: false,
    pointer: { x: 0, y: 0, active: false },
    hoverMix: 0,
    reducedMotion: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext("2d");
    const state = stateRef.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    state.reducedMotion = motionQuery.matches;

    const img = new Image();
    img.src = fingerprintImg;

    function measureCanvas() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return state.dim;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.dim = { w: rect.width, h: rect.height };
      return state.dim;
    }

    function drawFrame(now) {
      if (!state.ready || !state.tinted) return;
      const { w, h } = state.dim;
      const box = state.drawBox;
      ctx.clearRect(0, 0, w, h);

      if (state.reducedMotion) {
        ctx.globalAlpha = IDLE_OPACITY;
        ctx.drawImage(state.tinted.canvas, box.x, box.y, box.w, box.h);
        ctx.globalAlpha = 1;
        return;
      }

      const t = Math.min(1, state.elapsed / ASSEMBLE_DURATION);
      const settleProgress = Math.max(
        0,
        Math.min(1, (state.elapsed - ASSEMBLE_DURATION) / IDLE_SETTLE_DURATION)
      );
      const targetHover = state.pointer.active && state.assembled ? 1 : 0;
      state.hoverMix += (targetHover - state.hoverMix) * 0.12;

      const isIdleAtRest =
        state.settled &&
        !state.pointer.active &&
        state.hoverMix < 0.01;

      if (!isIdleAtRest) {
        for (const p of state.particles) {
          if (!state.assembled) {
            const q = Math.max(0, Math.min(1, (t - p.delay) / (1 - p.delay)));
            const k = easeOutQuart(q);
            const swirl = (1 - k) * 18;
            p.x =
              p.sx +
              (p.tx - p.sx) * k +
              Math.sin(k * 8 + p.ty * 0.07) * swirl;
            p.y =
              p.sy +
              (p.ty - p.sy) * k +
              Math.cos(k * 7 + p.tx * 0.06) * swirl;

            // Keep assembly particles crisp within 80–100% opacity.
            const entry = Math.min(1, q / 0.08);
            ctx.globalAlpha = entry * (0.82 + 0.18 * k);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * (0.75 + 0.25 * k), 0, Math.PI * 2);
            ctx.fill();
          } else {
            if (state.pointer.active) {
              const dx = p.x - state.pointer.x;
              const dy = p.y - state.pointer.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < HOVER_RADIUS_SQ && distSq > 0.01) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / HOVER_RADIUS) * 4.2;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
              }
            }
            const floatX =
              Math.sin(now * 0.0024 + p.phase) * 1.4 * state.hoverMix;
            const floatY =
              Math.cos(now * 0.002 + p.phase) * 1.4 * state.hoverMix;
            p.vx += (p.tx + floatX - p.x) * 0.11;
            p.vy += (p.ty + floatY - p.y) * 0.11;
            p.vx *= 0.82;
            p.vy *= 0.82;
            p.x += p.vx;
            p.y += p.vy;

            const particleFade =
              state.hoverMix > 0.01
                ? 0.84 + 0.16 * state.hoverMix
                : (1 - settleProgress) * 0.84;

            if (particleFade > 0.01) {
              ctx.globalAlpha = particleFade;
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      if (t > REVEAL_THRESHOLD) {
        const revealProgress = easeOutQuart(
          Math.min(1, (t - REVEAL_THRESHOLD) / (1 - REVEAL_THRESHOLD))
        );
        const restOpacity =
          COMPLETED_OPACITY +
          (IDLE_OPACITY - COMPLETED_OPACITY) * easeOutQuart(settleProgress);
        const targetOpacity =
          revealProgress *
          (restOpacity + (COMPLETED_OPACITY - restOpacity) * state.hoverMix);
        const imgAlpha = targetOpacity * (1 - state.hoverMix * 0.65);

        if (imgAlpha > 0.01) {
          ctx.globalAlpha = imgAlpha;
          ctx.drawImage(state.tinted.canvas, box.x, box.y, box.w, box.h);
          ctx.globalAlpha = 1;
        }
      }
    }

    function tick(now) {
      state.rafId = 0;

      if (!state.settled) {
        state.elapsed = Math.min(TOTAL_TIMELINE, now - state.start);
        if (state.elapsed >= ASSEMBLE_DURATION) {
          state.assembled = true;
        }
        if (state.elapsed >= TOTAL_TIMELINE) {
          state.settled = true;
        }
      }

      drawFrame(now);

      const needsMoreFrames =
        !state.settled || state.pointer.active || state.hoverMix >= 0.01;

      if (needsMoreFrames) {
        state.rafId = requestAnimationFrame(tick);
      } else {
        state.hoverMix = 0;
        drawFrame(now);
      }
    }

    function ensureLoop() {
      if (!state.rafId) {
        state.rafId = requestAnimationFrame(tick);
      }
    }

    function startAssemble() {
      if (!state.ready || state.reducedMotion) return;
      cancelAnimationFrame(state.rafId);
      state.rafId = 0;
      state.elapsed = 0;
      state.assembled = false;
      state.settled = false;
      state.hoverMix = 0;
      for (const p of state.particles) {
        p.vx = 0;
        p.vy = 0;
      }
      state.start = performance.now();
      ensureLoop();
    }

    restartRef.current = startAssemble;

    function buildParticles() {
      if (!img.complete || !img.naturalWidth) return;
      const { w, h } = measureCanvas();
      if (!state.tinted) {
        state.tinted = createTintedBitmap(img);
      }

      const tinted = state.tinted;
      const maxSide = Math.min(w, h) * 0.78;
      const scale = Math.min(maxSide / tinted.width, maxSide / tinted.height);
      const drawW = tinted.width * scale;
      const drawH = tinted.height * scale;
      const ox = (w - drawW) / 2;
      const oy = (h - drawH) / 2;
      state.drawBox = { x: ox, y: oy, w: drawW, h: drawH };

      if (state.reducedMotion) {
        state.particles = [];
        state.ready = true;
        state.assembled = true;
        state.settled = true;
        state.elapsed = TOTAL_TIMELINE;
        drawFrame(performance.now());
        return;
      }

      const nextParticles = [];
      const step = 3;
      for (let y = 0; y < tinted.height; y += step) {
        for (let x = 0; x < tinted.width; x += step) {
          const i = (y * tinted.width + x) * 4;
          if (tinted.data[i + 3] > 95) {
            if (Math.random() > 0.56) continue;
            const tx = ox + (x / tinted.width) * drawW;
            const ty = oy + (y / tinted.height) * drawH;
            const angle = Math.random() * Math.PI * 2;
            const dist = maxSide * (0.36 + Math.random() * 0.62);
            const gShift = 222 + Math.round(Math.random() * 12);
            const bShift = 108 + Math.round(Math.random() * 26);
            nextParticles.push({
              tx,
              ty,
              sx: w / 2 + Math.cos(angle) * dist,
              sy: h / 2 + Math.sin(angle) * dist,
              x: tx,
              y: ty,
              vx: 0,
              vy: 0,
              delay: Math.random() * 0.36,
              r: Math.random() * 1.15 + 0.75,
              phase: Math.random() * Math.PI * 2,
              color: `rgb(255,${gShift},${bShift})`,
            });
          }
        }
      }

      state.particles = nextParticles;
      state.ready = true;
      startAssemble();
    }

    function handlePointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      state.pointer.x = event.clientX - rect.left;
      state.pointer.y = event.clientY - rect.top;
      state.pointer.active = true;
      ensureLoop();
    }

    function handlePointerLeave() {
      state.pointer.active = false;
      ensureLoop();
    }

    let resizeTimer = null;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (
        state.ready &&
        Math.abs(width - state.dim.w) < 1 &&
        Math.abs(height - state.dim.h) < 1
      ) {
        return;
      }
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildParticles, 140);
    });
    resizeObserver.observe(stage);

    img.onload = buildParticles;
    if (img.complete && img.naturalWidth) {
      buildParticles();
    }

    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      restartRef.current = null;
      cancelAnimationFrame(state.rafId);
      state.rafId = 0;
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    if (replaySignal > 0) {
      restartRef.current?.();
    }
  }, [replaySignal]);

  return (
    <div className="particle-stage" ref={stageRef}>
      <div className="particle-aura" aria-hidden="true" />
      <div className="particle-orbit" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        className="particle-canvas"
        aria-hidden="true"
      />
    </div>
  );
}
