import {
  Pill as PillIcon,
  FlaskConical,
  CalendarDays,
  AlertTriangle,
  Activity,
  ShieldAlert,
  ChevronRight,
  Bell,
  CheckCircle2,
  Clock,
  Stethoscope,
} from "lucide-react";
import { StatusBadge } from "../../ui/StatusBadge";
import { formatDate, statusPill } from "../../../utils/format";
// Medication-adherence reminders have no backend equivalent yet — no
// endpoint tracks doses taken — so this list alone stays mock data.
import { REMINDERS } from "../../../mocks/data";
import type { Allergy, LabReport, PatientProfile, Prescription, Tab, Visit } from "../../../types/patient";

export function DashboardTab({
  prescriptions,
  labs,
  visits,
  allergies,
  setTab,
}: {
  patient: PatientProfile;
  setTab: (t: Tab) => void;
  prescriptions: Prescription[];
  labs: LabReport[];
  visits: Visit[];
  allergies: Allergy[];
}) {
  const activeRx = prescriptions.filter((p) => p.status === "active").length;
  const abnormalLabs = labs.filter((l) => l.status !== "normal").length;
  const severeAlgys = allergies.filter((a) => a.severity === "severe").length;
  const takenToday = REMINDERS.filter((r) => r.taken).length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: "Active Medications", value: activeRx, sub: "prescriptions", icon: <PillIcon size={16} />, bg: "bg-secondary", color: "text-primary", tab: "prescriptions" as Tab },
          { label: "Lab Reports", value: labs.length, sub: `${abnormalLabs} need review`, icon: <FlaskConical size={16} />, bg: "bg-sky-50", color: "text-sky-600", tab: "labs" as Tab },
          { label: "Clinic Visits", value: visits.length, sub: "recorded", icon: <CalendarDays size={16} />, bg: "bg-violet-50", color: "text-violet-600", tab: "visits" as Tab },
          { label: "Known Allergies", value: allergies.length, sub: `${severeAlgys} flagged severe`, icon: <AlertTriangle size={16} />, bg: "bg-rose-50", color: "text-rose-600", tab: "allergies" as Tab },
        ].map((s) => (
          <button key={s.label} onClick={() => setTab(s.tab)}
            className="bg-card border border-border rounded-xl p-4 text-left hover:shadow-sm hover:border-primary/20 transition-all">
            <div className={`inline-flex p-2 rounded-lg ${s.bg} ${s.color} mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.value}</div>
            <div className="text-xs font-medium text-foreground mt-0.5">{s.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
          </button>
        ))}
      </div>

      {(abnormalLabs > 0 || severeAlgys > 0) && (
        <div className="bg-card border border-amber-200 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-amber-50 border-b border-amber-200 flex items-center gap-2">
            <Activity size={13} className="text-amber-600" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>Attention Required</span>
          </div>
          <div className="divide-y divide-border">
            {allergies.filter((a) => a.flagged).map((a) => (
              <div key={a.id} className="px-4 py-3 flex items-center gap-3">
                <ShieldAlert size={13} className="text-red-500 flex-shrink-0" />
                <span className="text-sm text-foreground flex-1">
                  <span className="font-medium">Severe allergy flagged:</span> {a.allergen} — {a.reaction}
                </span>
                <button onClick={() => setTab("allergies")} className="text-xs text-primary font-medium flex items-center gap-0.5 hover:underline flex-shrink-0">
                  View <ChevronRight size={11} />
                </button>
              </div>
            ))}
            {labs.filter((l) => l.status === "critical").map((l) => (
              <div key={l.id} className="px-4 py-3 flex items-center gap-3">
                <Activity size={13} className="text-red-500 flex-shrink-0" />
                <span className="text-sm text-foreground flex-1">
                  <span className="font-medium">Critical lab:</span> {l.test} — {l.result} {l.unit} (ref: {l.referenceRange})
                </span>
                <button onClick={() => setTab("labs")} className="text-xs text-primary font-medium flex items-center gap-0.5 hover:underline flex-shrink-0">
                  View <ChevronRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PillIcon size={14} className="text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>Current Medications</span>
            </div>
            <button onClick={() => setTab("prescriptions")} className="text-xs text-primary font-medium flex items-center gap-0.5 hover:underline">
              All <ChevronRight size={11} />
            </button>
          </div>
          <div className="divide-y divide-border">
            {prescriptions.filter((p) => p.status === "active").map((rx) => (
              <div key={rx.id} className="px-4 py-3 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PillIcon size={13} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{rx.medicine}</div>
                  <div className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {rx.dosage} · {rx.frequency}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{rx.facility}</div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <StatusBadge label="Active" cls={statusPill("active")} />
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{rx.refills} refills</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Bell size={14} className="text-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>Today's Reminders</span>
            <span className="ml-auto text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
              {takenToday}/{REMINDERS.length}
            </span>
          </div>
          <div className="divide-y divide-border flex-1">
            {REMINDERS.map((r, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${r.taken ? "bg-emerald-50" : "bg-amber-50"}`}>
                  {r.taken ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Clock size={14} className="text-amber-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">{r.medicine}</div>
                  <div className="text-xs text-muted-foreground">{r.dose}</div>
                </div>
                <div className="text-xs text-muted-foreground flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>{r.time}</div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(takenToday / REMINDERS.length) * 100}%` }} />
              </div>
              <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                {Math.round((takenToday / REMINDERS.length) * 100)}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Adherence today</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope size={14} className="text-violet-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>Recent Visits</span>
          </div>
          <button onClick={() => setTab("visits")} className="text-xs text-primary font-medium flex items-center gap-0.5 hover:underline">
            All <ChevronRight size={11} />
          </button>
        </div>
        <div className="divide-y divide-border">
          {visits.slice(0, 3).map((v) => (
            <div key={v.id} className="px-4 py-3 flex items-start gap-4 hover:bg-muted/30 transition-colors">
              <div className="text-xs text-muted-foreground mt-0.5 w-20 flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>
                {formatDate(v.date)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{v.diagnosis}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{v.doctor} · {v.specialty} · {v.facility}</div>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>
                <span>BP {v.vitals.bp}</span>
                <span>{v.vitals.pulse}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
