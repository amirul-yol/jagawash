import { NextResponse } from 'next/server';
import { sendBookingEmail } from '@/lib/email';

// Test endpoint to verify email functionality
export async function GET() {
  try {
    // Mock booking data for testing
    const testBookingData = {
      customerInfo: {
        name: 'Test Customer',
        phone: '+60 12-3456789',
        email: 'test@example.com',
        plateNumber: 'TEST123',
        vehicleColor: 'White'
      },
      vehicleInfo: {
        type: 'Sedan',
        plateNumber: 'TEST123',
        color: 'White'
      },
      selectedPackage: {
        id: 'basic',
        name: 'Basic Package',
        price: 20,
        currency: 'RM'
      },
      selectedAddons: [
        {
          id: 'pet-hair',
          name: 'Pet Hair Removal',
          price: 40,
          currency: 'RM'
        }
      ],
      scheduledDate: '2025-09-25',
      scheduledTime: '10:00 AM',
      totalCost: 60,
      submittedAt: new Date().toISOString()
    };

    console.log('Testing email with mock data...');
    const result = await sendBookingEmail(testBookingData);
    
    return NextResponse.json({
      success: result.success,
      message: result.success ? 'Test email sent successfully!' : 'Test email failed',
      error: result.error || null,
      messageId: result.messageId || null
    });
    
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
