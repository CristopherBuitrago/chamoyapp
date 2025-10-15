import { Download, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ReportKPI } from "../../../entities/reports/model/types";

const PALETTE = {
  blue:   "bg-blue-100/60 border-blue-300/60",
  yellow: "bg-yellow-100/60 border-yellow-300/60",
  orange: "bg-orange-100/60 border-orange-300/60",
  violet: "bg-violet-100/60 border-violet-300/60",
  green:  "bg-green-100/60 border-green-300/60",
};

const pctColor = (n: number) =>
  n > 0 ? "text-emerald-600" : n < 0 ? "text-rose-600" : "text-ink-light";

const TrendIcon = ({ v }: { v: ReportKPI["trend"] }) =>
  v === "up" ? <TrendingUp className="h-5 w-5 text-emerald-600" /> :
  v === "down" ? <TrendingDown className="h-5 w-5 text-rose-600" /> :
  <Minus className="h-5 w-5 text-ink-light" />;

export function ReportCard({ kpi }: { kpi: ReportKPI }) {
  return (
    <div
      className={[
        "w-[320px] h-[152px]",
        "rounded-xl border",
        "px-5 py-4 select-none",
        "grid grid-rows-[auto,64px,auto] gap-1",
        PALETTE[kpi.color],
      ].join(" ")}
    >
      <div className="flex items-center justify-between min-h-[28px]">
        <h3 className="text-base font-display tracking-wide text-ink">{kpi.title}</h3>
        <div className="flex items-center gap-2 text-ink/70">
          <Filter className="h-5 w-5 hover:opacity-80 transition" />
          <Download className="h-5 w-5 hover:opacity-80 transition" />
          <TrendIcon v={kpi.trend} />
        </div>
      </div>

      <div className="h-full flex items-center">
        <span
          className={[
            "text-4xl font-semibold leading-none tabular-nums",
            pctColor(kpi.deltaPct),
          ].join(" ")}
        >
          {kpi.deltaPct > 0 ? "+" : ""}
          {kpi.deltaPct} %
        </span>
      </div>

      <p className="text-sm text-ink/70 leading-snug line-clamp-2">{kpi.note}</p>
    </div>
  );
}
