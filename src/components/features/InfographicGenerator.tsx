/**
 * InfographicGenerator Component - Fase 461-480
 * Main component for creating, customizing, and exporting life infographics
 */

'use client';

import * as React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Check, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';


import { MinimalistTemplate } from '@/components/infographic/templates/MinimalistTemplate';
import { VibrantTemplate } from '@/components/infographic/templates/VibrantTemplate';
import { ClassicTemplate } from '@/components/infographic/templates/ClassicTemplate';

import { prepareInfographicData } from '@/lib/infographic/data-formatter';
import { getThemeColors, ACCENT_COLOR_OPTIONS, getDefaultAccentColor } from '@/lib/infographic/theme-colors';
import { generateInfographic, downloadInfographic } from '@/lib/infographic/generator';

import type { InfographicTheme, InfographicConfig } from '@/types/infographic';
import type { AgeResult } from '@/hooks/calculator/useAgeCalculator';
import { cn } from '@/lib/utils';

interface InfographicGeneratorProps {
    birthDate: Date;
    age: AgeResult;
    onClose?: () => void;
}

export function InfographicGenerator({ birthDate, age, onClose }: InfographicGeneratorProps) {
    // State
    const [theme, setTheme] = React.useState<InfographicTheme>('minimalist');
    const [accentColor, setAccentColor] = React.useState<string>(getDefaultAccentColor('minimalist'));
    const [isGenerating, setIsGenerating] = React.useState(false);


    // References
    const previewRef = React.useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Derived Data
    const data = React.useMemo(() => prepareInfographicData(birthDate, age), [birthDate, age]);
    const themeColors = React.useMemo(() => getThemeColors(theme, accentColor), [theme, accentColor]);

    // Reset accent color when theme changes
    React.useEffect(() => {
        setAccentColor(getDefaultAccentColor(theme));
    }, [theme]);


    // Handlers
    const handleDownload = async () => {
        if (!previewRef.current) return;

        setIsGenerating(true);
        const toastId = toast.loading('Generating high-quality poster...');

        try {
            // Wait a tick for rendering
            await new Promise(resolve => setTimeout(resolve, 100));

            // Get the actual template element inside the scaler
            const elementToCapture = previewRef.current.firstElementChild as HTMLElement;

            if (elementToCapture) {
                await downloadInfographic(elementToCapture, `ageinfo-${theme}-poster`, {
                    width: 1080,
                    height: theme === 'classic' ? 1350 : 1920 // Classic is 4:5, others 9:16
                });
                toast.success('Poster downloaded successfully!', { id: toastId });
                onClose?.();
            } else {
                throw new Error("Preview element not found");
            }

        } catch (error) {
            console.error(error);
            toast.error('Failed to generate poster. Please try again.', { id: toastId });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleShare = async () => {
        if (!previewRef.current) return;

        setIsGenerating(true);
        const toastId = toast.loading('Preparing for share...');

        try {
            // Get the actual template element inside the scaler
            const elementToCapture = previewRef.current.firstElementChild as HTMLElement;

            if (!elementToCapture) throw new Error("Preview element not found");

            const config: InfographicConfig = {
                data,
                options: { theme, accentColor, format: theme === 'classic' ? 'post' : 'story' },
                colors: themeColors
            };

            const blob = await generateInfographic(elementToCapture, config);

            // Check if Web Share API supports files
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'image.png', { type: 'image/png' })] })) {
                await navigator.share({
                    files: [new File([blob], `ageinfo-${theme}.png`, { type: 'image/png' })],
                    title: 'My Journey',
                    text: 'Check out my life infographic on AgeInfo.Online!'
                });
                toast.success('Shared successfully!', { id: toastId });
            } else {
                // Fallback for desktop or unsupported browsers
                await downloadInfographic(elementToCapture, `ageinfo-${theme}-poster`, {
                    width: 1080,
                    height: theme === 'classic' ? 1350 : 1920
                });
                toast.info('Sharing not supported on this device. Image downloaded instead.', { id: toastId });
            }
            onClose?.();

        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error(error);
                toast.error('Share failed. Try downloading instead.', { id: toastId });
            } else {
                toast.dismiss(toastId);
            }
        } finally {
            setIsGenerating(false);
        }
    };

    // Render Template
    const renderTemplate = () => {
        const props = { data, colors: themeColors };
        switch (theme) {
            case 'minimalist': return <MinimalistTemplate {...props} />;
            case 'vibrant': return <VibrantTemplate {...props} />;
            case 'classic': return <ClassicTemplate {...props} />;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-[800px] overflow-hidden bg-background">
            {/* Sidebar Controls */}
            <div className="w-full md:w-80 flex flex-col border-b md:border-b-0 md:border-r border-border bg-card/50 backdrop-blur-sm z-10">
                <ScrollArea className="flex-1">
                    <div className="p-6 space-y-8">
                        {/* Header */}
                        <div>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                                Generator
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Customize your poster
                            </p>
                        </div>

                        {/* Theme Selection */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-foreground/80 uppercase tracking-wider">
                                Theme
                            </label>
                            <div className="grid grid-cols-1 gap-4">
                                {(['minimalist', 'vibrant', 'classic'] as InfographicTheme[]).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={cn(
                                            "relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-200",
                                            theme === t
                                                ? "border-primary bg-primary/5 ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
                                                : "border-border hover:border-primary/50 hover:bg-muted/50"
                                        )}
                                    >
                                        <div className="font-semibold capitalize text-foreground">
                                            {t}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {t === 'minimalist' && 'Clean typography (Apple Style)'}
                                            {t === 'vibrant' && 'Gradient bold (Spotify Style)'}
                                            {t === 'classic' && 'Vintage Certificate Style'}
                                        </div>
                                        {theme === t && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <div className="rounded-full bg-primary text-primary-foreground p-1">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Customization */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-foreground/80 uppercase tracking-wider">
                                Accent Color
                            </label>
                            <div className="grid grid-cols-5 gap-4">
                                {ACCENT_COLOR_OPTIONS.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => setAccentColor(color.value)}
                                        className={cn(
                                            "w-full aspect-square rounded-full transition-all duration-200 relative",
                                            color.preview,
                                            accentColor === color.value
                                                ? "ring-2 ring-offset-2 ring-offset-background scale-110 shadow-md"
                                                : "hover:scale-105 hover:shadow-sm opacity-80 hover:opacity-100"
                                        )}
                                        title={color.name}
                                    >
                                        {accentColor === color.value && (
                                            <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Actions Footer */}
                <div className="p-6 border-t border-border bg-card space-y-3">
                    <Button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 shadow-md transition-all hover:scale-[1.02]"
                    >
                        {isGenerating ? (
                            <span className="flex items-center gap-2">Generating...</span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Download {theme === 'classic' ? 'Post' : 'Story'}
                            </span>
                        )}
                    </Button>

                    <Button
                        onClick={handleShare}
                        variant="outline"
                        disabled={isGenerating}
                        className="w-full py-6 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            <Share2 className="w-5 h-5" />
                            Share
                        </span>
                    </Button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-muted/30 relative flex items-center justify-center overflow-hidden p-8 md:p-12">
                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Scaled Preview Container */}
                <div
                    className={cn(
                        "relative shadow-2xl rounded-sm overflow-hidden bg-white ring-1 ring-black/5 origin-center transition-transform",
                        theme === 'classic' ? "aspect-[4/5]" : "aspect-[9/16]"
                    )}
                    style={{
                        transform: `scale(${isDesktop ? 0.35 : 0.25})`,
                        // Scale reasoning: 1080px width * 0.35 = ~378px visible width
                    }}
                >
                    <div ref={previewRef} className="origin-top-left">
                        {renderTemplate()}
                    </div>

                    {/* Interactive overlay (prevents text selection directly on preview) */}
                    <div className="absolute inset-0 z-10" />
                </div>

                {/* Mobile Hint */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden">
                    <div className="bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground flex items-center gap-2 shadow-sm">
                        <Smartphone className="w-3 h-3" />
                        Preview Mode
                    </div>
                </div>
            </div>
        </div>
    );
}
