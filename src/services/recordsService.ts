import { apiClient } from "./api/client";
import {
  allergyCreatePayload,
  labReportCreatePayload,
  prescriptionCreatePayload,
  toAllergy,
  toLabReport,
  toPrescription,
  toVisit,
  visitCreatePayload,
} from "./api/mappers";
import type { AllergyDTO, LabReportDTO, PrescriptionDTO, VisitDTO } from "../types/api";
import type { Allergy, LabReport, Prescription, Visit } from "../types/patient";

export async function listPrescriptions(patientId: string): Promise<Prescription[]> {
  const { prescriptions } = await apiClient.get<{ prescriptions: PrescriptionDTO[] }>(
    `/records/${patientId}/prescriptions`,
  );
  return prescriptions.map(toPrescription);
}

export async function addPrescription(patientId: string, form: FormData): Promise<Prescription> {
  const dto = await apiClient.post<PrescriptionDTO>(
    `/records/${patientId}/prescriptions`,
    prescriptionCreatePayload(form),
  );
  return toPrescription(dto);
}

export async function listLabReports(patientId: string): Promise<LabReport[]> {
  const { labs } = await apiClient.get<{ labs: LabReportDTO[] }>(`/records/${patientId}/labs`);
  return labs.map(toLabReport);
}

export async function addLabReport(patientId: string, form: FormData): Promise<LabReport> {
  const dto = await apiClient.post<LabReportDTO>(`/records/${patientId}/labs`, labReportCreatePayload(form));
  return toLabReport(dto);
}

export async function listVisits(patientId: string): Promise<Visit[]> {
  const { visits } = await apiClient.get<{ visits: VisitDTO[] }>(`/records/${patientId}/visits`);
  return visits.map(toVisit);
}

export async function addVisit(patientId: string, form: FormData): Promise<Visit> {
  const dto = await apiClient.post<VisitDTO>(`/records/${patientId}/visits`, visitCreatePayload(form));
  return toVisit(dto);
}

export async function listAllergies(patientId: string): Promise<Allergy[]> {
  const { allergies } = await apiClient.get<{ allergies: AllergyDTO[] }>(`/records/${patientId}/allergies`);
  return allergies.map(toAllergy);
}

export async function addAllergy(patientId: string, form: FormData): Promise<Allergy> {
  const dto = await apiClient.post<AllergyDTO>(`/records/${patientId}/allergies`, allergyCreatePayload(form));
  return toAllergy(dto);
}
