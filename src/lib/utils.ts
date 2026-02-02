/**
 * Utility Functions - Fase 90.1: Localized Formatting
 * 
 * Provides locale-aware formatting for dates and numbers
 * Supports: English (en) and Indonesian (id)
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { id as idLocale, enUS as enLocale } from 'date-fns/locale';

/**
 * Tailwind CSS class merger
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format date according to locale
 * 
 * @param date - Date to format
 * @param locale - Locale code ('en' or 'id')
 * @returns Formatted date string
 * 
 * @example
 * formatLocaleDate(new Date('1945-08-17'), 'id')
 * // Returns: "17 Agustus 1945"
 * 
 * formatLocaleDate(new Date('1945-08-17'), 'en')
 * // Returns: "August 17th, 1945"
 */
export function formatLocaleDate(date: Date, locale: 'en' | 'id'): string {
    const dateLocale = locale === 'id' ? idLocale : enLocale;
    const dateFormat = locale === 'id' ? 'd MMMM yyyy' : 'MMMM do, yyyy';

    return format(date, dateFormat, { locale: dateLocale });
}

/**
 * Format number with locale-specific thousand separators
 * 
 * @param value - Number to format
 * @param locale - Locale code ('en' or 'id')
 * @returns Formatted number string
 * 
 * @example
 * formatLocaleNumber(1234567, 'id')
 * // Returns: "1.234.567" (dot separator for Indonesian)
 * 
 * formatLocaleNumber(1234567, 'en')
 * // Returns: "1,234,567" (comma separator for English)
 */
export function formatLocaleNumber(value: number, locale: 'en' | 'id'): string {
    const localeCode = locale === 'id' ? 'id-ID' : 'en-US';
    return new Intl.NumberFormat(localeCode).format(value);
}

/**
 * Format number with decimal places
 * 
 * @param value - Number to format
 * @param locale - Locale code ('en' or 'id')
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted number string with decimals
 * 
 * @example
 * formatLocaleDecimal(1234.5678, 'id', 2)
 * // Returns: "1.234,57"
 * 
 * formatLocaleDecimal(1234.5678, 'en', 2)
 * // Returns: "1,234.57"
 */
export function formatLocaleDecimal(
    value: number,
    locale: 'en' | 'id',
    decimals: number = 2
): string {
    const localeCode = locale === 'id' ? 'id-ID' : 'en-US';
    return new Intl.NumberFormat(localeCode, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
}

/**
 * Format currency with locale-specific formatting
 * 
 * @param value - Amount to format
 * @param locale - Locale code ('en' or 'id')
 * @param currency - Currency code (default: 'USD' for en, 'IDR' for id)
 * @returns Formatted currency string
 * 
 * @example
 * formatLocaleCurrency(1000000, 'id')
 * // Returns: "Rp1.000.000"
 * 
 * formatLocaleCurrency(1000, 'en')
 * // Returns: "$1,000.00"
 */
export function formatLocaleCurrency(
    value: number,
    locale: 'en' | 'id',
    currency?: string
): string {
    const localeCode = locale === 'id' ? 'id-ID' : 'en-US';
    const currencyCode = currency || (locale === 'id' ? 'IDR' : 'USD');

    return new Intl.NumberFormat(localeCode, {
        style: 'currency',
        currency: currencyCode,
    }).format(value);
}

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 * 
 * @param date - Date to compare
 * @param locale - Locale code ('en' or 'id')
 * @returns Relative time string
 * 
 * @example
 * formatRelativeTime(new Date(Date.now() - 3600000), 'en')
 * // Returns: "1 hour ago"
 * 
 * formatRelativeTime(new Date(Date.now() - 3600000), 'id')
 * // Returns: "1 jam yang lalu"
 */
export function formatRelativeTime(date: Date, locale: 'en' | 'id'): string {
    const localeCode = locale === 'id' ? 'id-ID' : 'en-US';
    const rtf = new Intl.RelativeTimeFormat(localeCode, { numeric: 'auto' });

    const diffInSeconds = Math.floor((date.getTime() - Date.now()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (Math.abs(diffInDays) > 0) {
        return rtf.format(diffInDays, 'day');
    } else if (Math.abs(diffInHours) > 0) {
        return rtf.format(diffInHours, 'hour');
    } else if (Math.abs(diffInMinutes) > 0) {
        return rtf.format(diffInMinutes, 'minute');
    } else {
        return rtf.format(diffInSeconds, 'second');
    }
}

/**
 * Age Calculation Utilities
 */

export interface AgeResult {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    totalSeconds: number;
}

/**
 * Calculate precise age from birth date
 * 
 * @param birthDate - Date of birth
 * @returns Complete age breakdown
 * 
 * @example
 * calculateAge(new Date('2000-01-01'))
 * // Returns: { years: 24, months: 1, days: 1, ... }
 */
export function calculateAge(birthDate: Date): AgeResult {
    const now = new Date();
    const diff = now.getTime() - birthDate.getTime();

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Calculate years, months, days
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const hours = now.getHours() - birthDate.getHours();
    const minutes = now.getMinutes() - birthDate.getMinutes();
    const seconds = now.getSeconds() - birthDate.getSeconds();

    return {
        years,
        months,
        days,
        hours: hours >= 0 ? hours : 24 + hours,
        minutes: minutes >= 0 ? minutes : 60 + minutes,
        seconds: seconds >= 0 ? seconds : 60 + seconds,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
    };
}

/**
 * Format age result with locale-specific number formatting
 * 
 * @param age - Age result from calculateAge
 * @param locale - Locale code ('en' or 'id')
 * @returns Object with formatted age values
 * 
 * @example
 * const age = calculateAge(new Date('2000-01-01'));
 * const formatted = formatAgeResult(age, 'id');
 * // formatted.totalDays = "8.766" (Indonesian formatting)
 */
export function formatAgeResult(age: AgeResult, locale: 'en' | 'id') {
    return {
        years: age.years,
        months: age.months,
        days: age.days,
        hours: age.hours,
        minutes: age.minutes,
        seconds: age.seconds,
        totalDays: formatLocaleNumber(age.totalDays, locale),
        totalSeconds: formatLocaleNumber(age.totalSeconds, locale),
    };
}

/**
 * Smart Unit Formatting - Fase 190.3
 * 
 * Formats time units based on locale and pluralization rules.
 * 
 * @param value - The numeric value (used for pluralization check)
 * @param unit - The unit type ('year', 'month', 'day')
 * @param locale - Locale code ('en' or 'id')
 * @returns Serialized unit label (e.g., "Years" or "Tahun")
 */
export function formatUnit(value: number, unit: 'year' | 'month' | 'day', locale: 'en' | 'id' | string): string {
    // Normalize locale strictly
    const currentLocale = locale.startsWith('id') ? 'id' : 'en';

    // Indonesian always uses singular (e.g., "Tahun", "Bulan", "Hari")
    if (currentLocale === 'id') {
        const labels = {
            year: 'Tahun',
            month: 'Bulan',
            day: 'Hari'
        };
        return labels[unit];
    }

    // English uses pluralization via Intl.PluralRules
    // Note: We return Capitalized label because the UI expects it as a Label below the number
    const pluralRules = new Intl.PluralRules('en-US');
    const grammar = pluralRules.select(value); // 'one', 'other', etc.

    const labels = {
        year: { one: 'Year', other: 'Years' },
        month: { one: 'Month', other: 'Months' },
        day: { one: 'Day', other: 'Days' }
    };

    // Return specific plural form, fallback to 'other' if needed (though en simple has one/other)
    return labels[unit][grammar as 'one' | 'other'] || labels[unit].other;
}
