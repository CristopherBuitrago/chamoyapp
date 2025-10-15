import { useEffect, useMemo, useState } from "react"
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
} from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import {
    fetchTopContractTypes,
    type ContractTypeStat,
} from "../../../entities/reports/lib/mock"

const COLORS = ["#DB8367", "#295BA7", "#7D85BF", "#0099DB", "#F1C27D"]

export function TopContractTypesCard() {
    const [data, setData] = useState<ContractTypeStat[] | null>(null)

    useEffect(() => {
        fetchTopContractTypes().then(setData)
    }, [])

    const total = useMemo(
        () => (data ?? []).reduce((acc, d) => acc + d.count, 0),
        [data]
    )

    if (!data) {
        return (
            <div className="h-[240px] rounded-xl border border-brand-accent/30 bg-brand-accent/10 animate-pulse" />
        )
    }

    // Datos con % calculado para etiquetas/tooltip
    const chartData = data.map((d) => ({
        name: d.type,
        value: d.count,
        pct: total ? (d.count / total) * 100 : 0,
    }))

    return (
        <section className="rounded-xl border border-brand-accent/30 bg-brand-accent/10 px-6 py-4 shadow-sm">
            {/* Título centrado */}
            <h3 className="text-lg font-display font-semibold text-ink text-center mb-2">
                Tipos de contratos más solicitados
            </h3>

            <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={2}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            // etiqueta corta: NOMBRE (XX %)
                            label={(entry: any) => `${entry.name} (${Math.round(entry.pct)}%)`}
                        >
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value: ValueType, _name: NameType, props: any) => {
                                const pct = Number(props?.payload?.pct ?? 0).toFixed(1)
                                const v = typeof value === "number" ? value : Number(value ?? 0)
                                return [`${v} (${pct}%)`, "Solicitudes"]
                            }}
                            contentStyle={{
                                backgroundColor: "rgba(255,255,255,0.95)",
                                borderRadius: 8,
                                border: "1px solid #DB8367",
                            }}
                        />

                        <Legend
                            verticalAlign="bottom"
                            height={24}
                            wrapperStyle={{ color: "#273055", fontSize: 12 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}
