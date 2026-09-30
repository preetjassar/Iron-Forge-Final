export const PRICING_PLANS = [
  {
    id: "basic",
    name: "Basic",
    subtitle: "Ideal for self-guided gym goers",
    priceMonthly: 999,
    popular: false,
    features: [
      "Full Gym Floor Access",
      "Cardio Area Access",
      "Standard Locker Access",
      "Complimentary Fitness Assessment",
      "Water & Towel Station Access",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "Most popular for consistent results",
    priceMonthly: 1999,
    popular: true,
    features: [
      "Full Gym Access (All Zones)",
      "2 Personal Training Sessions / Month",
      "Personalized Diet & Nutrition Guidance",
      "Digital Progress Tracking",
      "All Group Fitness Classes Included",
      "Priority Locker & Recovery Area",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    subtitle: "The ultimate transformation experience",
    priceMonthly: 2999,
    popular: false,
    features: [
      "All-Access 24/7 VIP Gym Floor",
      "Dedicated Personal Trainer",
      "Fully Custom Weekly Workout Plan",
      "1-on-1 Nutrition Guidance & Macros",
      "Priority Class & Slot Booking",
      "Sauna, Steam & Recovery Zone",
      "Free Iron Forge Apparel Kit",
    ],
  },
];

export const DURATION_OPTIONS = [
  { months: 1, label: "1 Month", discountPercent: 0, tag: "Standard" },
  { months: 3, label: "3 Months", discountPercent: 10, tag: "Save 10%" },
  { months: 6, label: "6 Months", discountPercent: 15, tag: "Save 15%" },
  { months: 12, label: "12 Months", discountPercent: 25, tag: "Best Value (Save 25%)" },
];

export const ADDONS_LIST = [
  { id: "personal_training", name: "1-on-1 Personal Training", pricePerMonth: 1500, desc: "Weekly dedicated coaching sessions" },
  { id: "diet_guidance", name: "Custom Nutrition & Diet Plan", pricePerMonth: 750, desc: "Personalized macros & weekly adjustment" },
  { id: "recovery_zone", name: "Spa & Recovery Zone Access", pricePerMonth: 500, desc: "Unlimited sauna, cold plunge & massage gun" },
  { id: "dedicated_locker", name: "Dedicated Private Locker", pricePerMonth: 350, desc: "Permanent locker with laundry service" },
];

export default PRICING_PLANS;