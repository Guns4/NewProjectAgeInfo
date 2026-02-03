/**
 * Share Utility - Social Sharing Helper
 * Generate shareable text for various achievements
 */

export interface ShareableContent {
    text: string;
    url: string;
    files?: File[];
    title?: string;
}

/**
 * Generate share text for milestones
 */
export function generateMilestoneShareText(label: string): string {
    const texts: Record<string, string> = {
        '10,000 Days': `Baru tahu kalau aku sudah hidup selama ${label}! 🎉`,
        '20,000 Days': `Wow! Aku sudah melewati ${label} di Bumi! 🌍`,
        '1 Million Minutes': `Gila! Aku sudah hidup 1 juta menit! ⏰`,
        '1 Billion Seconds': `Mind-blowing! Aku sudah hidup 1 MILIAR detik! 🚀`,
        '2 Billion Seconds': `Incredible! 2 MILIAR detik perjalanan hidupku! ✨`,
    };

    return texts[label] || `Aku sudah mencapai ${label}! 🎯`;
}

/**
 * Generate share text for biological stats
 */
export function generateBioStatShareText(label: string, formatted: string): string {
    const texts: Record<string, string> = {
        'Detak Jantung': `Baru tahu kalau jantungku sudah berdenyut ${formatted} kali sejak lahir! ❤️`,
        'Napas': `Amazing! Aku sudah bernapas sebanyak ${formatted} kali! 🌬️`,
        'Waktu Tidur': `Selama hidupku, aku sudah tidur selama ${formatted}! 😴`,
        'Mimpi': `Aku sudah bermimpi sebanyak ${formatted} kali! ✨`,
    };

    return texts[label] || `Statistik biologisku: ${formatted}! 🧬`;
}

/**
 * Share content using Web Share API or fallback to clipboard
 */
export async function shareContent(content: ShareableContent): Promise<boolean> {
    const fullText = `${content.text}\n\nCek punyamu di ${content.url}`;

    // Support title if provided, else reasonable default
    const title = content.title || 'AgeInfo.Online';

    // Try Web Share API first (mobile-friendly)
    if (navigator.share) {
        try {
            // Check if we can share files
            if (content.files && content.files.length > 0) {
                if (navigator.canShare && navigator.canShare({ files: content.files })) {
                    await navigator.share({
                        text: fullText,
                        title: title,
                        files: content.files
                    });
                    return true;
                }
            }

            // Standard share without files (or if file share unsupported)
            await navigator.share({
                text: fullText,
                url: content.url,
                title: title,
            });
            return true;
        } catch (error) {
            // User cancelled or error occurred
            if ((error as Error).name === 'AbortError') {
                return false; // User cancelled, not an error
            }
            // Fall through to clipboard
        }
    }

    // Fallback to clipboard
    try {
        await navigator.clipboard.writeText(fullText);
        return true;
    } catch (error) {
        console.error('Share failed:', error);
        return false;
    }
}

/**
 * Check if Web Share API is available
 */
export function isShareSupported(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.share;
}

/**
 * Get share URL (support for custom domains)
 */
export function getShareUrl(): string {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    return 'https://ageinfo.online';
}
