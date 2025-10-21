import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationResult } from "@/lib/calculator";
import { CheckCircle2, Lightbulb } from "lucide-react";

interface BestOptionCardProps {
  result: CalculationResult;
  targetMg: number;
}

export default function BestOptionCard({ result, targetMg }: BestOptionCardProps) {
  const volumeMl = (result.requiredUnits * 0.1).toFixed(2);

  return (
    <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <CheckCircle2 className="h-6 w-6" />
          最佳方案推薦
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 第一列：建議規格、實際成本、施打劑量 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">建議規格</p>
            <p className="text-2xl font-bold leading-tight">{result.specification.label}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">實際成本</p>
            <p className="text-2xl font-bold text-primary leading-tight">
              NT$ {Math.round(result.actualCost).toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">施打劑量</p>
            <p className="text-2xl font-bold text-primary leading-tight">{volumeMl} mL</p>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="border-t border-primary/20" />

        {/* 第二列：需要單位、每 mg 成本 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">需要單位</p>
            <p className="text-xl font-semibold leading-tight">
              {result.requiredUnits.toFixed(2)} 個
            </p>
            <p className="text-xs text-muted-foreground">(0.1mL/個)</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">每 mg 成本</p>
            <p className="text-xl font-semibold leading-tight">
              NT$ {result.costPerMg.toFixed(2)}
            </p>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="border-t border-primary/20" />

        {/* 成本分析 */}
        <div>
          <div className="flex items-center gap-2 text-amber-600 mb-4">
            <Lightbulb className="h-4 w-4" />
            <span className="font-semibold text-sm">成本分析</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">每 0.1mL 成本</p>
              <p className="text-xl font-semibold leading-tight">
                NT$ {result.costPer01ml.toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">目標劑量</p>
              <p className="text-xl font-semibold leading-tight">{targetMg} mg</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

