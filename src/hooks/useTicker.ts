import { useState, useEffect } from 'react';

/**
 * useTicker Hook
 * Provides a high-performance, smooth timeline update synchronized with standard refresh rates.
 * Uses requestAnimationFrame instead of setInterval for smoother 60fps/120Hz updates.
 * 
 * @returns {Date} The current time, updated on every frame.
 */
export function useTicker() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(new Date());
        }, 1000);

        // Cleanup
        return () => clearInterval(intervalId);
    }, []);

    return now;
}
