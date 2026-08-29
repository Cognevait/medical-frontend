import { useState } from "react";
import { Stethoscope, ChevronDown, Download, Share2 } from "lucide-react";
import { TabHeader } from "../../ui/TabHeader";
import { formatDate } from "../../../utils/format";
import type { Visit } from "../../../types/patient";

export function VisitsTab({
  onAdd,
  visits,
  loading,
  error,
}: {
  onAdd: () => void;
  visits: Visit[];
  loading: boolean;
  error: string | null;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <TabHeader title="Visit History" count={visits.length} onAdd={onAdd} />
      {loading && <p className="text-sm text-muted-foreground mb-3">Loading visits…</p>}
      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      <div className="space-y-3">
        {visits.map((v) => (
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
