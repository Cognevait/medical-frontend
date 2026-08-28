import { useState } from "react";
import { LoginScreen } from "./components/features/auth/LoginScreen";
import { ProfileScreen } from "./components/features/profiles/ProfileScreen";
import { AppShell } from "./components/layout/AppShell";
import type { PatientProfile, Screen } from "./types/patient";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [patient, setPatient] = useState<PatientProfile | null>(null);

  if (screen === "login") {
    return <LoginScreen onLogin={() => setScreen("profiles")} />;
  }
  if (screen === "profiles" || !patient) {
    return <ProfileScreen onSelect={(p) => { setPatient(p); setScreen("app"); }} />;
  }
  return <AppShell patient={patient} onLogout={() => { setPatient(null); setScreen("profiles"); }} />;
}
