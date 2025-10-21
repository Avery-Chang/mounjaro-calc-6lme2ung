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

interface ResultsTableProps {
  results: CalculationResult[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
  if (results.length === 0) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>規格</TableHead>
            <TableHead className="text-right">需要單位數</TableHead>
            <TableHead className="text-right">實際成本</TableHead>
            <TableHead className="text-right">每 mg 成本</TableHead>
            <TableHead className="text-right">每 0.1mL 成本</TableHead>
            <TableHead className="text-right">每 0.1mL 含量</TableHead>
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
                      最便宜
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {result.requiredUnits.toFixed(2)} 個
              </TableCell>
              <TableCell className="text-right font-semibold">
                NT$ {Math.round(result.actualCost).toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                NT$ {result.costPerMg.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                NT$ {result.costPer01ml.toFixed(2)}
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

