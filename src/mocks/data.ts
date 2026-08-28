// Fixture data standing in for the medical-service API. Item 4 (connect
// frontend to backend) replaces every export here with a real API call —
// keeping it in one file makes that swap a deletion, not a hunt.
import type { Allergy, LabReport, PatientProfile, Prescription, Reminder, Visit } from "../types/patient";

export const PROFILES: PatientProfile[] = [
  {
    id: "p1",
    name: "Amara Nwosu",
    dob: "14 March 1988",
    mrn: "MRN-2024-00831",
    bloodType: "O+",
    phone: "+1 (415) 902-3847",
    email: "amara.nwosu@email.com",
    address: "2840 Van Ness Ave, San Francisco, CA 94109",
    primaryCare: "Dr. Priya Mehta",
    relation: "Self",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&auto=format",
    gender: "Female",
    weight: "68 kg",
    height: "165 cm",
  },
  {
    id: "p2",
    name: "Kofi Nwosu",
    dob: "22 July 2015",
    mrn: "MRN-2024-01142",
    bloodType: "A+",
    phone: "+1 (415) 902-3847",
    email: "amara.nwosu@email.com",
    address: "2840 Van Ness Ave, San Francisco, CA 94109",
    primaryCare: "Dr. Sandra Lee",
    relation: "Son",
    photo: "https://images.unsplash.com/photo-1545696968-1a31da406a64?w=120&h=120&fit=crop&auto=format",
    gender: "Male",
    weight: "32 kg",
    height: "128 cm",
  },
  {
    id: "p3",
    name: "Ngozi Nwosu",
    dob: "5 September 1955",
    mrn: "MRN-2024-00492",
    bloodType: "B+",
    phone: "+1 (415) 902-3847",
    email: "amara.nwosu@email.com",
    address: "2840 Van Ness Ave, San Francisco, CA 94109",
    primaryCare: "Dr. Martin Walsh",
    relation: "Mother",
    photo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=120&h=120&fit=crop&auto=format",
    gender: "Female",
    weight: "72 kg",
    height: "158 cm",
  },
];

export const PRESCRIPTIONS: Prescription[] = [
  { id: "rx-001", medicine: "Metformin HCl", dosage: "500 mg", frequency: "Twice daily with meals", duration: "Ongoing", doctor: "Dr. Priya Mehta", facility: "Sunrise Family Clinic", date: "2024-11-20", refills: 5, notes: "Monitor blood glucose weekly. Avoid alcohol.", status: "active" },
  { id: "rx-002", medicine: "Atorvastatin", dosage: "20 mg", frequency: "Once daily at bedtime", duration: "Ongoing", doctor: "Dr. Priya Mehta", facility: "Sunrise Family Clinic", date: "2024-09-05", refills: 5, notes: "Lipid panel in 3 months. Report muscle pain immediately.", status: "active" },
  { id: "rx-003", medicine: "Amoxicillin", dosage: "500 mg", frequency: "Three times daily", duration: "7 days", doctor: "Dr. Carlos Rivera", facility: "CityMed Urgent Care", date: "2024-07-14", refills: 0, notes: "Complete full course. Take with food.", status: "completed" },
  { id: "rx-004", medicine: "Cetirizine", dosage: "10 mg", frequency: "Once daily", duration: "30 days", doctor: "Dr. Leila Farooq", facility: "Bay Area Allergy Center", date: "2024-05-22", refills: 2, notes: "May cause drowsiness. Avoid operating heavy machinery.", status: "completed" },
  { id: "rx-005", medicine: "Ibuprofen", dosage: "400 mg", frequency: "As needed (max 3x daily)", duration: "5 days", doctor: "Dr. Priya Mehta", facility: "Sunrise Family Clinic", date: "2024-03-10", refills: 0, notes: "Discontinued — patient developed GI discomfort.", status: "discontinued" },
];

