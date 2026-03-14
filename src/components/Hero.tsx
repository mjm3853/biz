interface HeroProps {
  name: string;
  tagline: string;
  description: string;
  gradient: string;
}

export default function Hero({ name, tagline, description, gradient }: HeroProps) {
  return (
    <section className={`bg-gradient-to-br ${gradient} text-white py-24 px-4`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
          {name}
        </h1>
        <p className="text-2xl sm:text-3xl font-light mb-6 opacity-90">
          {tagline}
        </p>
        <p className="text-lg max-w-2xl mx-auto opacity-80 leading-relaxed">
          {description}
        </p>
        <div className="mt-10">
          <a
            href="#pricing"
            className="inline-block bg-white text-gray-900 font-semibold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
