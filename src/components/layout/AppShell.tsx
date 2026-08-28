import { useState } from "react";
import {
  User,
  Bell,
  Plus,
  Download,
  Share2,
  X,
  Pill as PillIcon,
  Stethoscope,
  HeartPulse,
  Search,
  LogOut,
  ChevronDown,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  FlaskConical,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";
import { DashboardTab } from "../features/dashboard/DashboardTab";
import { PrescriptionsTab } from "../features/prescriptions/PrescriptionsTab";
import { LabsTab } from "../features/labs/LabsTab";
import { VisitsTab } from "../features/visits/VisitsTab";
import { AllergiesTab } from "../features/allergies/AllergiesTab";
import { AddRecordModal } from "../features/records/AddRecordModal";
import { ALLERGIES, LAB_REPORTS } from "../../mocks/data";
import type { PatientProfile, Tab } from "../../types/patient";

const NAV: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: (a) => <HeartPulse size={16} className={a ? "text-primary" : ""} /> },
  { id: "prescriptions", label: "Prescriptions", icon: (a) => <PillIcon size={16} className={a ? "text-primary" : ""} /> },
  { id: "labs", label: "Lab Reports", icon: (a) => <FlaskConical size={16} className={a ? "text-primary" : ""} /> },
  { id: "visits", label: "Visit History", icon: (a) => <CalendarDays size={16} className={a ? "text-primary" : ""} /> },
  { id: "allergies", label: "Allergies", icon: (a) => <AlertTriangle size={16} className={a ? "text-primary" : ""} /> },
];

export function AppShell({ patient, onLogout }: { patient: PatientProfile; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="size-full min-h-screen bg-background flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static z-30 inset-y-0 left-0 w-64 bg-card border-r border-border flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <HeartPulse size={14} className="text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>MedRecord</span>
          </div>
          <button className="lg:hidden p-1 text-muted-foreground" onClick={() => setSidebarOpen(false)}><X size={15} /></button>
        </div>

        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <img src={patient.photo} alt={patient.name}
              className="w-10 h-10 rounded-full object-cover bg-muted flex-shrink-0 ring-2 ring-border" />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{patient.name}</div>
              <div className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{patient.mrn}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: "Blood Type", value: patient.bloodType },
              { label: "DOB", value: patient.dob.split(" ").slice(1).join(" ") },
              { label: "Weight", value: patient.weight },
              { label: "Height", value: patient.height },
            ].map((f) => (
              <div key={f.label} className="bg-muted rounded-lg px-2.5 py-1.5">
                <div className="text-xs text-muted-foreground">{f.label}</div>
                <div className="text-xs font-semibold text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{f.value}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowProfile(!showProfile)}
            className="mt-3 w-full text-xs text-primary font-medium flex items-center gap-1 hover:underline">
            <User size={11} /> View full profile
            <ChevronDown size={11} className={`ml-auto transition-transform ${showProfile ? "rotate-180" : ""}`} />
          </button>
          {showProfile && (
            <div className="mt-2 space-y-1.5 text-xs text-muted-foreground border-t border-border pt-2.5">
              {[
                { icon: <Phone size={10} />, value: patient.phone },
                { icon: <Mail size={10} />, value: patient.email },
                { icon: <MapPin size={10} />, value: patient.address },
                { icon: <Stethoscope size={10} />, value: patient.primaryCare },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="mt-0.5 flex-shrink-0">{f.icon}</span>
                  <span className="truncate">{f.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => (
            <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                tab === item.id ? "bg-secondary text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {item.icon(tab === item.id)}
              {item.label}
              {item.id === "allergies" && ALLERGIES.filter((a) => a.flagged).length > 0 && (
                <span className="ml-auto text-xs bg-red-100 text-red-600 font-semibold px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {ALLERGIES.filter((a) => a.flagged).length}
                </span>
              )}
              {item.id === "labs" && LAB_REPORTS.filter((l) => l.status !== "normal").length > 0 && (
                <span className="ml-auto text-xs bg-amber-100 text-amber-700 font-semibold px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {LAB_REPORTS.filter((l) => l.status !== "normal").length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-border space-y-0.5">
          <div className="px-3 py-2 text-xs text-muted-foreground flex items-center gap-2">
            <Stethoscope size={12} /> {patient.primaryCare}
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <LogOut size={12} /> Switch profile / Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border px-4 lg:px-6 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors" onClick={() => setSidebarOpen(true)}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex-1 max-w-xs relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search records…" value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
            </button>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <Plus size={13} /> <span className="hidden sm:inline">New Record</span>
            </button>
          </div>
        </header>

        <div className="px-4 lg:px-6 py-4 border-b border-border bg-card flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {NAV.find((n) => n.id === tab)?.label}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {patient.name} · <span style={{ fontFamily: "'DM Mono', monospace" }}>{patient.mrn}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Download size={12} /> Export PDF
            </button>
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Share2 size={12} /> Share
            </button>
            <button className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>

        <main className="flex-1 px-4 lg:px-6 py-5 overflow-y-auto">
          {tab === "dashboard" && <DashboardTab patient={patient} setTab={setTab} />}
          {tab === "prescriptions" && <PrescriptionsTab onAdd={() => setShowModal(true)} />}
          {tab === "labs" && <LabsTab onAdd={() => setShowModal(true)} />}
          {tab === "visits" && <VisitsTab onAdd={() => setShowModal(true)} />}
          {tab === "allergies" && <AllergiesTab onAdd={() => setShowModal(true)} />}
        </main>
      </div>

      {showModal && <AddRecordModal onClose={() => setShowModal(false)} defaultType={tab} />}
    </div>
  );
}
