/**
 * Shareable Identity Card - Fase 295.1
 * High-fidelity 9:16 Story-sized image export component
 */

'use client';

import * as React from 'react';
import { Calendar, Star, PawPrint, Sparkles } from 'lucide-react';
import type { AgeResult } from '@/hooks/calculator/useAgeCalculator';
import type { WetonResult, ZodiacResult, ShioResult } from '@/lib/identity-engine';

export interface ShareableIdentityCardProps {
    age: AgeResult;
    weton: WetonResult;
    zodiac: ZodiacResult;
    shio: ShioResult;
    insight: {
        neptuInsight: string;
        elementAffinity: string;
        genZVibe: string;
    };
}

const ShareableIdentityCard = React.forwardRef<HTMLDivElement, ShareableIdentityCardProps>(
    ({ age, weton, zodiac, shio, insight }, ref) => {
        return (
            <div
                ref={ref}
                className="relative w-[1080px] h-[1920px] overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600"
                style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {/* Complex Gradient Mesh Background */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-cyan-400/50 to-transparent rounded-full blur-3xl" />
                    <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-gradient-radial from-fuchsia-500/50 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-amber-400/50 to-transparent rounded-full blur-3xl" />
                </div>

                {/* Decorative Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full p-16 text-white">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md">
                                <Sparkles className="w-12 h-12 text-yellow-300" />
                            </div>
                            <div>
                                <h1 className="text-6xl font-black tracking-tight">AgeInfo</h1>
                                <p className="text-2xl font-medium opacity-90">Your Cosmic Identity</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Age Display */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center mb-12">
                        <div className="mb-8">
                            <div className="text-[180px] font-black leading-none mb-4 tracking-tighter">
                                {age.years}
                            </div>
                            <div className="text-6xl font-bold uppercase tracking-wider opacity-90">
                                Years Old
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 w-full max-w-[800px] mb-12">
                            <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                                <div className="text-7xl font-black mb-2">{age.months}</div>
                                <div className="text-3xl font-semibold opacity-80">Months</div>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                                <div className="text-7xl font-black mb-2">{age.days}</div>
                                <div className="text-3xl font-semibold opacity-80">Days</div>
                            </div>
                        </div>

                        {/* Identity Tags */}
                        <div className="grid grid-cols-3 gap-6 w-full max-w-[900px]">
                            {/* Weton */}
                            <div className="p-6 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-300/30">
                                <Calendar className="w-10 h-10 mb-3 mx-auto text-amber-200" />
                                <div className="text-2xl font-bold mb-1">{weton.pasaran}</div>
                                <div className="text-lg opacity-75">Neptu {weton.neptu}</div>
                            </div>

                            {/* Zodiac */}
                            <div className="p-6 rounded-2xl bg-purple-500/20 backdrop-blur-md border border-purple-300/30">
                                <Star className="w-10 h-10 mb-3 mx-auto text-purple-200" />
                                <div className="text-2xl font-bold mb-1">{zodiac.sign}</div>
                                <div className="text-lg opacity-75">{zodiac.element}</div>
                            </div>

                            {/* Shio */}
                            <div className="p-6 rounded-2xl bg-rose-500/20 backdrop-blur-md border border-rose-300/30">
                                <PawPrint className="w-10 h-10 mb-3 mx-auto text-rose-200" />
                                <div className="text-2xl font-bold mb-1">{shio.animal}</div>
                                <div className="text-lg opacity-75">{shio.fixedElement}</div>
                            </div>
                        </div>
                    </div>

                    {/* Insight Section */}
                    <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-500/30 to-purple-600/30 backdrop-blur-md border border-white/20 mb-12">
                        <div className="text-4xl font-bold mb-4 text-center">{insight.genZVibe}</div>
                        <div className="text-2xl text-center opacity-90 leading-relaxed">
                            {insight.neptuInsight.split(':')[1]?.trim() || insight.neptuInsight}
                        </div>
                    </div>

                    {/* Watermark Footer */}
                    <div className="flex items-center justify-between">
                        <div className="text-3xl font-black opacity-50">AgeInfo.online</div>
                        <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <span className="text-2xl font-semibold opacity-75">
                                {new Date().toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

ShareableIdentityCard.displayName = 'ShareableIdentityCard';

export { ShareableIdentityCard };
