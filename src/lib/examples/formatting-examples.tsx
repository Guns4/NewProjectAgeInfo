/**
 * Example Usage: Localized Formatting
 * Demonstrates all formatting utilities in action
 */

import {
    formatLocaleDate,
    formatLocaleNumber,
    formatLocaleDecimal,
    formatLocaleCurrency,
    formatRelativeTime,
    calculateAge,
    formatAgeResult
} from '@/lib/utils';

export function FormattingExamples() {
    const birthDate = new Date('2000-01-01');
    const independenceDay = new Date('1945-08-17');

    // Indonesian Examples
    console.log('=== Indonesian Formatting ===');
    console.log('Date:', formatLocaleDate(independenceDay, 'id'));
    // Output: "17 Agustus 1945"

    console.log('Number:', formatLocaleNumber(1234567, 'id'));
    // Output: "1.234.567"

    console.log('Decimal:', formatLocaleDecimal(1234.5678, 'id', 2));
    // Output: "1.234,57"

    console.log('Currency:', formatLocaleCurrency(1000000, 'id'));
    // Output: "Rp1.000.000"

    // English Examples
    console.log('\n=== English Formatting ===');
    console.log('Date:', formatLocaleDate(independenceDay, 'en'));
    // Output: "August 17th, 1945"

    console.log('Number:', formatLocaleNumber(1234567, 'en'));
    // Output: "1,234,567"

    console.log('Decimal:', formatLocaleDecimal(1234.5678, 'en', 2));
    // Output: "1,234.57"

    console.log('Currency:', formatLocaleCurrency(1000, 'en'));
    // Output: "$1,000.00"

    // Age Calculation
    const age = calculateAge(birthDate);
    console.log('\n=== Age Calculation ===');
    console.log('Years:', age.years);
    console.log('Total Days:', age.totalDays);

    // Formatted Age (Indonesian)
    const formattedAgeID = formatAgeResult(age, 'id');
    console.log('\nFormatted Total Days (ID):', formattedAgeID.totalDays);
    // Output: "8.766" (with dot separator)

    // Formatted Age (English)
    const formattedAgeEN = formatAgeResult(age, 'en');
    console.log('Formatted Total Days (EN):', formattedAgeEN.totalDays);
    // Output: "8,766" (with comma separator)

    return null;
}

/**
 * Real-world usage in a component
 */
export function AgeDisplay({
    birthDate,
    locale
}: {
    birthDate: Date;
    locale: 'en' | 'id'
}) {
    const age = calculateAge(birthDate);
    const formatted = formatAgeResult(age, locale);

    return (
        <div>
            <p>Birth Date: {formatLocaleDate(birthDate, locale)}</p>
            <p>Age: {age.years} years, {age.months} months, {age.days} days</p>
            <p>Total Days: {formatted.totalDays}</p>
            <p>Total Hours: {formatted.totalHours}</p>
            <p>Total Seconds: {formatted.totalSeconds}</p>
        </div>
    );
}
