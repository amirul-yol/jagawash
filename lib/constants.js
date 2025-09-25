// Business Information
export const BUSINESS_INFO = {
  name: "JagaWash Detailing",
  location: "Kuala Lumpur, Malaysia",
  phone: "+601171117101",
  email: "amierulh0@gmail.com",
  pic: "Amirul Hakim",
  hours: {
    monday: "9:00 AM - 9:00 PM",
    tuesday: "9:00 AM - 9:00 PM", 
    wednesday: "9:00 AM - 9:00 PM",
    thursday: "9:00 AM - 9:00 PM",
    friday: "9:00 AM - 9:00 PM",
    saturday: "9:00 AM - 9:00 PM",
    sunday: "Closed"
  },
  operatingDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday (0 = Sunday)
  timeSlots: [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"
  ]
};

// Vehicle Types
export const VEHICLE_TYPES = [
  {
    id: "small-cars",
    name: "Small Cars",
    description: "Compact / Hatchback",
    icon: "🚗"
  },
  {
    id: "sedan",
    name: "Sedan", 
    description: "Standard Cars",
    icon: "🚙"
  },
  {
    id: "suv-crossover",
    name: "SUV / Crossover",
    description: "Sport Utility Vehicle",
    icon: "🚐"
  },
  {
    id: "mpv-7seater",
    name: "MPV / 7-Seater",
    description: "Multi-Purpose Vehicle",
    icon: "🚌"
  },
  {
    id: "pickup-4x4",
    name: "Pickup / 4x4",
    description: "Pickup Truck",
    icon: "🛻"
  },
  {
    id: "luxury-sports",
    name: "Luxury / Sports Car",
    description: "Premium Vehicles",
    icon: "🏎️"
  }
];

// Service Packages
export const SERVICE_PACKAGES = [
  {
    id: "basic",
    name: "Basic Package",
    price: 20,
    currency: "RM",
    duration: 30,
    description: "Essential car wash service",
    features: [
      "Exterior hand wash & dry",
      "Interior vacuum (seats & carpets)", 
      "Window cleaning (inside & outside)",
      "Tire shine"
    ]
  },
  {
    id: "plus",
    name: "Plus Package", 
    price: 50,
    currency: "RM",
    duration: 45,
    description: "Complete wash with protection",
    features: [
      "Everything in Basic",
      "Interior wipe & dusting (dashboard, panels, vents)",
      "Upholstery shampoo (light cleaning)",
      "Wax protection (1 month)",
      "Rim & wheel well deep clean"
    ]
  },
  {
    id: "premium",
    name: "Premium Package",
    price: 70, 
    currency: "RM",
    duration: 60,
    description: "Full detailing service",
    features: [
      "Everything in Plus",
      "Full interior deep clean (leather treatment/fabric shampoo)",
      "Clay bar treatment (paint decontamination)", 
      "Premium wax/sealant (3 months protection)",
      "Engine bay cleaning"
    ]
  }
];

// Add-On Services
export const ADDON_SERVICES = [
  {
    id: "pet-hair-removal",
    name: "Pet Hair Removal",
    price: 40,
    currency: "RM", 
    duration: 30,
    description: "Specialized pet hair removal from seats and carpets"
  },
  {
    id: "headlight-restoration", 
    name: "Headlight Restoration",
    price: 80,
    currency: "RM",
    duration: 45,
    description: "Restore clarity to foggy or yellowed headlights"
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating (6 months)",
    price: 800,
    currency: "RM",
    duration: 180,
    description: "Premium ceramic coating for long-lasting protection"
  },
  {
    id: "odor-removal",
    name: "Odor Removal (Ozone)",
    price: 100, 
    currency: "RM",
    duration: 60,
    description: "Professional ozone treatment to eliminate odors"
  },
  {
    id: "water-spot-removal",
    name: "Water Spot Removal",
    price: 60,
    currency: "RM", 
    duration: 45,
    description: "Remove water spots and mineral deposits"
  }
];

// Form validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/, // Malaysian phone format
  plateNumber: /^[A-Z]{1,3}\s?[0-9]{1,4}\s?[A-Z]?$/ // Basic Malaysian plate format
};
