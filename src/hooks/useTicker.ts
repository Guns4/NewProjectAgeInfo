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
        let frameId: number;

        const update = () => {
            setNow(new Date());
            frameId = requestAnimationFrame(update);
        };

        // Start the loop
        frameId = requestAnimationFrame(update);

        // Cleanup
        return () => cancelAnimationFrame(frameId);
    }, []);

    return now;
}
