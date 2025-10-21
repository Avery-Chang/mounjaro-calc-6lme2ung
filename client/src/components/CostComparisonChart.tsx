import { CalculationResult } from "@/lib/calculator";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CostComparisonChartProps {
  results: CalculationResult[];
  targetMg: number;
}

// 猛健樂減肥筆配色（按劑量順序：2.5mg, 5mg, 7.5mg, 10mg, 12.5mg, 15mg）
const MOUNJARO_COLORS: Record<string, string> = {
  "2.5 mg / 0.6 mL": "#9CA3AF", // 2.5mg - 灰色
  "5 mg / 0.6 mL": "#7C3AED",   // 5mg - 深紫
  "7.5 mg / 0.6 mL": "#14B8A6", // 7.5mg - 青綠
  "10 mg / 0.6 mL": "#EC4899",  // 10mg - 粉紅
  "12.5 mg / 0.6 mL": "#06B6D4", // 12.5mg - 天藍
  "15 mg / 0.6 mL": "#F97316",  // 15mg - 橘色
};

export default function CostComparisonChart({
  results,
  targetMg,
}: CostComparisonChartProps) {
  const { t } = useLanguage();
  
  if (results.length === 0) return null;

  // 計算每個規格的每 mg 成本和可施打次數
  const chartData = results.map((result) => {
    const volumePerDose = result.requiredUnits * 0.1; // 每次施打需要的 mL
    const dosesPerPen = 2.4 / volumePerDose; // 每支筆可施打次數
    
    return {
      name: result.specification.label,
      costPerMg: parseFloat(result.costPerMg.toFixed(2)),
      doses: parseFloat(dosesPerPen.toFixed(2)),
      color: MOUNJARO_COLORS[result.specification.label] || "#8B5CF6",
    };
  });

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <YAxis
            label={{
              value: t.perMgCostLabel,
              angle: -90,
              position: "insideLeft",
              style: { fill: "hsl(var(--foreground))" },
            }}
            tick={{ fill: "hsl(var(--foreground))" }}
            tickFormatter={(value) => `${value.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                    <p className="font-semibold mb-2">{t.specification}: {label}</p>
                    <p className="text-sm">{t.perMgCostLabel}: {t.ntd} {data.costPerMg.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{t.injectionTimesLabel}: {data.doses.toFixed(2)} {t.times}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            formatter={() => t.perMgCostLabel}
          />
          <Bar dataKey="costPerMg" name={t.perMgCostLabel} radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

