import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  // Debug: Log environment variables (remove in production)
  console.log('Email config:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER ? 'Set' : 'Missing',
    pass: process.env.EMAIL_PASS ? 'Set' : 'Missing',
    from: process.env.EMAIL_FROM ? 'Set' : 'Missing',
    to: process.env.EMAIL_TO ? 'Set' : 'Missing'
  });

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Generate booking confirmation email HTML
const generateBookingEmail = (bookingData) => {
  const {
    customerInfo,
    vehicleInfo,
    selectedPackage,
    selectedAddons,
    scheduledDate,
    scheduledTime,
    totalCost
  } = bookingData;

  const addonsHtml = selectedAddons.length > 0 
    ? selectedAddons.map(addon => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${addon.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">RM${addon.price}</td>
        </tr>
      `).join('')
    : '<tr><td colspan="2" style="padding: 8px; border-bottom: 1px solid #eee;">None</td></tr>';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; text-align: center;">New Booking Confirmation</h2>
      <p style="color: #666; text-align: center;">JagaWash Detailing - Kuala Lumpur</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
        <p><strong>Name:</strong> ${customerInfo.name}</p>
        <p><strong>Phone:</strong> ${customerInfo.phone}</p>
        <p><strong>Email:</strong> ${customerInfo.email}</p>
      </div>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Vehicle Information</h3>
        <p><strong>Type:</strong> ${vehicleInfo.type}</p>
        <p><strong>Plate Number:</strong> ${vehicleInfo.plateNumber}</p>
        <p><strong>Color:</strong> ${vehicleInfo.color}</p>
      </div>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Service Details</h3>
        <p><strong>Package:</strong> ${selectedPackage.name} - RM${selectedPackage.price}</p>
        <p><strong>Date:</strong> ${scheduledDate}</p>
        <p><strong>Time:</strong> ${scheduledTime}</p>
        
        <h4 style="color: #333;">Add-ons:</h4>
        <table style="width: 100%; border-collapse: collapse;">
          ${addonsHtml}
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 5px;">
          <p style="margin: 0; font-size: 18px;"><strong>Total Cost: RM${totalCost}</strong></p>
        </div>
      </div>

      <div style="background: #333; color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h3 style="margin-top: 0;">Contact Information</h3>
        <p>Person in Charge: <strong>Amirul Hakim</strong></p>
        <p>Phone: <strong>+601171117101</strong></p>
        <p>Email: <strong>amierulh0@gmail.com</strong></p>
      </div>

      <p style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
        This booking confirmation was sent automatically from JagaWash Detailing booking system.
      </p>
    </div>
  `;
};

// Send booking confirmation email
export const sendBookingEmail = async (bookingData) => {
  try {
    console.log('Starting email send process...');
    
    // Validate environment variables
    const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM', 'EMAIL_TO'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }

    const transporter = createTransporter();
    console.log('Transporter created successfully');
    
    const emailHtml = generateBookingEmail(bookingData);
    console.log('Email HTML generated');

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Booking - ${bookingData.customerInfo.name} - ${bookingData.scheduledDate}`,
      html: emailHtml,
    };

    console.log('Attempting to send email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};
