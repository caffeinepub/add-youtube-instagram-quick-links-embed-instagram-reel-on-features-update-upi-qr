import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import ZeroxCoreSphere from '@/components/three/ZeroxCoreSphere';
import NeuralNetworkMesh from '@/components/three/NeuralNetworkMesh';
import ExploreMoreSection from '@/components/sections/ExploreMoreSection';
import PodcastSection from '@/components/sections/PodcastSection';
import Motion from '@/components/site/Motion';
import { Sparkles, Zap, Gift } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Neural background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <NeuralNetworkMesh />
      </div>

      {/* Static neural texture overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/neural-bg.dim_1920x1080.png)' }}
      />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20 w-full">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center max-w-full">
          <Motion type="fade-up" delay={0.1}>
            <div className="space-y-6 text-center lg:text-left max-w-full">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300 font-medium">Next-Gen AI Technology</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight break-words">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Zerox AI
                </span>
              </h1>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/90 break-words">
                Your Personal Intelligence Engine
              </h2>
              
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Experience the future of desktop intelligence. Zerox AI is a powerful, voice-controlled AI system that transforms how you interact with your computer through advanced automation, vision, and natural conversation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 max-w-full">
                <Button
                  size="lg"
                  className="glow-button text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 w-full sm:w-auto"
                  onClick={() => navigate({ to: '/features' })}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Explore Zerox
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-cyan-500/50 hover:bg-cyan-500/10 w-full sm:w-auto"
                  onClick={() => navigate({ to: '/pricing' })}
                >
                  View Pricing
                </Button>
                <Button
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 glow-button w-full sm:w-auto"
                  onClick={() => {
                    navigate({ to: '/pricing' });
                    setTimeout(() => {
                      const freeTierCard = document.getElementById('free-tier-card');
                      if (freeTierCard) {
                        freeTierCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Try Zerox for Free
                </Button>
              </div>
            </div>
          </Motion>

          <Motion type="fade-up" delay={0.3}>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full">
              <ZeroxCoreSphere />
            </div>
          </Motion>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="relative z-10 py-20 w-full">
        <ExploreMoreSection />
      </section>

      {/* Podcast Section */}
      <section className="relative z-10 py-20 w-full">
        <PodcastSection />
      </section>
    </div>
  );
}
