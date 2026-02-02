/**
 * Download Story Image Utility - Fase 295.1
 * Client-side image export using html-to-image
 */

import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

/**
 * Download a DOM element as a high-quality PNG image
 * @param element - The DOM element to convert
 * @param filename - The filename for the downloaded image
 */
export async function downloadStoryImage(
    element: HTMLElement,
    filename: string = 'ageinfo-story.png'
): Promise<void> {
    try {
        // Generate high-quality PNG (2x pixel ratio for sharpness)
        const dataUrl = await toPng(element, {
            quality: 1,
            pixelRatio: 2,
            cacheBust: true,
        });

        // Convert data URL to blob and trigger download
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        saveAs(blob, filename);
    } catch (error) {
        console.error('Failed to download story image:', error);
        throw new Error('Gagal mengunduh gambar. Silakan coba lagi.');
    }
}

/**
 * Preview a DOM element as a PNG data URL
 * @param element - The DOM element to convert
 * @returns Data URL of the PNG image
 */
export async function previewStoryImage(element: HTMLElement): Promise<string> {
    try {
        const dataUrl = await toPng(element, {
            quality: 1,
            pixelRatio: 2,
            cacheBust: true,
        });
        return dataUrl;
    } catch (error) {
        console.error('Failed to preview story image:', error);
        throw new Error('Gagal membuat preview. Silakan coba lagi.');
    }
}
