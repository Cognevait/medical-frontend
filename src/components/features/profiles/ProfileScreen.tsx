import { HeartPulse, ChevronRight, Plus, User } from "lucide-react";
import { getPatient } from "../../../services/patientService";
import { useApiResource } from "../../../hooks/useApiResource";
import { useAuthStore } from "../../../stores/authStore";
import type { PatientProfile } from "../../../types/patient";

// There is no guardian/dependant model on the backend yet (consent grants
// are the closest concept — see docs/handover/02, "Contract notes"), so
// this shows only the signed-in patient's own record. The multi-profile
// family switcher the UI was built for stays a follow-up product decision.
export function ProfileScreen({ onSelect }: { onSelect: (p: PatientProfile) => void }) {
  const patientId = useAuthStore((s) => s.user?.patient_id ?? null);
  const { data: patient, loading, error } = useApiResource(
    () => (patientId ? getPatient(patientId) : Promise.resolve(null)),
    [patientId],
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <HeartPulse size={16} className="text-primary-foreground" />
        </div>
        <span className="text-base font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>MedRecord</span>
      </div>
      <h1 className="text-2xl font-semibold text-foreground mb-1 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Who are you viewing records for?
      </h1>
      <p className="text-sm text-muted-foreground mb-8 text-center">Select a profile to access their health records.</p>

      {!patientId && (
        <p className="text-sm text-muted-foreground max-w-md text-center">
          This account has no patient profile attached — only patient logins can view records today.
        </p>
      )}
      {patientId && loading && <p className="text-sm text-muted-foreground">Loading your profile…</p>}
      {patientId && error && <p className="text-sm text-red-600">{error}</p>}

      {patient && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          <button onClick={() => onSelect(patient)}
            className="bg-card border border-border rounded-xl p-5 text-left hover:border-primary/40 hover:shadow-md transition-all group">
            <div className="w-14 h-14 rounded-full bg-muted mb-3 flex items-center justify-center group-hover:ring-2 group-hover:ring-primary/30 transition-all">
              <User size={22} className="text-muted-foreground" />
            </div>
            <div className="text-sm font-semibold text-foreground mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{patient.name}</div>
            <div className="text-xs text-muted-foreground mb-3">{patient.relation}</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
                {patient.bloodType}
              </span>
              <span className="text-xs text-muted-foreground">{patient.dob.split(" ").slice(1).join(" ")}</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View records <ChevronRight size={12} />
            </div>
          </button>
        </div>
      )}

      <button className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <Plus size={14} /> Add a family member
      </button>
    </div>
  );
}
