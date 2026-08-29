import { apiClient } from "./api/client";
import type { AuthenticatedUserDTO, LoginResponseDTO } from "../types/api";

export function login(email: string, password: string): Promise<LoginResponseDTO> {
  return apiClient.post<LoginResponseDTO>("/auth/login", { email, password });
}

export function me(): Promise<AuthenticatedUserDTO> {
  return apiClient.get<AuthenticatedUserDTO>("/auth/me");
}
