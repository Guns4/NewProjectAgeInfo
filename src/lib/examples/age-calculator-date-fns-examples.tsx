/**
 * Age Calculator with date-fns - Test Examples
 * Demonstrates validation, error handling, and all features
 */

'use client';

import { useState } from 'react';
import { useAgeCalculator, validateBirthDate, calculateAge } from '@/hooks/calculator/useAgeCalculator';

// Example 1: Basic Usage with Validation
export function ValidatedAgeCalculator() {
    const [dateInput, setDateInput] = useState('');
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const { age, error, isCalculating } = useAgeCalculator(birthDate);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDateInput(value);

        if (value) {
            const date = new Date(value);
            const validation = validateBirthDate(date);

            if (validation.isValid) {
                setBirthDate(date);
            } else {
                setBirthDate(null);
                // Show validation error to user
                console.error(validation.error);
            }
        } else {
            setBirthDate(null);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Age Calculator (date-fns)</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Birth Date
                </label>
                <input
                    type="date"
                    value={dateInput}
                    onChange={handleDateChange}
                    max={new Date().toISOString().split('T')[0]}
                    min="1900-01-01"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">⚠️ {error}</p>
                </div>
            )}

            {isCalculating && (
                <div className="animate-pulse bg-gray-100 h-40 rounded-lg"></div>
            )}

            {!isCalculating && age && (
                <div className="space-y-4">
                    {/* Precise Age */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl">
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">
                                {age.years}
                            </div>
                            <div className="text-lg">years old</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                            <div>
                                <div className="text-2xl font-semibold">{age.months}</div>
                                <div className="text-sm opacity-90">months</div>
                            </div>
                            <div>
                                <div className="text-2xl font-semibold">{age.days}</div>
                                <div className="text-sm opacity-90">days</div>
                            </div>
                        </div>
                    </div>

                    {/* Total Conversions */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">Total Time Lived</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Months:</span>
                                <span className="font-semibold">{age.totalMonths.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Weeks:</span>
                                <span className="font-semibold">{age.totalWeeks.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Days:</span>
                                <span className="font-semibold">{age.totalDays.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Hours:</span>
                                <span className="font-semibold">{age.totalHours.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Minutes:</span>
                                <span className="font-semibold">{age.totalMinutes.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Seconds:</span>
                                <span className="font-semibold">{age.totalSeconds.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Next Birthday */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Next Birthday</h3>
                        <p className="text-sm text-gray-700">
                            {age.nextBirthday.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                            You'll be {age.nextAge} years old
                        </p>

                        {age.isLeapDayBirth && (
                            <p className="text-xs text-blue-600 mt-2">
                                ⭐ Leap day birthday!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Example 2: Error Handling Demo
export function ErrorHandlingDemo() {
    const testCases = [
        { label: 'Valid Date', date: new Date('1990-05-15'), shouldFail: false },
        { label: 'Future Date', date: new Date('2030-01-01'), shouldFail: true },
        { label: 'Very Old Date', date: new Date('1800-01-01'), shouldFail: true },
        { label: 'Leap Day', date: new Date('2000-02-29'), shouldFail: false },
    ];

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Validation Tests</h2>

            <div className="space-y-3">
                {testCases.map((testCase, index) => {
                    const validation = validateBirthDate(testCase.date);
                    const isExpected = validation.isValid === !testCase.shouldFail;

                    return (
                        <div
                            key={index}
                            className={`p-3 rounded-lg border ${isExpected
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-red-50 border-red-200'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-medium">{testCase.label}</span>
                                    <span className="text-sm text-gray-600 ml-2">
                                        {testCase.date.toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    {validation.isValid ? (
                                        <span className="text-green-700">✅ Valid</span>
                                    ) : (
                                        <span className="text-red-700">❌ {validation.error}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Example 3: Manual Calculation
export function ManualCalculationExample() {
    const birthDate = new Date('1995-08-20');
    const currentDate = new Date();

    // Use the function directly
    const age = calculateAge(birthDate, currentDate);

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Manual Calculation</h2>

            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                {JSON.stringify(age, null, 2)}
            </pre>
        </div>
    );
}

// Example 4: Unit Conversion Display
export function UnitConversionDisplay() {
    const birthDate = new Date('2000-01-01');
    const { age } = useAgeCalculator(birthDate);

    if (!age) return null;

    const conversions = [
        { unit: 'Years', value: age.years, icon: '📅' },
        { unit: 'Months', value: age.totalMonths, icon: '🗓️' },
        { unit: 'Weeks', value: age.totalWeeks, icon: '📆' },
        { unit: 'Days', value: age.totalDays, icon: '☀️' },
        { unit: 'Hours', value: age.totalHours, icon: '⏰' },
        { unit: 'Minutes', value: age.totalMinutes, icon: '⏱️' },
        { unit: 'Seconds', value: age.totalSeconds, icon: '⚡' },
    ];

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Age in Different Units</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {conversions.map((conversion) => (
                    <div
                        key={conversion.unit}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg text-center"
                    >
                        <div className="text-2xl mb-1">{conversion.icon}</div>
                        <div className="text-2xl font-bold text-purple-700">
                            {conversion.value.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">{conversion.unit}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
