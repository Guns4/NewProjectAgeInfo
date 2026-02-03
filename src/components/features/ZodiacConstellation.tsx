/**
 * Zodiac Constellation Component - Fase 295.4
 * Generative SVG constellations with stroke-drawing animation
 */

'use client';

import { motion } from 'framer-motion';

interface ConstellationPattern {
    stars: Array<{ x: number; y: number; size: number }>;
    lines: Array<{ x1: number; y1: number; x2: number; y2: number }>;
}

// Simplified constellation patterns (scaled to 100x100 viewBox)
const CONSTELLATIONS: Record<string, ConstellationPattern> = {
    Aries: {
        stars: [
            { x: 30, y: 80, size: 2 },
            { x: 45, y: 60, size: 2.5 },
            { x: 55, y: 40, size: 2 },
            { x: 70, y: 30, size: 3 },
        ],
        lines: [
            { x1: 30, y1: 80, x2: 45, y2: 60 },
            { x1: 45, y1: 60, x2: 55, y2: 40 },
            { x1: 55, y1: 40, x2: 70, y2: 30 },
        ],
    },
    Taurus: {
        stars: [
            { x: 40, y: 70, size: 3 },
            { x: 50, y: 50, size: 2.5 },
            { x: 65, y: 45, size: 2 },
            { x: 35, y: 40, size: 2 },
            { x: 55, y: 30, size: 2 },
        ],
        lines: [
            { x1: 40, y1: 70, x2: 50, y2: 50 },
            { x1: 50, y1: 50, x2: 35, y2: 40 },
            { x1: 50, y1: 50, x2: 65, y2: 45 },
            { x1: 65, y1: 45, x2: 55, y2: 30 },
        ],
    },
    Gemini: {
        stars: [
            { x: 30, y: 70, size: 2.5 },
            { x: 30, y: 50, size: 2 },
            { x: 30, y: 30, size: 2.5 },
            { x: 70, y: 70, size: 2.5 },
            { x: 70, y: 50, size: 2 },
            { x: 70, y: 30, size: 2.5 },
        ],
        lines: [
            { x1: 30, y1: 70, x2: 30, y2: 50 },
            { x1: 30, y1: 50, x2: 30, y2: 30 },
            { x1: 70, y1: 70, x2: 70, y2: 50 },
            { x1: 70, y1: 50, x2: 70, y2: 30 },
            { x1: 30, y1: 50, x2: 70, y2: 50 },
        ],
    },
    Cancer: {
        stars: [
            { x: 35, y: 60, size: 2 },
            { x: 50, y: 50, size: 3 },
            { x: 65, y: 60, size: 2 },
            { x: 40, y: 40, size: 2 },
            { x: 60, y: 40, size: 2 },
        ],
        lines: [
            { x1: 35, y1: 60, x2: 50, y2: 50 },
            { x1: 50, y1: 50, x2: 65, y2: 60 },
            { x1: 50, y1: 50, x2: 40, y2: 40 },
            { x1: 50, y1: 50, x2: 60, y2: 40 },
        ],
    },
    Leo: {
        stars: [
            { x: 50, y: 30, size: 3 },
            { x: 40, y: 45, size: 2 },
            { x: 35, y: 60, size: 2 },
            { x: 60, y: 50, size: 2.5 },
            { x: 70, y: 65, size: 2 },
        ],
        lines: [
            { x1: 50, y1: 30, x2: 40, y2: 45 },
            { x1: 40, y1: 45, x2: 35, y2: 60 },
            { x1: 50, y1: 30, x2: 60, y2: 50 },
            { x1: 60, y1: 50, x2: 70, y2: 65 },
        ],
    },
    Virgo: {
        stars: [
            { x: 25, y: 40, size: 2 },
            { x: 40, y: 30, size: 2.5 },
            { x: 50, y: 50, size: 3 },
            { x: 60, y: 35, size: 2 },
            { x: 75, y: 45, size: 2 },
        ],
        lines: [
            { x1: 25, y1: 40, x2: 40, y2: 30 },
            { x1: 40, y1: 30, x2: 50, y2: 50 },
            { x1: 50, y1: 50, x2: 60, y2: 35 },
            { x1: 60, y1: 35, x2: 75, y2: 45 },
        ],
    },
    Libra: {
        stars: [
            { x: 30, y: 40, size: 2.5 },
            { x: 50, y: 35, size: 3 },
            { x: 70, y: 40, size: 2.5 },
            { x: 40, y: 60, size: 2 },
            { x: 60, y: 60, size: 2 },
        ],
        lines: [
            { x1: 30, y1: 40, x2: 50, y2: 35 },
            { x1: 50, y1: 35, x2: 70, y2: 40 },
            { x1: 30, y1: 40, x2: 40, y2: 60 },
            { x1: 70, y1: 40, x2: 60, y2: 60 },
        ],
    },
    Scorpio: {
        stars: [
            { x: 25, y: 50, size: 2 },
            { x: 40, y: 45, size: 2.5 },
            { x: 50, y: 40, size: 3 },
            { x: 60, y: 50, size: 2 },
            { x: 75, y: 30, size: 2.5 },
        ],
        lines: [
            { x1: 25, y1: 50, x2: 40, y2: 45 },
            { x1: 40, y1: 45, x2: 50, y2: 40 },
            { x1: 50, y1: 40, x2: 60, y2: 50 },
            { x1: 60, y1: 50, x2: 75, y2: 30 },
        ],
    },
    Sagittarius: {
        stars: [
            { x: 30, y: 70, size: 2 },
            { x: 45, y: 55, size: 2.5 },
            { x: 55, y: 45, size: 2 },
            { x: 70, y: 30, size: 3 },
            { x: 40, y: 35, size: 2 },
        ],
        lines: [
            { x1: 30, y1: 70, x2: 70, y2: 30 },
            { x1: 45, y1: 55, x2: 40, y2: 35 },
            { x1: 55, y1: 45, x2: 70, y2: 50 },
        ],
    },
    Capricorn: {
        stars: [
            { x: 35, y: 40, size: 2.5 },
            { x: 45, y: 50, size: 2 },
            { x: 55, y: 45, size: 3 },
            { x: 65, y: 55, size: 2 },
            { x: 50, y: 65, size: 2 },
        ],
        lines: [
            { x1: 35, y1: 40, x2: 45, y2: 50 },
            { x1: 45, y1: 50, x2: 55, y2: 45 },
            { x1: 55, y1: 45, x2: 65, y2: 55 },
            { x1: 45, y1: 50, x2: 50, y2: 65 },
        ],
    },
    Aquarius: {
        stars: [
            { x: 30, y: 40, size: 2 },
            { x: 45, y: 35, size: 2.5 },
            { x: 55, y: 50, size: 3 },
            { x: 70, y: 45, size: 2 },
            { x: 50, y: 65, size: 2 },
        ],
        lines: [
            { x1: 30, y1: 40, x2: 45, y2: 35 },
            { x1: 45, y1: 35, x2: 55, y2: 50 },
            { x1: 55, y1: 50, x2: 70, y2: 45 },
            { x1: 55, y1: 50, x2: 50, y2: 65 },
        ],
    },
    Pisces: {
        stars: [
            { x: 25, y: 50, size: 2.5 },
            { x: 40, y: 40, size: 2 },
            { x: 50, y: 50, size: 2 },
            { x: 60, y: 60, size: 2 },
            { x: 75, y: 50, size: 2.5 },
        ],
        lines: [
            { x1: 25, y1: 50, x2: 40, y2: 40 },
            { x1: 40, y1: 40, x2: 50, y2: 50 },
            { x1: 50, y1: 50, x2: 60, y2: 60 },
            { x1: 60, y1: 60, x2: 75, y2: 50 },
        ],
    },
};

