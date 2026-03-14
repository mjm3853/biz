import { Check } from "lucide-react";

interface PricingTierProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export default function PricingTier({ name, price, period, features, highlighted, cta }: PricingTierProps) {
  return (
    <div
      className={`rounded-2xl p-8 flex flex-col ${
        highlighted
          ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl scale-105"
          : "bg-white border border-gray-200 shadow-sm"
      }`}
    >
      <h3 className={`text-lg font-semibold mb-2 ${highlighted ? "text-white/90" : "text-gray-500"}`}>
        {name}
      </h3>
      <div className="mb-6">
        <span className={`text-4xl font-extrabold ${highlighted ? "text-white" : "text-gray-900"}`}>
          {price}
        </span>
        <span className={`text-sm ${highlighted ? "text-white/70" : "text-gray-500"}`}>
          {period}
        </span>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${highlighted ? "text-white/80" : "text-green-500"}`} />
            <span className={`text-sm ${highlighted ? "text-white/90" : "text-gray-700"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
          highlighted
            ? "bg-white text-gray-900 hover:bg-gray-100"
            : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
