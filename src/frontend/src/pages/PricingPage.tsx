import Motion from '@/components/site/Motion';
import PricingPlans from '@/components/pricing/PricingPlans';
import PaymentSection from '@/components/pricing/PaymentSection';

export default function PricingPage() {
  return (
    <div className="relative min-h-screen py-20 w-full overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <Motion type="fade-up">
          <div className="text-center mb-16 space-y-4 px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent break-words">
              Choose Your Plan
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Get lifetime access to Zerox AI with our affordable pricing options
            </p>
          </div>
        </Motion>

        <Motion type="fade-up" delay={0.2}>
          <PricingPlans />
        </Motion>

        <Motion type="fade-up" delay={0.4}>
          <PaymentSection />
        </Motion>
      </div>
    </div>
  );
}
