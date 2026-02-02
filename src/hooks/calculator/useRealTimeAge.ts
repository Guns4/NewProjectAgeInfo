/**
 * Real-Time Age Calculator - Phase 102
 * Hydration-safe real-time age updates
 * 
 * CRITICAL: Prevents hydration mismatch between server and client
 */

'use client';

import { useState, useEffect } from 'react';
import { calculateDetailedAge, type DetailedAgeResult } from './useDetailedAge';

export interface RealTimeAgeOptions {
    updateInterval?: number; // milliseconds (default: 1000)
    enableRealTime?: boolean; // default: true
}

/**
 * Hydration-safe real-time age calculator
 * 
 * Strategy:
 * 1. Server renders null/skeleton
 * 2. Client mounts and calculates age
 * 3. Updates every second
 * 
 * This prevents hydration mismatch errors!
 */
export function useRealTimeAge(
    birthDate: Date | null,
    options: RealTimeAgeOptions = {}
) {
    const {
        updateInterval = 1000,
        enableRealTime = true,
    } = options;

    // State
    const [age, setAge] = useState<DetailedAgeResult | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Step 1: Mark as client-side mounted
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Step 2: Calculate and update age
    useEffect(() => {
        // Only run on client
        if (!isClient || !birthDate) {
            return;
        }

        const calculate = () => {
            try {
                const currentAge = calculateDetailedAge(birthDate, new Date());
                setAge(currentAge);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Calculation error');
                setAge(null);
            }
        };

        // Initial calculation
        calculate();

        // Real-time updates
        if (enableRealTime) {
            const interval = setInterval(calculate, updateInterval);
            return () => clearInterval(interval);
        }

        return undefined;
    }, [birthDate, isClient, enableRealTime, updateInterval]);

    return {
        age,
        isClient,
        error,
        isLoading: !isClient,
    };
}

/**
 * Simplified version for basic age display
 */
export function useRealTimeAgeSimple(birthDate: Date | null) {
    const { age, isClient, error } = useRealTimeAge(birthDate);

    if (!isClient || !age) {
        return {
            years: 0,
            months: 0,
            days: 0,
            isClient,
            error,
        };
    }

    return {
        years: age.years,
        months: age.months,
        days: age.days,
        hours: 'hours' in age ? (age as any).hours : 0,
        minutes: 'minutes' in age ? (age as any).minutes : 0,
        seconds: 'seconds' in age ? (age as any).seconds : 0,
        isClient,
        error,
    };
}
