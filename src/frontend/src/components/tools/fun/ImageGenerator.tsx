import { useCallback, useRef, useState } from "react";

type Style =
  | "abstract-geometric"
  | "gradient-wave"
  | "neon-burst"
  | "bokeh-circles"
  | "starfield"
  | "pixel-mosaic";

type SizeOption = { label: string; w: number; h: number };

const SIZES: SizeOption[] = [
  { label: "512 × 512", w: 512, h: 512 },
  { label: "800 × 600", w: 800, h: 600 },
  { label: "1024 × 1024", w: 1024, h: 1024 },
  { label: "1200 × 630 (social)", w: 1200, h: 630 },
];

const STYLES: { id: Style; label: string; emoji: string }[] = [
  { id: "abstract-geometric", label: "Abstract Geometric", emoji: "🔷" },
  { id: "gradient-wave", label: "Gradient Wave", emoji: "🌊" },
  { id: "neon-burst", label: "Neon Burst", emoji: "💥" },
  { id: "bokeh-circles", label: "Bokeh Circles", emoji: "✨" },
  { id: "starfield", label: "Starfield", emoji: "🌌" },
  { id: "pixel-mosaic", label: "Pixel Mosaic", emoji: "🜦" },
];

function rnd(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function rndInt(min: number, max: number) {
  return Math.floor(rnd(min, max + 1));
}

function hsl(h: number, s: number, l: number, a = 1) {
  return `hsla(${h},${s}%,${l}%,${a})`;
}

function drawAbstractGeometric(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  ctx.fillStyle = hsl(rndInt(200, 270), 20, 8);
  ctx.fillRect(0, 0, w, h);
  const count = rndInt(30, 55);
  for (let i = 0; i < count; i++) {
    const sides = rndInt(3, 6);
    const cx = rnd(0, w);
    const cy = rnd(0, h);
    const r = rnd(30, 180);
    const hue = rndInt(160, 340);
    const alpha = rnd(0.25, 0.75);
    ctx.beginPath();
    for (let j = 0; j <= sides; j++) {
      const angle = (j / sides) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = hsl(hue, 80, 60, alpha);
    ctx.fill();
    if (Math.random() > 0.5) {
      ctx.strokeStyle = hsl(hue, 90, 75, 0.6);
      ctx.lineWidth = rnd(0.5, 2);
      ctx.stroke();
    }
  }
}

function drawGradientWave(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bg = ctx.createLinearGradient(0, 0, w, h);
  const baseHue = rndInt(0, 360);
  bg.addColorStop(0, hsl(baseHue, 60, 10));
  bg.addColorStop(1, hsl((baseHue + 120) % 360, 60, 15));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  const bands = rndInt(6, 14);
  for (let i = 0; i < bands; i++) {
    const hue = (baseHue + (i / bands) * 260) % 360;
    const amp = rnd(h * 0.04, h * 0.18);
    const freq = rnd(0.003, 0.012);
    const phase = rnd(0, Math.PI * 2);
    const yBase = (i / bands) * h + h / (bands * 2);
    const grad = ctx.createLinearGradient(0, yBase - amp, 0, yBase + amp);
    grad.addColorStop(0, hsl(hue, 85, 65, 0));
    grad.addColorStop(0.5, hsl(hue, 85, 65, rnd(0.5, 0.85)));
    grad.addColorStop(1, hsl(hue, 85, 65, 0));
    ctx.beginPath();
    ctx.moveTo(0, yBase);
    for (let x = 0; x <= w; x += 2) {
      ctx.lineTo(x, yBase + Math.sin(x * freq + phase) * amp);
    }
    for (let x = w; x >= 0; x -= 2) {
      ctx.lineTo(x, yBase + Math.sin(x * freq + phase + Math.PI) * (amp * 0.6));
    }
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

function drawNeonBurst(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#02040a";
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2 + rnd(-w * 0.1, w * 0.1);
  const cy = h / 2 + rnd(-h * 0.1, h * 0.1);
  const rays = rndInt(60, 140);
  const neonColors = [
    "#00ffff",
    "#ff00ff",
    "#00ff88",
    "#ff6600",
    "#8800ff",
    "#ffee00",
  ];
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    const len = rnd(Math.min(w, h) * 0.3, Math.max(w, h) * 0.85);
    const color = neonColors[rndInt(0, neonColors.length - 1)];
    const grad = ctx.createLinearGradient(
      cx,
      cy,
      cx + Math.cos(angle) * len,
      cy + Math.sin(angle) * len,
    );
    grad.addColorStop(0, `${color}aa`);
    grad.addColorStop(0.6, `${color}55`);
    grad.addColorStop(1, `${color}00`);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
    ctx.strokeStyle = grad;
    ctx.lineWidth = rnd(0.5, 2.5);
    ctx.stroke();
  }
  const core = ctx.createRadialGradient(
    cx,
    cy,
    0,
    cx,
    cy,
    Math.min(w, h) * 0.12,
  );
  core.addColorStop(0, "rgba(255,255,255,0.95)");
  core.addColorStop(0.3, "rgba(0,255,255,0.5)");
  core.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(w, h) * 0.12, 0, Math.PI * 2);
  ctx.fillStyle = core;
  ctx.fill();
}

function drawBokehCircles(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgHue = rndInt(200, 280);
  ctx.fillStyle = hsl(bgHue, 40, 6);
  ctx.fillRect(0, 0, w, h);
  const count = rndInt(40, 80);
  const neonHues = [180, 280, 120, 30, 320];
  for (let i = 0; i < count; i++) {
    const x = rnd(0, w);
    const y = rnd(0, h);
    const r = rnd(10, 120);
    const hue = neonHues[rndInt(0, neonHues.length - 1)];
    const alpha = rnd(0.05, 0.35);
    const blur = r * rnd(0.4, 0.9);
    ctx.save();
    ctx.filter = `blur(${blur}px)`;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, hsl(hue, 90, 75, alpha * 1.5));
    grad.addColorStop(0.6, hsl(hue, 80, 65, alpha));
    grad.addColorStop(1, hsl(hue, 70, 55, 0));
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
    if (Math.random() > 0.6) {
      ctx.beginPath();
      ctx.arc(x, y, r * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = hsl(hue, 95, 90, 0.7);
      ctx.fill();
    }
  }
}

function drawStarfield(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bg = ctx.createRadialGradient(
    w / 2,
    h / 2,
    0,
    w / 2,
    h / 2,
    Math.max(w, h),
  );
  bg.addColorStop(0, hsl(220, 60, 8));
  bg.addColorStop(0.5, hsl(230, 50, 5));
  bg.addColorStop(1, hsl(240, 40, 3));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  const nebulae = rndInt(2, 4);
  for (let n = 0; n < nebulae; n++) {
    const nx = rnd(0, w);
    const ny = rnd(0, h);
    const nr = rnd(w * 0.2, w * 0.5);
    const nhue = rndInt(200, 290);
    const ngrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
    ngrad.addColorStop(0, hsl(nhue, 80, 30, 0.12));
    ngrad.addColorStop(1, hsl(nhue, 60, 20, 0));
    ctx.beginPath();
    ctx.arc(nx, ny, nr, 0, Math.PI * 2);
    ctx.fillStyle = ngrad;
    ctx.fill();
  }
  const starCount = rndInt(300, 600);
  for (let i = 0; i < starCount; i++) {
    const x = rnd(0, w);
    const y = rnd(0, h);
    const r = rnd(0.3, Math.random() > 0.95 ? 2.5 : 1.2);
    const bright = rnd(0.4, 1);
    const hue = rndInt(190, 260);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = hsl(hue, 40, 95, bright);
    ctx.fill();
    if (r > 1.8 && Math.random() > 0.5) {
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = hsl(hue, 60, 90, 0.08);
      ctx.fill();
    }
  }
}

function drawPixelMosaic(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const tileSize = rndInt(18, 48);
  const cols = Math.ceil(w / tileSize);
  const rows = Math.ceil(h / tileSize);
  const baseHue = rndInt(0, 360);
  const palette = Array.from({ length: 8 }, (_, i) =>
    hsl((baseHue + i * 45) % 360, rnd(55, 90), rnd(40, 70)),
  );
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const color = palette[rndInt(0, palette.length - 1)];
      ctx.fillStyle = color;
      ctx.fillRect(col * tileSize, row * tileSize, tileSize - 1, tileSize - 1);
      if (Math.random() > 0.8) {
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.fillRect(col * tileSize, row * tileSize, tileSize - 1, 2);
      }
    }
  }
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  for (let row = 0; row < rows; row++) {
    ctx.fillRect(0, row * tileSize + tileSize - 1, w, 1);
  }
  for (let col = 0; col < cols; col++) {
    ctx.fillRect(col * tileSize + tileSize - 1, 0, 1, h);
  }
}

