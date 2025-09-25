import { VEHICLE_TYPES } from '@/lib/constants';

import { useState } from 'react';

export default function BookingStep1({ selectedVehicle, onVehicleSelect, onNext }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVehicleSelect = (vehicle) => {
    onVehicleSelect(vehicle);
  };

  const handleNext = async () => {
    if (selectedVehicle && !isLoading) {
      setIsLoading(true);
      // Small delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 300));
      onNext();
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Vehicle Type</h2>
        <p className="text-gray-600">Select the type of vehicle you'd like to have washed</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {VEHICLE_TYPES.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => handleVehicleSelect(vehicle)}
            className={`p-6 rounded-lg border-2 transition-all duration-300 text-left hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] ${
              selectedVehicle?.id === vehicle.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <div className="text-3xl mr-4">{vehicle.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                <p className="text-sm text-gray-600">{vehicle.description}</p>
              </div>
              {selectedVehicle?.id === vehicle.id && (
                <div className="ml-2">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!selectedVehicle || isLoading}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 min-w-[200px] ${
            selectedVehicle && !isLoading
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </div>
          ) : (
            'Continue to Package Selection'
          )}
        </button>
      </div>

      {/* Helper Text */}
      {!selectedVehicle && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Please select your vehicle type to continue
        </p>
      )}
    </div>
  );
}
