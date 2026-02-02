/**
 * Phase 121-140: Real-Time Ticker & Hydration Guard Examples
 * 
 * Examples of how to use:
 * 1. useAgeCalculator with real-time updates
 * 2. ClientOnly wrapper for hydration safety
 * 3. useHasMounted for conditional rendering
 */

'use client';

import { useAgeCalculator } from '@/hooks/calculator/useAgeCalculator';
import { ClientOnly } from '@/components/common/ClientOnly';
import { useHasMounted } from '@/hooks/useHasMounted';

/**
 * Example 1: Basic Real-Time Age Display
 * Shows age that updates every second
 */
export function RealTimeAgeExample() {
    const birthDate = new Date('1990-05-15');
    const { age, error } = useAgeCalculator(birthDate);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!age) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Your Real-Time Age</h2>
            <p>
                {age.years} years, {age.months} months, {age.days} days
            </p>

            {/* Seconds update in real-time! */}
            <p className="text-sm text-muted-foreground">
                {age.totalSeconds.toLocaleString()} seconds old
            </p>
        </div>
    );
}

/**
 * Example 2: Hydration-Safe Seconds Display
 * Prevents hydration mismatch by only showing seconds on client
 */
export function HydrationSafeAgeExample() {
    const birthDate = new Date('1995-12-25');
    const { age } = useAgeCalculator(birthDate);

    // Note: re-renders are now optimized by default in the hook
    // and by the SecondsCounter component for real-time parts
    console.log('Age calculated:', age?.years);
    if (!age) {
        return (
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48" />
            </div>
        );
    }

    return (
        <div>
            {/* Static content - safe for SSR */}
            <h3>
                {age.years} years, {age.months} months, {age.days} days
            </h3>

            {/* Dynamic content - wrapped in ClientOnly */}
            <ClientOnly
                fallback={
                    <p className="text-sm text-gray-400">
                        Calculating precise time...
                    </p>
                }
            >
                <p className="text-sm text-blue-500">
                    {age.totalHours.toLocaleString()} hours,{' '}
                    {(age.totalMinutes % 60)} minutes,{' '}
                    {(age.totalSeconds % 60)} seconds
                </p>
            </ClientOnly>
        </div>
    );
}

/**
 * Example 3: Conditional Rendering with useHasMounted
 * More control over what renders when
 */
export function ConditionalRenderExample() {
    const hasMounted = useHasMounted();
    const birthDate = new Date('2000-01-01');
    const { age } = useAgeCalculator(birthDate);

    return (
        <div>
            <h3>Age Calculator</h3>

            {/* Always show static info */}
            <p>Birth Date: January 1, 2000</p>

            {/* Only show dynamic time on client */}
            {hasMounted && age ? (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="font-bold text-2xl">
                        {age.years} Years Old
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        Exact: {age.totalDays.toLocaleString()} days,{' '}
                        {age.totalHours.toLocaleString()} hours
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                        ⏱️ {age.totalSeconds.toLocaleString()} seconds
                    </p>
                </div>
            ) : (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-32 mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-48" />
                </div>
            )}
        </div>
    );
}

/**
 * Example 4: Split Display (SSR + CSR)
 * Static parts on server, dynamic parts on client
 */
export function SplitDisplayExample() {
    const birthDate = new Date('1985-07-20');
    const { age } = useAgeCalculator(birthDate);

    // Server-safe fallback
    const displayAge = age ?? { years: 0, months: 0, days: 0 };

    return (
        <div className="mt-4 pt-4 border-t border-gray-200">
            <div>
                {displayAge.years} Years
            </div>
            <div>
                {/* Dynamic part */}
                <span className="text-sm font-mono text-purple-600">
                    🕐 Live: {age?.totalSeconds.toLocaleString() ?? 0} seconds
                </span>
            </div>
        </div>
    );
}

/**
 * Example 5: Performance-Optimized Dashboard
 * Shows the power of useMemo - calculations only run when needed
 */
export function PerformanceDashboard() {
    const birthDate = new Date('1992-03-10');
    const { age, error } = useAgeCalculator(birthDate);

    // No need for explicit isClient check with the new hook design
    // The hook handles safe rendering
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!age) {
        return <div>Loading dashboard...</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Static metrics - calculated once per second */}
            <MetricCard label="Years" value={age.years} />
            <MetricCard label="Months" value={age.totalMonths} />
            <MetricCard label="Weeks" value={age.totalWeeks} />
            <MetricCard label="Days" value={age.totalDays} />

            {/* Real-time metrics - update every second */}
            <ClientOnly fallback={<MetricCard label="Hours" value="..." />}>
                <MetricCard label="Hours" value={age.totalHours.toLocaleString()} />
            </ClientOnly>

            <ClientOnly fallback={<MetricCard label="Minutes" value="..." />}>
                <MetricCard label="Minutes" value={age.totalMinutes.toLocaleString()} />
            </ClientOnly>

            <ClientOnly fallback={<MetricCard label="Seconds" value="..." />}>
                <MetricCard
                    label="Seconds"
                    value={age.totalSeconds.toLocaleString()}
                    highlight
                />
            </ClientOnly>

            <ClientOnly fallback={<MetricCard label="Next Birthday" value="..." />}>
                <MetricCard
                    label="Next Birthday"
                    value={`${age.nextAge} years`}
                />
            </ClientOnly>
        </div>
    );
}

// Helper component
function MetricCard({
    label,
    value,
    highlight = false
}: {
    label: string;
    value: string | number;
    highlight?: boolean;
}) {
    return (
        <div className={`p-4 rounded-lg ${highlight ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : 'bg-gray-100'}`}>
            <div className={`text-sm ${highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                {label}
            </div>
            <div className="text-2xl font-bold mt-1">
                {value}
            </div>
        </div>
    );
}
