import { useState, useEffect, useRef } from 'react';

/**
 * useLiveCounter Hook
 * Animates a number starting from `initialValue` increasing by `ratePerSecond`.
 * Uses requestAnimationFrame for smooth 60fps updates.
 *
 * @param initialValue - The starting count (e.g., total heartbeats until now)
 * @param ratePerSecond - How much to increment per second
 * @returns Current animated value
 */
export function useLiveCounter(initialValue: number, ratePerSecond: number) {
    const [value, setValue] = useState(initialValue);
    const startTimeRef = useRef<number | null>(null);
    const startValueRef = useRef(initialValue);

    useEffect(() => {
        // Reset start value when initialValue changes (e.g. hydration mismatch fix or re-calculation)
        startValueRef.current = initialValue;
        startTimeRef.current = null;
    }, [initialValue]);

    useEffect(() => {
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }

            const elapsedSeconds = (timestamp - startTimeRef.current) / 1000;
            const increment = elapsedSeconds * ratePerSecond;

            // Update value
            setValue(Math.floor(startValueRef.current + increment));

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [ratePerSecond]);

    return value;
}
