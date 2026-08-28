export type Screen = "login" | "profiles" | "app";
export type Tab = "dashboard" | "prescriptions" | "labs" | "visits" | "allergies";

export interface PatientProfile {
  id: string;
  name: string;
  dob: string;
  mrn: string;
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  primaryCare: string;
  relation: string;
  photo: string;
  gender: string;
  weight: string;
  height: string;
}

export interface Prescription {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctor: string;
  facility: string;
  date: string;
  refills: number;
  notes: string;
  status: "active" | "completed" | "discontinued";
}

export interface LabReport {
  id: string;
  test: string;
  result: string;
  unit: string;
  referenceRange: string;
  trend: "up" | "down" | "stable";
  status: "normal" | "abnormal" | "critical";
  lab: string;
  date: string;
  orderedBy: string;
}

export interface Visit {
  id: string;
  doctor: string;
  specialty: string;
  facility: string;
  date: string;
  diagnosis: string;
  vitals: { bp: string; pulse: string; temp: string; weight: string };
  notes: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  type: "medication" | "food" | "environmental" | "other";
  reaction: string;
  severity: "mild" | "moderate" | "severe";
  diagnosed: string;
  flagged: boolean;
}

export interface Reminder {
  medicine: string;
  time: string;
  taken: boolean;
  dose: string;
}
