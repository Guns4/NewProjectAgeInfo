import { useState, useEffect, useRef } from 'react';

/**
 * useTicker Hook
 * Provides a high-performance, smooth timeline update synchronized with standard refresh rates.
 * Uses requestAnimationFrame instead of setInterval for smoother 60fps/120Hz updates.
 * 
 * @returns {Date} The current time, updated on every frame.
 */
export function useTicker() {
    const [now, setNow] = useState(() => new Date());
    const frameId = useRef<number>(0);

    useEffect(() => {
        const update = () => {
            setNow(new Date());
            frameId.current = requestAnimationFrame(update);
        };

        // Start the loop
        frameId.current = requestAnimationFrame(update);

        // Cleanup
        return () => {
            if (frameId.current) {
                cancelAnimationFrame(frameId.current);
            }
        };
    }, []);

    return now;
}
