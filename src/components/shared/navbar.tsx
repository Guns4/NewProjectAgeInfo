'use client';

import * as React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
// import { ModeToggle } from '@/components/shared/mode-toggle'; // TODO: Implement ModeToggle later or use ThemeProvider direct switch for now

export function Navbar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-primary"
                style={{ scaleX }}
            />

            <div className="container mx-auto flex h-16 items-center px-4 sm:px-8">
                <div className="mr-8 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="relative h-8 w-32 sm:h-10 sm:w-40">
                            <Image
                                src="/logo-full.png"
                                alt="AgeInfo Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>
                    <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                        <Link
                            href="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            About
                        </Link>
                        <Link
                            href="/features"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Features
                        </Link>
                        <Link
                            href="/pricing"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Pricing
                        </Link>
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    {/* Placeholder for future Auth/Theme Toggle */}
                    <nav className="flex items-center space-x-2">
                        <Link
                            href="/login"
                            className={cn(
                                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                                "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                                "h-9 px-4 py-2"
                            )}
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
