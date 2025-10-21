import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationResult } from "@/lib/calculator";
import { CheckCircle2, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { convertPrice } from "@/lib/currency";

interface BestOptionCardProps {
  result: CalculationResult;
  targetMg: number;
}

export default function BestOptionCard({ result, targetMg }: BestOptionCardProps) {
  const { t, language } = useLanguage();
  const volumeMl = (result.requiredUnits * 0.1).toFixed(2);
  
  // Convert prices based on language
  const actualCost = convertPrice(result.actualCost, language);
  const costPerMg = convertPrice(result.costPerMg, language);
  const costPer01ml = convertPrice(result.costPer01ml, language);

  return (
    <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <CheckCircle2 className="h-6 w-6" />
          {t.bestOptionTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 第一列：建議規格、實際成本、施打劑量 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t.recommendedSpec}</p>
            <p className="text-2xl font-bold leading-tight">{result.specification.label}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t.actualCost}</p>
            <p className="text-2xl font-bold text-primary leading-tight">
              {t.currencySymbol} {Math.round(actualCost).toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t.injectionDose}</p>
            <p className="text-2xl font-bold text-primary leading-tight">{volumeMl} mL</p>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="border-t border-primary/20" />

        {/* 第二列：需要單位、每 mg 成本 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t.requiredUnits}</p>
            <p className="text-xl font-semibold leading-tight">
              {result.requiredUnits.toFixed(2)} {t.units}
            </p>
            <p className="text-xs text-muted-foreground">(0.1mL/{t.units})</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t.perMgCost}</p>
            <p className="text-xl font-semibold leading-tight">
              {t.currencySymbol} {costPerMg.toFixed(2)}
            </p>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="border-t border-primary/20" />

        {/* 成本分析 */}
        <div>
          <div className="flex items-center gap-2 text-amber-600 mb-4">
            <Lightbulb className="h-4 w-4" />
            <span className="font-semibold text-sm">{t.wasteAnalysis}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t.wasteVolume}</p>
              <p className="text-xl font-semibold leading-tight">
                {t.currencySymbol} {costPer01ml.toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t.wasteDose}</p>
              <p className="text-xl font-semibold leading-tight">{targetMg} mg</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

