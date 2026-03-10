import CategoryCard from "@/components/tools/CategoryCard";
import ToolModal from "@/components/tools/ToolModal";
import type { ToolItem } from "@/components/tools/types";
import { useState } from "react";

const typingTools: ToolItem[] = [
  {
    id: "wpm-test",
    name: "WPM Typing Test",
    description: "Words per minute with live metrics & animal ranking",
    icon: "⌨️",
  },
  {
    id: "cpm-test",
    name: "CPM Test",
    description: "Characters per minute with accuracy tracking",
    icon: "🔡",
  },
  {
    id: "clicks-per-minute",
    name: "Clicks Per Minute",
    description: "Test your click speed with animal ranking",
    icon: "🖱️",
  },
  {
    id: "accuracy-test",
    name: "Typing Accuracy Test",
    description: "Focus on accuracy over speed with error tracking",
    icon: "🎯",
  },
  {
    id: "reaction-time",
    name: "Reaction Time Test",
    description: "Click when green — measure your reflexes in ms",
    icon: "⚡",
  },
  {
    id: "memory-typing",
    name: "Memory Typing Test",
    description: "Memorize text, then type it from memory",
    icon: "🧠",
  },
];

const studyTools: ToolItem[] = [
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Words, chars, sentences, paragraphs & reading time",
    icon: "📝",
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    description: "UPPER, lower, Sentence, Title case conversions",
    icon: "🔡",
  },
  {
    id: "essay-length-checker",
    name: "Essay Length Checker",
    description: "Length analysis with academic recommendations",
    icon: "📄",
  },
  {
    id: "reading-time-calculator",
    name: "Reading Time Calculator",
    description: "Estimate reading time at slow, average, or fast pace",
    icon: "⏱️",
  },
];

const printTools: ToolItem[] = [
  {
    id: "printing-cost-calculator",
    name: "Printing Cost Calculator",
    description: "Estimate cost for B&W or color, single or double sided",
    icon: "🖶",
  },
  {
    id: "page-size-converter",
    name: "Page Size Converter",
    description: "Compare A4, A3, Letter, Legal dimensions",
    icon: "📐",
  },
  {
    id: "margin-safety-checker",
    name: "Margin Safety Checker",
    description: "Upload image and visualise safe print margins",
    icon: "📸",
  },
];

const funTools: ToolItem[] = [
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Random secure passwords with custom options",
    icon: "🔒",
  },
  {
    id: "password-strength-checker",
    name: "Password Strength Checker",
    description: "Check how strong your password is",
    icon: "🛡️",
  },
  {
    id: "random-name-picker",
    name: "Random Name Picker",
    description: "Enter names, spin and pick a winner",
    icon: "🎉",
  },
  {
    id: "coin-flip",
    name: "Coin Flip Simulator",
    description: "Animated heads or tails with history",
    icon: "🪙",
  },
  {
    id: "dice-roller",
    name: "Dice Roller",
    description: "Roll 1–6 dice with animated results",
    icon: "🎲",
  },
  {
    id: "image-generator",
    name: "Image Generator",
    description:
      "Generate abstract art, gradients & patterns — download as PNG",
    icon: "🎨",
  },
];

const devTools: ToolItem[] = [
  {
    id: "binary-converter",
    name: "Binary ↔ Decimal",
    description: "Convert numbers between binary and decimal",
    icon: "🔢",
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs",
    icon: "⬛",
  },
  {
    id: "ascii-art",
    name: "ASCII Art Generator",
    description: "Convert text into block ASCII art",
    icon: "🔤",
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    icon: "📦",
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate random UUIDs with copy button",
    icon: "🆔",
  },
];

const categories = [
  {
    icon: "⌨️",
    name: "Typing & Speed",
    description: "WPM tests, CPM, click speed, reaction time & more",
    tools: typingTools,
    comingSoon: false,
  },
  {
    icon: "📚",
    name: "Study & Writing",
    description:
      "Word counters, case converters, essay checkers & reading time",
    tools: studyTools,
    comingSoon: false,
  },
  {
    icon: "🖨️",
    name: "Print & Xerox",
    description:
      "Printing cost calculator, page size converter, margin checker",
    tools: printTools,
    comingSoon: false,
  },
  {
    icon: "🎲",
    name: "Fun & Utility",
    description: "Password generator, coin flip, dice roller, image gen & more",
    tools: funTools,
    comingSoon: false,
  },
  {
    icon: "💻",
    name: "Developer Tools",
    description: "Binary converter, QR generator, Base64 encoder & UUID",
    tools: devTools,
    comingSoon: false,
  },
];

const totalTools = [
  ...typingTools,
  ...studyTools,
  ...printTools,
  ...funTools,
  ...devTools,
].length;

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 4 + ((i * 3.7) % 8),
  x: (i * 17.3) % 100,
  y: (i * 23.1) % 100,
  delay: (i * 0.7) % 6,
  duration: 6 + ((i * 1.3) % 8),
}));

export default function FreeToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-x-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(0,150,180,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(80,0,200,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: 0.05,
              animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <style>
        {
          "@keyframes float-particle { from { transform: translateY(0px); } to { transform: translateY(-20px); } }"
        }
      </style>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-14 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-xs font-mono text-cyan-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
            BROWSER-BASED · NO LOGIN · FREE
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, #e2f9ff 0%, #00d9ff 40%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Free Online Tools
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Useful tools for students, creators, and everyday tasks —{" "}
            <span className="text-cyan-400/80">all in your browser.</span>
          </p>
          <div className="relative max-w-md mx-auto mt-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-sm text-slate-200 placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(0,217,255,0.1)] transition-all"
              data-ocid="tools.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { label: "Total Tools", value: String(totalTools) },
            { label: "Categories", value: "5" },
            { label: "All Free", value: "100%" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-bold font-mono text-cyan-400">
                {s.value}
              </p>
              <p className="text-xs text-slate-500 font-mono">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              icon={cat.icon}
              name={cat.name}
              description={cat.description}
              tools={cat.tools}
              comingSoon={cat.comingSoon}
              searchQuery={searchQuery}
              onToolClick={setActiveTool}
            />
          ))}
        </div>

        {searchQuery &&
          categories.every(
            (c) =>
              c.comingSoon ||
              !c.tools.some((t) =>
                t.name.toLowerCase().includes(searchQuery.toLowerCase()),
              ),
          ) && (
            <div
              className="text-center py-16 text-slate-500 font-mono"
              data-ocid="tools.empty_state"
            >
              <p className="text-4xl mb-3">🔍</p>
              <p>No tools matched &ldquo;{searchQuery}&rdquo;</p>
            </div>
          )}
      </div>

      <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
    </div>
  );
}
