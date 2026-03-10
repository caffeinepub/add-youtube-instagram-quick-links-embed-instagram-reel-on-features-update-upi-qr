import { useState } from "react";

const FONT: Record<string, string[]> = {
  A: [" ▄█▄ ", "█▀▀█", "█  █"],
  B: ["█▀▀▄", "█▀▀▄", "█▄▄▀"],
  C: [" ▄▄▄", "█   ", " ▀▀▀"],
  D: ["█▀▀▄", "█  █", "█▄▄▀"],
  E: ["█▀▀▀", "█▀▀ ", "█▄▄▄"],
  F: ["█▀▀▀", "█▀▀ ", "█   "],
  G: [" ▄▄▄", "█ ▄▄", " ▀▀█"],
  H: ["█  █", "████", "█  █"],
  I: ["▀█▀", " █ ", "▄█▄"],
  J: ["  █", "  █", "▀▄█"],
  K: ["█ ▄▀", "█▀▄ ", "█ ▀▄"],
  L: ["█   ", "█   ", "████"],
  M: ["█▄ ▄█", "█ ▀ █", "█   █"],
  N: ["█▄  █", "█ ▀ █", "█  ▀█"],
  O: [" ▄▄▄ ", "█   █", " ▀▀▀ "],
  P: ["█▀▀▄", "█▄▄▀", "█   "],
  Q: [" ▄▄▄ ", "█ ▄ █", " ▀▀▄▄"],
  R: ["█▀▀▄", "█▀▀▄", "█  ▀"],
  S: [" ▄▄▄", " ▀▀▄", "▄▄▄▀"],
  T: ["▀█▀▀▀", " █   ", " █   "],
  U: ["█  █", "█  █", " ▀▀ "],
  V: ["█   █", "▀▄ ▄▀", "  ▀  "],
  W: ["█   █", "█ ▄ █", " ▀ ▀ "],
  X: ["▀▄ ▄▀", "  ▀  ", "▄▀ ▀▄"],
  Y: ["▀▄ ▄▀", "  █  ", "  █  "],
  Z: ["▀▀▀█", " ▄▀ ", "█▄▄▄"],
  "0": [" ▄▄ ", "█  █", " ▀▀ "],
  "1": ["▄█", " █", "▄█▄"],
  "2": ["▀▀▄", " ▄▀", "▄▄▄"],
  "3": ["▀▀▄", " ▀▄", "▄▄▀"],
  " ": ["   ", "   ", "   "],
};

function toAsciiArt(text: string): string {
  const upper = text.toUpperCase();
  const rows = ["", "", ""];
  for (const ch of upper) {
    const g = FONT[ch] ?? FONT[" "]!;
    rows[0] += `${g[0]} `;
    rows[1] += `${g[1]} `;
    rows[2] += `${g[2]} `;
  }
  return rows.join("\n");
}

export default function AsciiArt() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const generate = () => setResult(input ? toAsciiArt(input) : "");
  const copy = () => navigator.clipboard?.writeText(result);

  return (
    <div className="space-y-5 font-mono">
      <p className="text-xs text-slate-400">
        Convert text into block ASCII art (A–Z, 0–9).
      </p>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
          maxLength={12}
          className="flex-1 bg-slate-900 border border-cyan-500/20 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60"
        />
        <button
          type="button"
          onClick={generate}
          className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm hover:bg-cyan-500/20 transition-all"
        >
          Generate
        </button>
      </div>
      {result && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-cyan-400">ASCII Art</span>
            <button
              type="button"
              onClick={copy}
              className="text-xs text-slate-500 hover:text-cyan-300"
            >
              Copy
            </button>
          </div>
          <pre className="bg-slate-800 rounded-xl px-4 py-4 text-sm text-green-400 overflow-x-auto whitespace-pre leading-tight">
            {result}
          </pre>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setInput("");
          setResult("");
        }}
        className="text-xs text-slate-500 hover:text-red-400 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
