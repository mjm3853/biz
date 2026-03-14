import { useState } from "react";
import { FileSearch } from "lucide-react";
import { sampleContract } from "../data/sampleContract";

interface ContractInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export default function ContractInput({ onSubmit, isLoading }: ContractInputProps) {
  const [text, setText] = useState("");
  const minLength = 100;
  const maxLength = 100_000;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.length >= minLength && text.length <= maxLength) {
      onSubmit(text);
    }
  }

  function loadSample() {
    setText(sampleContract);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <FileSearch className="w-8 h-8 text-amber-500" />
        <h1 className="text-2xl font-bold text-gray-900">Scan a Contract</h1>
      </div>

      <p className="text-gray-500 mb-4">
        Paste any contract, Terms of Service, or legal agreement below. Our AI will flag risky clauses with plain-English explanations and suggested counter-language.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your contract or Terms of Service here..."
        className="w-full h-64 rounded-xl border border-gray-300 p-4 text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder:text-gray-400"
        disabled={isLoading}
      />

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-4">
          <span className={`text-xs ${text.length < minLength ? "text-gray-400" : "text-green-600"}`}>
            {text.length.toLocaleString()} characters {text.length < minLength && `(min ${minLength})`}
          </span>
          <button
            type="button"
            onClick={loadSample}
            className="text-xs text-amber-600 hover:text-amber-700 font-medium"
            disabled={isLoading}
          >
            Try a sample contract
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || text.length < minLength || text.length > maxLength}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Analyze Contract
        </button>
      </div>
    </form>
  );
}
