'use client';

import { useState } from 'react';
import BookingStep1 from '@/components/booking/BookingStep1';
import BookingStep2 from '@/components/booking/BookingStep2';
import BookingStep3 from '@/components/booking/BookingStep3';
import BookingStep4 from '@/components/booking/BookingStep4';
import BookingStep5 from '@/components/booking/BookingStep5';
import BookingStep6 from '@/components/booking/BookingStep6';
import ProgressIndicator from '@/components/booking/ProgressIndicator';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    vehicleType: null,
    selectedPackage: null,
    selectedAddons: [],
    scheduledDate: '',
    scheduledTime: '',
    customerInfo: {
      name: '',
      phone: '',
      email: '',
      plateNumber: '',
      vehicleColor: ''
    }
  });

  const totalSteps = 6;

  const updateBookingData = (stepData) => {
    setBookingData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingStep1
            selectedVehicle={bookingData.vehicleType}
            onVehicleSelect={(vehicle) => updateBookingData({ vehicleType: vehicle })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <BookingStep2
            selectedPackage={bookingData.selectedPackage}
            onPackageSelect={(pkg) => updateBookingData({ selectedPackage: pkg })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <BookingStep3
            selectedAddons={bookingData.selectedAddons}
            onAddonsChange={(addons) => updateBookingData({ selectedAddons: addons })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <BookingStep4
            selectedDate={bookingData.scheduledDate}
            selectedTime={bookingData.scheduledTime}
            onDateTimeSelect={(date, time) => updateBookingData({ scheduledDate: date, scheduledTime: time })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <BookingStep5
            customerInfo={bookingData.customerInfo}
            onCustomerInfoChange={(info) => updateBookingData({ customerInfo: info })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <BookingStep6
            bookingData={bookingData}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Car Wash</h1>
            <p className="text-gray-600">Complete the booking process in {totalSteps} easy steps</p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Step Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-fadeIn">
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
