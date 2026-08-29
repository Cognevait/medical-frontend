import { apiClient } from "./api/client";
import { toPatientProfile } from "./api/mappers";
import type { PatientDTO } from "../types/api";
import type { PatientProfile } from "../types/patient";

export async function getPatient(patientId: string): Promise<PatientProfile> {
  const dto = await apiClient.get<PatientDTO>(`/patients/${patientId}`);
  return toPatientProfile(dto);
}
