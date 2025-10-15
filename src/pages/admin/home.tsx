"use client"

import { ReportsStrip } from "../../widgets/reports-contracts/ui/ReportsStrip"
import { ResponseMarginCard } from "../../widgets/reports-contracts/ui/ResponseMarginCard";
import { TopContractTypesCard } from "../../widgets/reports-contracts/ui/TopContractTypesCard";

export default function AdminHome() {
  return (
    <div className="space-y-6">
      {/* Fila 1: tira de KPIs */}
      <ReportsStrip />

      {/* Fila 2: grid a 2 columnas */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponseMarginCard />
        <TopContractTypesCard/>
      </section>
    </div>
  );
}
