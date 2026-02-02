'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Data from this app (history/nostalgia) is static per user/year.
                        // We can cache it effectively forever during the session.
                        staleTime: 1000 * 60 * 60, // 1 hour
                        gcTime: 1000 * 60 * 60 * 24, // 24 hours
                        refetchOnWindowFocus: false, // Don't refetch static data
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
