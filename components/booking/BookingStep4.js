import { useState } from 'react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function BookingStep4({ selectedDate, selectedTime, onDateTimeSelect, onNext, onBack }) {
  const [tempDate, setTempDate] = useState(selectedDate);
  const [tempTime, setTempTime] = useState(selectedTime);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Get date 30 days from now for max date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];

  // Check if a date is a Sunday (day 0) or if it's a Malaysian public holiday
  const isDateUnavailable = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    
    // Sunday is day 0
    if (dayOfWeek === 0) {
      return true;
    }
    
    // You can add Malaysian public holidays here
    // For now, just checking Sundays
    return false;
  };

  const handleDateChange = (date) => {
    setTempDate(date);
    // Reset time when date changes
    setTempTime('');
    onDateTimeSelect(date, '');
  };

  const handleTimeChange = (time) => {
    setTempTime(time);
    onDateTimeSelect(tempDate, time);
  };

  const handleNext = () => {
    if (tempDate && tempTime) {
      onNext();
    }
  };

  const getDateDisplayName = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-MY', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Appointment</h2>
        <p className="text-gray-600">Choose your preferred date and time</p>
      </div>

      {/* Operating Hours Info */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Operating Hours</h3>
        <div className="text-sm text-gray-700">
          <p>Monday - Saturday: 9:00 AM - 9:00 PM</p>
          <p className="text-red-600">Closed on Sundays & Malaysian Public Holidays</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Date
          </label>
          <input
            type="date"
            value={tempDate}
            onChange={(e) => handleDateChange(e.target.value)}
            min={today}
            max={maxDateString}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          {tempDate && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
              <span className="font-medium">Selected: </span>
              <span className={isDateUnavailable(tempDate) ? 'text-red-600' : 'text-green-600'}>
                {getDateDisplayName(tempDate)}
              </span>
            </div>
          )}

          {tempDate && isDateUnavailable(tempDate) && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              Sorry, we're closed on this date. Please select another day.
            </div>
          )}
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Time
          </label>
          {tempDate && !isDateUnavailable(tempDate) ? (
            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {BUSINESS_INFO.timeSlots.map((timeSlot) => (
                <button
                  key={timeSlot}
                  onClick={() => handleTimeChange(timeSlot)}
                  className={`p-2 text-sm rounded-lg border transition-colors duration-200 ${
                    tempTime === timeSlot
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {timeSlot}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
              Please select a valid date first
            </div>
          )}
        </div>
      </div>

      {/* Selected Summary */}
      {tempDate && tempTime && !isDateUnavailable(tempDate) && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-1">Appointment Scheduled</h3>
          <p className="text-green-700">
            <span className="font-medium">{getDateDisplayName(tempDate)}</span> at <span className="font-medium">{tempTime}</span>
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Add-ons
        </button>
        
        <button
          onClick={handleNext}
          disabled={!tempDate || !tempTime || isDateUnavailable(tempDate)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            tempDate && tempTime && !isDateUnavailable(tempDate)
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Your Details
        </button>
      </div>

      {/* Helper Text */}
      {(!tempDate || !tempTime) && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Please select both date and time to continue
        </p>
      )}
    </div>
  );
}
