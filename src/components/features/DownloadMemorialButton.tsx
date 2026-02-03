'use client';

import React from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import { MemorialPdf } from './MemorialPdf';
import { Button } from '@/components/ui/button';
import { Download, FileHeart } from 'lucide-react';

interface DownloadMemorialButtonProps {
    birthDate: Date;
    name?: string;
    locale: string;
}

export const DownloadMemorialButton = ({ birthDate, name, locale }: DownloadMemorialButtonProps) => {
    // Client-side only rendering to avoid hydration mismatch with PDF generation
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <Button variant="outline" disabled className="w-full gap-2">
                <FileHeart className="w-4 h-4" />
                Loading PDF Generator...
            </Button>
        );
    }

    return (
        <div className="w-full flex justify-center">
            <BlobProvider document={<MemorialPdf date={birthDate} name={name} locale={locale} />}>
                {({ url, loading }: any) => (
                    <Button
                        variant="outline"
                        disabled={loading}
                        onClick={() => {
                            if (url) {
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = `memorial-dates-${birthDate.getFullYear()}.pdf`;
                                link.click();
                            }
                        }}
                        className="gap-2 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-800 dark:hover:bg-indigo-950/30 transition-all font-medium"
                    >
                        {loading ? (
                            <>Loading Document...</>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                Download Memorial PDF (7/40/1000 Days)
                            </>
                        )}
                    </Button>
                )}
            </BlobProvider>
        </div>
    );
};
