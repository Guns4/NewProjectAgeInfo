/**
 * Time Relativity Module - Fase 395.2
 * Calculates age in relative contexts and scale
 */

export interface RelativityResult {
    independencePercentage: string;
    iphoneGenerations: number;
    cosmicMilliseconds: string;
}

/**
 * Calculate time relativity metrics
 * @param birthDate User's birth date
 * @param ageInYears User's age in years
 */
export function calculateRelativity(birthDate: Date, ageInYears: number): RelativityResult {
    const now = new Date();

    // 1. Independence Percentage (Indonesia: 17 Aug 1945)
    // How long has Indonesia been independent?
    const independenceDate = new Date('1945-08-17');
    const independenceDuration = now.getTime() - independenceDate.getTime();

    // How long has user lived?
    const userDuration = now.getTime() - birthDate.getTime();

    const percentage = (userDuration / independenceDuration) * 100;
    const independencePercentage = percentage.toFixed(1) + '%';


    // 2. iPhone Generations since birth
    // List of major iPhone release dates (Approximate for simple logic)
    const iphoneReleases = [
        '2007-06-29', // Gen 1
        '2008-07-11', // 3G
        '2009-06-19', // 3GS
        '2010-06-24', // 4
        '2011-10-14', // 4S
        '2012-09-21', // 5
        '2013-09-20', // 5S/5C
        '2014-09-19', // 6
        '2015-09-25', // 6S
        '2016-09-16', // 7
        '2017-09-22', // 8/X
        '2018-09-21', // XS/XR
        '2019-09-20', // 11
        '2020-10-23', // 12
        '2021-09-24', // 13
        '2022-09-16', // 14
        '2023-09-22', // 15
        '2024-09-20', // 16 (Est)
    ];

    // Count how many releases happened AFTER user was born
    const generations = iphoneReleases.filter(date => new Date(date) > birthDate).length;


    // 3. Cosmic Scaling (Earth History -> 24 Hours)
    // Earth Age: 4.54 billion years
    // 24 Hours = 86,400,000 milliseconds
    // Formula: (Age / 4.54e9) * 8.64e7

    const earthAgeYears = 4540000000;
    const dayInMs = 86400000;
    const cosmicMs = (ageInYears / earthAgeYears) * dayInMs;

    // Format: If < 1, show decimals (0.5 ms). If > 1, show integer.
    // For 30 years: ~0.57ms
    const cosmicMilliseconds = cosmicMs < 1
        ? cosmicMs.toFixed(3)
        : cosmicMs.toFixed(2);

    return {
        independencePercentage,
        iphoneGenerations: generations,
        cosmicMilliseconds
    };
}
