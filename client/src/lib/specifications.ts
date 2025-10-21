export interface Specification {
  label: string;
  totalMg: number;
  totalMl: number;
  price: number;
  mgPer01ml: number;
}

// 預設規格資料（2025年10月1日後價格）
export const DEFAULT_SPECIFICATIONS: Specification[] = [
  {
    label: "2.5 mg / 0.6 mL",
    totalMg: 10,
    totalMl: 2.4,
    price: 10000,
    mgPer01ml: 0.42,
  },
  {
    label: "5 mg / 0.6 mL",
    totalMg: 20,
    totalMl: 2.4,
    price: 10000,
    mgPer01ml: 0.83,
  },
  {
    label: "7.5 mg / 0.6 mL",
    totalMg: 30,
    totalMl: 2.4,
    price: 14000,
    mgPer01ml: 1.25,
  },
  {
    label: "10 mg / 0.6 mL",
    totalMg: 40,
    totalMl: 2.4,
    price: 14000,
    mgPer01ml: 1.67,
  },
  {
    label: "12.5 mg / 0.6 mL",
    totalMg: 50,
    totalMl: 2.4,
    price: 24000,
    mgPer01ml: 2.08,
  },
  {
    label: "15 mg / 0.6 mL",
    totalMg: 60,
    totalMl: 2.4,
    price: 24000,
    mgPer01ml: 2.50,
  },
];

/**
 * 取得規格資料（優先使用 localStorage 中的價格）
 */
export function getSpecifications(): Specification[] {
  if (typeof window === "undefined") {
    return DEFAULT_SPECIFICATIONS;
  }

  const savedPrices = localStorage.getItem("mounjaro-prices");
  if (!savedPrices) {
    return DEFAULT_SPECIFICATIONS;
  }

  try {
    const prices = JSON.parse(savedPrices) as Record<string, number>;
    return DEFAULT_SPECIFICATIONS.map((spec) => ({
      ...spec,
      price: prices[spec.label] ?? spec.price,
    }));
  } catch {
    return DEFAULT_SPECIFICATIONS;
  }
}

// 向後相容：預設匯出使用預設規格
export const SPECIFICATIONS = DEFAULT_SPECIFICATIONS;