interface ZodiacConstellationProps {
    zodiacSign: string;
    className?: string;
}

export function ZodiacConstellation({ zodiacSign, className }: ZodiacConstellationProps) {
    const constellation = CONSTELLATIONS[zodiacSign];

    if (!constellation) return null;

    return (
        <>
            {/* CSS Keyframes for twinkling stars */}
            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>

            <svg
                viewBox="0 0 100 100"
                className={className}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.15,
                    pointerEvents: 'none',
                }}
            >
                {/* Twinkling Stars */}
                {constellation.stars.map((star, index) => (
                    <circle
                        key={`star-${index}`}
                        cx={star.x}
                        cy={star.y}
                        r={star.size}
                        fill="currentColor"
                        style={{
                            animation: `twinkle ${2 + index * 0.3}s ease-in-out infinite`,
                            willChange: 'opacity',
                        }}
                    />
                ))}

                {/* Constellation Lines with Stroke Animation */}
                {constellation.lines.map((line, index) => {
                    const pathD = `M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`;

                    return (
                        <motion.path
                            key={`line-${index}`}
                            d={pathD}
                            stroke="currentColor"
                            strokeWidth="0.5"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                                pathLength: {
                                    duration: 1.5,
                                    delay: index * 0.2,
                                    ease: 'easeInOut',
                                },
                                opacity: {
                                    duration: 0.3,
                                    delay: index * 0.2,
                                },
                            }}
                        />
                    );
                })}
            </svg>
        </>
    );
}
