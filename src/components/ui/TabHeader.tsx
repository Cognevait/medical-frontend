import { Plus } from "lucide-react";

export function TabHeader({ title, count, onAdd }: { title: string; count: number; onAdd: () => void }) {
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
