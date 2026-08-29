// Shapes returned by medical-service, snake_case as the API sends them.
// Kept separate from types/patient.ts (the UI's camelCase shapes) — the
// mapping between the two lives in one place: services/api/mappers.ts.

export interface PrescriptionDTO {
  id: string;
  patient_id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string | null;
  doctor: string;
  facility: string | null;
  refills: number;
  notes: string | null;
  status: "active" | "completed" | "discontinued";
  recorded_on: string;
}

export interface LabReportDTO {
  id: string;
  patient_id: string;
  test_name: string;
  result: string;
  unit: string | null;
  reference_range: string | null;
  trend: "up" | "down" | "stable";
  status: "normal" | "abnormal" | "critical";
  lab: string | null;
  ordered_by: string | null;
  recorded_on: string;
}

export interface VitalsDTO {
  bp: string | null;
  pulse: string | null;
  temp: string | null;
  weight: string | null;
}

export interface VisitDTO {
  id: string;
  patient_id: string;
  doctor: string;
  specialty: string | null;
  facility: string | null;
  diagnosis: string;
  vitals: VitalsDTO;
  notes: string | null;
  recorded_on: string;
}

export interface AllergyDTO {
  id: string;
  patient_id: string;
  allergen: string;
  type: "medication" | "food" | "environmental" | "other";
  reaction: string;
  severity: "mild" | "moderate" | "severe";
  flagged: boolean;
  diagnosed_on: string;
}

export interface PatientDTO {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  phone: string;
  gender: string;
  version_id: number;
}

export interface AuthenticatedUserDTO {
  id: string;
  email: string;
  roles: string[];
  patient_id: string | null;
}

export interface LoginResponseDTO {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: AuthenticatedUserDTO;
}
