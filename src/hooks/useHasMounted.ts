/**
 * useHasMounted Hook - Hydration Guard
 * Phase 121-140: Prevents Next.js hydration mismatch
 * 
 * Purpose: Detect when component has mounted on client-side
 * Use: Wrap time-sensitive renders to avoid server/client discrepancies
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * Detect if component has mounted on client
 * 
 * Strategy:
 * 1. Server renders: returns false
 * 2. Client first render: returns false (matches server)
 * 3. Client after mount: returns true
 * 
 * This prevents hydration mismatch!
 */
export function useHasMounted(): boolean {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}
