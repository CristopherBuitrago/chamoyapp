import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fetchResponseMarginByCategory, type ResponseCategory } from "../../../entities/reports/lib/mock";

export function ResponseMarginCard() {
  const [data, setData] = useState<ResponseCategory[]>([]);

  useEffect(() => {
    fetchResponseMarginByCategory().then(setData);
  }, []);

  return (
    <section className="rounded-xl border border-brand-accent/30 bg-brand-accent/10 px-2 py-2 shadow-sm">
      {/* Título centrado */}
      <h3 className="text-lg font-display font-semibold text-ink text-center mb-2">
        Margen de respuesta por categoría
      </h3>

      {/* Contenedor del gráfico */}
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 15, left: 0 }}
            barCategoryGap="30%" // más espacio entre barras
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="category"
              stroke="#273055"
              tick={{ fill: "#273055", fontSize: 12 }}
            />
            <YAxis
              stroke="#273055"
              tick={{ fill: "#273055", fontSize: 11 }}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "8px",
                border: "1px solid #DB8367",
              }}
            />
            <Bar
              dataKey="horas"
              fill="#DB8367"
              radius={[6, 6, 0, 0]}
              maxBarSize={40} // controla el ancho de las barras
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
