import { Link } from '@/i18n/routing';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto px-4 py-12 sm:px-8 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold">AgeInfo.Online</span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                            Discover precise age metrics, biological insights, and life milestones with our premium age calculator tools.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <h3 className="text-sm font-medium">Product</h3>
                        <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                            Pricing
                        </Link>
                        <Link href="/api" className="text-sm text-muted-foreground hover:text-foreground">
                            API
                        </Link>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <h3 className="text-sm font-medium">Company</h3>
                        <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                            About Us
                        </Link>
                        <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                            Contact
                        </Link>
                        <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                            Blog
                        </Link>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <h3 className="text-sm font-medium">Legal</h3>
                        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                            Terms
                        </Link>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-center text-sm text-muted-foreground md:text-left">
                            &copy; {currentYear} AgeInfo.Online. All rights reserved.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Placeholders */}
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Twitter
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                GitHub
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Instagram
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
