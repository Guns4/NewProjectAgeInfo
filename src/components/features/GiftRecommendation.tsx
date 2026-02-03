'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Gift, Heart, Laptop, BookOpen, UserCircle, Shirt } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GiftRecommendationProps {
    age: number;
    className?: string;
}

type Gender = 'any' | 'male' | 'female';
type Category = 'toys' | 'tech' | 'hobby' | 'wellness' | 'fashion' | 'legacy';

interface Recommendation {
    id: string;
    category: Category;
    query: string; // Search query
    icon: any;
    color: string;
    minAge: number;
    maxAge: number;
    genders: Gender[];
}

// Mock Database of Recommendations
const RECOMMENDATIONS: Recommendation[] = [
    // Kids (0-12)
    { id: 'k1', category: 'toys', query: 'Montessori toys for kids', icon: BookOpen, color: 'text-orange-500', minAge: 0, maxAge: 5, genders: ['any'] },
    { id: 'k2', category: 'toys', query: 'LEGO sets for kids', icon: Gift, color: 'text-red-500', minAge: 5, maxAge: 12, genders: ['any'] },
    { id: 'k3', category: 'tech', query: 'Educational tablets for kids', icon: Laptop, color: 'text-blue-500', minAge: 5, maxAge: 12, genders: ['any'] },

    // Teens (13-19)
    { id: 't1', category: 'tech', query: 'Gaming accessories', icon: Laptop, color: 'text-purple-500', minAge: 13, maxAge: 19, genders: ['any', 'male'] },
    { id: 't2', category: 'fashion', query: 'Trendy streetwear', icon: Shirt, color: 'text-pink-500', minAge: 13, maxAge: 19, genders: ['any', 'female'] },
    { id: 't3', category: 'hobby', query: 'Instax camera', icon: Gift, color: 'text-teal-500', minAge: 13, maxAge: 19, genders: ['any'] },

    // Young Adults (20-35)
    { id: 'y1', category: 'tech', query: 'Wireless noise cancelling headphones', icon: Laptop, color: 'text-zinc-500', minAge: 20, maxAge: 35, genders: ['any'] },
    { id: 'y2', category: 'wellness', query: 'Skincare set gift', icon: Heart, color: 'text-rose-500', minAge: 20, maxAge: 35, genders: ['female', 'any'] },
    { id: 'y3', category: 'hobby', query: 'Coffee maker machine', icon: ShoppingBag, color: 'text-amber-700', minAge: 20, maxAge: 35, genders: ['any'] },
    { id: 'y4', category: 'fashion', query: 'Men\'s mechanical watch', icon: Shirt, color: 'text-slate-600', minAge: 20, maxAge: 35, genders: ['male'] },

    // Adults (36-55)
    { id: 'a1', category: 'wellness', query: 'Massage gun', icon: Heart, color: 'text-red-500', minAge: 36, maxAge: 55, genders: ['any'] },
    { id: 'a2', category: 'hobby', query: 'Gardening tools set', icon: Gift, color: 'text-green-600', minAge: 36, maxAge: 55, genders: ['any'] },
    { id: 'a3', category: 'tech', query: 'Smart home devices', icon: Laptop, color: 'text-blue-600', minAge: 36, maxAge: 55, genders: ['any'] },

    // Seniors (56+)
    { id: 's1', category: 'wellness', query: 'Foot massager machine', icon: Heart, color: 'text-red-400', minAge: 56, maxAge: 120, genders: ['any'] },
    { id: 's2', category: 'legacy', query: 'Digital photo frame', icon: BookOpen, color: 'text-amber-500', minAge: 56, maxAge: 120, genders: ['any'] },
    { id: 's3', category: 'hobby', query: 'Premium tea gift set', icon: Gift, color: 'text-emerald-500', minAge: 56, maxAge: 120, genders: ['any'] },
];

export function GiftRecommendation({ age, className }: GiftRecommendationProps) {
    const t = useTranslations('Results.GiftRecommendation');
    const [selectedGender, setSelectedGender] = useState<Gender>('any');

    // Filter Logic
    const items = RECOMMENDATIONS.filter(item => {
        const ageMatch = age >= item.minAge && age <= item.maxAge;

        if (selectedGender === 'any') return ageMatch;

        const genderMatch = item.genders.includes(selectedGender) || item.genders.includes('any');
        return ageMatch && genderMatch;
    }).slice(0, 3); // Top 3

    if (items.length === 0) return null;

    const navItems: { value: Gender; label: string; icon: any }[] = [
        { value: 'any', label: t('genderAny'), icon: Gift },
        { value: 'male', label: t('genderMale'), icon: UserCircle },
        { value: 'female', label: t('genderFemale'), icon: Heart }, // Heart icon for female/love
    ];

    return (
        <div className={cn("w-full py-8", className)}>
            <div className="flex flex-col items-center mb-6 text-center">
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent flex items-center gap-2">
                    <Gift className="w-5 h-5 text-rose-500" />
                    {t('title')}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {t('subtitle')}
                </p>

                {/* Gender Toggle */}
                <div className="flex items-center gap-2 mt-4 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                    {navItems.map((item) => (
                        <button
                            key={item.value}
                            onClick={() => setSelectedGender(item.value)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5",
                                selectedGender === item.value
                                    ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white"
                                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                            )}
                        >
                            <item.icon className="w-3 h-3" />
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="h-full p-4 hover:shadow-lg transition-shadow border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm group cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <item.icon className={cn("w-24 h-24", item.color)} />
                            </div>

                            <div className="relative z-10">
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-zinc-50 dark:bg-zinc-800", item.color)}>
                                    <item.icon className="w-5 h-5" />
                                </div>

                                <Badge variant="secondary" className="mb-2 text-[10px] tracking-wider uppercase">
                                    {t(`categories.${item.category}`)}
                                </Badge>

                                <h4 className="font-semibold text-zinc-800 dark:text-zinc-100 leading-tight mb-4">
                                    {item.query}
                                </h4>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full gap-2 group-hover:border-indigo-200 dark:group-hover:border-indigo-800"
                                    onClick={() => {
                                        const query = encodeURIComponent(item.query);
                                        // Multi-platform search or just Google Shopping
                                        window.open(`https://www.google.com/search?tbm=shop&q=${query}`, '_blank');
                                    }}
                                >
                                    <ShoppingBag className="w-3 h-3" />
                                    {t('buyButton')}
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
