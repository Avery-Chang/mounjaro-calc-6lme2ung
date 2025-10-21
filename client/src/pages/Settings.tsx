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
import { ExchangeRateDisplay } from "@/components/ExchangeRateDisplay";
import { convertPrice, convertToTWD } from "@/lib/currency";

export default function Settings() {
  const { t, language } = useLanguage();
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
                <img src="/logo.png" alt="Mounjaro Calculator Logo" className="w-16 h-16 md:w-20 md:h-20" />
                <h1 className="text-lg md:text-xl font-bold">{t.appTitle}</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ExchangeRateDisplay />
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
                      {t.perPenContains} {spec.totalMg} mg（{t.approximately} {spec.totalMl} mL）
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.per01mlContains} {spec.mgPer01ml.toFixed(2)} mg
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`price-${spec.label}`} className="whitespace-nowrap">
                      {t.price} ({t.currencySymbol})
                    </Label>
                    <Input
                      id={`price-${spec.label}`}
                      type="number"
                      min="1"
                      max={language === 'en' ? "1634" : "50000"}
                      step={language === 'en' ? "10" : "100"}
                      value={
                        (() => {
                          const price = prices[spec.label] !== undefined ? prices[spec.label] : spec.price;
                          if (typeof price !== 'number' || price === null || price === undefined) return '';
                          const converted = convertPrice(price, language);
                          return isNaN(converted) ? '' : Math.round(converted);
                        })()
                      }
                      onChange={(e) => {
                        const displayValue = e.target.value;
                        if (displayValue === '') {
                          handlePriceChange(spec.label, '');
                          return;
                        }
                        const numValue = parseFloat(displayValue);
                        if (isNaN(numValue)) return;
                        const twdValue = convertToTWD(numValue, language);
                        if (isNaN(twdValue)) return;
                        handlePriceChange(spec.label, twdValue.toString());
                      }}
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
                💡 <strong>{language === 'zh-TW' ? '提示' : 'Hint'}:</strong> {t.settingsHint}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

