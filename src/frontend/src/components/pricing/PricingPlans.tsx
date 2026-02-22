import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import FreeTierModal from './FreeTierModal';

export default function PricingPlans() {
  const [isFreeTierModalOpen, setIsFreeTierModalOpen] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Zerox AI – Free Trial',
      price: 'Free',
      description: 'Try Zerox AI with core features',
      features: [
        'Voice-controlled AI interaction',
        'Natural AI conversation engine',
        'Desktop automation engine',
      ],
      popular: false,
      isFree: true,
      caution: '⚠️ Access limited to 3 days',
    },
    {
      id: 'lifetime',
      name: 'Zerox AI – Lifetime Access',
      price: '₹599',
      description: 'Full lifetime access to Zerox AI',
      features: [
        'Lifetime updates',
        'All core features',
        'Voice control & automation',
        'Computer vision capabilities',
        'AI-powered assistance',
        'AI-powered image generation',
        'Plugin system access',
        'Priority support',
      ],
      popular: true,
      isFree: false,
    },
    {
      id: 'student',
      name: 'Zerox AI – Student Lifetime Plan',
      price: '₹399',
      description: 'Special pricing for students',
      features: [
        'Lifetime updates',
        'All core features',
        'Voice control & automation',
        'Computer vision capabilities',
        'AI-powered assistance',
        'AI-powered image generation',
        'Plugin system access',
        'Student support',
      ],
      popular: false,
      isFree: false,
      note: 'Student verification required',
    },
  ];

  const scrollToPayment = () => {
    const paymentSection = document.getElementById('payment-section');
    if (paymentSection) {
      paymentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
        {plans.map((plan, index) => (
          <Card
            key={index}
            id={plan.isFree ? 'free-tier-card' : undefined}
            className={`glass-card relative ${
              plan.popular
                ? 'border-cyan-400/50 shadow-glow'
                : plan.isFree
                ? 'border-purple-400/50'
                : 'border-cyan-500/30'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            {plan.isFree && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Free Trial
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
              <div className="mt-4">
                <span className={`text-5xl font-bold ${
                  plan.isFree 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'
                }`}>
                  {plan.price}
                </span>
                {!plan.isFree && (
                  <span className="text-muted-foreground ml-2">one-time</span>
                )}
              </div>
              {plan.caution && (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{plan.caution}</span>
                </div>
              )}
              {plan.note && (
                <p className="text-sm text-yellow-400 mt-2">* {plan.note}</p>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full ${
                    plan.isFree ? 'bg-purple-500/20' : 'bg-cyan-500/20'
                  } flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Check className={`w-3 h-3 ${
                      plan.isFree ? 'text-purple-400' : 'text-cyan-400'
                    }`} />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <Button
                className={`w-full glow-button ${
                  plan.isFree
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
                }`}
                size="lg"
                onClick={() => {
                  if (plan.isFree) {
                    setIsFreeTierModalOpen(true);
                  } else {
                    scrollToPayment();
                  }
                }}
              >
                {plan.isFree ? 'Get Started' : 'Buy Now'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <FreeTierModal 
        open={isFreeTierModalOpen} 
        onOpenChange={setIsFreeTierModalOpen}
      />
    </>
  );
}
