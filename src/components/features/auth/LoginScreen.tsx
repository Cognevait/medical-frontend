import { useState } from "react";
import { HeartPulse, Shield, FileText, Share2, Bell, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuthStore } from "../../../stores/authStore";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [email, setEmail] = useState("amara.nwosu@email.com");
  const [password, setPassword] = useState("password123");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    try {
      await login(email, password);
      onLogin();
    } catch {
      setFormError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
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
            {formError && (
              <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
                {formError}
              </div>
            )}
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
            <span className="font-medium text-foreground">Demo:</span> Sign in with the pre-filled email and password.
          </div>
        </div>
      </div>
    </div>
  );
}
