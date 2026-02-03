/**
 * Classic Template - Fase 461-480
 * Vintage newspaper/certificate style with serif typography
 */

'use client';

import type { InfographicData, ThemeColors } from '@/types/infographic';
import { getMotivationalTagline } from '@/lib/infographic/data-formatter';

interface ClassicTemplateProps {
    data: InfographicData;
    colors: ThemeColors;
}

export function ClassicTemplate({ data, colors }: ClassicTemplateProps) {
    const { age, highlights, birthDate } = data;
    const tagline = getMotivationalTagline(age);
    const generatedDate = data.generatedAt.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div
            style={{
                width: '1080px',
                height: '1350px', // Instagram Post format (4:5) better for newspaper style
                backgroundColor: colors.background,
                color: colors.foreground,
                display: 'flex',
                flexDirection: 'column',
                padding: '60px',
                fontFamily: '"Playfair Display", Georgia, serif',
                position: 'relative',
                backgroundImage: `radial-gradient(${colors.secondary}10 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
            }}
        >
            {/* Border Frame */}
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    right: '20px',
                    bottom: '20px',
                    border: `4px double ${colors.border}`,
                    pointerEvents: 'none',
                }}
            />

            {/* Corner Ornaments */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                <div
                    key={pos}
                    style={{
                        position: 'absolute',
                        width: '60px',
                        height: '60px',
                        borderTop: pos.includes('top') ? `4px solid ${colors.accent}` : 'none',
                        borderBottom: pos.includes('bottom') ? `4px solid ${colors.accent}` : 'none',
                        borderLeft: pos.includes('left') ? `4px solid ${colors.accent}` : 'none',
                        borderRight: pos.includes('right') ? `4px solid ${colors.accent}` : 'none',
                        top: pos.includes('top') ? '30px' : undefined,
                        bottom: pos.includes('bottom') ? '30px' : undefined,
                        left: pos.includes('left') ? '30px' : undefined,
                        right: pos.includes('right') ? '30px' : undefined,
                        zIndex: 1,
                    }}
                />
            ))}

            {/* Header / Masthead */}
            <div
                style={{
                    borderBottom: `4px double ${colors.border}`,
                    paddingBottom: '40px',
                    marginBottom: '40px',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        fontSize: '24px',
                        fontStyle: 'italic',
                        color: colors.secondary,
                        marginBottom: '16px',
                        fontFamily: 'Georgia, serif',
                    }}
                >
                    The Daily Chronicle of Life
                </div>
                <div
                    style={{
                        fontSize: '86px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: colors.foreground,
                        lineHeight: '1',
                        marginBottom: '24px',
                        textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
                    }}
                >
                    EXTRAORDINARY
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderTop: `1px solid ${colors.border}`,
                        borderBottom: `1px solid ${colors.border}`,
                        padding: '12px 0',
                        fontSize: '20px',
                        fontWeight: '700',
                        color: colors.accent,
                        textTransform: 'uppercase',
                    }}
                >
                    <span>Vol. {age.years}</span>
                    <span>{generatedDate}</span>
                    <span>Price: Priceless</span>
                </div>
            </div>

            {/* Main Headline & Age */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <div
                    style={{
                        fontSize: '48px',
                        fontWeight: '700',
                        marginBottom: '32px',
                        lineHeight: '1.2',
                    }}
                >
                    CITIZEN CELEBRATES <span style={{ color: colors.accent }}>{age.years} YEARS</span> OF JOURNEY
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '40px',
                    }}
                >
                    <div style={{ width: '30%', height: '2px', background: colors.border }} />
                    <div
                        style={{
                            fontSize: '120px',
                            fontWeight: '900',
                            lineHeight: '1',
                            color: colors.foreground,
                        }}
                    >
                        {age.years}
                    </div>
                    <div style={{ width: '30%', height: '2px', background: colors.border }} />
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '24px', color: colors.secondary, marginTop: '8px' }}>
                    Years of Wisdom & Experience
                </div>
            </div>

            {/* Columns Layout */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr',
                    gap: '40px',
                    flex: 1,
                }}
            >
                {/* Left Column: Story/Tagline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div
                        style={{
                            fontSize: '30px',
                            lineHeight: '1.5',
                            fontWeight: '400',
                            textAlign: 'justify',
                        }}
                    >
                        <span style={{ float: 'left', fontSize: '80px', lineHeight: '0.8', paddingRight: '12px', fontWeight: '700', color: colors.accent }}>
                            {tagline.charAt(0)}
                        </span>
                        {tagline.slice(1)}. This remarkable individual has traveled through time, witnessing moments in history and building a legacy of memories.
                    </div>

                    <div
                        style={{
                            backgroundColor: colors.muted,
                            padding: '32px',
                            border: `1px solid ${colors.border}`,
                        }}
                    >
                        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', borderBottom: `2px solid ${colors.accent}`, paddingBottom: '8px', display: 'inline-block' }}>
                            OFFICIAL RECORDS
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <div style={{ fontSize: '18px', color: colors.secondary }}>Born</div>
                                <div style={{ fontSize: '24px', fontWeight: '600' }}>
                                    {birthDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '18px', color: colors.secondary }}>Next Jubilee</div>
                                <div style={{ fontSize: '24px', fontWeight: '600' }}>
                                    {age.nextBirthday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Stats List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {highlights.slice(0, 5).map((stat, i) => (
                        <div
                            key={i}
                            style={{
                                borderBottom: `1px dotted ${colors.border}`,
                                paddingBottom: '16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline'
                            }}
                        >
                            <div style={{ fontSize: '20px', fontStyle: 'italic', color: colors.secondary }}>{stat.label}</div>
                            <div style={{ fontSize: '32px', fontWeight: '700', color: colors.accent }}>{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div
                style={{
                    marginTop: 'auto',
                    paddingTop: '32px',
                    borderTop: `4px double ${colors.border}`,
                    textAlign: 'center',
                    fontSize: '18px',
                    color: colors.secondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}
            >
                Printed at AgeInfo.Online • {generatedDate}
            </div>
        </div>
    );
}
