import { Link } from "react-router-dom";
import { FileSearch } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <FileSearch className="w-16 h-16 opacity-90" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
          ContractGuard
        </h1>
        <p className="text-2xl sm:text-3xl font-light mb-6 opacity-90">
          Read the fine print. Automatically.
        </p>
        <p className="text-lg max-w-2xl mx-auto opacity-80 leading-relaxed">
          AI-powered contract and Terms of Service scanner that flags risky clauses, hidden fees, and unfavorable terms before you sign.
        </p>
        <div className="mt-10">
          <Link
            to="/scan"
            className="inline-block bg-white text-gray-900 font-semibold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Scan Your First Contract
          </Link>
        </div>
      </div>
    </section>
  );
}
