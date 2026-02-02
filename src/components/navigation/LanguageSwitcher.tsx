/**
 * Premium Language Switcher - Fase 90.4
 * Animated dropdown with country codes and seamless locale switching
 * 
 * Features:
 * - Minimalist flag icons (ID/EN)
 * - Framer Motion animations
 * - next-intl/navigation integration
 * - Keeps user on same page
 * - Premium UX
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Language {
    code: 'en' | 'id';
    label: string;
    flag: string;
    nativeName: string;
}

const languages: Language[] = [
    {
        code: 'en',
        label: 'English',
        flag: '🇺🇸',
        nativeName: 'English',
    },
    {
        code: 'id',
        label: 'Indonesian',
        flag: '🇮🇩',
        nativeName: 'Bahasa Indonesia',
    },
];

export function LanguageSwitcher({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const currentLocale = useLocale() as 'en' | 'id';
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0]!;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const switchLanguage = (locale: 'en' | 'id') => {
        // Use next-intl router to switch locale while staying on same page
        router.replace(pathname, { locale });
        setIsOpen(false);
    };

    return (
        <div className={cn('relative', className)} ref={dropdownRef}>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 text-foreground"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Switch language"
                aria-expanded={isOpen}
            >
                <span className="text-lg" aria-hidden="true">
                    {currentLanguage.flag}
                </span>
                <span className="text-sm font-medium hidden sm:inline">
                    {currentLanguage.code.toUpperCase()}
                </span>
                <Globe className="h-4 w-4 opacity-70" aria-hidden="true" />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 25,
                        }}
                        className="absolute right-0 mt-2 w-56 origin-top-right z-50"
                    >
                        <div className="rounded-xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-xl overflow-hidden">
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Select Language
                                </p>
                            </div>

                            {/* Language Options */}
                            <div className="py-2">
                                {languages.map((language, index) => (
                                    <motion.button
                                        key={language.code}
                                        onClick={() => switchLanguage(language.code)}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                                            currentLocale === language.code
                                                ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                                        )}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: index * 0.05,
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 20,
                                        }}
                                        whileHover={{ x: 4 }}
                                    >
                                        {/* Flag */}
                                        <span className="text-2xl" aria-hidden="true">
                                            {language.flag}
                                        </span>

                                        {/* Language Info */}
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">
                                                {language.nativeName}
                                            </div>
                                            <div className="text-xs opacity-60">
                                                {language.label}
                                            </div>
                                        </div>

                                        {/* Check Icon for Active */}
                                        {currentLocale === language.code && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 500,
                                                    damping: 20,
                                                }}
                                            >
                                                <Check className="h-5 w-5" aria-label="Selected" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Compact Language Switcher (for mobile/minimal UI)
 */
export function LanguageSwitcherCompact() {
    const currentLocale = useLocale() as 'en' | 'id';
    const router = useRouter();
    const pathname = usePathname();

    const currentLanguage = languages.find((lang) => lang.code === currentLocale) ?? languages[0]!;
    const otherLanguage = languages.find((lang) => lang.code !== currentLocale) ?? languages[1]!;

    const toggleLanguage = () => {
        router.replace(pathname, { locale: otherLanguage.code });
    };

    return (
        <motion.button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${otherLanguage.label}`}
        >
            <span className="text-lg">{currentLanguage.flag}</span>
            <span className="text-xs font-medium">{currentLanguage.code.toUpperCase()}</span>
        </motion.button>
    );
}
