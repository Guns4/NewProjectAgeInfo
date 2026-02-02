/**
 * Timezone Conversion Utilities - Phase 101
 * Safe timezone handling and date conversions
 */

'use client';

/**
 * Get user's timezone
 * @returns IANA timezone string (e.g., "Asia/Jakarta")
 */
export function getUserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Get timezone offset in minutes
 * @param date - Date to check offset for
 * @returns Offset in minutes (e.g., Jakarta = -420 minutes from UTC)
 */
export function getTimezoneOffset(date: Date = new Date()): number {
    return date.getTimezoneOffset();
}

/**
 * Convert date to UTC (strips timezone)
 * @param date - Local date
 * @returns UTC date
 */
export function toUTC(date: Date): Date {
    return new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ));
}

/**
 * Create date from UTC components
 * @param year - Year
 * @param month - Month (0-11)
 * @param day - Day
 * @param hours - Hours (default: 0)
 * @param minutes - Minutes (default: 0)
 * @param seconds - Seconds (default: 0)
 * @returns UTC Date object
 */
export function createUTCDate(
    year: number,
    month: number,
    day: number,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0
): Date {
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
}

/**
 * Format date with timezone
 * @param date - Date to format
 * @param locale - Locale (default: 'en')
 * @param timezone - Timezone (default: user's timezone)
 * @returns Formatted string
 */
export function formatWithTimezone(
    date: Date,
    locale: string = 'en',
    timezone?: string
): string {
    return new Intl.DateTimeFormat(locale, {
        timeZone: timezone || getUserTimezone(),
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    }).format(date);
}

/**
 * Get start of day in UTC
 * @param date - Date
 * @returns Start of day (00:00:00.000 UTC)
 */
export function getStartOfDayUTC(date: Date): Date {
    return createUTCDate(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Get end of day in UTC
 * @param date - Date
 * @returns End of day (23:59:59.999 UTC)
 */
export function getEndOfDayUTC(date: Date): Date {
    return new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999
    ));
}

/**
 * Check if two dates are on the same day (ignoring time)
 * @param date1 - First date
 * @param date2 - Second date
 * @returns true if same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

/**
 * React hook for timezone utilities
 */
export function useTimezoneConverter() {
    const timezone = getUserTimezone();
    const offset = getTimezoneOffset();

    return {
        timezone,
        offset,
        offsetHours: Math.floor(Math.abs(offset) / 60),
        offsetMinutes: Math.abs(offset) % 60,
        isUTC: offset === 0,
        toUTC,
        createUTCDate,
        formatWithTimezone: (date: Date, locale?: string) =>
            formatWithTimezone(date, locale, timezone),
        getStartOfDayUTC,
        getEndOfDayUTC,
        isSameDay,
    };
}
