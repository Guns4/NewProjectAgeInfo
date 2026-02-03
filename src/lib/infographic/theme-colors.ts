/**
 * Theme Color System - Fase 461-480
 * Color palettes for each infographic theme
 */

import type { ThemeColors, InfographicTheme, AccentColorOption } from '@/types/infographic';

/**
 * Predefined accent color options for user selection
 */
export const ACCENT_COLOR_OPTIONS: AccentColorOption[] = [
    { name: 'Blue', value: '#3B82F6', preview: 'bg-blue-500' },
    { name: 'Purple', value: '#A855F7', preview: 'bg-purple-500' },
    { name: 'Pink', value: '#EC4899', preview: 'bg-pink-500' },
    { name: 'Red', value: '#EF4444', preview: 'bg-red-500' },
    { name: 'Orange', value: '#F97316', preview: 'bg-orange-500' },
    { name: 'Yellow', value: '#EAB308', preview: 'bg-yellow-500' },
    { name: 'Green', value: '#10B981', preview: 'bg-green-500' },
    { name: 'Teal', value: '#14B8A6', preview: 'bg-teal-500' },
    { name: 'Cyan', value: '#06B6D4', preview: 'bg-cyan-500' },
    { name: 'Indigo', value: '#6366F1', preview: 'bg-indigo-500' },
];

/**
 * Generate lighter variant of a color (for backgrounds)
 */
function lightenColor(hex: string, amount: number = 0.95): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.floor(((num >> 16) & 0xff) + (255 - ((num >> 16) & 0xff)) * amount));
    const g = Math.min(255, Math.floor(((num >> 8) & 0xff) + (255 - ((num >> 8) & 0xff)) * amount));
    const b = Math.min(255, Math.floor((num & 0xff) + (255 - (num & 0xff)) * amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Generate darker variant of a color
 */
function darkenColor(hex: string, amount: number = 0.2): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.floor(((num >> 16) & 0xff) * amount);
    const g = Math.floor(((num >> 8) & 0xff) * amount);
    const b = Math.floor((num & 0xff) * amount);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Get color palette for Minimalist theme (Apple-style)
 */
function getMinimalistColors(accentColor: string): ThemeColors {
    return {
        background: '#FFFFFF',
        foreground: '#000000',
        accent: accentColor,
        secondary: '#6B7280',
        muted: '#F3F4F6',
        border: '#E5E7EB',
    };
}

/**
 * Get color palette for Vibrant theme (Spotify Wrapped-style)
 */
function getVibrantColors(accentColor: string): ThemeColors {
    return {
        background: '#000000',
        foreground: '#FFFFFF',
        accent: accentColor,
        secondary: lightenColor(accentColor, 0.7),
        muted: '#1F2937',
        border: '#374151',
        gradient: {
            from: accentColor,
            to: darkenColor(accentColor, 0.6),
            via: lightenColor(accentColor, 0.8),
        },
    };
}

/**
 * Get color palette for Classic theme (Vintage/Newspaper-style)
 */
function getClassicColors(accentColor: string): ThemeColors {
    return {
        background: '#F5F1E8', // Aged paper color
        foreground: '#2D1B0A', // Dark brown
        accent: accentColor,
        secondary: '#6B5744', // Medium brown
        muted: '#E8DCC8',
        border: '#8B7355',
    };
}

/**
 * Get theme colors based on theme and accent color
 */
export function getThemeColors(theme: InfographicTheme, accentColor: string): ThemeColors {
    switch (theme) {
        case 'minimalist':
            return getMinimalistColors(accentColor);
        case 'vibrant':
            return getVibrantColors(accentColor);
        case 'classic':
            return getClassicColors(accentColor);
        default:
            return getMinimalistColors(accentColor);
    }
}

/**
 * Get default accent color for a theme
 */
export function getDefaultAccentColor(theme: InfographicTheme): string {
    switch (theme) {
        case 'minimalist':
            return '#3B82F6'; // Blue
        case 'vibrant':
            return '#A855F7'; // Purple
        case 'classic':
            return '#EF4444'; // Red
        default:
            return '#3B82F6';
    }
}
