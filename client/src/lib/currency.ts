import { Language, TWD_TO_USD_RATE, USD_TO_TWD_RATE } from './i18n';

/**
 * Convert price from TWD to the target currency based on language
 * @param twdPrice Price in TWD
 * @param language Current language setting
 * @returns Converted price
 */
export function convertPrice(twdPrice: number, language: Language): number {
  if (language === 'en') {
    return twdPrice * TWD_TO_USD_RATE;
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
    return displayPrice * USD_TO_TWD_RATE;
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

