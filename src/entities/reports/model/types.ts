export type Trend = "up" | "down" | "flat"

export type ReportKPI = {
    id: string
    title: string // Estado de contrato
    deltaPct: number // porcentaje rendimiento +70, -20, etc
    note: string // Descripcion de la metrica
    trend: Trend // flechas de estado - up | down | flat
    color: "blue" | "yellow" | "orange" | "violet" | "green" // para estados
}
