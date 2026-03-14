import * as LucideIcons from "lucide-react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Star;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
        <IconComponent className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
