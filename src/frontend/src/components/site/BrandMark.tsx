export default function BrandMark() {
  return (
    <div className="flex items-center gap-2 select-none">
      <span
        className="text-2xl font-black tracking-widest uppercase"
        style={{
          fontFamily: "'Orbitron', 'Share Tech Mono', 'Courier New', monospace",
          background:
            "linear-gradient(90deg, #00d9ff 0%, #a855f7 60%, #00d9ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "0.18em",
          textShadow: "none",
          filter: "drop-shadow(0 0 8px rgba(0,217,255,0.5))",
        }}
      >
        JollyTech
      </span>
    </div>
  );
}
