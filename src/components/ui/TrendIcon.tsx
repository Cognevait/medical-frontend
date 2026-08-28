import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") return <TrendingUp size={11} className="text-amber-500" />;
  if (trend === "down") return <TrendingDown size={11} className="text-emerald-500" />;
  return <Minus size={11} className="text-muted-foreground" />;
}
