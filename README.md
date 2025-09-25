# JagaWash - Car Detailing Booking System

A modern, mobile-first web application for car detailing businesses to streamline their booking process and replace WhatsApp-based reservations with a professional online system.

## 🚗 Overview

JagaWash is a complete booking solution designed specifically for car wash and detailing businesses. It provides customers with a seamless 6-step booking experience while automatically notifying business owners via email.

### ✨ Key Features

- **📱 Mobile-First Design** - Optimized for smartphone users transitioning from WhatsApp
- **💰 Transparent Pricing** - Clear upfront costs for all services and add-ons
- **📅 Smart Scheduling** - Date/time picker with business hours validation
- **📧 Email Notifications** - Automated booking confirmations sent to business owner
- **🎨 Professional UI** - Clean, modern interface with smooth animations
- **✅ Form Validation** - Comprehensive validation with Malaysian phone/plate number patterns

### 🛠️ Service Options

**Main Packages:**
- Basic Package (RM20) - ~30 minutes
- Plus Package (RM50) - ~45 minutes  
- Premium Package (RM70) - ~60 minutes

**Add-On Services:**
- Pet Hair Removal, Headlight Restoration, Ceramic Coating, Odor Removal, Water Spot Removal

**Vehicle Types Supported:**
- Small Cars, Sedan, SUV/Crossover, MPV/7-Seater, Pickup/4x4, Luxury/Sports Car

## 🚀 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Email Service:** Nodemailer with Gmail SMTP
- **Deployment:** Vercel
- **Language:** JavaScript/JSX

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jagawash
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your email configuration in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Environment Configuration

Create a `.env.local` file in the `client` directory with the following variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=business-owner@gmail.com

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password (not your regular Gmail password)
3. Use the 16-character App Password in `EMAIL_PASS`

## 🏗️ Project Structure

```
client/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── booking/           # Booking page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── booking/          # Booking form components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and configurations
│   ├── constants.js      # Business data and validation
│   └── email.js          # Email service
└── public/               # Static assets
```

## 📱 User Journey

1. **Landing Page** - View services, pricing, and business information
2. **Vehicle Selection** - Choose vehicle type
3. **Package Selection** - Select service package with detailed features
4. **Add-ons** - Optional additional services
5. **Scheduling** - Pick date and time (business hours validation)
6. **Customer Info** - Enter contact and vehicle details
7. **Confirmation** - Review booking and submit


## 🎯 Business Impact

- **Reduces WhatsApp inquiries** with transparent pricing
- **Prevents scheduling conflicts** through smart booking system
- **Improves customer experience** with professional interface
- **Streamlines operations** with automated email notifications
- **Mobile-optimized** for existing WhatsApp user base

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a personal portfolio project and is not currently accepting contributions.

---

**Note:** This project was developed as a portfolio piece demonstrating modern web development practices for service-based businesses.
