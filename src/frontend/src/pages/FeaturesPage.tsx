import FeatureCard from "@/components/features/FeatureCard";
import Motion from "@/components/site/Motion";
import FloatingFeatureCubes from "@/components/three/FloatingFeatureCubes";
import { Card } from "@/components/ui/card";
import { zeroxFeatures } from "@/content/zeroxFeatures";
import { ExternalLink } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen py-20 w-full overflow-x-hidden hex-bg">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <FloatingFeatureCubes />
      </div>

      {/* Scanning horizontal line animation */}
      <div className="fixed inset-x-0 top-0 bottom-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-data-stream"
          style={{ animationDuration: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-full">
        {/* Robotic page header badge */}
        <Motion type="fade-up">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-500/5">
              <span className="font-mono text-xs text-cyan-400/80 tracking-widest uppercase">
                [ SYSTEM::FEATURES ]
              </span>
            </div>
          </div>
        </Motion>

        {/* Instagram Reel Embed */}
        <Motion type="fade-up">
          <div className="mb-16 max-w-2xl mx-auto w-full">
            <Card className="glass-card border-cyan-500/30 overflow-hidden">
              <div className="aspect-[9/16] max-h-[600px] mx-auto relative bg-black/20">
                <iframe
                  src="https://www.instagram.com/reel/DUN0e0vCE37/embed"
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media"
                  title="Instagram Reel"
                  onError={(e) => {
                    const target = e.target as HTMLIFrameElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div
                  className="hidden absolute inset-0 flex-col items-center justify-center gap-4 p-8 text-center"
                  style={{ display: "none" }}
                >
                  <ExternalLink className="w-12 h-12 text-cyan-400" />
                  <p className="text-lg text-muted-foreground">
                    Unable to load Instagram reel
                  </p>
                  <a
                    href="https://www.instagram.com/reel/DUN0e0vCE37/?igsh=dTF1MGl3ZGFmOTJz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-2"
                  >
                    View on Instagram <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </Motion>

        <Motion type="fade-up">
          <div className="text-center mb-16 space-y-4 px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent break-words terminal-cursor">
              Core Capabilities
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-mono">
              Discover the powerful features that make Zerox AI your ultimate
              desktop intelligence companion
            </p>
          </div>
        </Motion>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {zeroxFeatures.map((feature, index) => (
            <Motion key={feature.title} type="fade-up" delay={0.05 * index}>
              <FeatureCard feature={feature} />
            </Motion>
          ))}
        </div>
      </div>
    </div>
  );
}
