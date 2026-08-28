import { useState } from "react";
import {
  User,
  FileText,
  FlaskConical,
  CalendarDays,
  AlertTriangle,
  Bell,
  Plus,
  Download,
  Share2,
  ChevronRight,
  X,
  Pill as PillIcon,
  Stethoscope,
  HeartPulse,
  Search,
  LogOut,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Activity,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Upload,
  Paperclip,
  ChevronDown,
  MoreHorizontal,
  Phone,
  MapPin,
  Shield,
  Syringe,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "login" | "profiles" | "app";
type Tab = "dashboard" | "prescriptions" | "labs" | "visits" | "allergies";

interface PatientProfile {
  id: string;
  name: string;
  dob: string;
  mrn: string;
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  primaryCare: string;
  relation: string;
  photo: string;
  gender: string;
  weight: string;
  height: string;
}

interface Prescription {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctor: string;
  facility: string;
  date: string;
  refills: number;
  notes: string;
  status: "active" | "completed" | "discontinued";
}

interface LabReport {
  id: string;
  test: string;
  result: string;
  unit: string;
  referenceRange: string;
  trend: "up" | "down" | "stable";
  status: "normal" | "abnormal" | "critical";
  lab: string;
  date: string;
  orderedBy: string;
}

interface Visit {
  id: string;
  doctor: string;
  specialty: string;
  facility: string;
  date: string;
  diagnosis: string;
  vitals: { bp: string; pulse: string; temp: string; weight: string };
  notes: string;
}

interface Allergy {
  id: string;
  allergen: string;
  type: "medication" | "food" | "environmental" | "other";
  reaction: string;
  severity: "mild" | "moderate" | "severe";
  diagnosed: string;
  flagged: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROFILES: PatientProfile[] = [
  {
    id: "p1",
    name: "Amara Nwosu",
    dob: "14 March 1988",
    mrn: "MRN-2024-00831",
    bloodType: "O+",
    phone: "+1 (415) 902-3847",
    email: "amara.nwosu@email.com",
    address: "2840 Van Ness Ave, San Francisco, CA 94109",
    primaryCare: "Dr. Priya Mehta",
    relation: "Self",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&auto=format",
    gender: "Female",
    weight: "68 kg",
    height: "165 cm",
  },
  {
    id: "p2",
    name: "Kofi Nwosu",
    dob: "22 July 2015",
    mrn: "MRN-2024-01142",
    bloodType: "A+",
    phone: "+1 (415) 902-3847",
    email: "amara.nwosu@email.com",
    address: "2840 Van Ness Ave, San Francisco, CA 94109",
    primaryCare: "Dr. Sandra Lee",
    relation: "Son",
    photo: "https://images.unsplash.com/photo-1545696968-1a31da406a64?w=120&h=120&fit=crop&auto=format",
    gender: "Male",
    weight: "32 kg",
    height: "128 cm",
  },
  {
    id: "p3",
    name: "Ngozi Nwosu",
    dob: "5 September 1955",
    mrn: "MRN-2024-00492",
    bloodType: "B+",
    phone: "+1 (415) 902-3847",
    email: "amara.nwosu@email.com",
    address: "2840 Van Ness Ave, San Francisco, CA 94109",
    primaryCare: "Dr. Martin Walsh",
    relation: "Mother",
    photo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=120&h=120&fit=crop&auto=format",
    gender: "Female",
    weight: "72 kg",
    height: "158 cm",
  },
];

const PRESCRIPTIONS: Prescription[] = [
  { id: "rx-001", medicine: "Metformin HCl", dosage: "500 mg", frequency: "Twice daily with meals", duration: "Ongoing", doctor: "Dr. Priya Mehta", facility: "Sunrise Family Clinic", date: "2024-11-20", refills: 5, notes: "Monitor blood glucose weekly. Avoid alcohol.", status: "active" },
  { id: "rx-002", medicine: "Atorvastatin", dosage: "20 mg", frequency: "Once daily at bedtime", duration: "Ongoing", doctor: "Dr. Priya Mehta", facility: "Sunrise Family Clinic", date: "2024-09-05", refills: 5, notes: "Lipid panel in 3 months. Report muscle pain immediately.", status: "active" },
  { id: "rx-003", medicine: "Amoxicillin", dosage: "500 mg", frequency: "Three times daily", duration: "7 days", doctor: "Dr. Carlos Rivera", facility: "CityMed Urgent Care", date: "2024-07-14", refills: 0, notes: "Complete full course. Take with food.", status: "completed" },
  { id: "rx-004", medicine: "Cetirizine", dosage: "10 mg", frequency: "Once daily", duration: "30 days", doctor: "Dr. Leila Farooq", facility: "Bay Area Allergy Center", date: "2024-05-22", refills: 2, notes: "May cause drowsiness. Avoid operating heavy machinery.", status: "completed" },
  { id: "rx-005", medicine: "Ibuprofen", dosage: "400 mg", frequency: "As needed (max 3x daily)", duration: "5 days", doctor: "Dr. Priya Mehta", facility: "Sunrise Family Clinic", date: "2024-03-10", refills: 0, notes: "Discontinued — patient developed GI discomfort.", status: "discontinued" },
];

const LAB_REPORTS: LabReport[] = [
  { id: "lab-001", test: "Fasting Blood Glucose", result: "118", unit: "mg/dL", referenceRange: "70–99", trend: "down", status: "abnormal", lab: "Quest Diagnostics", date: "2024-12-02", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-002", test: "HbA1c", result: "6.4", unit: "%", referenceRange: "< 5.7", trend: "down", status: "abnormal", lab: "Quest Diagnostics", date: "2024-12-02", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-003", test: "Total Cholesterol", result: "182", unit: "mg/dL", referenceRange: "< 200", trend: "down", status: "normal", lab: "LabCorp", date: "2024-11-15", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-004", test: "LDL Cholesterol", result: "98", unit: "mg/dL", referenceRange: "< 100", trend: "down", status: "normal", lab: "LabCorp", date: "2024-11-15", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-005", test: "Hemoglobin", result: "13.1", unit: "g/dL", referenceRange: "12.0–16.0", trend: "stable", status: "normal", lab: "LabCorp", date: "2024-11-15", orderedBy: "Dr. Priya Mehta" },
  { id: "lab-006", test: "Potassium", result: "3.2", unit: "mEq/L", referenceRange: "3.5–5.1", trend: "up", status: "critical", lab: "Quest Diagnostics", date: "2024-10-08", orderedBy: "Dr. Carlos Rivera" },
  { id: "lab-007", test: "Creatinine", result: "0.82", unit: "mg/dL", referenceRange: "0.5–1.1", trend: "stable", status: "normal", lab: "LabCorp", date: "2024-11-15", orderedBy: "Dr. Priya Mehta" },
];

const VISITS: Visit[] = [
  { id: "vis-001", doctor: "Dr. Priya Mehta", specialty: "General Practice", facility: "Sunrise Family Clinic", date: "2024-12-05", diagnosis: "Type 2 Diabetes — routine follow-up", vitals: { bp: "122/78", pulse: "74 bpm", temp: "36.8°C", weight: "68 kg" }, notes: "Glycemic control improving steadily. Continue Metformin. Repeat HbA1c in 3 months. Encouraged 30 min daily walking. Patient reports improved energy levels." },
  { id: "vis-002", doctor: "Dr. Priya Mehta", specialty: "General Practice", facility: "Sunrise Family Clinic", date: "2024-09-05", diagnosis: "Hyperlipidemia — new diagnosis", vitals: { bp: "126/80", pulse: "72 bpm", temp: "37.0°C", weight: "69 kg" }, notes: "Initiated Atorvastatin 20 mg. Dietary counseling provided — reduce saturated fats. Lipid panel ordered for December." },
  { id: "vis-003", doctor: "Dr. Carlos Rivera", specialty: "Urgent Care", facility: "CityMed Urgent Care", date: "2024-07-14", diagnosis: "Acute bacterial pharyngitis", vitals: { bp: "118/76", pulse: "88 bpm", temp: "38.4°C", weight: "69 kg" }, notes: "Rapid strep positive. Prescribed Amoxicillin 7-day course. Advised rest and fluids. Follow up if no improvement in 48 hours." },
  { id: "vis-004", doctor: "Dr. Leila Farooq", specialty: "Allergy & Immunology", facility: "Bay Area Allergy Center", date: "2024-05-22", diagnosis: "Seasonal allergic rhinitis", vitals: { bp: "120/78", pulse: "70 bpm", temp: "36.6°C", weight: "70 kg" }, notes: "Skin prick test performed. Sensitized to birch and oak tree pollen, dust mites. Started Cetirizine 10 mg. Nasal rinse recommended." },
  { id: "vis-005", doctor: "Dr. Priya Mehta", specialty: "General Practice", facility: "Sunrise Family Clinic", date: "2024-01-18", diagnosis: "Annual wellness examination", vitals: { bp: "120/78", pulse: "68 bpm", temp: "36.7°C", weight: "70 kg" }, notes: "All vaccinations up to date. BMI 25.7 — within normal range. No acute concerns. Colonoscopy recommended at age 40. Skin check clear." },
];

const ALLERGIES: Allergy[] = [
  { id: "alg-001", allergen: "Ibuprofen (NSAIDs)", type: "medication", reaction: "Gastrointestinal bleeding, severe stomach cramps", severity: "severe", diagnosed: "2024-03-10", flagged: true },
  { id: "alg-002", allergen: "Penicillin", type: "medication", reaction: "Urticaria, facial angioedema", severity: "severe", diagnosed: "2018-06-04", flagged: true },
  { id: "alg-003", allergen: "Birch & Oak Pollen", type: "environmental", reaction: "Rhinitis, conjunctivitis, sneezing", severity: "moderate", diagnosed: "2024-05-22", flagged: false },
  { id: "alg-004", allergen: "Shellfish", type: "food", reaction: "Hives, lip and tongue swelling", severity: "moderate", diagnosed: "2015-09-12", flagged: false },
  { id: "alg-005", allergen: "Latex", type: "other", reaction: "Contact dermatitis, rash", severity: "mild", diagnosed: "2020-11-03", flagged: false },
];

const REMINDERS = [
  { medicine: "Metformin HCl 500 mg", time: "8:00 AM", taken: true, dose: "With breakfast" },
  { medicine: "Atorvastatin 20 mg", time: "10:00 PM", taken: false, dose: "At bedtime" },
  { medicine: "Metformin HCl 500 mg", time: "6:00 PM", taken: false, dose: "With dinner" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function statusPill(status: string) {
  const map: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    completed: "bg-sky-50 text-sky-700 border-sky-200",
    discontinued: "bg-gray-100 text-gray-500 border-gray-200",
    normal: "bg-emerald-50 text-emerald-700 border-emerald-200",
    abnormal: "bg-amber-50 text-amber-700 border-amber-200",
    critical: "bg-red-50 text-red-700 border-red-200",
    mild: "bg-yellow-50 text-yellow-700 border-yellow-200",
    moderate: "bg-orange-50 text-orange-700 border-orange-200",
    severe: "bg-red-50 text-red-700 border-red-200",
  };
  return map[status] ?? "bg-gray-100 text-gray-500 border-gray-200";
}

// ─── StatusBadge component ────────────────────────────────────────────────────

function StatusBadge({ label, cls }: { label: string; cls: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {label}
    </span>
  );
}

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") return <TrendingUp size={11} className="text-amber-500" />;
  if (trend === "down") return <TrendingDown size={11} className="text-emerald-500" />;
  return <Minus size={11} className="text-muted-foreground" />;
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("amara.nwosu@email.com");
  const [password, setPassword] = useState("password123");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(onLogin, 1100);
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-[420px] flex-col bg-primary text-primary-foreground p-10 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 70%, #ffffff 0%, transparent 60%), radial-gradient(circle at 80% 20%, #00A896 0%, transparent 50%)" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-14">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <HeartPulse size={18} className="text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>MedRecord</span>
          </div>
          <h2 className="text-3xl font-semibold leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Your lifelong<br />health profile,<br />always with you.
          </h2>
          <p className="text-primary-foreground/70 text-sm leading-relaxed mb-10">
            Prescriptions, lab results, visit history, and allergies — securely stored and accessible in seconds.
          </p>
          <div className="space-y-4">
            {[
              { icon: <Shield size={15} />, text: "HIPAA-compliant secure storage" },
              { icon: <FileText size={15} />, text: "Digitalized prescriptions & records" },
              { icon: <Share2 size={15} />, text: "Share with any doctor or pharmacy" },
              { icon: <Bell size={15} />, text: "Medication reminders & alerts" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">{f.icon}</div>
                {f.text}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 mt-auto text-xs text-primary-foreground/40">
          © 2024 MedRecord Health Technologies
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <HeartPulse size={16} className="text-primary-foreground" />
            </div>
            <span className="text-base font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>MedRecord</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Sign in to your account
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Access your personal health records securely.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                Remember me for 30 days
              </label>
              <button type="button" className="text-xs text-primary font-medium hover:underline">Forgot password?</button>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…</>
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>
          </form>
          <div className="mt-5 p-3 rounded-lg bg-muted border border-border text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Demo:</span> Use any password with the pre-filled email.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Selection ────────────────────────────────────────────────────────

function ProfileScreen({ onSelect }: { onSelect: (p: PatientProfile) => void }) {
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        {PROFILES.map((p) => (
          <button key={p.id} onClick={() => onSelect(p)}
            className="bg-card border border-border rounded-xl p-5 text-left hover:border-primary/40 hover:shadow-md transition-all group">
            <img src={p.photo} alt={p.name}
              className="w-14 h-14 rounded-full object-cover bg-muted mb-3 group-hover:ring-2 group-hover:ring-primary/30 transition-all" />
            <div className="text-sm font-semibold text-foreground mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.name}</div>
            <div className="text-xs text-muted-foreground mb-3">{p.relation}</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
                {p.bloodType}
              </span>
              <span className="text-xs text-muted-foreground">{p.dob.split(" ").slice(1).join(" ")}</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View records <ChevronRight size={12} />
            </div>
          </button>
        ))}
      </div>
      <button className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <Plus size={14} /> Add a family member
      </button>
    </div>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────

// `patient` is unused: the mock lists below aren't scoped per-patient yet.
function DashboardTab({ patient: _patient, setTab }: { patient: PatientProfile; setTab: (t: Tab) => void }) {
  const activeRx = PRESCRIPTIONS.filter((p) => p.status === "active").length;
  const abnormalLabs = LAB_REPORTS.filter((l) => l.status !== "normal").length;
  const severeAlgys = ALLERGIES.filter((a) => a.severity === "severe").length;
  const takenToday = REMINDERS.filter((r) => r.taken).length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: "Active Medications", value: activeRx, sub: "prescriptions", icon: <PillIcon size={16} />, bg: "bg-secondary", color: "text-primary", tab: "prescriptions" as Tab },
          { label: "Lab Reports", value: LAB_REPORTS.length, sub: `${abnormalLabs} need review`, icon: <FlaskConical size={16} />, bg: "bg-sky-50", color: "text-sky-600", tab: "labs" as Tab },
          { label: "Clinic Visits", value: VISITS.length, sub: "recorded", icon: <CalendarDays size={16} />, bg: "bg-violet-50", color: "text-violet-600", tab: "visits" as Tab },
          { label: "Known Allergies", value: ALLERGIES.length, sub: `${severeAlgys} flagged severe`, icon: <AlertTriangle size={16} />, bg: "bg-rose-50", color: "text-rose-600", tab: "allergies" as Tab },
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
            {ALLERGIES.filter((a) => a.flagged).map((a) => (
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
            {LAB_REPORTS.filter((l) => l.status === "critical").map((l) => (
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
            {PRESCRIPTIONS.filter((p) => p.status === "active").map((rx) => (
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
          {VISITS.slice(0, 3).map((v) => (
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

// ─── Prescriptions Tab ────────────────────────────────────────────────────────

function PrescriptionsTab({ onAdd }: { onAdd: () => void }) {
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "discontinued">("all");
  const filtered = filter === "all" ? PRESCRIPTIONS : PRESCRIPTIONS.filter((p) => p.status === filter);

  return (
    <div>
      <TabHeader title="Prescriptions" count={PRESCRIPTIONS.length} onAdd={onAdd} />
      <div className="flex gap-2 mb-5 flex-wrap">
        {(["all", "active", "completed", "discontinued"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-1.5 opacity-60" style={{ fontFamily: "'DM Mono', monospace" }}>
              {f === "all" ? PRESCRIPTIONS.length : PRESCRIPTIONS.filter((p) => p.status === f).length}
            </span>
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((rx) => (
          <div key={rx.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <PillIcon size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>{rx.medicine}</div>
                  <div className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {rx.dosage} · {rx.frequency}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge label={rx.status} cls={statusPill(rx.status)} />
                <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Download">
                  <Download size={13} />
                </button>
                <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Share">
                  <Share2 size={13} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 mb-4">
              {[
                { label: "Duration", value: rx.duration },
                { label: "Refills remaining", value: rx.refills.toString() },
                { label: "Prescribed by", value: rx.doctor },
                { label: "Date", value: formatDate(rx.date) },
                { label: "Facility", value: rx.facility },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-xs text-muted-foreground mb-0.5">{f.label}</div>
                  <div className="text-xs font-medium text-foreground">{f.value}</div>
                </div>
              ))}
            </div>
            {rx.notes && (
              <div className="px-3 py-2 bg-muted rounded-lg text-xs text-muted-foreground flex gap-2">
                <FileText size={11} className="mt-0.5 flex-shrink-0" />
                {rx.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Lab Reports Tab ──────────────────────────────────────────────────────────

function LabsTab({ onAdd }: { onAdd: () => void }) {
  const [filter, setFilter] = useState<"all" | "normal" | "abnormal" | "critical">("all");
  const filtered = filter === "all" ? LAB_REPORTS : LAB_REPORTS.filter((l) => l.status === filter);

  return (
    <div>
      <TabHeader title="Lab Reports" count={LAB_REPORTS.length} onAdd={onAdd} />
      <div className="flex gap-2 mb-5 flex-wrap">
        {(["all", "normal", "abnormal", "critical"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-2 px-5 py-3 border-b border-border bg-muted/60">
          {[
            { label: "Test Name", span: "col-span-3" },
            { label: "Result", span: "col-span-2" },
            { label: "Reference", span: "col-span-2" },
            { label: "Lab / Ordered by", span: "col-span-3" },
            { label: "Date", span: "col-span-1" },
            { label: "Status", span: "col-span-1" },
          ].map((h) => (
            <div key={h.label} className={`text-xs font-medium text-muted-foreground ${h.span}`} style={{ fontFamily: "'DM Mono', monospace" }}>
              {h.label}
            </div>
          ))}
        </div>
        <div className="divide-y divide-border">
          {filtered.map((lab) => (
            <div key={lab.id} className="px-5 py-3.5 hover:bg-muted/30 transition-colors flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center">
              <div className="sm:col-span-3 text-sm font-medium text-foreground">{lab.test}</div>
              <div className="sm:col-span-2 flex items-center gap-1.5">
                <span className={`text-sm font-bold ${lab.status === "critical" ? "text-red-600" : lab.status === "abnormal" ? "text-amber-600" : "text-emerald-600"}`}
                  style={{ fontFamily: "'DM Mono', monospace" }}>
                  {lab.result}
                </span>
                <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{lab.unit}</span>
                <TrendIcon trend={lab.trend} />
              </div>
              <div className="sm:col-span-2 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{lab.referenceRange}</div>
              <div className="sm:col-span-3 text-xs text-muted-foreground">
                <div>{lab.lab}</div>
                <div className="text-muted-foreground/70">{lab.orderedBy}</div>
              </div>
              <div className="sm:col-span-1 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                {formatDate(lab.date)}
              </div>
              <div className="sm:col-span-1">
                <StatusBadge label={lab.status} cls={statusPill(lab.status)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Visits Tab ───────────────────────────────────────────────────────────────

function VisitsTab({ onAdd }: { onAdd: () => void }) {
  const [expanded, setExpanded] = useState<string | null>("vis-001");

  return (
    <div>
      <TabHeader title="Visit History" count={VISITS.length} onAdd={onAdd} />
      <div className="space-y-3">
        {VISITS.map((v) => (
          <div key={v.id} className={`bg-card border rounded-xl overflow-hidden transition-all ${expanded === v.id ? "border-primary/30 shadow-sm" : "border-border"}`}>
            <button onClick={() => setExpanded(expanded === v.id ? null : v.id)}
              className="w-full px-5 py-4 text-left flex items-start gap-3 hover:bg-muted/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                <Stethoscope size={16} className="text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>{v.diagnosis}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{v.doctor} · {v.specialty}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{v.facility}</div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-muted-foreground hidden sm:block" style={{ fontFamily: "'DM Mono', monospace" }}>{formatDate(v.date)}</span>
                <ChevronDown size={15} className={`text-muted-foreground transition-transform ${expanded === v.id ? "rotate-180" : ""}`} />
              </div>
            </button>
            {expanded === v.id && (
              <div className="border-t border-border">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 py-4 bg-muted/30">
                  {[
                    { label: "Blood Pressure", value: v.vitals.bp },
                    { label: "Pulse", value: v.vitals.pulse },
                    { label: "Temperature", value: v.vitals.temp },
                    { label: "Weight", value: v.vitals.weight },
                  ].map((vt) => (
                    <div key={vt.label} className="bg-card rounded-lg px-3 py-2.5 border border-border">
                      <div className="text-xs text-muted-foreground mb-0.5">{vt.label}</div>
                      <div className="text-sm font-semibold text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{vt.value}</div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-4">
                  <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>Clinical Notes</div>
                  <p className="text-sm text-foreground leading-relaxed">{v.notes}</p>
                  <div className="flex gap-2 mt-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted transition-colors">
                      <Download size={12} /> Download PDF
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted transition-colors">
                      <Share2 size={12} /> Share
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Allergies Tab ────────────────────────────────────────────────────────────

function AllergiesTab({ onAdd }: { onAdd: () => void }) {
  return (
    <div>
      <TabHeader title="Allergies & Adverse Reactions" count={ALLERGIES.length} onAdd={onAdd} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ALLERGIES.map((a) => (
          <div key={a.id} className={`bg-card border rounded-xl p-5 ${a.severity === "severe" ? "border-red-200" : "border-border"}`}>
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  a.severity === "severe" ? "bg-red-50" : a.severity === "moderate" ? "bg-orange-50" : "bg-yellow-50"
                }`}>
                  {a.type === "medication" ? <Syringe size={15} className={a.severity === "severe" ? "text-red-600" : "text-orange-500"} /> :
                   a.type === "food" ? <span className="text-sm">🍽</span> :
                   a.type === "environmental" ? <span className="text-sm">🌿</span> :
                   <ShieldAlert size={15} className="text-yellow-600" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.allergen}</div>
                  <div className="text-xs text-muted-foreground capitalize">{a.type}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <StatusBadge label={a.severity} cls={statusPill(a.severity)} />
                {a.flagged && (
                  <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <ShieldAlert size={10} /> Flagged
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Reaction</div>
                <div className="text-xs text-foreground">{a.reaction}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">First diagnosed</div>
                  <div className="text-xs font-medium text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{formatDate(a.diagnosed)}</div>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                  <Share2 size={11} /> Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Add Record Modal ─────────────────────────────────────────────────────────

function AddRecordModal({ onClose, defaultType }: { onClose: () => void; defaultType: Tab }) {
  const [type, setType] = useState<string>(defaultType === "dashboard" ? "prescriptions" : defaultType);
  const [uploadMode, setUploadMode] = useState<"manual" | "upload">("manual");
  const [done, setDone] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    setTimeout(onClose, 1300);
  }

  const inputCls = "w-full px-3 py-2.5 rounded-lg border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: "rgba(15,17,23,0.5)" }}>
      <div className="bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div>
            <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>Add New Record</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Linked to your patient profile</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"><X size={15} /></button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center py-12 px-5 gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
              <CheckCircle2 size={28} className="text-emerald-600" />
            </div>
            <div className="text-base font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>Record saved successfully</div>
            <div className="text-sm text-muted-foreground text-center">Your record has been added to your patient profile.</div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="overflow-y-auto flex-1">
            <div className="p-5 space-y-4">
              <div>
                <label className={labelCls}>Record Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <option value="prescriptions">Prescription</option>
                  <option value="labs">Lab Report</option>
                  <option value="visits">Visit Record</option>
                  <option value="allergies">Allergy</option>
                </select>
              </div>
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                {(["manual", "upload"] as const).map((m) => (
                  <button key={m} type="button" onClick={() => setUploadMode(m)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                      uploadMode === m ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {m === "manual" ? <><FileText size={12} /> Manual Entry</> : <><Upload size={12} /> Upload Document</>}
                  </button>
                ))}
              </div>
              {uploadMode === "upload" ? (
                <div className="border-2 border-dashed border-border rounded-xl py-10 flex flex-col items-center gap-3 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Paperclip size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground mb-0.5">Drop your document here</div>
                    <div className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10 MB</div>
                  </div>
                  <button type="button" className="px-4 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                    Browse files
                  </button>
                </div>
              ) : (
                <>
                  {type === "prescriptions" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Medicine Name</label><input type="text" placeholder="e.g. Metformin HCl" className={inputCls} required /></div>
                        <div><label className={labelCls}>Dosage</label><input type="text" placeholder="e.g. 500 mg" className={inputCls} required /></div>
                      </div>
                      <div><label className={labelCls}>Frequency</label><input type="text" placeholder="e.g. Twice daily with meals" className={inputCls} required /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Duration</label><input type="text" placeholder="e.g. 30 days" className={inputCls} /></div>
                        <div><label className={labelCls}>Refills</label><input type="number" placeholder="0" min="0" className={inputCls} /></div>
                      </div>
                      <div><label className={labelCls}>Prescribing Doctor</label><input type="text" placeholder="e.g. Dr. Priya Mehta" className={inputCls} required /></div>
                      <div><label className={labelCls}>Facility / Clinic</label><input type="text" placeholder="e.g. Sunrise Family Clinic" className={inputCls} /></div>
                    </div>
                  )}
                  {type === "labs" && (
                    <div className="space-y-3">
                      <div><label className={labelCls}>Test Name</label><input type="text" placeholder="e.g. Fasting Blood Glucose" className={inputCls} required /></div>
                      <div className="grid grid-cols-3 gap-3">
                        <div><label className={labelCls}>Result</label><input type="text" placeholder="118" className={inputCls} required /></div>
                        <div><label className={labelCls}>Unit</label><input type="text" placeholder="mg/dL" className={inputCls} /></div>
                        <div><label className={labelCls}>Reference</label><input type="text" placeholder="70–99" className={inputCls} /></div>
                      </div>
                      <div><label className={labelCls}>Lab / Facility</label><input type="text" placeholder="e.g. Quest Diagnostics" className={inputCls} /></div>
                      <div><label className={labelCls}>Ordered by</label><input type="text" placeholder="e.g. Dr. Priya Mehta" className={inputCls} /></div>
                      <div><label className={labelCls}>Status</label>
                        <select className={inputCls}><option>Normal</option><option>Abnormal</option><option>Critical</option></select>
                      </div>
                    </div>
                  )}
                  {type === "visits" && (
                    <div className="space-y-3">
                      <div><label className={labelCls}>Doctor / Provider</label><input type="text" placeholder="e.g. Dr. Carlos Rivera" className={inputCls} required /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Specialty</label><input type="text" placeholder="e.g. Cardiology" className={inputCls} /></div>
                        <div><label className={labelCls}>Facility</label><input type="text" placeholder="e.g. UCSF Medical" className={inputCls} /></div>
                      </div>
                      <div><label className={labelCls}>Diagnosis / Reason</label><input type="text" placeholder="e.g. Hypertension — initial diagnosis" className={inputCls} required /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Blood Pressure</label><input type="text" placeholder="e.g. 120/80" className={inputCls} /></div>
                        <div><label className={labelCls}>Pulse</label><input type="text" placeholder="e.g. 72 bpm" className={inputCls} /></div>
                      </div>
                      <div><label className={labelCls}>Clinical Notes</label>
                        <textarea rows={3} placeholder="Notes from the visit…"
                          className="w-full px-3 py-2.5 rounded-lg border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                      </div>
                    </div>
                  )}
                  {type === "allergies" && (
                    <div className="space-y-3">
                      <div><label className={labelCls}>Allergen</label><input type="text" placeholder="e.g. Penicillin" className={inputCls} required /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Type</label>
                          <select className={inputCls}><option>Medication</option><option>Food</option><option>Environmental</option><option>Other</option></select>
                        </div>
                        <div><label className={labelCls}>Severity</label>
                          <select className={inputCls}><option>Mild</option><option>Moderate</option><option>Severe</option></select>
                        </div>
                      </div>
                      <div><label className={labelCls}>Reaction / Symptoms</label><input type="text" placeholder="e.g. Hives, difficulty breathing" className={inputCls} required /></div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="flag-allergy" className="rounded border-border" />
                        <label htmlFor="flag-allergy" className="text-sm text-foreground cursor-pointer">Flag as critical — alert all providers</label>
                      </div>
                    </div>
                  )}
                  <div><label className={labelCls}>Date</label>
                    <input type="date" defaultValue={new Date().toISOString().split("T")[0]} className={inputCls} />
                  </div>
                  <div><label className={labelCls}>Additional Notes (optional)</label>
                    <textarea rows={2} placeholder="Any additional context…"
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  </div>
                </>
              )}
            </div>
            <div className="px-5 pb-5 pt-4 flex gap-2 justify-end border-t border-border">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Save Record
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Tab Header ───────────────────────────────────────────────────────────────

function TabHeader({ title, count, onAdd }: { title: string; count: number; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-baseline gap-2.5">
        <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>{title}</h2>
        <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{count} records</span>
      </div>
      <button onClick={onAdd}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Plus size={13} /> Add Record
      </button>
    </div>
  );
}

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: (a) => <HeartPulse size={16} className={a ? "text-primary" : ""} /> },
  { id: "prescriptions", label: "Prescriptions", icon: (a) => <PillIcon size={16} className={a ? "text-primary" : ""} /> },
  { id: "labs", label: "Lab Reports", icon: (a) => <FlaskConical size={16} className={a ? "text-primary" : ""} /> },
  { id: "visits", label: "Visit History", icon: (a) => <CalendarDays size={16} className={a ? "text-primary" : ""} /> },
  { id: "allergies", label: "Allergies", icon: (a) => <AlertTriangle size={16} className={a ? "text-primary" : ""} /> },
];

// ─── App Shell ────────────────────────────────────────────────────────────────

function AppShell({ patient, onLogout }: { patient: PatientProfile; onLogout: () => void }) {
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

// ─── Root ─────────────────────────────────────────────────────────────────────

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
