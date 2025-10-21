import { Language } from './i18n';

// Exchange rate cache
let cachedRate = 30.6; // Fallback rate
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

/**
 * Fetch real-time exchange rate from API
 * @returns Promise<number> Current USD to TWD exchange rate
 */
export async function fetchExchangeRate(): Promise<number> {
  const now = Date.now();
  
  // Return cached rate if still valid
  if (now - lastFetchTime < CACHE_DURATION && cachedRate > 0) {
    return cachedRate;
  }
  
  try {
    // Using exchangerate-api.com free tier (no API key required)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.rates && data.rates.TWD) {
      cachedRate = data.rates.TWD;
      lastFetchTime = now;
      console.log(`✓ Updated exchange rate: 1 USD = ${cachedRate.toFixed(2)} TWD`);
    }
  } catch (error) {
    console.warn('⚠ Failed to fetch exchange rate, using cached/fallback rate:', error);
  }
  
  return cachedRate;
}

/**
 * Get current cached exchange rate (synchronous)
 * @returns Current USD to TWD exchange rate
 */
export function getExchangeRate(): number {
  return cachedRate;
}

/**
 * Convert price from TWD to the target currency based on language
 * @param twdPrice Price in TWD
 * @param language Current language setting
 * @returns Converted price
 */
export function convertPrice(twdPrice: number, language: Language): number {
  if (language === 'en') {
    return twdPrice / cachedRate;
  }
  return twdPrice;
}

/**
 * Convert price from display currency back to TWD for storage
 * @param displayPrice Price in display currency
 * @param language Current language setting
 * @returns Price in TWD
 */
export function convertToTWD(displayPrice: number, language: Language): number {
  if (language === 'en') {
    return displayPrice * cachedRate;
  }
  return displayPrice;
}

/**
 * Format price with currency symbol
 * @param price Price value
 * @param currencySymbol Currency symbol
 * @returns Formatted price string
 */
export function formatPrice(price: number, currencySymbol: string): string {
  return `${currencySymbol} ${price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

