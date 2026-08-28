import { create } from "zustand";
import { setAuthToken } from "../services/api/client";
import { login as loginRequest } from "../services/authService";
import type { AuthenticatedUserDTO } from "../types/api";

const STORAGE_KEY = "medrecord_auth";

interface StoredAuth {
  token: string;
  user: AuthenticatedUserDTO;
}

function loadStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredAuth) : null;
  } catch {
    return null;
  }
}

interface AuthState {
  token: string | null;
  user: AuthenticatedUserDTO | null;
  isAuthenticating: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialAuth = loadStoredAuth();
setAuthToken(initialAuth?.token ?? null);

export const useAuthStore = create<AuthState>((set) => ({
  token: initialAuth?.token ?? null,
  user: initialAuth?.user ?? null,
  isAuthenticating: false,
  error: null,

  login: async (email, password) => {
    set({ isAuthenticating: true, error: null });
    try {
      const response = await loginRequest(email, password);
      setAuthToken(response.access_token);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: response.access_token, user: response.user }));
      } catch {
        // Storage can be unavailable (private browsing); the session still
        // works in-memory for the rest of this tab's lifetime.
      }
      set({ token: response.access_token, user: response.user, isAuthenticating: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      set({ isAuthenticating: false, error: message });
      throw err;
    }
  },

  logout: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setAuthToken(null);
    set({ token: null, user: null, error: null });
  },
}));
