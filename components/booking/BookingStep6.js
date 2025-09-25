'use client';

import { useState } from 'react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function BookingStep6({ bookingData, onBack }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const calculateTotalCost = () => {
    const packageCost = bookingData.selectedPackage?.price || 0;
    const addonsCost = bookingData.selectedAddons.reduce((total, addon) => total + addon.price, 0);
    return packageCost + addonsCost;
  };

  const calculateTotalDuration = () => {
    const packageDuration = bookingData.selectedPackage?.duration || 0;
    const addonsDuration = bookingData.selectedAddons.reduce((total, addon) => total + addon.duration, 0);
    return packageDuration + addonsDuration;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-MY', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate we have all required data
      if (!bookingData.vehicleType) {
        throw new Error('Vehicle type not selected');
      }
      if (!bookingData.selectedPackage) {
        throw new Error('Service package not selected');
      }
      if (!bookingData.scheduledDate || !bookingData.scheduledTime) {
        throw new Error('Date and time not selected');
      }
      if (!bookingData.customerInfo.name || !bookingData.customerInfo.phone || !bookingData.customerInfo.email) {
        throw new Error('Customer information incomplete');
      }

      // Transform data to match API expectations
      const bookingPayload = {
        customerInfo: bookingData.customerInfo,
        vehicleInfo: {
          type: bookingData.vehicleType.name,
          plateNumber: bookingData.customerInfo.plateNumber,
          color: bookingData.customerInfo.vehicleColor
        },
        selectedPackage: bookingData.selectedPackage,
        selectedAddons: bookingData.selectedAddons || [],
        scheduledDate: bookingData.scheduledDate,
        scheduledTime: bookingData.scheduledTime,
        totalCost: calculateTotalCost(),
        totalDuration: calculateTotalDuration(),
        submittedAt: new Date().toISOString()
      };

      // Debug: Log the payload being sent (remove in production)
      console.log('Booking payload being sent:', bookingPayload);

      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        console.error('Booking submission failed:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Thank you for choosing JagaWash Detailing</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-green-800 mb-4">What happens next?</h3>
          <div className="space-y-2 text-sm text-green-700">
            <p>✓ We&apos;ve received your booking and sent the details to our team</p>
            <p>✓ {BUSINESS_INFO.pic} will contact you to confirm the appointment</p>
            <p>✓ Please arrive on time for your scheduled slot</p>
            <p>✓ Payment will be collected after the service is completed</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Person in Charge:</strong> {BUSINESS_INFO.pic}</p>
            <p><strong>Phone:</strong> {BUSINESS_INFO.phone}</p>
            <p><strong>Email:</strong> {BUSINESS_INFO.email}</p>
            <p><strong>Location:</strong> {BUSINESS_INFO.location}</p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Booking</h2>
        <p className="text-gray-600">Please review all details before confirming your appointment</p>
      </div>

      <div className="space-y-6">
        {/* Vehicle & Package Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Service Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Vehicle Type</p>
              <p className="font-medium">{bookingData.vehicleType?.name}</p>
              <p className="text-sm text-gray-500">{bookingData.vehicleType?.description}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Service Package</p>
              <p className="font-medium">{bookingData.selectedPackage?.name}</p>
              <p className="text-sm text-gray-500">RM{bookingData.selectedPackage?.price} • ~{bookingData.selectedPackage?.duration} min</p>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        {bookingData.selectedAddons.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Add-on Services</h3>
            <div className="space-y-2">
              {bookingData.selectedAddons.map((addon) => (
                <div key={addon.id} className="flex justify-between items-center">
                  <span className="text-gray-700">{addon.name}</span>
                  <span className="text-gray-900">RM{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointment Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium">{formatDate(bookingData.scheduledDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-medium">{bookingData.scheduledTime}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">Estimated Duration</p>
            <p className="font-medium">~{calculateTotalDuration()} minutes</p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{bookingData.customerInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{bookingData.customerInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{bookingData.customerInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Vehicle</p>
              <p className="font-medium">{bookingData.customerInfo.plateNumber} • {bookingData.customerInfo.vehicleColor}</p>
            </div>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Total Cost</h3>
              <p className="text-sm text-gray-600">Payment due after service completion</p>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              RM{calculateTotalCost()}
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700">
              Sorry, there was an error submitting your booking. Please try again or contact us directly.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
        >
          Back to Edit Details
        </button>
        
        <button
          onClick={handleSubmitBooking}
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
          } text-white`}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </div>

      {/* Terms */}
      <p className="text-center text-xs text-gray-500 mt-4">
        By confirming this booking, you agree to our service terms and payment is due after service completion.
      </p>
    </div>
  );
}
