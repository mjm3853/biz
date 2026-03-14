import { useParams, Navigate } from "react-router-dom";
import { ideas } from "../data/ideas";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import PricingTier from "../components/PricingTier";
import Testimonial from "../components/Testimonial";
import CTA from "../components/CTA";

const stepNumberColors: Record<string, string> = {
  blue: "bg-blue-600",
  orange: "bg-orange-500",
  violet: "bg-violet-600",
  green: "bg-green-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  cyan: "bg-cyan-500",
  teal: "bg-teal-500",
  yellow: "bg-yellow-500",
  fuchsia: "bg-fuchsia-500",
  indigo: "bg-indigo-600",
  emerald: "bg-emerald-500",
  sky: "bg-sky-500",
  slate: "bg-slate-600",
};

export default function LandingPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const idea = ideas.find((i) => i.id === ideaId);

  if (!idea) return <Navigate to="/" replace />;

  const stepColor = stepNumberColors[idea.accentColor] || "bg-gray-600";

  return (
    <div>
      <Hero
        name={idea.name}
        tagline={idea.tagline}
        description={idea.description}
        gradient={idea.gradient}
      />

      {/* Problem Statement */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{idea.problem}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {idea.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div
                  className={`w-12 h-12 rounded-full ${stepColor} text-white font-bold text-lg flex items-center justify-center mx-auto mb-4`}
                >
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {idea.features.map((feature, i) => (
              <FeatureCard
                key={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                accentColor={idea.accentColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-500 text-center mb-16">
            Start free. Upgrade when you're ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {idea.pricing.map((tier, i) => (
              <PricingTier
                key={i}
                {...tier}
                gradient={idea.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            What People Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {idea.testimonials.map((testimonial, i) => (
              <Testimonial key={i} {...testimonial} />
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            * Testimonials are illustrative examples for concept exploration purposes.
          </p>
        </div>
      </section>

      <CTA gradient={idea.gradient} name={idea.name} />
    </div>
  );
}
