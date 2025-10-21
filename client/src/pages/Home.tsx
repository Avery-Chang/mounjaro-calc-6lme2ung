import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { calculateAllCosts, getBestOption } from "@/lib/calculator";
import { getSpecifications } from "@/lib/specifications";
import BestOptionCard from "@/components/BestOptionCard";
import CostComparisonChart from "@/components/CostComparisonChart";
import CostPerMgChart from "@/components/CostPerMgChart";
import CostPer01mlChart from "@/components/CostPer01mlChart";
import ResultsTable from "@/components/ResultsTable";
import { Syringe, Calculator, Info, ChevronDown, Settings } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Home() {
  const { t } = useLanguage();
  const [targetDose, setTargetDose] = useState<string>("5");
  const [specifications, setSpecifications] = useState(getSpecifications());
  const [isTableOpen, setIsTableOpen] = useState(false);

  const targetMg = useMemo(() => {
    const value = parseFloat(targetDose);
    return isNaN(value) || value < 1 || value > 30 ? 0 : value;
  }, [targetDose]);

  // 監聽 storage 變化，當{t.price}更新時重新載入
  useEffect(() => {
    const handleStorageChange = () => {
      setSpecifications(getSpecifications());
    };
    window.addEventListener("storage", handleStorageChange);
    // 也監聽自定義事件（同一頁面內的更新）
    window.addEventListener("pricesUpdated", handleStorageChange);
    
    // 頁面載入時檢查一次
    setSpecifications(getSpecifications());
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("pricesUpdated", handleStorageChange);
    };
  }, []);

  const results = useMemo(
    () => calculateAllCosts(targetMg, specifications),
    [targetMg, specifications]
  );
  
  const bestOption = useMemo(
    () => getBestOption(targetMg, specifications),
    [targetMg, specifications]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 flex-1">
              <img src="/logo.png" alt="Mounjaro Calculator Logo" className="w-20 h-20 md:w-24 md:h-24" />
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{t.appTitle}</h1>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                  {t.appSubtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Link href="/settings">
                <Button variant="outline" className="gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.priceSettings}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                {t.inputTitle}
              </CardTitle>
              <CardDescription>
                {t.inputDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <Label htmlFor="targetDose" className="text-base">
                  {t.targetDoseLabel}
                </Label>
                <Input
                  id="targetDose"
                  type="number"
                  min="1"
                  max="30"
                  step="0.1"
                  value={targetDose}
                  onChange={(e) => {
                    const value = e.target.value;
                    // 允許空字串
                    if (value === '') {
                      setTargetDose(value);
                      return;
                    }
                    const numValue = parseFloat(value);
                    // 允許部分輸入，但限制在 1-30 範圍內
                    if (!isNaN(numValue) && numValue >= 1 && numValue <= 30) {
                      setTargetDose(value);
                    } else if (!isNaN(numValue) && numValue > 30) {
                      // 如果超過 30，設置為 30
                      setTargetDose('30');
                    }
                  }}
                  className="mt-2 text-lg h-12"
                  placeholder="例如：5"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {t.commonDoses}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Info Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>{t.calculationTitle}</AlertTitle>
            <AlertDescription>
              {t.calculationDescription}
            </AlertDescription>
          </Alert>

          {/* Results Section */}
          {targetMg > 0 && bestOption && (
            <>
              {/* Best Option Card */}
              <BestOptionCard result={bestOption} targetMg={targetMg} />

              {/* Charts and Table */}
              <Tabs defaultValue="comparison" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="comparison">{t.tabComparison}</TabsTrigger>
                  <TabsTrigger value="permg">{t.tabPerMg}</TabsTrigger>
                  <TabsTrigger value="per01ml">{t.tabPer01ml}</TabsTrigger>
                  <TabsTrigger value="table">{t.tabDetails}</TabsTrigger>
                </TabsList>

                <TabsContent value="comparison" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.chartComparisonTitle}</CardTitle>
                      <CardDescription>
                        {t.chartComparisonDesc.replace('{targetMg}', targetMg.toString())}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CostComparisonChart results={results} targetMg={targetMg} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="per01ml" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.chartPer01mlTitle}</CardTitle>
                      <CardDescription>
                        {t.chartPer01mlDesc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CostPer01mlChart results={results} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="permg" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.chartPerMgTitle}</CardTitle>
                      <CardDescription>
                        {t.chartPerMgDesc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CostPerMgChart results={results} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="table" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.chartDetailsTitle}</CardTitle>
                      <CardDescription>
                        {t.chartDetailsDesc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResultsTable results={results} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Collapsible Specifications Table */}
              <Collapsible open={isTableOpen} onOpenChange={setIsTableOpen}>
                <Card>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{t.specOverviewTitle}</CardTitle>
                          <CardDescription>
                            {t.specOverviewDesc}
                          </CardDescription>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            isTableOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[900px]">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[140px]">{t.specLabel}</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-[100px]">{t.perPenContent}</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-[100px]">{t.availableVolume}</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-[110px]">{t.per01mlContent}</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-[120px]">{t.price}</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-[110px]">每 0.1mL {t.price}</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-[110px]">每 mg {t.price}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {specifications.map((spec, index) => {
                                const isBest = bestOption && spec.label === bestOption.specification.label;
                                return (
                                <tr
                                  key={spec.label}
                                  className={isBest ? "border-b bg-primary/10 border-l-4 border-l-primary" : "border-b transition-colors hover:bg-muted/50"}
                                >
                                  <td className="p-4 align-middle font-medium">{spec.label}</td>
                                  <td className="p-4 align-middle text-right">{spec.totalMg} mg</td>
                                  <td className="p-4 align-middle text-right">{spec.totalMl} mL</td>
                                  <td className="p-4 align-middle text-right">
                                    {spec.mgPer01ml.toFixed(2)} mg
                                  </td>
                                  <td className="p-4 align-middle text-right font-semibold">
                                    NT$ {spec.price.toLocaleString()}
                                  </td>
                                  <td className="p-4 align-middle text-right">
                                    NT$ {(spec.price / 24).toFixed(2)}
                                  </td>
                                  <td className="p-4 align-middle text-right">
                                    NT$ {(spec.price / spec.totalMg).toFixed(2)}
                                  </td>
                                </tr>
                              );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Link href="/settings">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Settings className="w-4 h-4" />
                            調整{t.specLabel}{t.price}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </>
          )}

          {targetMg === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calculator className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">請{t.inputTitle}</h3>
                <p className="text-muted-foreground max-w-md">
                  在上方輸入框中輸入您需要的猛健樂劑量（毫克），系統將立即為您計算最經濟的購買方案。
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>
            本計算器僅供參考，實際用藥請遵循醫師處方。{t.price}以 2025 年 10 月 1 日後為準。
          </p>
        </div>
      </footer>
    </div>
  );
}

