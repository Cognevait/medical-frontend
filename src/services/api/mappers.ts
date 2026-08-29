// The one place that reconciles medical-service's snake_case field names
// (and its wrapped-list / nested-vitals response shapes) with the camelCase
// UI types in types/patient.ts. Nothing outside this module and
// services/recordsService.ts should ever see a *DTO shape directly.
import type { AllergyDTO, LabReportDTO, PatientDTO, PrescriptionDTO, VisitDTO } from "../../types/api";
import type { Allergy, LabReport, PatientProfile, Prescription, Visit } from "../../types/patient";

function emptyToNull(value: FormDataEntryValue | null): string | null {
  const str = typeof value === "string" ? value.trim() : "";
  return str.length > 0 ? str : null;
}

export function toPrescription(dto: PrescriptionDTO): Prescription {
  return {
    id: dto.id,
    medicine: dto.medicine,
    dosage: dto.dosage,
    frequency: dto.frequency,
    duration: dto.duration ?? "",
    doctor: dto.doctor,
    facility: dto.facility ?? "",
    date: dto.recorded_on,
    refills: dto.refills,
    notes: dto.notes ?? "",
    status: dto.status,
  };
}

export function prescriptionCreatePayload(form: FormData): Record<string, unknown> {
  return {
    medicine: form.get("medicine"),
    dosage: form.get("dosage"),
    frequency: form.get("frequency"),
    duration: emptyToNull(form.get("duration")),
    doctor: form.get("doctor"),
    facility: emptyToNull(form.get("facility")),
    refills: Number(form.get("refills") || 0),
    notes: emptyToNull(form.get("notes")),
    status: "active",
    recorded_on: form.get("date"),
  };
}

export function toLabReport(dto: LabReportDTO): LabReport {
  return {
    id: dto.id,
    test: dto.test_name,
    result: dto.result,
    unit: dto.unit ?? "",
    referenceRange: dto.reference_range ?? "",
    trend: dto.trend,
    status: dto.status,
    lab: dto.lab ?? "",
    date: dto.recorded_on,
    orderedBy: dto.ordered_by ?? "",
  };
}

export function labReportCreatePayload(form: FormData): Record<string, unknown> {
  return {
    test_name: form.get("testName"),
    result: form.get("result"),
    unit: emptyToNull(form.get("unit")),
    reference_range: emptyToNull(form.get("referenceRange")),
    lab: emptyToNull(form.get("lab")),
    ordered_by: emptyToNull(form.get("orderedBy")),
    status: String(form.get("status") || "normal").toLowerCase(),
    recorded_on: form.get("date"),
  };
}

export function toVisit(dto: VisitDTO): Visit {
  return {
    id: dto.id,
    doctor: dto.doctor,
    specialty: dto.specialty ?? "",
    facility: dto.facility ?? "",
    date: dto.recorded_on,
    diagnosis: dto.diagnosis,
    vitals: {
      bp: dto.vitals.bp ?? "",
      pulse: dto.vitals.pulse ?? "",
      temp: dto.vitals.temp ?? "",
      weight: dto.vitals.weight ?? "",
    },
    notes: dto.notes ?? "",
  };
}

export function visitCreatePayload(form: FormData): Record<string, unknown> {
  return {
    doctor: form.get("doctor"),
    specialty: emptyToNull(form.get("specialty")),
    facility: emptyToNull(form.get("facility")),
    diagnosis: form.get("diagnosis"),
    vitals: {
      bp: emptyToNull(form.get("bp")),
      pulse: emptyToNull(form.get("pulse")),
    },
    notes: emptyToNull(form.get("visitNotes")),
    recorded_on: form.get("date"),
  };
}

export function toAllergy(dto: AllergyDTO): Allergy {
  return {
    id: dto.id,
    allergen: dto.allergen,
    type: dto.type,
    reaction: dto.reaction,
    severity: dto.severity,
    diagnosed: dto.diagnosed_on,
    flagged: dto.flagged,
  };
}

export function allergyCreatePayload(form: FormData): Record<string, unknown> {
  return {
    allergen: form.get("allergen"),
    type: String(form.get("allergyType") || "other").toLowerCase(),
    reaction: form.get("reaction"),
    severity: String(form.get("severity") || "mild").toLowerCase(),
    flagged: form.get("flagged") === "on",
    diagnosed_on: form.get("date"),
  };
}

// AppShell/ProfileScreen render dob as "14 March 1988" (`dob.split(" ")`
// drops the day to show "March 1988"); reformat the API's ISO date here so
// that display logic keeps working unchanged.
function toLongDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

// PatientDTO carries only demographic fields — mrn, blood type, primary
// care doctor, weight/height and a photo have no equivalent in the
// `patients` service yet. Placeholders below mark that gap rather than
// fabricating clinical data; see docs/handover for the follow-up.
export function toPatientProfile(dto: PatientDTO): PatientProfile {
  return {
    id: dto.id,
    name: `${dto.first_name} ${dto.last_name}`,
    dob: toLongDate(dto.birth_date),
    mrn: "—",
    bloodType: "—",
    phone: dto.phone,
    email: dto.email,
    address: "—",
    primaryCare: "Not yet assigned",
    relation: "Self",
    photo: "",
    gender: dto.gender,
    weight: "—",
    height: "—",
  };
}
