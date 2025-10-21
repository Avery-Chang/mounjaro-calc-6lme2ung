export type Language = 'zh-TW' | 'en';

// Exchange rate: 1 USD = 30.6 TWD (based on current bank rates)
export const USD_TO_TWD_RATE = 30.6;
export const TWD_TO_USD_RATE = 1 / USD_TO_TWD_RATE;

export interface Translations {
  // Header
  appTitle: string;
  appSubtitle: string;
  priceSettings: string;
  
  // Input Section
  inputTitle: string;
  inputDescription: string;
  targetDoseLabel: string;
  targetDosePlaceholder: string;
  commonDoses: string;
  
  // Info Alert
  calculationTitle: string;
  calculationDescription: string;
  
  // Best Option Card
  bestOptionTitle: string;
  recommendedSpec: string;
  actualCost: string;
  injectionDose: string;
  requiredUnits: string;
  perMgCost: string;
  wasteAnalysis: string;
  wasteVolume: string;
  wasteDose: string;
  wasteAmount: string;
  
  // Tabs
  tabComparison: string;
  tabPerMg: string;
  tabPer01ml: string;
  tabDetails: string;
  
  // Chart Titles
  chartComparisonTitle: string;
  chartComparisonDesc: string;
  chartPerMgTitle: string;
  chartPerMgDesc: string;
  chartPer01mlTitle: string;
  chartPer01mlDesc: string;
  chartDetailsTitle: string;
  chartDetailsDesc: string;
  
  // Chart Labels
  perMgCostLabel: string;
  injectionTimesLabel: string;
  per01mlCostLabel: string;
  
  // Specification Overview
  specOverviewTitle: string;
  specOverviewDesc: string;
  specLabel: string;
  perPenContent: string;
  availableVolume: string;
  per01mlContent: string;
  price: string;
  per01mlPrice: string;
  perMgPrice: string;
  adjustPrices: string;
  
  // Results Table
  specification: string;
  requiredPens: string;
  totalCost: string;
  wasteVolumeLabel: string;
  wasteDoseLabel: string;
  wasteAmountLabel: string;
  
  // Settings Page
  settingsTitle: string;
  settingsDescription: string;
  backToCalculator: string;
  saveSettings: string;
  resetDefaults: string;
  settingsSaved: string;
  settingsReset: string;
  
  // Units
  mg: string;
  ml: string;
  currency: string;
  currencySymbol: string;
  times: string;
  units: string;
  
  // Empty State
  emptyStateTitle: string;
  emptyStateDesc: string;
  
  // Footer
  disclaimer: string;
}

