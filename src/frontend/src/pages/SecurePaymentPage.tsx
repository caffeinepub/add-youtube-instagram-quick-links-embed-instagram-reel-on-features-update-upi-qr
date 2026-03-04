import Motion from "@/components/site/Motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyToClipboard } from "@/utils/clipboard";
import { createWhatsAppLink } from "@/utils/whatsapp";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Copy,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TierSessionData {
  id: string;
  label: string;
  price: number;
  whatsappMessage: string;
}

export default function SecurePaymentPage() {
  const params = useParams({ from: "/pay/$tier" });
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [tierData, setTierData] = useState<TierSessionData | null>(null);

  useEffect(() => {
    // Retrieve tier data from sessionStorage
    const stored = sessionStorage.getItem("zerox_selected_tier");
    if (stored) {
      try {
        setTierData(JSON.parse(stored));
      } catch {
        // fallback
      }
    }
  }, []);

  // Fallback tier info from URL params
  const tierLabel =
    tierData?.label ||
    params.tier.charAt(0).toUpperCase() + params.tier.slice(1);
  const price = tierData?.price || 0;
  const upiId = "divyamarora@fam";
  const upiLink = `upi://pay?pa=${upiId}&pn=JollyTech&am=${price}&cu=INR&tn=ZeroxAI_${tierLabel}`;
  const whatsappMessage =
    tierData?.whatsappMessage ||
    `Hello! I want to subscribe to Zerox AI ${tierLabel} Plan (₹${price}). Please guide me through the process.`;

  const handleCopyUPI = async () => {
    const success = await copyToClipboard(upiId);
    if (success) {
      setCopied(true);
      toast.success("UPI ID copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUPIPay = () => {
    window.open(upiLink, "_blank");
  };

  const handleWhatsApp = () => {
    window.open(createWhatsAppLink("917014270402", whatsappMessage), "_blank");
  };

  const handleVerify = () => {
    if (!transactionId.trim()) {
      toast.error("Please enter your transaction ID");
      return;
    }
    const msg = `Hello, I completed payment for Zerox AI ${tierLabel} Plan (₹${price}).\nTransaction ID: ${transactionId}.\nPlease verify and activate my subscription.`;
    window.open(createWhatsAppLink("917014270402", msg), "_blank");
  };

  return (
    <div className="relative min-h-screen py-20 w-full overflow-x-hidden hex-bg scanline-overlay">
      {/* Corner brackets */}
      <div className="fixed top-24 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/40 pointer-events-none z-0" />
      <div className="fixed top-24 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/40 pointer-events-none z-0" />
      <div className="fixed bottom-8 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-500/40 pointer-events-none z-0" />
      <div className="fixed bottom-8 right-4 w-8 h-8 border-r-2 border-b-2 border-purple-500/40 pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <Motion type="fade-up">
          <Button
            variant="ghost"
            className="mb-6 text-cyan-400 font-mono hover:bg-cyan-500/10"
            onClick={() => navigate({ to: "/monthly-pricing" })}
            data-ocid="payment.back.button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </Button>
        </Motion>

        <Motion type="fade-up" delay={0.1}>
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded border border-cyan-500/40 bg-cyan-500/5">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs text-cyan-400 tracking-widest">
                SECURE_PAYMENT
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Complete Your Subscription
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              {tierLabel} Plan{price > 0 ? ` — ₹${price}` : ""}
            </p>
          </div>
        </Motion>

        <Motion type="fade-up" delay={0.2}>
          <Card className="glass-card border-cyan-500/30 mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-mono text-cyan-400">
                Choose Payment Method
              </CardTitle>
              <CardDescription className="font-mono text-xs">
                Two ways to complete your payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Option 1: UPI */}
              <div className="p-4 rounded-lg border border-cyan-500/30 bg-cyan-500/5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <span className="font-semibold text-cyan-300 font-mono text-sm">
                    Pay via UPI
                  </span>
                </div>
                {price > 0 && (
                  <p className="text-sm text-muted-foreground font-mono">
                    Send ₹{price} directly to our UPI ID
                  </p>
                )}

                <div className="flex gap-2">
                  <Input
                    value={upiId}
                    readOnly
                    className="font-mono bg-muted/50 text-sm"
                    data-ocid="payment.upi_id.input"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyUPI}
                    className="flex-shrink-0 border-cyan-500/50 hover:bg-cyan-500/10"
                    data-ocid="payment.copy_upi.button"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 glow-button font-mono text-sm"
                  onClick={handleUPIPay}
                  data-ocid="payment.pay_upi.button"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Open UPI App{price > 0 ? ` — Pay ₹${price}` : ""}
                </Button>
              </div>

              {/* Option 2: WhatsApp */}
              <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-black flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <span className="font-semibold text-green-300 font-mono text-sm">
                    WhatsApp — Other Payment Methods
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Contact us on WhatsApp for bank transfer or other payment
                  options
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 font-mono text-sm"
                  onClick={handleWhatsApp}
                  data-ocid="payment.whatsapp.button"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </Motion>

        <Motion type="fade-up" delay={0.3}>
          <Card className="glass-card border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-lg font-mono text-cyan-400">
                After Payment — Verify
              </CardTitle>
              <CardDescription className="font-mono text-xs">
                Enter your transaction ID to activate access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-mono text-sm">Transaction ID</Label>
                <Input
                  placeholder="Enter your UPI transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="font-mono"
                  data-ocid="payment.transaction_id.input"
                />
              </div>
              <Button
                className="w-full glow-button bg-gradient-to-r from-cyan-500 to-purple-500 font-mono"
                onClick={handleVerify}
                data-ocid="payment.verify.button"
              >
                <Shield className="w-4 h-4 mr-2" />
                Verify Payment via WhatsApp
              </Button>
              <p className="text-xs text-center text-muted-foreground font-mono">
                You'll be redirected to WhatsApp to confirm your transaction
              </p>
            </CardContent>
          </Card>
        </Motion>
      </div>
    </div>
  );
}
