import { useState } from 'react';
import { VALIDATION_PATTERNS } from '@/lib/constants';
import FormInput from '@/components/ui/FormInput';

export default function BookingStep5({ customerInfo, onCustomerInfoChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleInputChange = (field, value) => {
    const updatedInfo = { ...customerInfo, [field]: value };
    onCustomerInfoChange(updatedInfo);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, customerInfo[field]);
  };

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!VALIDATION_PATTERNS.phone.test(value)) {
          error = 'Please enter a valid Malaysian phone number';
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!VALIDATION_PATTERNS.email.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      
      case 'plateNumber':
        if (!value.trim()) {
          error = 'Plate number is required';
        } else if (!VALIDATION_PATTERNS.plateNumber.test(value.toUpperCase())) {
          error = 'Please enter a valid Malaysian plate number';
        }
        break;
      
      case 'vehicleColor':
        if (!value.trim()) {
          error = 'Vehicle color is required';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateAll = () => {
    const fields = ['name', 'phone', 'email', 'plateNumber', 'vehicleColor'];
    let isValid = true;

    fields.forEach(field => {
      const fieldValid = validateField(field, customerInfo[field]);
      if (!fieldValid) {
        isValid = false;
      }
      setTouched(prev => ({ ...prev, [field]: true }));
    });

    return isValid;
  };

  const handleNext = () => {
    if (validateAll()) {
      onNext();
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');
    
    // Format Malaysian phone number
    if (numbers.startsWith('601')) {
      // +60 format
      return numbers.replace(/(\d{2})(\d{1,2})(\d{0,8})/, '+$1 $2-$3').trim();
    } else if (numbers.startsWith('01')) {
      // Local format
      return numbers.replace(/(\d{2,3})(\d{0,8})/, '$1-$2').trim();
    }
    
    return value;
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
        <p className="text-gray-600">Please provide your contact and vehicle details</p>
      </div>

      <div className="space-y-6 animate-slideIn">
        {/* Name */}
        <FormInput
          label="Full Name"
          type="text"
          value={customerInfo.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="Enter your full name"
          error={errors.name}
          touched={touched.name}
          required={true}
        />

        {/* Phone */}
        <FormInput
          label="Phone Number"
          type="tel"
          value={customerInfo.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          onBlur={() => handleBlur('phone')}
          placeholder="e.g., 012-3456789 or +60 12-3456789"
          error={errors.phone}
          touched={touched.phone}
          required={true}
          helpText="We'll use this to contact you about your appointment"
        />

        {/* Email */}
        <FormInput
          label="Email Address"
          type="email"
          value={customerInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="your.email@example.com"
          error={errors.email}
          touched={touched.email}
          required={true}
        />

        {/* Vehicle Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Plate Number */}
          <FormInput
            label="Vehicle Plate Number"
            type="text"
            value={customerInfo.plateNumber}
            onChange={(e) => handleInputChange('plateNumber', e.target.value.toUpperCase())}
            onBlur={() => handleBlur('plateNumber')}
            placeholder="e.g., ABC 1234"
            error={errors.plateNumber}
            touched={touched.plateNumber}
            required={true}
            style={{ textTransform: 'uppercase' }}
          />

          {/* Vehicle Color */}
          <FormInput
            label="Vehicle Color"
            type="text"
            value={customerInfo.vehicleColor}
            onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
            onBlur={() => handleBlur('vehicleColor')}
            placeholder="e.g., White, Black, Silver"
            error={errors.vehicleColor}
            touched={touched.vehicleColor}
            required={true}
          />
        </div>

        {/* Privacy Note */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Privacy & Security</h3>
              <p className="text-xs text-gray-600 mt-1">
                Your information is kept confidential and used only for this booking. 
                We&apos;ll contact you via phone or email about your appointment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Date & Time
        </button>
        
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 min-w-[160px]"
        >
          Review Booking
        </button>
      </div>

      {/* Helper Text */}
      <p className="text-center text-sm text-gray-500 mt-4">
        * Required fields
      </p>
    </div>
  );
}