export const translations: Record<Language, Translations> = {
  'zh-TW': {
    // Header
    appTitle: '猛健樂劑量成本計算器',
    appSubtitle: 'Mounjaro (Tirzepatide) Cost Calculator - 以 0.1mL 為最小單位精確計算',
    priceSettings: '價格設定',
    
    // Input Section
    inputTitle: '輸入目標劑量',
    inputDescription: '請輸入您需要的猛健樂劑量（毫克），系統將自動計算最經濟的購買方案',
    targetDoseLabel: '目標劑量 (mg)',
    targetDosePlaceholder: '例如：5',
    commonDoses: '常見劑量：2.5mg、5mg、7.5mg、10mg、12.5mg、15mg',
    
    // Info Alert
    calculationTitle: '計算說明',
    calculationDescription: '本計算器以 0.1mL 為最小計量單位，根據 2025 年 10 月 1 日後的價格進行計算。每支筆的可用容量為 2.4mL，標準注射量為 0.6mL。系統會自動比較所有規格，找出總成本最低且浪費最少的最佳方案。',
    
    // Best Option Card
    bestOptionTitle: '最佳方案推薦',
    recommendedSpec: '建議規格',
    actualCost: '實際成本',
    injectionDose: '施打劑量',
    requiredUnits: '需要單位',
    perMgCost: '每 mg 成本',
    wasteAnalysis: '浪費分析',
    wasteVolume: '每 0.1mL 成本',
    wasteDose: '目標劑量',
    wasteAmount: '浪費金額',
    
    // Tabs
    tabComparison: '規格比較',
    tabPerMg: '每 mg 成本',
    tabPer01ml: '每 0.1mL 成本',
    tabDetails: '詳細數據',
    
    // Chart Titles
    chartComparisonTitle: '規格比較分析',
    chartComparisonDesc: '比較各規格的每 mg 成本，滑鼠移到圖表上可查看該規格每支筆 2.4mL 可施打 {targetMg}mg 的次數。',
    chartPerMgTitle: '每 mg 成本比較',
    chartPerMgDesc: '比較不同規格的每毫克成本效益，幫助您找到最經濟的購買選擇。',
    chartPer01mlTitle: '每 0.1mL 成本比較',
    chartPer01mlDesc: '比較不同規格的每 0.1mL 單位成本，幫助您了解不同規格的容量成本差異。',
    chartDetailsTitle: '完整計算結果',
    chartDetailsDesc: '所有規格的詳細成本分析數據，按總成本由低至高排序',
    
    // Chart Labels
    perMgCostLabel: '每 mg 成本',
    injectionTimesLabel: '可施打次數',
    per01mlCostLabel: '每 0.1mL 成本',
    
    // Specification Overview
    specOverviewTitle: '規格價格總覽',
    specOverviewDesc: '查看所有猛健樂規格的詳細資訊與當前價格',
    specLabel: '規格',
    perPenContent: '每支筆含量',
    availableVolume: '可用容量',
    per01mlContent: '每 0.1mL 含量',
    price: '價格',
    per01mlPrice: '每 0.1mL 價格',
    perMgPrice: '每 mg 價格',
    adjustPrices: '調整規格價格',
    
    // Results Table
    specification: '規格',
    requiredPens: '需要支數',
    totalCost: '總成本',
    wasteVolumeLabel: '浪費容量',
    wasteDoseLabel: '浪費劑量',
    wasteAmountLabel: '浪費金額',
    
    // Settings Page
    settingsTitle: '價格設定',
    settingsDescription: '更新各規格的價格，系統將使用新價格計算最佳施打劑量',
    backToCalculator: '返回計算器',
    saveSettings: '儲存設定',
    resetDefaults: '恢復預設',
    settingsSaved: '價格設定已儲存',
    settingsReset: '已恢復預設價格',
    
    // Units
    mg: 'mg',
    ml: 'mL',
    currency: 'NT$',
    currencySymbol: 'NT$',
    times: '次',
    units: '個',
    
    // Empty State
    emptyStateTitle: '請輸入目標劑量',
    emptyStateDesc: '在上方輸入您需要的猛健樂劑量，系統將為您計算最經濟的購買方案',
    
    // Footer
    disclaimer: '本計算器僅供參考，實際用藥請遵循醫師指示。價格以 2025 年 10 月 1 日後為準。',
  },
  'en': {
    // Header
    appTitle: 'Mounjaro Dosage Cost Calculator',
    appSubtitle: 'Mounjaro (Tirzepatide) Cost Calculator - Precise calculation with 0.1mL as minimum unit',
    priceSettings: 'Price Settings',
    
    // Input Section
    inputTitle: 'Enter Target Dosage',
    inputDescription: 'Enter your required Mounjaro dosage (mg), and the system will automatically calculate the most economical purchase plan',
    targetDoseLabel: 'Target Dosage (mg)',
    targetDosePlaceholder: 'e.g., 5',
    commonDoses: 'Common doses: 2.5mg, 5mg, 7.5mg, 10mg, 12.5mg, 15mg',
    
    // Info Alert
    calculationTitle: 'Calculation Info',
    calculationDescription: 'This calculator uses 0.1mL as the minimum unit, based on prices after October 1, 2025. Each pen has 2.4mL available volume, with standard injection of 0.6mL. The system automatically compares all specifications to find the best option with lowest cost and minimal waste.',
    
    // Best Option Card
    bestOptionTitle: 'Best Option Recommendation',
    recommendedSpec: 'Recommended Spec',
    actualCost: 'Actual Cost',
    injectionDose: 'Injection Dose',
    requiredUnits: 'Required Units',
    perMgCost: 'Per mg Cost',
    wasteAnalysis: 'Waste Analysis',
    wasteVolume: 'Per 0.1mL Cost',
    wasteDose: 'Target Dose',
    wasteAmount: 'Waste Amount',
    
    // Tabs
    tabComparison: 'Spec Comparison',
    tabPerMg: 'Per mg Cost',
    tabPer01ml: 'Per 0.1mL Cost',
    tabDetails: 'Detailed Data',
    
    // Chart Titles
    chartComparisonTitle: 'Specification Comparison Analysis',
    chartComparisonDesc: 'Compare per mg cost of each specification. Hover over the chart to see how many {targetMg}mg injections each 2.4mL pen can provide.',
    chartPerMgTitle: 'Per mg Cost Comparison',
    chartPerMgDesc: 'Compare per milligram cost efficiency of different specifications to find the most economical purchase option.',
    chartPer01mlTitle: 'Per 0.1mL Cost Comparison',
    chartPer01mlDesc: 'Compare per 0.1mL unit cost of different specifications to understand volume cost differences.',
    chartDetailsTitle: 'Complete Calculation Results',
    chartDetailsDesc: 'Detailed cost analysis data for all specifications, sorted by total cost from low to high',
    
    // Chart Labels
    perMgCostLabel: 'Per mg Cost',
    injectionTimesLabel: 'Injection Times',
    per01mlCostLabel: 'Per 0.1mL Cost',
    
    // Specification Overview
    specOverviewTitle: 'Specification Price Overview',
    specOverviewDesc: 'View detailed information and current prices for all Mounjaro specifications',
    specLabel: 'Specification',
    perPenContent: 'Per Pen Content',
    availableVolume: 'Available Volume',
    per01mlContent: 'Per 0.1mL Content',
    price: 'Price',
    per01mlPrice: 'Per 0.1mL Price',
    perMgPrice: 'Per mg Price',
    adjustPrices: 'Adjust Prices',
    
    // Results Table
    specification: 'Specification',
    requiredPens: 'Required Pens',
    totalCost: 'Total Cost',
    wasteVolumeLabel: 'Waste Volume',
    wasteDoseLabel: 'Waste Dose',
    wasteAmountLabel: 'Waste Amount',
    
    // Settings Page
    settingsTitle: 'Price Settings',
    settingsDescription: 'Update prices for each specification, the system will use new prices to calculate optimal dosage',
    backToCalculator: 'Back to Calculator',
    saveSettings: 'Save Settings',
    resetDefaults: 'Reset Defaults',
    settingsSaved: 'Price settings saved',
    settingsReset: 'Default prices restored',
    
    // Units
    mg: 'mg',
    ml: 'mL',
    currency: 'USD',
    currencySymbol: '$',
    times: 'times',
    units: 'units',
    
    // Empty State
    emptyStateTitle: 'Please Enter Target Dosage',
    emptyStateDesc: 'Enter your required Mounjaro dosage above, and the system will calculate the most economical purchase plan for you',
    
    // Footer
    disclaimer: 'This calculator is for reference only. Please follow your doctor\'s instructions for actual medication use. Prices are based on rates after October 1, 2025.',
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}

