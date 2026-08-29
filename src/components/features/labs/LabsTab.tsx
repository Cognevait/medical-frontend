import { useState } from "react";
import { TabHeader } from "../../ui/TabHeader";
import { StatusBadge } from "../../ui/StatusBadge";
import { TrendIcon } from "../../ui/TrendIcon";
import { formatDate, statusPill } from "../../../utils/format";
import type { LabReport } from "../../../types/patient";

export function LabsTab({
  onAdd,
  labs,
  loading,
  error,
}: {
  onAdd: () => void;
  labs: LabReport[];
  loading: boolean;
  error: string | null;
}) {
  const [filter, setFilter] = useState<"all" | "normal" | "abnormal" | "critical">("all");
  const filtered = filter === "all" ? labs : labs.filter((l) => l.status === filter);

  return (
    <div>
      <TabHeader title="Lab Reports" count={labs.length} onAdd={onAdd} />
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
      {loading && <p className="text-sm text-muted-foreground mb-3">Loading lab reports…</p>}
      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
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
