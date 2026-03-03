import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createWhatsAppLink } from '@/utils/whatsapp';
import { MessageCircle } from 'lucide-react';
import Motion from '@/components/site/Motion';

export default function DemoPage() {
  const handleGetDemo = () => {
    const whatsappLink = createWhatsAppLink('917014270402', 'Hey! I want A Free Demo For Zerox.');
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="min-h-screen relative overflow-hidden w-full">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-cyan-950/10 to-purple-950/10" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 max-w-full">
        <Motion type="fade-up" className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-12 px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent break-words">
              Experience Zerox AI
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              See the future of AI assistance in action. Get your personalized demo today.
            </p>
          </div>

          <Card className="glass-panel border-cyan-500/30 shadow-glow-cyan w-full">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-glow-cyan">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-cyan-400">
                Get Your Free Demo
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-muted-foreground">
                Connect with us on WhatsApp and discover how Zerox AI can transform your workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-center">
                <p className="text-foreground/80">
                  Our team will guide you through:
                </p>
                <ul className="space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-muted-foreground">All 27 powerful AI features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-muted-foreground">Personalized setup assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-muted-foreground">Best practices and tips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-muted-foreground">Answers to all your questions</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  onClick={handleGetDemo}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-glow-cyan transition-all hover:scale-105 w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Free Demo
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground pt-4">
                Click the button above to start a WhatsApp conversation with our team
              </p>
            </CardContent>
          </Card>
        </Motion>
      </div>
    </div>
  );
}
