/**
 * Calculator Hooks Usage Examples
 * Demonstrates all calculator hooks with real-world scenarios
 */

'use client';

import { useState } from 'react';
import {
    useAgeCalculator,
    useDetailedAge,
    useRealTimeAge,
    useNextBirthday,
    useNextBirthdayCountdown,
    useLeapYearCheck,
    useTimezoneConverter,
} from '@/hooks/calculator';

// Example 1: Basic Age Calculator
export function BasicAgeExample() {
    const birthDate = new Date('1990-03-15');
    const { age, error } = useAgeCalculator(birthDate);

    if (error) return <div>Error: {error}</div>;
    if (!age) return <div>Loading...</div>;

    return (
        <div>
            <h2>Basic Age</h2>
            <p>{age.years} years, {age.months} months, {age.days} days</p>
            <p>Total: {age.totalDays.toLocaleString()} days</p>
            <p>Next birthday: {age.nextBirthday.toLocaleDateString()}</p>
        </div>
    );
}

// Example 2: Detailed Age with All Units
export function DetailedAgeExample() {
    const birthDate = new Date('1995-07-20');
    const { detailedAge, error } = useDetailedAge(birthDate);

    if (error) return <div>Error: {error}</div>;
    if (!detailedAge) return <div>Loading...</div>;

    return (
        <div>
            <h2>Detailed Age</h2>

            {/* Formatted strings */}
            <p><strong>Short:</strong> {detailedAge.formatted.short}</p>
            <p><strong>Medium:</strong> {detailedAge.formatted.medium}</p>
            <p><strong>Long:</strong> {detailedAge.formatted.long}</p>
            <p><strong>Human:</strong> {detailedAge.formatted.humanReadable}</p>

            {/* Life statistics */}
            <div>
                <h3>Life Statistics</h3>
                <p>Life lived: {detailedAge.lifePercentage}%</p>
                <p>Days remaining: {detailedAge.daysRemaining.toLocaleString()}</p>
                <p>Years remaining: {detailedAge.yearsRemaining}</p>
            </div>

            {/* Milestones */}
            <div>
                <h3>Milestones</h3>
                <p><strong>Passed:</strong> {detailedAge.milestones.passed.join(', ')}</p>
                <p><strong>Upcoming:</strong> {detailedAge.milestones.upcoming.join(', ')}</p>
            </div>
        </div>
    );
}

// Example 3: Real-Time Age Counter (Hydration Safe!)
export function RealTimeAgeExample() {
    const birthDate = new Date('2000-01-01');
    const { age, isClient } = useRealTimeAge(birthDate);

    // Server and initial client render: show skeleton
    if (!isClient || !age) {
        return (
            <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        );
    }

    // Client render: show real-time age
    return (
        <div>
            <h2>Real-Time Age</h2>
            <div className="text-4xl font-bold">
                {age.years} <span className="text-lg">years</span>
            </div>
            <div className="text-2xl">
                {age.months}m {age.days}d {age.hours}h {age.minutes}m {age.seconds}s
            </div>
            <p className="text-sm text-gray-600">
                {age.totalSeconds.toLocaleString()} seconds old
            </p>
        </div>
    );
}

// Example 4: Next Birthday Countdown
export function NextBirthdayExample() {
    const birthDate = new Date('1985-12-25');
    const { nextBirthday, error } = useNextBirthday(birthDate);

    if (error) return <div>Error: {error}</div>;
    if (!nextBirthday) return <div>Loading...</div>;

    return (
        <div>
            <h2>Next Birthday</h2>

            {nextBirthday.isBirthdayToday && (
                <div className="text-2xl font-bold text-green-600">
                    🎉 Happy Birthday! 🎉
                </div>
            )}

            <div>
                <p className="text-xl font-semibold">
                    {nextBirthday.formatted.countdown}
                </p>
                <p>{nextBirthday.formatted.countdownDetailed}</p>
            </div>

            <div>
                <p>Date: {nextBirthday.formatted.date}</p>
                <p>Day: {nextBirthday.dayOfWeek}</p>
                <p>Age: {nextBirthday.nextAge} years</p>
            </div>

            {nextBirthday.isLeapDayBirthday && (
                <p className="text-sm text-blue-600">
                    ⭐ Leap day birthday!
                </p>
            )}
        </div>
    );
}

