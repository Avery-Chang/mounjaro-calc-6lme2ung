import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_TITLE } from "@/const";
import { DEFAULT_SPECIFICATIONS } from "@/lib/specifications";
import { Settings as SettingsIcon, Syringe } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Settings() {
  const { t } = useLanguage();
  const [prices, setPrices] = useState<Record<string, number>>({});

  // 從 localStorage 載入價格設定
  useEffect(() => {
    const savedPrices = localStorage.getItem("mounjaro-prices");
    if (savedPrices) {
      setPrices(JSON.parse(savedPrices));
    } else {
      // 使用預設價格
      const defaultPrices: Record<string, number> = {};
      DEFAULT_SPECIFICATIONS.forEach((spec) => {
        defaultPrices[spec.label] = spec.price;
      });
      setPrices(defaultPrices);
    }
  }, []);

  const handlePriceChange = (label: string, value: string) => {
    // 允許空字串以便用戶可以清除輸入
    if (value === '') {
      setPrices((prev) => ({
        ...prev,
        [label]: '' as any,
      }));
      return;
    }
    const numValue = parseFloat(value);
    // 嚴格限制 1-50000 NT$，確保輸入為受控組件
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 50000) {
      setPrices((prev) => ({
        ...prev,
        [label]: numValue,
      }));
    } else if (!isNaN(numValue) && numValue > 50000) {
      // 如果超過最大值，設置為最大值
      setPrices((prev) => ({
        ...prev,
        [label]: 50000,
      }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("mounjaro-prices", JSON.stringify(prices));
    // 觸發自定義事件通知其他頁面
    window.dispatchEvent(new Event("pricesUpdated"));
    toast.success(t.settingsSaved);
  };

  const handleReset = () => {
    const defaultPrices: Record<string, number> = {};
    DEFAULT_SPECIFICATIONS.forEach((spec) => {
      defaultPrices[spec.label] = spec.price;
    });
    setPrices(defaultPrices);
    localStorage.removeItem("mounjaro-prices");
    // 觸發自定義事件通知其他頁面
    window.dispatchEvent(new Event("pricesUpdated"));
    toast.success(t.settingsReset);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                <img src="/logo.png" alt="Mounjaro Calculator Logo" className="w-12 h-12 md:w-14 md:h-14" />
                <h1 className="text-lg md:text-xl font-bold">{t.appTitle}</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/">
              <Button variant="outline">
                <span className="hidden sm:inline">{t.backToCalculator}</span>
                <span className="sm:hidden">←</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-6 h-6" />
              {t.settingsTitle}
            </CardTitle>
            <CardDescription>
              {t.settingsDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Inputs */}
            <div className="grid gap-4">
              {DEFAULT_SPECIFICATIONS.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <Label className="text-base font-semibold">{spec.label}</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      每支筆含 {spec.totalMg} mg（約 {spec.totalMl} mL）
                    </p>
                    <p className="text-xs text-muted-foreground">
                      每 0.1mL 含 {spec.mgPer01ml.toFixed(2)} mg
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`price-${spec.label}`} className="whitespace-nowrap">
                      {t.price} ({t.ntd})
                    </Label>
                    <Input
                      id={`price-${spec.label}`}
                      type="number"
                      min="1"
                      max="50000"
                      step="100"
                      value={prices[spec.label] !== undefined ? prices[spec.label] : spec.price}
                      onChange={(e) => handlePriceChange(spec.label, e.target.value)}
                      className="text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t">
              <Button onClick={handleSave} className="flex-1">
                {t.saveSettings}
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1">
                {t.resetDefaults}
              </Button>
            </div>

            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong>提示：</strong>價格設定會儲存在瀏覽器中，下次開啟時會自動載入。
                返回計算器頁面後，系統會使用新的價格進行計算。
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

