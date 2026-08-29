import { useState } from "react";
import { LoginScreen } from "./components/features/auth/LoginScreen";
import { ProfileScreen } from "./components/features/profiles/ProfileScreen";
import { AppShell } from "./components/layout/AppShell";
import { useAuthStore } from "./stores/authStore";
import type { PatientProfile, Screen } from "./types/patient";

export default function App() {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  const [screen, setScreen] = useState<Screen>("profiles");
  const [patient, setPatient] = useState<PatientProfile | null>(null);

  if (!token) {
    return <LoginScreen onLogin={() => setScreen("profiles")} />;
  }
  if (screen === "profiles" || !patient) {
    return <ProfileScreen onSelect={(p) => { setPatient(p); setScreen("app"); }} />;
  }
  return (
    <AppShell
      patient={patient}
      onLogout={() => {
        setPatient(null);
        setScreen("profiles");
        logout();
      }}
    />
  );
}
