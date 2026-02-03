/**
 * Infographic Type Definitions - Fase 461-480
 * Type-safe interfaces for the Life Infographic Generator
 */

import type { AgeResult } from '@/hooks/calculator/useAgeCalculator';

/**
 * Available infographic themes
 */
export type InfographicTheme = 'minimalist' | 'vibrant' | 'classic';

/**
 * Theme metadata for display
 */
export interface ThemeMetadata {
    id: InfographicTheme;
    name: string;
    description: string;
    sampleGradient?: string;
    icon: string;
}

/**
 * Color palette for a theme
 */
export interface ThemeColors {
    background: string;
    foreground: string;
    accent: string;
    secondary: string;
    muted: string;
    border: string;
    gradient?: {
        from: string;
        to: string;
        via?: string;
    };
}

/**
 * Data to be displayed in the infographic
 */
export interface InfographicData {
    // Personal info
    birthDate: Date;
    age: AgeResult;

    // Highlights (auto-selected impressive stats)
    highlights: {
        label: string;
        value: string;
        icon?: string;
    }[];

    // Top milestones
    milestones?: {
        label: string;
        date?: string;
    }[];

    // Generated timestamp
    generatedAt: Date;
}

/**
 * User customization options
 */
export interface InfographicOptions {
    theme: InfographicTheme;
    accentColor: string;
    includeTimestamp?: boolean;
    format?: 'story' | 'post'; // Instagram story (1080x1920) vs post (1080x1350)
}

/**
 * Complete infographic configuration
 */
export interface InfographicConfig {
    data: InfographicData;
    options: InfographicOptions;
    colors: ThemeColors;
}

/**
 * Predefined accent color options
 */
export interface AccentColorOption {
    name: string;
    value: string;
    preview: string; // For display in color picker
}
