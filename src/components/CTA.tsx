interface CTAProps {
  gradient: string;
  name: string;
}

export default function CTA({ gradient, name }: CTAProps) {
  return (
    <section className={`bg-gradient-to-r ${gradient} py-16 px-4`}>
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to try {name}?
        </h2>
        <p className="text-lg opacity-80 mb-8">
          Start your free trial today. No credit card required.
        </p>
        <button className="bg-white text-gray-900 font-semibold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
          Get Started Free
        </button>
      </div>
    </section>
  );
}
