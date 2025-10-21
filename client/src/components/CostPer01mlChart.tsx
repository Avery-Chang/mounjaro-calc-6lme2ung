import { CalculationResult } from "@/lib/calculator";
import { useLanguage } from "@/contexts/LanguageContext";
import { convertPrice } from "@/lib/currency";
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

interface CostPer01mlChartProps {
  results: CalculationResult[];
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

export default function CostPer01mlChart({ results }: CostPer01mlChartProps) {
  const { t, language } = useLanguage();
  
  if (results.length === 0) return null;

  const chartData = results.map((result, index) => {
    // 計算每 0.1mL 成本 = 總價格 / (2.4mL / 0.1mL) = 總價格 / 24
    const costPer01ml = result.specification.price / 24;
    const convertedCost = convertPrice(costPer01ml, language);
    
    return {
      name: result.specification.label,
      cost: parseFloat(convertedCost.toFixed(2)),
      isBest: index === 0,
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
              value: t.per01mlCostLabel,
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
                    <p className="text-sm">{t.per01mlCostLabel}: {t.currencySymbol} {data.cost.toFixed(2)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            formatter={() => t.per01mlCostLabel}
          />
          <Bar dataKey="cost" name={t.per01mlCostLabel} radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

