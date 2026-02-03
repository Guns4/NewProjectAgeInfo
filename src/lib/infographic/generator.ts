/**
 * Infographic Generator - Fase 461-480
 * Core utility for converting React components to downloadable PNG images
 */

import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import type { InfographicConfig } from '@/types/infographic';

/**
 * Export options for image generation
 */
interface ExportOptions {
    width?: number;
    height?: number;
    pixelRatio?: number;
    quality?: number;
    backgroundColor?: string;
}

/**
 * Default export settings optimized for social media
 */
const DEFAULT_EXPORT_OPTIONS: ExportOptions = {
    width: 1080,
    height: 1920, // Instagram Story format
    pixelRatio: 2, // Retina/high-DPI displays
    quality: 1, // Maximum quality
    backgroundColor: '#FFFFFF',
};

/**
 * Generate PNG image from a DOM element
 * @param element - The HTML element to convert (must be rendered in DOM)
 * @param options - Export customization options
 * @returns Promise<Blob> - The generated image as a blob
 */
export async function generateInfographicImage(
    element: HTMLElement,
    options: ExportOptions = {}
): Promise<Blob> {
    const mergedOptions = { ...DEFAULT_EXPORT_OPTIONS, ...options };

    try {
        // Generate high-quality PNG
        const dataUrl = await toPng(element, {
            quality: mergedOptions.quality,
            pixelRatio: mergedOptions.pixelRatio,
            backgroundColor: mergedOptions.backgroundColor,
            width: mergedOptions.width,
            height: mergedOptions.height,
            cacheBust: true, // Prevent caching issues
            // style: {
            //    // Ensure fonts are loaded
            //    fontDisplay: 'block',
            // },
        });

        // Convert data URL to Blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        return blob;
    } catch (error) {
        console.error('Failed to generate infographic:', error);
        throw new Error('Gagal membuat infographic. Silakan coba lagi.');
    }
}

/**
 * Generate and download infographic as PNG
 * @param element - The HTML element to convert
 * @param filename - The filename for the download (without extension)
 * @param options - Export customization options
 */
export async function downloadInfographic(
    element: HTMLElement,
    filename: string = 'ageinfo-life-infographic',
    options: ExportOptions = {}
): Promise<void> {
    try {
        const blob = await generateInfographicImage(element, options);

        // Trigger download
        saveAs(blob, `${filename}.png`);
    } catch (error) {
        console.error('Failed to download infographic:', error);
        throw new Error('Gagal mengunduh infographic. Silakan coba lagi.');
    }
}

/**
 * Get recommended dimensions for infographic format
 */
export function getInfographicDimensions(format: 'story' | 'post' = 'story'): {
    width: number;
    height: number;
} {
    switch (format) {
        case 'story':
            return { width: 1080, height: 1920 }; // Instagram Stories, 9:16
        case 'post':
            return { width: 1080, height: 1350 }; // Instagram Post, 4:5
        default:
            return { width: 1080, height: 1920 };
    }
}

/**
 * Generate filename with timestamp
 */
export function generateFilename(prefix: string = 'ageinfo'): string {
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return `${prefix}-${timestamp}`;
}

/**
 * Prepare element for image export
 * Ensures all fonts and images are loaded
 */
export async function prepareElementForExport(element: HTMLElement): Promise<void> {
    // Wait for fonts to load
    if (document.fonts) {
        await document.fonts.ready;
    }

    // Wait for images to load
    const images = element.querySelectorAll('img');
    const imagePromises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
    });

    try {
        await Promise.all(imagePromises);
    } catch (error) {
        console.warn('Some images failed to load:', error);
        // Continue anyway
    }

    // Small delay to ensure rendering is complete
    await new Promise((resolve) => setTimeout(resolve, 100));
}

/**
 * Generate infographic with full preparation pipeline
 * @param element - The HTML element to convert
 * @param config - Infographic configuration
 * @returns Promise<Blob> - The generated image
 */
export async function generateInfographic(
    element: HTMLElement,
    config: InfographicConfig
): Promise<Blob> {
    // Prepare element (load fonts, images, etc.)
    await prepareElementForExport(element);

    // Get dimensions based on format
    const dimensions = getInfographicDimensions(config.options.format);

    // Generate image
    const blob = await generateInfographicImage(element, {
        ...dimensions,
        backgroundColor: config.colors.background,
    });

    return blob;
}
