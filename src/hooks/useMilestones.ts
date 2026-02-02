/**
 * useMilestones Hook - Fase 301-325
 * Calculates life micro-milestones with precise date math
 * Philosophy: Data accuracy + Emotional connection
 */

import { useMemo } from 'react';

export interface Milestone {
    type: 'days' | 'hours' | 'minutes' | 'seconds' | 'yearProgress';
    target: number;
    reached: boolean;
    date: Date | null;
    daysUntil: number;
    percentage: number;
    label: string;
    description: string;
}

interface MilestonesResult {
    nextMilestone: Milestone | null;
    upcomingMilestones: Milestone[];
    yearProgress: {
        percentage: number;
        daysRemaining: number;
        daysTotal: number;
        daysPassed: number;
    };
}

/**
 * Calculate milestones based on birth date
 */
export function useMilestones(birthDate: Date | null, age: any): MilestonesResult {
    return useMemo(() => {
        if (!birthDate || !age) {
            return {
                nextMilestone: null,
                upcomingMilestones: [],
                yearProgress: {
                    percentage: 0,
                    daysRemaining: 0,
                    daysTotal: 365,
                    daysPassed: 0,
                },
            };
        }

        const now = new Date();

        // Define milestones
        const MILESTONES = [
            // Days milestones
            { type: 'days' as const, target: 10000, label: '10,000 Hari', description: 'Hampir 27.4 tahun perjalanan hidup' },
            { type: 'days' as const, target: 20000, label: '20,000 Hari', description: 'Lebih dari 54 tahun pengalaman' },
            { type: 'days' as const, target: 30000, label: '30,000 Hari', description: 'Hampir 82 tahun kebijaksanaan' },

            // Hours milestones
            { type: 'hours' as const, target: 500000, label: '500,000 Jam', description: 'Setengah juta jam kehidupan' },
            { type: 'hours' as const, target: 1000000, label: '1,000,000 Jam', description: 'Sejuta jam momen berharga' },

            // Minutes milestones
            { type: 'minutes' as const, target: 1000000, label: '1,000,000 Menit', description: 'Sejuta menit perjalanan waktu' },
            { type: 'minutes' as const, target: 10000000, label: '10,000,000 Menit', description: 'Hampir 19 tahun dalam menit' },

            // Seconds milestones
            { type: 'seconds' as const, target: 1000000000, label: '1 Miliar Detik', description: 'Hampir 32 tahun dalam detik' },
            { type: 'seconds' as const, target: 2000000000, label: '2 Miliar Detik', description: 'Hampir 63 tahun dalam detik' },
        ];

        const processedMilestones: Milestone[] = MILESTONES.map(m => {
            let current = 0;
            let msPerUnit = 0;

            switch (m.type) {
                case 'days':
                    current = age.totalDays || 0;
                    msPerUnit = 1000 * 60 * 60 * 24;
                    break;
                case 'hours':
                    current = age.totalHours || 0;
                    msPerUnit = 1000 * 60 * 60;
                    break;
                case 'minutes':
                    current = age.totalMinutes || 0;
                    msPerUnit = 1000 * 60;
                    break;
                case 'seconds':
                    current = age.totalSeconds || 0;
                    msPerUnit = 1000;
                    break;
            }

            const reached = current >= m.target;
            const remaining = m.target - current;
            const percentage = Math.min((current / m.target) * 100, 100);

            // Calculate exact milestone date
            let milestoneDate: Date | null = null;
            let daysUntil = 0;

            if (!reached && msPerUnit > 0) {
                const msUntilMilestone = remaining * msPerUnit;
                milestoneDate = new Date(now.getTime() + msUntilMilestone);
                daysUntil = Math.ceil(msUntilMilestone / (1000 * 60 * 60 * 24));
            } else if (reached) {
                // Calculate when it was reached
                const msToMilestone = (m.target - current) * msPerUnit;
                milestoneDate = new Date(now.getTime() + msToMilestone);
                daysUntil = 0;
            }

            return {
                type: m.type,
                target: m.target,
                reached,
                date: milestoneDate,
                daysUntil,
                percentage,
                label: m.label,
                description: m.description,
            };
        });

        // Get upcoming milestones (not reached, sorted by days until)
        const upcoming = processedMilestones
            .filter(m => !m.reached)
            .sort((a, b) => a.daysUntil - b.daysUntil)
            .slice(0, 3); // Top 3 upcoming

        const nextMilestone = upcoming[0] || null;

        // Calculate year progress
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const yearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
        const yearTotal = Math.ceil((yearEnd.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
        const daysPassed = Math.ceil((now.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
        const daysRemaining = yearTotal - daysPassed;
        const yearPercentage = (daysPassed / yearTotal) * 100;

        return {
            nextMilestone,
            upcomingMilestones: upcoming,
            yearProgress: {
                percentage: yearPercentage,
                daysRemaining,
                daysTotal: yearTotal,
                daysPassed,
            },
        };
    }, [birthDate, age]);
}
