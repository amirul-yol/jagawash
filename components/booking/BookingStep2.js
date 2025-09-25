import { SERVICE_PACKAGES } from '@/lib/constants';

export default function BookingStep2({ selectedPackage, onPackageSelect, onNext, onBack }) {
  const handlePackageSelect = (pkg) => {
    onPackageSelect(pkg);
  };

  const handleNext = () => {
    if (selectedPackage) {
      onNext();
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Service Package</h2>
        <p className="text-gray-600">Select the wash package that best suits your needs</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {SERVICE_PACKAGES.map((pkg, index) => (
          <button
            key={pkg.id}
            onClick={() => handlePackageSelect(pkg)}
            className={`p-6 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
              selectedPackage?.id === pkg.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            } ${index === 1 ? 'relative' : ''}`}
          >
            {index === 1 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {pkg.currency}{pkg.price}
                    </div>
                    <div className="text-sm text-gray-500">~{pkg.duration} mins</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedPackage?.id === pkg.id && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Vehicle Selection
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedPackage}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            selectedPackage
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Add-ons
        </button>
      </div>

      {/* Helper Text */}
      {!selectedPackage && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Please select a service package to continue
        </p>
      )}
    </div>
  );
}
