import { BUSINESS_INFO } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4 sm:py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo Placeholder */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4">
            <span className="text-3xl font-bold">JW</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-2">
            Professional Car Detailing Services
          </p>
          <p className="text-lg text-blue-200">
            {BUSINESS_INFO.location}
          </p>
        </div>

        {/* Value Proposition */}
        <div className="mb-8">
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Skip the WhatsApp back-and-forth. Book your car wash online with transparent pricing, 
            convenient scheduling, and professional service guaranteed.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <a 
            href="/booking"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Book Your Wash Now
          </a>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">3</div>
            <div className="text-sm text-blue-200">Service Packages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">RM20+</div>
            <div className="text-sm text-blue-200">Starting Price</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">Mon-Sat</div>
            <div className="text-sm text-blue-200">9AM - 9PM</div>
          </div>
        </div>
      </div>
    </section>
  );
}
