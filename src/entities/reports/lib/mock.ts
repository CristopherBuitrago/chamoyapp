import type { ReportKPI } from "../model/types"

// Simula fetch de KPIs para el header admin
export async function fetchAdminHeaderKPIs(): Promise<ReportKPI[]> {
    // Simula latencia
    await new Promise(r => setTimeout(r, 200))
    return [
        { id: "requested", title: "SOLICITADOS", deltaPct: +70, note: "14 contratos más que el anterior mes", trend: "up", color: "blue" },
        { id: "discussion", title: "EN DISCUSIÓN", deltaPct: +6, note: "3 contratos más que el anterior mes", trend: "up", color: "yellow" },
        { id: "solved", title: "RESUELTOS", deltaPct: -20, note: "menos margen de error que el anterior mes", trend: "down", color: "orange" },
        { id: "special", title: "ESPECIALES", deltaPct: +20, note: "9 contratos más que el anterior mes", trend: "up", color: "violet" },
        { id: "delivered", title: "ENTREGADOS", deltaPct: +50, note: "10 contratos más que el anterior mes", trend: "up", color: "green" },
    ]
}

// --- margen de respuesta por categoría ------------------------------
export type ResponseCategory = {
  category: string;   // nombre de la categoría
  horas: number;   // promedio en horas
};

export async function fetchResponseMarginByCategory(): Promise<ResponseCategory[]> {
  // Simulamos fetch
  return Promise.resolve([
    { category: "CONCESIÓN", horas: 1.0 },
    { category: "OPS",       horas: 2.0 },
    { category: "NDA",       horas: 0.5 },
  ]);
}

// --- Tipos de contratos más solicitados ------------------------------
export type ContractTypeStat = {
  type: string
  count: number
}

export async function fetchTopContractTypes(): Promise<ContractTypeStat[]> {
  // mock asincrónico
  await new Promise(r => setTimeout(r, 220))
  return [
    { type: "CONCESIÓN",  count: 12 },
    { type: "OPS",        count: 9  },
    { type: "NDA",        count: 6  },
    { type: "ARREND.",    count: 3  },
  ]
}
