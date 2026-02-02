/**
 * ClientOnly Component - Hydration Guard
 * Phase 121-140: Prevents Next.js hydration mismatch
 * 
 * Purpose: Render children only on client-side
 * Use: Wrap real-time/dynamic content that differs between server and client
 */

'use client';

import { useHasMounted } from '@/hooks/useHasMounted';

interface ClientOnlyProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * ClientOnly wrapper component
 * 
 * Strategy:
 * 1. Server renders: shows fallback (or null)
 * 2. Client first render: shows fallback (matches server)
 * 3. Client after mount: shows children
 * 
 * Perfect for seconds display, timestamps, etc!
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
    const hasMounted = useHasMounted();

    if (!hasMounted) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
