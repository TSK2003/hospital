export const branchesData = {
  srinivasanagar: {
    id: "srinivasanagar",
    name: "Lifecare Health Center - Srinivasanagar",
    tagline: "Premier Neighborhood Outpatient Clinic & Diagnostic Center",
    address: "Plot No. 42, Main Road, Near Bus Terminus, Srinivasanagar",
    phone: "+91 98765 43211",
    emergency: "1066",
    email: "srinivasanagar@lifecarehospital.com",
    hours: "Mon - Sat: 07:30 AM - 09:00 PM | Sun: 08:00 AM - 01:00 PM",
    heroImg: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    description: "Serving the Srinivasanagar community, our satellite health center brings world-class medical consultation, digital diagnostics, 24/7 pharmacy, and day-care procedures closer to your doorstep.",
    specialtiesAvailable: [
      "General Medicine & Diabetes OPD",
      "Pediatrics & Childhood Vaccination",
      "Obstetrics & Gynecological Consultations",
      "Digital X-Ray & 4D Ultrasound",
      "Full Automated Blood & Urine Diagnostic Lab",
      "24/7 Pharmacy & Home Sample Collection"
    ],
    doctorsCount: 14,
    dailyPatients: "250+ Daily OPD consultations"
  },
  melapalayam: {
    id: "melapalayam",
    name: "Lifecare Health Center - Melapalayam",
    tagline: "Integrated Primary Care & Emergency Response Hub",
    address: "78 High Level Road, Opp. Municipal Complex, Melapalayam",
    phone: "+91 98765 43212",
    emergency: "1066",
    email: "melapalayam@lifecarehospital.com",
    hours: "Mon - Sat: 07:00 AM - 09:30 PM | 24/7 Emergency Room",
    heroImg: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    description: "The Melapalayam center is equipped with a 24/7 emergency stabilization bay, cardiac consultation suites, minor surgical OT, and full dialysis support facilities.",
    specialtiesAvailable: [
      "24/7 Emergency Triage & Ambulance Station",
      "Cardiology & Echo Diagnostic Lab",
      "Orthopedic & Physiotherapy Center",
      "Nephrology & 10-Bed Hemodialysis Unit",
      "Pediatric & Neonatal Consultation",
      "NABL Accredited Diagnostic Pathology"
    ],
    doctorsCount: 18,
    dailyPatients: "350+ OPD & Emergency consultations"
  }
};

export const masterHealthPackages = [
  {
    id: "basic-wellness",
    title: "Basic Health Checkup",
    price: "₹1,499",
    originalPrice: "₹2,999",
    testCount: "42 Tests Included",
    category: "Preventive Primary Care",
    badge: "Popular",
    tests: [
      "Complete Blood Count (CBC) with ESR",
      "Fasting & Post-Prandial Blood Sugar",
      "Lipid Profile (Cholesterol, Triglycerides, HDL, LDL)",
      "Kidney Function Test (Urea, Creatinine, Uric Acid)",
      "Liver Function Test (SGOT, SGPT, Bilirubin)",
      "Complete Urine Routine Examination",
      "ECG (Resting 12-Lead)",
      "Physician Consultation & Lifestyle Advice"
    ]
  },
  {
    id: "executive-cardiac",
    title: "Executive Cardiac Wellness",
    price: "₹3,999",
    originalPrice: "₹7,500",
    testCount: "68 Tests Included",
    category: "Heart & Vascular Focus",
    badge: "Recommended for 35+",
    tests: [
      "All Basic Health Checkup Tests Included",
      "Treadmill Stress Test (TMT) / 2D Echo Color Doppler",
      "HbA1c Average 3-Month Glucose Assessment",
      "Thyroid Profile (T3, T4, TSH)",
      "Serum Electrolytes (Sodium, Potassium, Chloride)",
      "Chest X-Ray Digital View",
      "Senior Cardiologist Consultation"
    ]
  },
  {
    id: "master-comprehensive",
    title: "Comprehensive Master Health Care",
    price: "₹6,999",
    originalPrice: "₹12,000",
    testCount: "94 Tests Included",
    category: "Full Body Master Diagnostic",
    badge: "Best Value",
    tests: [
      "All Executive Cardiac Package Tests Included",
      "Ultra-sound Abdomen & Pelvic Screening",
      "Vitamin D3 & Vitamin B12 Levels",
      "Cancer Screen Markers (PSA for Men / Pap Smear for Women)",
      "Pulmonary Function Test (Spirometry)",
      "Dexa Bone Mineral Density Scan",
      "Multi-Specialist Consultations (Cardiologist, Physician, Eye & Dental)"
    ]
  },
  {
    id: "senior-citizen",
    title: "Senior Citizen Special Care",
    price: "₹4,999",
    originalPrice: "₹9,000",
    testCount: "75 Tests Included",
    category: "Elderly Health & Joint Care",
    badge: "Senior Special",
    tests: [
      "Comprehensive Blood & Metabolic Panel",
      "Joint & Rheumatoid Factor Screening",
      "Ultrasound Abdomen & Prostate/Pelvic Imaging",
      "Audiometry Hearing Assessment & Eye Glaucoma Check",
      "Geriatric Physician & Orthopedic Joint Evaluation"
    ]
  }
];