// Example 5: Real-Time Birthday Countdown
export function LiveBirthdayCountdown() {
    const birthDate = new Date('1992-06-10');
    const { countdown, isClient } = useNextBirthdayCountdown(birthDate);

    if (!isClient || !countdown) {
        return <div className="h-20 bg-gray-100 animate-pulse rounded"></div>;
    }

    return (
        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Next Birthday</h3>

            <div className="text-4xl font-bold mb-2">
                {countdown.daysUntil} <span className="text-xl">days</span>
            </div>

            <div className="text-xl">
                {countdown.hoursUntil % 24}h : {countdown.minutesUntil % 60}m : {countdown.secondsUntil % 60}s
            </div>

            <p className="mt-4 text-sm opacity-90">
                {countdown.formatted.date} ({countdown.dayOfWeek})
            </p>
        </div>
    );
}

// Example 6: Leap Year Check
export function LeapYearExample() {
    const birthDate = new Date('2000-02-29'); // Leap day!
    const leapYear = useLeapYearCheck(birthDate);

    return (
        <div>
            <h2>Leap Year Info</h2>
            <p>Birth year: {birthDate.getFullYear()}</p>
            <p>Is leap year: {leapYear.isLeapYear ? 'Yes ✅' : 'No ❌'}</p>
            <p>Is leap day birthday: {leapYear.isLeapDayBirthday ? 'Yes 🎉' : 'No'}</p>
            <p>Days in February: {leapYear.daysInFebruary}</p>
            <p>Next leap year: {leapYear.getNextLeapYear()}</p>
        </div>
    );
}

// Example 7: Timezone Info
export function TimezoneExample() {
    const timezone = useTimezoneConverter();

    return (
        <div>
            <h2>Timezone Info</h2>
            <p>Your timezone: {timezone.timezone}</p>
            <p>UTC offset: {timezone.offsetHours}h {timezone.offsetMinutes}m</p>
            <p>Is UTC: {timezone.isUTC ? 'Yes' : 'No'}</p>

            <div className="mt-4">
                <p>Current time in your timezone:</p>
                <p className="font-mono">
                    {timezone.formatWithTimezone(new Date())}
                </p>
            </div>
        </div>
    );
}

// Example 8: Interactive Age Calculator
export function InteractiveCalculator() {
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const { age, isClient } = useRealTimeAge(birthDate);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        if (!isNaN(date.getTime())) {
            setBirthDate(date);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Age Calculator</h2>

            <input
                type="date"
                onChange={handleDateChange}
                className="w-full p-2 border rounded mb-4"
                max={new Date().toISOString().split('T')[0]}
            />

            {!birthDate && (
                <p className="text-gray-500">Select your birth date</p>
            )}

            {birthDate && !isClient && (
                <div className="animate-pulse bg-gray-100 h-20 rounded"></div>
            )}

            {birthDate && isClient && age && (
                <div className="space-y-4">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-indigo-600">
                            {age.years}
                        </div>
                        <div className="text-gray-600">years old</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-semibold">{age.months}</div>
                            <div className="text-sm text-gray-600">months</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold">{age.days}</div>
                            <div className="text-sm text-gray-600">days</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold">{age.hours}</div>
                            <div className="text-sm text-gray-600">hours</div>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600">
                            {age.totalDays.toLocaleString()} days
                            • {age.totalHours.toLocaleString()} hours
                            • {age.totalSeconds.toLocaleString()} seconds
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
