import { useState } from "react";
import { Pill as PillIcon, Download, Share2, FileText } from "lucide-react";
import { TabHeader } from "../../ui/TabHeader";
import { StatusBadge } from "../../ui/StatusBadge";
import { formatDate, statusPill } from "../../../utils/format";
import type { Prescription } from "../../../types/patient";

export function PrescriptionsTab({
  onAdd,
  prescriptions,
  loading,
  error,
}: {
  onAdd: () => void;
  prescriptions: Prescription[];
  loading: boolean;
  error: string | null;
}) {
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "discontinued">("all");
  const filtered = filter === "all" ? prescriptions : prescriptions.filter((p) => p.status === filter);

  return (
    <div>
      <TabHeader title="Prescriptions" count={prescriptions.length} onAdd={onAdd} />
      <div className="flex gap-2 mb-5 flex-wrap">
        {(["all", "active", "completed", "discontinued"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-1.5 opacity-60" style={{ fontFamily: "'DM Mono', monospace" }}>
              {f === "all" ? prescriptions.length : prescriptions.filter((p) => p.status === f).length}
            </span>
          </button>
        ))}
      </div>
      {loading && <p className="text-sm text-muted-foreground">Loading prescriptions…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
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