function generateImage(
  canvas: HTMLCanvasElement,
  style: Style,
  size: SizeOption,
) {
  canvas.width = size.w;
  canvas.height = size.h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  switch (style) {
    case "abstract-geometric":
      drawAbstractGeometric(ctx, size.w, size.h);
      break;
    case "gradient-wave":
      drawGradientWave(ctx, size.w, size.h);
      break;
    case "neon-burst":
      drawNeonBurst(ctx, size.w, size.h);
      break;
    case "bokeh-circles":
      drawBokehCircles(ctx, size.w, size.h);
      break;
    case "starfield":
      drawStarfield(ctx, size.w, size.h);
      break;
    case "pixel-mosaic":
      drawPixelMosaic(ctx, size.w, size.h);
      break;
  }
}

export default function ImageGenerator() {
  const [style, setStyle] = useState<Style>("abstract-geometric");
  const [sizeIdx, setSizeIdx] = useState(0);
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = useCallback(() => {
    if (!canvasRef.current) return;
    generateImage(canvasRef.current, style, SIZES[sizeIdx]);
    setGenerated(true);
  }, [style, sizeIdx]);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current || !generated) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `jollytech-${style}-${Date.now()}.png`;
    a.click();
  }, [generated, style]);

  const selectedStyle = STYLES.find((s) => s.id === style)!;
  const selectedSize = SIZES[sizeIdx];

  return (
    <div className="space-y-5 font-mono">
      <p className="text-slate-400 text-xs leading-relaxed">
        Generate stunning abstract art directly in your browser. Choose a style
        and size, hit Generate — each result is unique. Download as PNG.
      </p>

      {/* Style selector */}
      <div className="space-y-2">
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          Style
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              data-ocid="image_gen.style_select"
              onClick={() => {
                setStyle(s.id);
                setGenerated(false);
              }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs transition-all ${
                style === s.id
                  ? "border-cyan-400/60 bg-cyan-500/15 text-cyan-300 shadow-[0_0_12px_rgba(0,217,255,0.2)]"
                  : "border-slate-700/60 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              <span className="text-base">{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div className="space-y-2">
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          Canvas Size
        </p>
        <div className="grid grid-cols-2 gap-2">
          {SIZES.map((sz, i) => (
            <button
              key={sz.label}
              type="button"
              data-ocid="image_gen.size_select"
              onClick={() => {
                setSizeIdx(i);
                setGenerated(false);
              }}
              className={`px-3 py-2 rounded-lg border text-xs transition-all text-left ${
                sizeIdx === i
                  ? "border-purple-400/60 bg-purple-500/15 text-purple-300"
                  : "border-slate-700/60 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {sz.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          data-ocid="image_gen.primary_button"
          onClick={handleGenerate}
          className="flex-1 py-3 rounded-xl border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-bold hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(0,217,255,0.25)] transition-all active:scale-[0.97]"
        >
          {selectedStyle.emoji} Generate
        </button>
        <button
          type="button"
          data-ocid="image_gen.secondary_button"
          onClick={handleDownload}
          disabled={!generated}
          className="flex-1 py-3 rounded-xl border border-purple-500/50 bg-purple-500/10 text-purple-300 text-sm font-bold hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⬇ Download PNG
        </button>
      </div>

      {/* Canvas preview */}
      <div
        className="relative rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center"
        style={{ minHeight: 220 }}
      >
        {!generated && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 gap-2 z-10 pointer-events-none">
            <span className="text-5xl">{selectedStyle.emoji}</span>
            <p className="text-xs">{selectedStyle.label}</p>
            <p className="text-xs text-slate-700">
              {selectedSize.w} × {selectedSize.h}px
            </p>
          </div>
        )}
        <canvas
          ref={canvasRef}
          style={{
            maxWidth: "100%",
            maxHeight: "380px",
            display: "block",
            opacity: generated ? 1 : 0,
            borderRadius: "0.75rem",
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {generated && (
        <p className="text-center text-xs text-slate-600">
          {selectedSize.w} × {selectedSize.h}px · {selectedStyle.label} · Hit
          generate again for a new variation
        </p>
      )}
    </div>
  );
}