export const LAB_REPORTS: LabReport[] = [
  { id: "lab-001", test: "Fasting Blood Glucose", result: "118", unit: "mg/dL", referenceRange: "70–99", trend: "down", status: "abnormal", lab: "Quest Diagnostics", date: "2024-12-02", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-002", test: "HbA1c", result: "6.4", unit: "%", referenceRange: "< 5.7", trend: "down", status: "abnormal", lab: "Quest Diagnostics", date: "2024-12-02", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-003", test: "Total Cholesterol", result: "182", unit: "mg/dL", referenceRange: "< 200", trend: "down", status: "normal", lab: "LabCorp", date: "2024-11-15", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-004", test: "LDL Cholesterol", result: "98", unit: "mg/dL", referenceRange: "< 100", trend: "down", status: "normal", lab: "LabCorp", date: "2024-11-15", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-005", test: "Hemoglobin", result: "13.1", unit: "g/dL", referenceRange: "12.0–16.0", trend: "stable", status: "normal", lab: "LabCorp", date: "2024-11-15", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-006", test: "Potassium", result: "3.2", unit: "mEq/L", referenceRange: "3.5–5.1", trend: "up", status: "critical", lab: "Quest Diagnostics", date: "2024-10-08", orderedBy: "Dr. Carlos Rivera" },
  { id: "lab-007", test: "Creatinine", result: "0.82", unit: "mg/dL", referenceRange: "0.5–1.1", trend: "stable", status: "normal", lab: "LabCorp", date: "2024-11-15", orderedBy: "Dr. Priya Mehta" },
];

export const VISITS: Visit[] = [
  { id: "vis-001", doctor: "Dr. Priya Mehta", specialty: "General Practice", facility: "Sunrise Family Clinic", date: "2024-12-05", diagnosis: "Type 2 Diabetes — routine follow-up", vitals: { bp: "122/78", pulse: "74 bpm", temp: "36.8°C", weight: "68 kg" }, notes: "Glycemic control improving steadily. Continue Metformin. Repeat HbA1c in 3 months. Encouraged 30 min daily walking. Patient reports improved energy levels." },
  { id: "vis-002", doctor: "Dr. Priya Mehta", specialty: "General Practice", facility: "Sunrise Family Clinic", date: "2024-09-05", diagnosis: "Hyperlipidemia — new diagnosis", vitals: { bp: "126/80", pulse: "72 bpm", temp: "37.0°C", weight: "69 kg" }, notes: "Initiated Atorvastatin 20 mg. Dietary counseling provided — reduce saturated fats. Lipid panel ordered for December." },
  { id: "vis-003", doctor: "Dr. Carlos Rivera", specialty: "Urgent Care", facility: "CityMed Urgent Care", date: "2024-07-14", diagnosis: "Acute bacterial pharyngitis", vitals: { bp: "118/76", pulse: "88 bpm", temp: "38.4°C", weight: "69 kg" }, notes: "Rapid strep positive. Prescribed Amoxicillin 7-day course. Advised rest and fluids. Follow up if no improvement in 48 hours." },
  { id: "vis-004", doctor: "Dr. Leila Farooq", specialty: "Allergy & Immunology", facility: "Bay Area Allergy Center", date: "2024-05-22", diagnosis: "Seasonal allergic rhinitis", vitals: { bp: "120/78", pulse: "70 bpm", temp: "36.6°C", weight: "70 kg" }, notes: "Skin prick test performed. Sensitized to birch and oak tree pollen, dust mites. Started Cetirizine 10 mg. Nasal rinse recommended." },
  { id: "vis-005", doctor: "Dr. Priya Mehta", specialty: "General Practice", facility: "Sunrise Family Clinic", date: "2024-01-18", diagnosis: "Annual wellness examination", vitals: { bp: "120/78", pulse: "68 bpm", temp: "36.7°C", weight: "70 kg" }, notes: "All vaccinations up to date. BMI 25.7 — within normal range. No acute concerns. Colonoscopy recommended at age 40. Skin check clear." },
];

export const ALLERGIES: Allergy[] = [
  { id: "alg-001", allergen: "Ibuprofen (NSAIDs)", type: "medication", reaction: "Gastrointestinal bleeding, severe stomach cramps", severity: "severe", diagnosed: "2024-03-10", flagged: true },
  { id: "alg-002", allergen: "Penicillin", type: "medication", reaction: "Urticaria, facial angioedema", severity: "severe", diagnosed: "2018-06-04", flagged: true },
  { id: "alg-003", allergen: "Birch & Oak Pollen", type: "environmental", reaction: "Rhinitis, conjunctivitis, sneezing", severity: "moderate", diagnosed: "2024-05-22", flagged: false },
  { id: "alg-004", allergen: "Shellfish", type: "food", reaction: "Hives, lip and tongue swelling", severity: "moderate", diagnosed: "2015-09-12", flagged: false },
  { id: "alg-005", allergen: "Latex", type: "other", reaction: "Contact dermatitis, rash", severity: "mild", diagnosed: "2020-11-03", flagged: false },
];

export const REMINDERS: Reminder[] = [
  { medicine: "Metformin HCl 500 mg", time: "8:00 AM", taken: true, dose: "With breakfast" },
  { medicine: "Atorvastatin 20 mg", time: "10:00 PM", taken: false, dose: "At bedtime" },
  { medicine: "Metformin HCl 500 mg", time: "6:00 PM", taken: false, dose: "With dinner" },
];
