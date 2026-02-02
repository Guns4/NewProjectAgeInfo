/**
 * Language Switcher Usage Examples - Fase 90.4
 */

import { LanguageSwitcher, LanguageSwitcherCompact } from '@/components/navigation';

// Example 1: In Navbar (Desktop)
export function NavbarWithLanguageSwitcher() {
    return (
        <nav className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-8">
                <h1 className="text-xl font-bold">AgeInfo</h1>
                {/* Navigation links */}
            </div>

            <div className="flex items-center gap-4">
                {/* Other nav items */}
                <LanguageSwitcher />
            </div>
        </nav>
    );
}

// Example 2: Mobile Navbar
export function MobileNavbar() {
    return (
        <nav className="flex items-center justify-between px-4 py-3">
            <h1 className="text-lg font-bold">AgeInfo</h1>

            {/* Use compact version on mobile */}
            <LanguageSwitcherCompact />
        </nav>
    );
}

// Example 3: Responsive Navbar
export function ResponsiveNavbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-bold">AgeInfo</h1>

            <div className="flex items-center gap-4">
                {/* Show full switcher on desktop, compact on mobile */}
                <div className="hidden md:block">
                    <LanguageSwitcher />
                </div>

                <div className="md:hidden">
                    <LanguageSwitcherCompact />
                </div>
            </div>
        </nav>
    );
}

// Example 4: Footer Language Switcher
export function FooterWithLanguage() {
    return (
        <footer className="py-8 px-6">
            <div className="flex items-center justify-between">
                <p>&copy; 2024 AgeInfo</p>

                {/* Compact switcher in footer */}
                <LanguageSwitcherCompact />
            </div>
        </footer>
    );
}

// Example 5: Settings Page
export function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <div className="space-y-4">
                {/* Language Settings Card */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border">
                    <h2 className="text-lg font-semibold mb-4">Language Preferences</h2>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Interface Language</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Choose your preferred language
                            </p>
                        </div>

                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Example 6: Custom Styled Switcher
export function CustomStyledSwitcher() {
    return (
        <div className="flex justify-end">
            <LanguageSwitcher className="shadow-lg" />
        </div>
    );
}
