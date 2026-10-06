export type ConsultationType = "video" | "phone" | "clinic";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  consultationTypes: ConsultationType[];
  nextAvailable: string;
  price: number;
  description: string;
};

export type LabCategory = "Wellness" | "Diabetes care" | "Heart health" | "Thyroid care";

export type LabTest = {
  id: string;
  name: string;
  category: LabCategory;
  description: string;
  includedTests: string[];
  price: number;
  preparation: string;
  homeCollectionAvailable: boolean;
  sampleType: string;
  turnaround: string;
};

export const mockDoctors: Doctor[] = [
  { id: "aisha-mehta", name: "Dr. Aisha Mehta", specialty: "General medicine", experienceYears: 12, rating: 4.9, consultationTypes: ["video", "phone", "clinic"], nextAvailable: "Today, 4:30 PM", price: 599, description: "Thoughtful support for everyday health questions, preventive care, and ongoing wellness." },
  { id: "arjun-rao", name: "Dr. Arjun Rao", specialty: "Dermatology", experienceYears: 9, rating: 4.8, consultationTypes: ["video", "clinic"], nextAvailable: "Today, 5:15 PM", price: 799, description: "A calm, practical approach to common skin and hair concerns." },
  { id: "kavya-nair", name: "Dr. Kavya Nair", specialty: "Pediatrics", experienceYears: 14, rating: 4.9, consultationTypes: ["video", "phone"], nextAvailable: "Tomorrow, 9:30 AM", price: 699, description: "Family-centered pediatric guidance for childhood health and development." },
  { id: "rahul-shah", name: "Dr. Rahul Shah", specialty: "Cardiology", experienceYears: 16, rating: 4.8, consultationTypes: ["video", "clinic"], nextAvailable: "Tomorrow, 11:00 AM", price: 999, description: "Heart health reviews and clear next steps for ongoing care." },
  { id: "neha-kulkarni", name: "Dr. Neha Kulkarni", specialty: "Nutrition", experienceYears: 10, rating: 4.7, consultationTypes: ["video", "phone"], nextAvailable: "Friday, 2:00 PM", price: 649, description: "Personalized nutrition conversations grounded in sustainable daily habits." },
  { id: "vivek-menon", name: "Dr. Vivek Menon", specialty: "Orthopedics", experienceYears: 18, rating: 4.9, consultationTypes: ["clinic", "video"], nextAvailable: "Friday, 3:30 PM", price: 899, description: "Support for joint, mobility, and musculoskeletal health questions." }
];

export const mockLabTests: LabTest[] = [
  { id: "complete-blood-count", name: "Complete Blood Count", category: "Wellness", description: "A broad look at red cells, white cells, and platelets as part of a routine health check.", includedTests: ["Hemoglobin", "Red blood cell count", "White blood cell count", "Platelet count"], price: 399, preparation: "No fasting required.", homeCollectionAvailable: true, sampleType: "Blood sample", turnaround: "Results typically ready within 24 hours" },
  { id: "wellness-screening", name: "Comprehensive Wellness Screen", category: "Wellness", description: "A convenient collection of commonly requested markers for a general wellness review.", includedTests: ["Complete blood count", "Liver function panel", "Kidney function panel", "Vitamin B12"], price: 1499, preparation: "An 8-hour fast is recommended. Water is fine.", homeCollectionAvailable: true, sampleType: "Blood and urine samples", turnaround: "Results typically ready within 36 hours" },
  { id: "hba1c", name: "HbA1c", category: "Diabetes care", description: "Measures average blood sugar levels over the previous two to three months.", includedTests: ["Glycated hemoglobin (HbA1c)", "Estimated average glucose"], price: 499, preparation: "No fasting required.", homeCollectionAvailable: true, sampleType: "Blood sample", turnaround: "Results typically ready within 24 hours" },
  { id: "diabetes-check", name: "Diabetes Care Panel", category: "Diabetes care", description: "A simple panel with glucose, HbA1c, and kidney markers in one visit.", includedTests: ["Fasting blood glucose", "HbA1c", "Serum creatinine", "Urine microalbumin"], price: 1099, preparation: "An 8-hour fast is recommended. Water is fine.", homeCollectionAvailable: true, sampleType: "Blood and urine samples", turnaround: "Results typically ready within 36 hours" },
  { id: "lipid-profile", name: "Lipid Profile", category: "Heart health", description: "Measures common blood fat markers to support a heart health conversation with your clinician.", includedTests: ["Total cholesterol", "HDL cholesterol", "LDL cholesterol", "Triglycerides"], price: 699, preparation: "An 8 to 10-hour fast is recommended. Water is fine.", homeCollectionAvailable: true, sampleType: "Blood sample", turnaround: "Results typically ready within 24 hours" },
  { id: "thyroid-profile", name: "Thyroid Profile", category: "Thyroid care", description: "A familiar thyroid screening panel with three key hormone markers.", includedTests: ["TSH", "T3", "T4"], price: 799, preparation: "No fasting required.", homeCollectionAvailable: true, sampleType: "Blood sample", turnaround: "Results typically ready within 24 hours" }
];

export const consultationTypeLabels: Record<ConsultationType, string> = {
  video: "Video consultation",
  phone: "Phone consultation",
  clinic: "In-clinic consultation"
};

export function getUpcomingDates(count = 6) {
  const dates: string[] = [];
  const date = new Date();
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() + 1);
  while (dates.length < count) {
    const day = date.getUTCDay();
    if (day !== 0 && day !== 6) dates.push(date.toISOString().slice(0, 10));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return dates;
}

export function formatServiceDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}
