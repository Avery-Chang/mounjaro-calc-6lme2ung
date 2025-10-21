import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalculationResult } from "@/lib/calculator";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { convertPrice } from "@/lib/currency";

interface ResultsTableProps {
  results: CalculationResult[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
  const { t, language } = useLanguage();
  if (results.length === 0) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.specification}</TableHead>
            <TableHead className="text-right">{t.requiredUnits}</TableHead>
            <TableHead className="text-right">{t.totalCost}</TableHead>
            <TableHead className="text-right">{t.perMgCost}</TableHead>
            <TableHead className="text-right">{t.wasteVolume}</TableHead>
            <TableHead className="text-right">{t.per01mlContent}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={result.specification.label}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {result.specification.label}
                  {index === 0 && (
                    <Badge variant="default" className="ml-2">
                      {language === 'zh-TW' ? '最便宜' : 'Best Value'}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {result.requiredUnits.toFixed(2)} {t.units}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {t.currencySymbol} {Math.round(convertPrice(result.actualCost, language)).toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {t.currencySymbol} {convertPrice(result.costPerMg, language).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {t.currencySymbol} {convertPrice(result.costPer01ml, language).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {result.specification.mgPer01ml.toFixed(2)} mg
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

