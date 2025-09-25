export default function ProgressIndicator({ currentStep, totalSteps }) {
  const steps = [
    { number: 1, title: 'Vehicle Type', description: 'Choose your vehicle' },
    { number: 2, title: 'Service Package', description: 'Select wash package' },
    { number: 3, title: 'Add-ons', description: 'Extra services' },
    { number: 4, title: 'Date & Time', description: 'Schedule appointment' },
    { number: 5, title: 'Your Details', description: 'Contact information' },
    { number: 6, title: 'Confirmation', description: 'Review & confirm' }
  ];

  return (
    <div className="mb-8">
      {/* Mobile Progress Bar */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg font-semibold text-gray-900">{steps[currentStep - 1].title}</h3>
          <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden sm:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, stepIdx) => (
              <li key={step.number} className="flex-1">
                <div className="flex items-center">
                  {/* Step Circle */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step.number < currentStep
                          ? 'bg-blue-600 text-white'
                          : step.number === currentStep
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.number < currentStep ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="ml-4 flex-1">
                    <div className={`text-sm font-medium ${
                      step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className={`text-xs ${
                      step.number <= currentStep ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </div>
                  </div>

                  {/* Connector Line */}
                  {stepIdx < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className={`h-0.5 ${
                        step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}></div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
