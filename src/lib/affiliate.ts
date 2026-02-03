export interface AffiliateProduct {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    category: 'gift' | 'experience' | 'utility';
    minAge?: number;
    maxAge?: number;
    priceRange?: string;
}

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
    {
        id: 'gift-flower',
        title: 'Premium Flower Bouquet',
        description: 'Send a beautiful surprise for the upcoming birthday.',
        imageUrl: '/images/affiliate/flowers.jpg', // Placeholder
        link: 'https://example.com/flowers',
        category: 'gift',
        priceRange: '$30 - $100'
    },
    {
        id: 'gift-tech',
        title: 'Latest Tech Gadgets',
        description: 'Upgrade their style with the newest tech.',
        imageUrl: '/images/affiliate/tech.jpg',
        link: 'https://example.com/tech',
        category: 'gift',
        minAge: 15,
        maxAge: 50
    },
    {
        id: 'exp-concert',
        title: 'Concert Tickets',
        description: 'Unforgettable experiences for the special day.',
        imageUrl: '/images/affiliate/concert.jpg',
        link: 'https://example.com/tickets',
        category: 'experience',
        minAge: 12
    },
    {
        id: 'util-planner',
        title: 'Life Planner 2026',
        description: 'Organize the year ahead with style.',
        imageUrl: '/images/affiliate/planner.jpg',
        link: 'https://example.com/planner',
        category: 'utility'
    }
];

export function getRelevantAffiliateProducts(age: number, daysUntilBirthday: number): AffiliateProduct[] {
    // Basic logic: if birthday is coming up (<= 30 days), start showing gifts
    if (daysUntilBirthday > 30) {
        return []; // Too early for birthday shopping
    }

    return AFFILIATE_PRODUCTS.filter(product => {
        if (product.minAge && age < product.minAge) return false;
        if (product.maxAge && age > product.maxAge) return false;
        return true;
    }).slice(0, 3); // Return top 3 matches
}
