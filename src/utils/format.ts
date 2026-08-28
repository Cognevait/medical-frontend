export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export function statusPill(status: string) {
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
