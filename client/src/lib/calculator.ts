import { Specification, DEFAULT_SPECIFICATIONS } from "./specifications";

export interface CalculationResult {
  specification: Specification;
  requiredUnits: number; // 需要的 0.1mL 單位數
  actualCost: number; // 實際使用成本
  costPerMg: number; // 每 mg 成本
  costPer01ml: number; // 每 0.1mL 成本
}

/**
 * 計算給定劑量下，使用特定規格的成本
 * @param targetMg 目標劑量 (mg)
 * @param spec 藥品規格
 * @returns 計算結果
 */
export function calculateCost(
  targetMg: number,
  spec: Specification
): CalculationResult {
  // 計算需要多少個 0.1mL 單位
  const requiredUnits = targetMg / spec.mgPer01ml;
  
  // 每 0.1mL 成本
  const costPer01ml = spec.price / (spec.totalMl / 0.1);
  
  // 實際使用成本（需要的單位數 × 每單位成本）
  const actualCost = requiredUnits * costPer01ml;
  
  // 每 mg 成本
  const costPerMg = costPer01ml / spec.mgPer01ml;
  
  return {
    specification: spec,
    requiredUnits,
    actualCost,
    costPerMg,
    costPer01ml,
  };
}

/**
 * 計算所有規格的成本並排序
 * @param targetMg 目標劑量 (mg)
 * @returns 按實際成本排序的計算結果陣列
 */
export function calculateAllCosts(
  targetMg: number,
  specifications: Specification[] = DEFAULT_SPECIFICATIONS
): CalculationResult[] {
  if (targetMg <= 0) return [];
  
  const results = specifications.map((spec) => calculateCost(targetMg, spec));
  
  // 按實際使用成本排序
  return results.sort((a, b) => a.actualCost - b.actualCost);
}

/**
 * 取得最佳方案（成本最低）
 * @param targetMg 目標劑量 (mg)
 * @returns 最佳方案的計算結果
 */
export function getBestOption(
  targetMg: number,
  specifications: Specification[] = DEFAULT_SPECIFICATIONS
): CalculationResult | null {
  const results = calculateAllCosts(targetMg, specifications);
  return results.length > 0 ? results[0] : null;
}

