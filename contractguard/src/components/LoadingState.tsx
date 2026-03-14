import { Shield } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="max-w-3xl mx-auto py-20 text-center">
      <div className="flex justify-center mb-6">
        <Shield className="w-16 h-16 text-amber-500 animate-pulse" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing your contract...</h2>
      <p className="text-sm text-gray-500 mb-10">This typically takes 10-20 seconds depending on document length.</p>
      <div className="space-y-3 max-w-lg mx-auto">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-20 h-5 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
            <div className="flex-1 h-5 bg-gray-100 rounded animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
