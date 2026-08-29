import { Syringe, ShieldAlert, Share2 } from "lucide-react";
import { TabHeader } from "../../ui/TabHeader";
import { StatusBadge } from "../../ui/StatusBadge";
import { formatDate, statusPill } from "../../../utils/format";
import type { Allergy } from "../../../types/patient";

export function AllergiesTab({
  onAdd,
  allergies,
  loading,
  error,
}: {
  onAdd: () => void;
  allergies: Allergy[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <div>
      <TabHeader title="Allergies & Adverse Reactions" count={allergies.length} onAdd={onAdd} />
      {loading && <p className="text-sm text-muted-foreground mb-3">Loading allergies…</p>}
      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allergies.map((a) => (
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
