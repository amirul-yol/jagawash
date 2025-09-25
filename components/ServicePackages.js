import { SERVICE_PACKAGES } from '@/lib/constants';

export default function ServicePackages() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Service Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive car detailing packages. All prices are transparent - no hidden fees!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICE_PACKAGES.map((pkg, index) => (
            <div 
              key={pkg.id} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                index === 1 ? 'ring-2 ring-blue-500 relative' : ''
              }`}
            >
              {index === 1 && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {pkg.currency}{pkg.price}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    ~{pkg.duration} minutes • {pkg.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                  index === 1 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}>
                  Select {pkg.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            All packages include professional service and quality guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
