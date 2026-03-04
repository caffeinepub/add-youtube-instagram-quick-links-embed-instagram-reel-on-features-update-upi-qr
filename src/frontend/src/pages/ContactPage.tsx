import Motion from "@/components/site/Motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Mail, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/917014270402", "_blank");
  };

  return (
    <div className="relative min-h-screen py-20 w-full overflow-x-hidden hex-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <Motion type="fade-up">
          <div className="text-center mb-16 space-y-4 px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-500/5 mb-4">
              <span className="font-mono text-xs text-cyan-400/80 tracking-widest uppercase">
                [ SYSTEM::CONTACT ]
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent break-words">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-mono">
              Have questions? We're here to help you get started with Zerox AI
            </p>
          </div>
        </Motion>

        <Motion type="fade-up" delay={0.2}>
          <Card className="glass-card border-cyan-500/30 w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl font-mono">
                Contact Support
              </CardTitle>
              <CardDescription className="text-base sm:text-lg font-mono">
                Reach out to us directly via WhatsApp for instant assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col items-center gap-6 py-8">
                {/* WhatsApp icon with signal ping rings */}
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full bg-green-500/30 animate-signal-ping" />
                  <div
                    className="absolute inset-0 rounded-full bg-green-500/20 animate-signal-ping"
                    style={{ animationDelay: "0.7s" }}
                  />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center relative z-10">
                    <SiWhatsapp className="w-10 h-10 text-white" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl sm:text-2xl font-semibold font-mono">
                    WhatsApp Support
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Chat with us directly for quick responses
                  </p>
                  <p className="text-lg sm:text-xl font-mono text-cyan-400 break-all">
                    +91 7014270402
                  </p>
                </div>

                <Button
                  size="lg"
                  className="glow-button text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 w-full sm:w-auto font-mono"
                  onClick={handleWhatsAppClick}
                  data-ocid="contact.whatsapp.primary_button"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Open WhatsApp
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-8 border-t border-border">
                <div className="text-center space-y-2 p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                  <Mail className="w-8 h-8 mx-auto text-cyan-400" />
                  <h4 className="font-semibold font-mono text-sm">Email</h4>
                  <p className="text-sm text-muted-foreground">
                    Quick response time
                  </p>
                </div>
                <div className="text-center space-y-2 p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                  <MessageCircle className="w-8 h-8 mx-auto text-cyan-400" />
                  <h4 className="font-semibold font-mono text-sm">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7
                  </p>
                </div>
                <div className="text-center space-y-2 p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                  <Globe className="w-8 h-8 mx-auto text-cyan-400" />
                  <h4 className="font-semibold font-mono text-sm">Resources</h4>
                  <p className="text-sm text-muted-foreground">
                    Guides & tutorials
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Motion>
      </div>
    </div>
  );
}
