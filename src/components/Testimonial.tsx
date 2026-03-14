import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
}

export default function Testimonial({ quote, name, role }: TestimonialProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <Quote className="w-8 h-8 text-gray-300 mb-4" />
      <p className="text-gray-700 leading-relaxed mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}
