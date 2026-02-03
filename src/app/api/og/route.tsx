/**
 * Dynamic OG Image API Route - Fase 90.2
 * Generates beautiful Open Graph images for social sharing
 * 
 * URL: /api/og?title=...&locale=...
 * Returns: PNG image (1200x630)
 */

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * GET /api/og
 * 
 * Query Parameters:
 * - title: Page title to display
 * - locale: Language code (en or id)
 * 
 * @example
 * /api/og?title=Calculate Your Age&locale=en
 * /api/og?title=Kalkulator Weton&locale=id
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Get parameters from query string
        const title = searchParams.get('title') || 'AgeInfo';
        const locale = searchParams.get('locale') || 'en';
        const type = searchParams.get('type') || 'default'; // 'default', 'blog', 'weton'
        const category = searchParams.get('category') || '';

        const subtitle = locale === 'id'
            ? 'Kalkulator Umur Premium'
            : 'Premium Age Calculator';

        // Template logic
        const bgGradient = type === 'weton'
            ? 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)' // Mystic gradient for weton
            : type === 'blog'
                ? 'linear-gradient(135deg, #000000 0%, #434343 100%)' // dark sleek for blog
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // default

        const icon = type === 'weton' ? '🔮' : type === 'blog' ? '✍️' : '🎂';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: bgGradient,
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    {/* Background Pattern */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            opacity: 0.1,
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                width: '400px',
                                height: '400px',
                                borderRadius: '50%',
                                background: 'white',
                                top: '-100px',
                                right: '-100px',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                width: '300px',
                                height: '300px',
                                borderRadius: '50%',
                                background: 'white',
                                bottom: '-50px',
                                left: '-50px',
                            }}
                        />
                    </div>

                    {/* Content Container */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '80px',
                            zIndex: 1,
                        }}
                    >
                        {/* Logo/Brand */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                marginBottom: '40px',
                            }}
                        >
                            <div
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '20px',
                                    background: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '48px',
                                }}
                            >
                                {icon}
                            </div>
                            <div
                                style={{
                                    fontSize: '48px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    letterSpacing: '-2px',
                                }}
                            >
                                AgeInfo {type !== 'default' && `| ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                            </div>
                        </div>

                        {/* Category Badge */}
                        {category && (
                            <div
                                style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    padding: '8px 20px',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontSize: '24px',
                                    marginBottom: '20px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                }}
                            >
                                {category}
                            </div>
                        )}

                        {/* Title */}
                        <div
                            style={{
                                fontSize: type === 'blog' ? '80px' : '72px',
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                                maxWidth: '1000px',
                                lineHeight: 1.1,
                                marginBottom: '20px',
                                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            }}
                        >
                            {title}
                        </div>

                        {/* Subtitle */}
                        <div
                            style={{
                                fontSize: '32px',
                                color: 'rgba(255,255,255,0.9)',
                                textAlign: 'center',
                                fontWeight: '500',
                            }}
                        >
                            {subtitle}
                        </div>

                        {/* Bottom Badge */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: 'rgba(255,255,255,0.2)',
                                padding: '16px 32px',
                                borderRadius: '50px',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '24px',
                                    color: 'white',
                                    fontWeight: '600',
                                }}
                            >
                                ageinfo.online
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (error) {
        console.error('OG Image generation error:', error);

        // Return fallback error image
        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#667eea',
                        color: 'white',
                        fontSize: '48px',
                        fontWeight: 'bold',
                    }}
                >
                    AgeInfo
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    }
}
