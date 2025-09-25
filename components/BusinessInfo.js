import { BUSINESS_INFO } from '@/lib/constants';

export default function BusinessInfo() {
  const formatHours = (hours) => {
    return Object.entries(hours).map(([day, time]) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      time
    }));
  };

  const formattedHours = formatHours(BUSINESS_INFO.hours);

  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Visit Our Location
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Professional car detailing services in the heart of Kuala Lumpur
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact Info
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Person in Charge</p>
                <p className="text-white font-medium">{BUSINESS_INFO.pic}</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Phone</p>
                <a 
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <a 
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-blue-400 hover:text-blue-300 font-medium break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white">{BUSINESS_INFO.location}</p>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Operating Hours
            </h3>
            
            <div className="space-y-3">
              {formattedHours.map(({ day, time }) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="text-gray-300">{day}</span>
                  <span className={`font-medium ${time === 'Closed' ? 'text-red-400' : 'text-white'}`}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-blue-900 bg-opacity-50 rounded-lg">
              <p className="text-blue-200 text-sm text-center">
                Closed on Sundays & Malaysian Public Holidays
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Why Choose Us
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-medium">Professional Service</p>
                  <p className="text-gray-400 text-sm">Experienced team with attention to detail</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-medium">Transparent Pricing</p>
                  <p className="text-gray-400 text-sm">No hidden fees, clear upfront costs</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-medium">Convenient Booking</p>
                  <p className="text-gray-400 text-sm">Easy online scheduling, no more WhatsApp hassle</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-medium">Quality Guarantee</p>
                  <p className="text-gray-400 text-sm">Satisfaction guaranteed or we&apos;ll make it right</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Book Your Car Wash?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Skip the phone calls and WhatsApp messages. Book online now and get your car looking pristine!
            </p>
            <a 
              href="/booking"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Booking Process
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
