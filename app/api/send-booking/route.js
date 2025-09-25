import { NextResponse } from 'next/server';
import { sendBookingEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const bookingData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'customerInfo',
      'vehicleInfo', 
      'selectedPackage',
      'scheduledDate',
      'scheduledTime',
      'totalCost'
    ];

    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Send email
    const emailResult = await sendBookingEmail(bookingData);
    
    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Booking confirmation sent successfully',
        messageId: emailResult.messageId
      });
    } else {
      return NextResponse.json(
        { success: false, error: emailResult.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
