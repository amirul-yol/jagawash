import { ADDON_SERVICES } from '@/lib/constants';

export default function BookingStep3({ selectedAddons, onAddonsChange, onNext, onBack }) {
  const handleAddonToggle = (addon) => {
    const isSelected = selectedAddons.some(selected => selected.id === addon.id);
    
    if (isSelected) {
      // Remove addon
      const updatedAddons = selectedAddons.filter(selected => selected.id !== addon.id);
      onAddonsChange(updatedAddons);
    } else {
      // Add addon
      const updatedAddons = [...selectedAddons, addon];
      onAddonsChange(updatedAddons);
    }
  };

  const getTotalAddonCost = () => {
    return selectedAddons.reduce((total, addon) => total + addon.price, 0);
  };

  const getTotalAddonTime = () => {
    return selectedAddons.reduce((total, addon) => total + addon.duration, 0);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add-On Services</h2>
        <p className="text-gray-600">Enhance your car wash with optional services (you can skip this step)</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {ADDON_SERVICES.map((addon) => {
          const isSelected = selectedAddons.some(selected => selected.id === addon.id);
          
          return (
            <button
              key={addon.id}
              onClick={() => handleAddonToggle(addon)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-blue-600">
                        +{addon.currency}{addon.price}
                      </div>
                      <div className="text-xs text-gray-500">
                        +{addon.duration} min
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{addon.description}</p>
                </div>
                
                <div className="ml-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary */}
      {selectedAddons.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Selected Add-ons Summary</h3>
          <div className="space-y-1 mb-3">
            {selectedAddons.map((addon) => (
              <div key={addon.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{addon.name}</span>
                <span className="text-gray-900">RM{addon.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-200 pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total Add-ons:</span>
              <span>RM{getTotalAddonCost()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Additional Time:</span>
              <span>+{getTotalAddonTime()} minutes</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Packages
        </button>
        
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          {selectedAddons.length > 0 ? 'Continue with Add-ons' : 'Skip Add-ons'}
        </button>
      </div>

      {/* Helper Text */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Add-ons are optional. You can skip this step if you only want the basic package.
      </p>
    </div>
  );
}
