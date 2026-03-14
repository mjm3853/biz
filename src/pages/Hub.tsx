import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { ideas } from "../data/ideas";
import { Lightbulb, ArrowRight } from "lucide-react";

const gradientBorderMap: Record<string, string> = {
  blue: "hover:border-blue-400",
  orange: "hover:border-orange-400",
  violet: "hover:border-violet-400",
  green: "hover:border-green-400",
  amber: "hover:border-amber-400",
  rose: "hover:border-rose-400",
  cyan: "hover:border-cyan-400",
  teal: "hover:border-teal-400",
  yellow: "hover:border-yellow-400",
  fuchsia: "hover:border-fuchsia-400",
  indigo: "hover:border-indigo-400",
  emerald: "hover:border-emerald-400",
  sky: "hover:border-sky-400",
  slate: "hover:border-slate-400",
};

const iconBgMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  orange: "bg-orange-100 text-orange-600",
  violet: "bg-violet-100 text-violet-600",
  green: "bg-green-100 text-green-600",
  amber: "bg-amber-100 text-amber-600",
  rose: "bg-rose-100 text-rose-600",
  cyan: "bg-cyan-100 text-cyan-600",
  teal: "bg-teal-100 text-teal-600",
  yellow: "bg-yellow-100 text-yellow-600",
  fuchsia: "bg-fuchsia-100 text-fuchsia-600",
  indigo: "bg-indigo-100 text-indigo-600",
  emerald: "bg-emerald-100 text-emerald-600",
  sky: "bg-sky-100 text-sky-600",
  slate: "bg-slate-100 text-slate-600",
};

export default function Hub() {
  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500/20 p-4 rounded-2xl">
              <Lightbulb className="w-10 h-10 text-amber-400" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Subscription Business Ideas Lab
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            14 automated subscription businesses that solve real problems. Each one designed to run with minimal human intervention while delivering recurring value to subscribers.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (LucideIcons as any)[idea.iconName] || LucideIcons.Star;
            const borderColor = gradientBorderMap[idea.accentColor] || "hover:border-gray-400";
            const iconBg = iconBgMap[idea.accentColor] || "bg-gray-100 text-gray-600";

            return (
              <Link
                key={idea.id}
                to={`/${idea.id}`}
                className={`group block rounded-2xl border-2 border-gray-100 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${borderColor}`}
              >
                <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{idea.name}</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{idea.tagline}</p>
                <div className="flex items-center gap-1 text-sm font-medium text-gray-400 group-hover:text-gray-900 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
