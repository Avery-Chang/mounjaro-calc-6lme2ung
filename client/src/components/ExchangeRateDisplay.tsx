import { useEffect, useState } from 'react';
import { fetchExchangeRate, getExchangeRate } from '@/lib/currency';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function ExchangeRateDisplay() {
  const [rate, setRate] = useState(getExchangeRate());
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { language } = useLanguage();

  // Only show in English mode
  if (language !== 'en') {
    return null;
  }

  const handleRefresh = async () => {
    setLoading(true);
    const newRate = await fetchExchangeRate();
    setRate(newRate);
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => {
    setRate(getExchangeRate());
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>
        Exchange Rate: 1 USD = {rate.toFixed(2)} TWD
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={handleRefresh}
        disabled={loading}
        title="Refresh exchange rate"
      >
        <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}

