/**
 * Minimalist Template - Fase 461-480
 * Apple-inspired clean design with focus on typography
 */

'use client';

import type { InfographicData, ThemeColors } from '@/types/infographic';
import { getMotivationalTagline } from '@/lib/infographic/data-formatter';

interface MinimalistTemplateProps {
    data: InfographicData;
    colors: ThemeColors;
}

export function MinimalistTemplate({ data, colors }: MinimalistTemplateProps) {
    const { age, highlights, birthDate } = data;
    const tagline = getMotivationalTagline(age);

    return (
        <div
            style={{
                width: '1080px',
                height: '1920px',
                backgroundColor: colors.background,
                color: colors.foreground,
                display: 'flex',
                flexDirection: 'column',
                padding: '80px',
                fontFamily: 'Inter, system-ui, sans-serif',
                position: 'relative',
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: '120px' }}>
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: '500',
                        color: colors.secondary,
                        letterSpacing: '-0.02em',
                        marginBottom: '16px',
                    }}
                >
                    Life at a Glance
                </div>
                <div
                    style={{
                        width: '120px',
                        height: '4px',
                        backgroundColor: colors.accent,
                        borderRadius: '2px',
                    }}
                />
            </div>

            {/* Main Age Display */}
            <div style={{ marginBottom: '120px' }}>
                <div
                    style={{
                        fontSize: '280px',
                        fontWeight: '700',
                        lineHeight: '1',
                        letterSpacing: '-0.04em',
                        color: colors.foreground,
                        marginBottom: '32px',
                    }}
                >
                    {age.years}
                </div>
                <div
                    style={{
                        fontSize: '56px',
                        fontWeight: '300',
                        color: colors.secondary,
                        letterSpacing: '-0.01em',
                    }}
                >
                    Years of Life
                </div>
            </div>

            {/* Highlights Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '48px',
                    marginBottom: '120px',
                }}
            >
                {highlights.slice(0, 4).map((highlight, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '40px',
                            backgroundColor: colors.muted,
                            borderRadius: '24px',
                            border: `2px solid ${colors.border}`,
                        }}
                    >
                        <div
                            style={{
                                fontSize: '64px',
                                fontWeight: '700',
                                color: colors.accent,
                                marginBottom: '16px',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {highlight.value}
                        </div>
                        <div
                            style={{
                                fontSize: '28px',
                                fontWeight: '500',
                                color: colors.secondary,
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {highlight.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{ marginTop: 'auto' }}>
                <div
                    style={{
                        fontSize: '28px',
                        fontWeight: '400',
                        color: colors.secondary,
                        marginBottom: '32px',
                        lineHeight: '1.4',
                    }}
                >
                    {tagline}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '32px',
                        borderTop: `2px solid ${colors.border}`,
                    }}
                >
                    <div
                        style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: colors.accent,
                            letterSpacing: '-0.01em',
                        }}
                    >
                        AgeInfo.Online
                    </div>
                    <div
                        style={{
                            fontSize: '20px',
                            fontWeight: '400',
                            color: colors.secondary,
                        }}
                    >
                        {birthDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
