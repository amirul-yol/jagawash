import { ADDON_SERVICES } from '@/lib/constants';

export default function AddOnServices() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Add-On Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your car detailing experience with our specialized add-on services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADDON_SERVICES.map((addon) => (
            <div 
              key={addon.id}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  {addon.name}
                </h3>
                <div className="text-right ml-4">
                  <div className="text-xl font-bold text-blue-600">
                    {addon.currency}{addon.price}
                  </div>
                  <div className="text-xs text-gray-500">
                    +{addon.duration} min
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {addon.description}
              </p>
              
              <div className="mt-4">
                <button className="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm font-medium transition-colors duration-200">
                  Add to Package
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Custom Service Needed?
            </h3>
            <p className="text-gray-600 mb-4">
              Don't see what you're looking for? Contact us for custom detailing solutions.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
