import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAdminHeaderKPIs } from "../../../entities/reports/lib/mock";
import type { ReportKPI } from "../../../entities/reports/model/types";
import { ReportCard } from "./ReportCard";

const EPS = 2; // tolerancia

export function ReportsStrip() {
  const [items, setItems] = useState<ReportKPI[] | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    fetchAdminHeaderKPIs().then(setItems);
  }, []);

  const syncEdges = () => {
    const el = railRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft <= EPS);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - EPS);
  };

  const scrollBy = (dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    const step = Math.max(340, Math.round(el.clientWidth * 0.9));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    syncEdges();
    const onScroll = () => syncEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncEdges);
    };
  }, []);

  useEffect(() => {
    if (!items) return;
    requestAnimationFrame(syncEdges);
  }, [items]);

  if (!items)
    return <div className="h-[156px] rounded-xl bg-white/5 animate-pulse" />;

  return (
    <div className="relative pt-5">
      {/* Flecha izquierda */}
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Anterior"
        className={[
          "absolute -left-6 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 shadow-md",
          "bg-white/90 text-ink hover:bg-white hover:scale-105 transition-transform duration-150",
        ].join(" ")}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Flecha derecha */}
      <button
        onClick={() => scrollBy(1)}
        aria-label="Siguiente"
        className={[
          "absolute -right-5 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 shadow-md",
          "bg-white/90 text-ink hover:bg-white hover:scale-105 transition-transform duration-150",
        ].join(" ")}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Fades laterales */}
      {!atStart && (
        <div className="fade-left absolute left-0 top-0 h-full w-10 z-10 pointer-events-none" />
      )}
      {!atEnd && (
        <div className="fade-right absolute right-0 top-0 h-full w-10 z-10 pointer-events-none" />
      )}

      {/* Rail scrollable */}
      <div
        ref={railRef}
        className={[
          "no-scrollbar overflow-x-auto",
          "edge-fade",
          "px-3 select-none",
        ].join(" ")}
      >
        <div className="flex gap-6 py-2 whitespace-nowrap">
          <div className="shrink-0 w-2" />
          {items.map((k) => (
            <div key={k.id} className="inline-block shrink-0">
              <ReportCard kpi={k} />
            </div>
          ))}
          <div className="shrink-0 w-2" />
        </div>
      </div>
    </div>
  );
}
