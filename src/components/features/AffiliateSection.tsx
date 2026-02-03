'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Gift, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRelevantAffiliateProducts } from '@/lib/affiliate';

interface AffiliateSectionProps {
    age: number;
    daysUntilBirthday: number; // passed from parent
}

export function AffiliateSection({ age, daysUntilBirthday }: AffiliateSectionProps) {
    const products = React.useMemo(() =>
        getRelevantAffiliateProducts(age, daysUntilBirthday),
        [age, daysUntilBirthday]);

    if (products.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-900/10 border border-indigo-100 dark:border-indigo-800/30"
        >
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-white dark:bg-card rounded-full shadow-sm">
                        <Gift className="w-6 h-6 text-purple-600 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground">
                            Almost Your Birthday! 🎂
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {daysUntilBirthday} days left. Treat yourself or ask for these!
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-none bg-white/50 dark:bg-card/50 backdrop-blur-sm group cursor-pointer overflow-hidden">
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                {/* Placeholder for actual image if we had one, otherwise pattern */}
                                <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                    <Gift className="w-12 h-12 text-indigo-300/50" />
                                </div>
                                <div className="absolute bottom-3 left-3 z-20">
                                    <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <h4 className="font-bold text-lg group-hover:text-primary transition-colors mb-1">
                                    {product.title}
                                </h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                                    {product.description}
                                </p>

                                <Button
                                    className="w-full rounded-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                                    variant="secondary"
                                    onClick={() => window.open(product.link, '_blank')}
                                >
                                    View Offer <ExternalLink className="w-3 h-3" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
