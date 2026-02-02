import { useQuery } from '@tanstack/react-query';
import { getTimeCapsule, TimeCapsule } from '@/services/historicalService';

/**
 * Custom hook to fetch historical data with caching and persistence.
 * Uses TanStack Query for memory cache + sessionStorage for persistence across reloads.
 */
export function useHistoricalData(year: number | null) {
    return useQuery({
        queryKey: ['historicalData', year],
        queryFn: async (): Promise<TimeCapsule | null> => {
            if (!year) return null;

            // 1. Check sessionStorage (Persistence Layer)
            // Note: This is a synchronous check before the "network" request.
            // In a real async scenario, we might want to do this inside the promise or use a persist plugin.
            // But for this specific requirement, checking here is efficient.
            if (typeof window !== 'undefined') {
                const cached = sessionStorage.getItem(`history-${year}`);
                if (cached) {
                    try {
                        const parsed = JSON.parse(cached);
                        console.log('Serving from sessionStorage:', year);
                        return parsed;
                    } catch (e) {
                        console.warn('Invalid cache', e);
                        sessionStorage.removeItem(`history-${year}`);
                    }
                }
            }

            // 2. Fetch Data (Simulated API Call)
            // Even though getTimeCapsule is fast (local JSON), we treat it as async
            const data = await getTimeCapsule(year);

            // 3. Save to sessionStorage
            if (typeof window !== 'undefined' && data) {
                // Only cache if we really found data or if we want to cache the "not found" state too.
                // Here we cache everything to avoid re-fetching.
                sessionStorage.setItem(`history-${year}`, JSON.stringify(data));
            }

            return data;
        },
        enabled: !!year, // Only run if year is present
        staleTime: Infinity, // History doesn't change
    });
}
