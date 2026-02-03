/**
 * Validation Test Cases - Age Calculator
 */

'use client';

import { validateBirthDate, calculateAge } from '@/hooks/calculator/useAgeCalculator';

export function ValidationTestSuite() {
    // Test cases with expected results
    const testCases = [
        {
            name: '✅ Valid date (1990)',
            date: new Date('1990-05-15'),
            shouldPass: true,
            expectedError: null,
        },
        {
            name: '✅ Valid date (2000)',
            date: new Date('2000-01-01'),
            shouldPass: true,
            expectedError: null,
        },
        {
            name: '✅ Leap day (2000-02-29)',
            date: new Date('2000-02-29'),
            shouldPass: true,
            expectedError: null,
        },
        {
            name: '✅ Recent date (2020)',
            date: new Date('2020-06-15'),
            shouldPass: true,
            expectedError: null,
        },
        {
            name: '❌ Future date (2030)',
            date: new Date('2030-01-01'),
            shouldPass: false,
            expectedError: 'Birth date cannot be in the future',
        },
        {
            name: '❌ Tomorrow',
            date: new Date(Date.now() + 86400000), // +1 day
            shouldPass: false,
            expectedError: 'Birth date cannot be in the future',
        },
        {
            name: '❌ Invalid date',
            date: new Date('invalid-date'),
            shouldPass: false,
            expectedError: 'Invalid date format',
        },
        {
            name: '❌ Before 1900',
            date: new Date('1899-12-31'),
            shouldPass: false,
            expectedError: 'Birth date must be after year 1900',
        },
        {
            name: '❌ Very old (1800)',
            date: new Date('1800-01-01'),
            shouldPass: false,
            expectedError: 'Birth date must be after year 1900',
        },
        {
            name: '❌ Too old (1850)',
            date: new Date('1850-06-15'),
            shouldPass: false,
            expectedError: 'Birth date must be after year',
        },
    ];

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Validation Test Suite</h2>

            <div className="space-y-2">
                {testCases.map((testCase, index) => {
                    const validation = validateBirthDate(testCase.date);
                    const passed = validation.isValid === testCase.shouldPass;

                    let calculationResult = null;
                    let calculationError = null;

                    // Try to calculate age
                    if (validation.isValid) {
                        try {
                            calculationResult = calculateAge(testCase.date);
                        } catch (err) {
                            calculationError = err instanceof Error ? err.message : 'Error';
                        }
                    }

                    return (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border-2 ${passed
                                ? 'bg-green-50 border-green-300'
                                : 'bg-red-50 border-red-300'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="font-semibold mb-1">
                                        {passed ? '✅' : '❌'} {testCase.name}
                                    </div>

                                    <div className="text-sm text-gray-600 mb-2">
                                        Date: {testCase.date.toISOString().split('T')[0]}
                                    </div>

                                    <div className="text-sm">
                                        <div>
                                            <span className="font-medium">Expected:</span>{' '}
                                            {testCase.shouldPass ? 'Valid' : 'Invalid'}
                                            {testCase.expectedError && ` - ${testCase.expectedError}`}
                                        </div>
                                        <div>
                                            <span className="font-medium">Actual:</span>{' '}
                                            {validation.isValid ? (
                                                <span className="text-green-700">Valid</span>
                                            ) : (
                                                <span className="text-red-700">{validation.error}</span>
                                            )}
                                        </div>
                                    </div>

                                    {calculationResult && (
                                        <div className="mt-2 text-sm bg-white p-2 rounded">
                                            <strong>Age:</strong> {calculationResult.years} years,{' '}
                                            {calculationResult.months} months, {calculationResult.days} days
                                        </div>
                                    )}

                                    {calculationError && (
                                        <div className="mt-2 text-sm text-red-600">
                                            <strong>Calculation Error:</strong> {calculationError}
                                        </div>
                                    )}
                                </div>

                                <div className="ml-4">
                                    {passed ? (
                                        <span className="text-2xl">✅</span>
                                    ) : (
                                        <span className="text-2xl">❌</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Test Summary</h3>
                <p className="text-sm">
                    Total Tests: {testCases.length} |{' '}
                    Passed: {testCases.filter((tc) => {
                        const validation = validateBirthDate(tc.date);
                        return validation.isValid === tc.shouldPass;
                    }).length} |{' '}
                    Failed: {testCases.filter((tc) => {
                        const validation = validateBirthDate(tc.date);
                        return validation.isValid !== tc.shouldPass;
                    }).length}
                </p>
            </div>
        </div>
    );
}

// Edge Cases Test
export function EdgeCasesTest() {
    const edgeCases = [
        {
            name: 'Today',
            date: new Date(),
        },
        {
            name: 'Yesterday',
            date: new Date(Date.now() - 86400000),
        },
        {
            name: 'Year 1900',
            date: new Date('1900-01-01'),
        },
        {
            name: 'Year 1901',
            date: new Date('1901-01-01'),
        },
        {
            name: 'Leap Day 2000',
            date: new Date('2000-02-29'),
        },
        {
            name: 'Leap Day 2024',
            date: new Date('2024-02-29'),
        },
    ];

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edge Cases</h2>

            <div className="space-y-3">
                {edgeCases.map((edge, index) => {
                    const validation = validateBirthDate(edge.date);

                    let age = null;
                    try {
                        if (validation.isValid) {
                            age = calculateAge(edge.date);
                        }
                    } catch (err) {
                        // Error handled
                    }

                    return (
                        <div
                            key={index}
                            className="p-3 bg-gray-50 rounded-lg border"
                        >
                            <div className="font-medium">{edge.name}</div>
                            <div className="text-sm text-gray-600">
                                {edge.date.toLocaleDateString()}
                            </div>

                            {validation.isValid ? (
                                <div className="text-sm text-green-700 mt-1">
                                    ✅ Valid
                                    {age && ` - ${age.years} years, ${age.months} months, ${age.days} days`}
                                </div>
                            ) : (
                                <div className="text-sm text-red-700 mt-1">
                                    ❌ {validation.error}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
