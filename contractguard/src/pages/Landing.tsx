import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import PricingTier from "../components/PricingTier";

const steps = [
  { title: "Upload or Paste", description: "Drop in a contract, paste a ToS URL, or use our browser extension." },
  { title: "Instant Analysis", description: "AI highlights risky clauses with plain-English explanations and severity ratings." },
  { title: "Negotiate Better", description: "Get suggested counter-language and negotiation points for flagged terms." },
];

const features = [
  { icon: "AlertTriangle", title: "Risk Scoring", description: "Every clause gets a risk score from green (standard) to red (dangerous)." },
  { icon: "Globe", title: "Browser Extension", description: "Auto-scan Terms of Service on any website before you click 'Agree'." },
  { icon: "Scale", title: "Counter-Language", description: "AI generates professional counter-proposals for unfavorable clauses." },
  { icon: "History", title: "Change Tracking", description: "Get alerts when companies quietly update their terms." },
];

const pricing = [
  { name: "Personal", price: "$8", period: "/mo", features: ["5 scans/month", "ToS scanning", "Risk highlighting", "Browser extension"], cta: "Scan Your First Contract" },
  { name: "Professional", price: "$24", period: "/mo", features: ["Unlimited scans", "Counter-language", "Change tracking", "Lease & employment contracts", "Export reports"], highlighted: true, cta: "Scan Your First Contract" },
  { name: "Legal Team", price: "$49", period: "/mo", features: ["Everything in Pro", "Team sharing", "Custom risk rules", "API access", "Compliance templates"], cta: "Contact Sales" },
];

const testimonials = [
  { quote: "ContractGuard caught a non-compete clause in a freelance contract that would have locked me out of my industry for 2 years.", name: "Rachel N.", role: "Freelance Designer" },
  { quote: "We run every vendor contract through it now. Saved us $40K in hidden fee clauses last quarter.", name: "Tom H.", role: "Procurement Lead" },
];

export default function Landing() {
  return (
    <div>
      <Hero />

      {/* Problem Statement */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The average person agrees to 150+ Terms of Service per year without reading them. Buried in that legalese are data selling clauses, auto-renewal traps, arbitration waivers, and liability shifts that cost real money.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 text-center mb-16">Start free. Upgrade when you're ready.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pricing.map((tier, i) => (
              <PricingTier key={i} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <Quote className="w-8 h-8 text-gray-300 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            * Testimonials are illustrative examples for concept exploration purposes.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-600 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to try ContractGuard?</h2>
          <p className="text-lg opacity-80 mb-8">Start your free trial today. No credit card required.</p>
          <Link
            to="/scan"
            className="inline-block bg-white text-gray-900 font-semibold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Scan Your First Contract
          </Link>
        </div>
      </section>
    </div>
  );
}
