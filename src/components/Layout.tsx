import { Link, useLocation } from "react-router-dom";
import { Lightbulb } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHub = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-900 font-bold text-lg hover:text-gray-700 transition-colors">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            <span>SubStack Ideas</span>
          </Link>
          {!isHub && (
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              &larr; All Ideas
            </Link>
          )}
        </div>
      </nav>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p>Subscription Business Ideas Lab &mdash; Concept Exploration</p>
      </footer>
    </div>
  );
}
