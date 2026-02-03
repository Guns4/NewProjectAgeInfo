/**
 * Vibrant Template - Fase 461-480
 * Spotify Wrapped-inspired bold design with gradients
 */

'use client';

import type { InfographicData, ThemeColors } from '@/types/infographic';
import { getMotivationalTagline } from '@/lib/infographic/data-formatter';

interface VibrantTemplateProps {
    data: InfographicData;
    colors: ThemeColors;
}

export function VibrantTemplate({ data, colors }: VibrantTemplateProps) {
    const { age, highlights, birthDate } = data;
    const tagline = getMotivationalTagline(age);

    // Create gradient background
    const gradientBg = colors.gradient
        ? `linear-gradient(135deg, ${colors.gradient.from} 0%, ${colors.gradient.via || colors.gradient.to} 50%, ${colors.gradient.to} 100%)`
        : colors.background;

    return (
        <div
            style={{
                width: '1080px',
                height: '1920px',
                background: gradientBg,
                color: colors.foreground,
                display: 'flex',
                flexDirection: 'column',
                padding: '80px',
                fontFamily: 'Inter, system-ui, sans-serif',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative circles */}
            <div
                style={{
                    position: 'absolute',
                    top: '-200px',
                    right: '-200px',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(60px)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '-300px',
                    left: '-200px',
                    width: '800px',
                    height: '800px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.2)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Content (relative to stay above decorations) */}
            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{ marginBottom: '80px' }}>
                    <div
                        style={{
                            fontSize: '48px',
                            fontWeight: '900',
                            color: colors.foreground,
                            letterSpacing: '-0.03em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Your Life
                    </div>
                    <div
                        style={{
                            fontSize: '48px',
                            fontWeight: '900',
                            color: 'rgba(255, 255, 255, 0.6)',
                            letterSpacing: '-0.03em',
                            textTransform: 'uppercase',
                        }}
                    >
                        In Numbers
                    </div>
                </div>

                {/* Main Age Display with Circle */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '80px',
                    }}
                >
                    <div
                        style={{
                            width: '500px',
                            height: '500px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '6px solid rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '200px',
                                fontWeight: '900',
                                lineHeight: '1',
                                color: colors.foreground,
                            }}
                        >
                            {age.years}
                        </div>
                        <div
                            style={{
                                fontSize: '40px',
                                fontWeight: '700',
                                color: 'rgba(255, 255, 255, 0.8)',
                                marginTop: '16px',
                            }}
                        >
                            YEARS
                        </div>
                    </div>
                </div>

                {/* Highlights */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        marginBottom: '80px',
                    }}
                >
                    {highlights.slice(0, 4).map((highlight, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '32px 40px',
                                background: 'rgba(255, 255, 255, 0.12)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: colors.foreground,
                                }}
                            >
                                {highlight.label}
                            </div>
                            <div
                                style={{
                                    fontSize: '56px',
                                    fontWeight: '900',
                                    color: colors.foreground,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                {highlight.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{ marginTop: 'auto' }}>
                    <div
                        style={{
                            fontSize: '32px',
                            fontWeight: '600',
                            color: 'rgba(255, 255, 255, 0.9)',
                            marginBottom: '32px',
                            lineHeight: '1.3',
                        }}
                    >
                        {tagline}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '28px',
                                fontWeight: '900',
                                color: colors.foreground,
                                letterSpacing: '-0.01em',
                            }}
                        >
                            AGEINFO.ONLINE
                        </div>
                        <div
                            style={{
                                fontSize: '24px',
                                fontWeight: '500',
                                color: 'rgba(255, 255, 255, 0.7)',
                            }}
                        >
                            {birthDate.toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
