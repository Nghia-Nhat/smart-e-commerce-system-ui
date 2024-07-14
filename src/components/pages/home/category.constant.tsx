import { Armchair, Crown, Flower, Footprints, Gem, Shirt } from 'lucide-react';
// "apparel" "footwear" "beauty" "fragrances" "furniture" "jewelery"
export const categories = [
    {
        category: 'apparel',
        display_category: 'Apparel',
        icon: <Shirt className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'footwear',
        display_category: 'Footwear',
        icon: <Footprints className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'beauty',
        display_category: 'Beauty',
        icon: <Crown className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'furniture',
        display_category: 'Furniture',
        icon: <Armchair className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'jewelry',
        display_category: 'Jewelry',
        icon: <Gem className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'fragrances',
        display_category: 'Fragrances',
        icon: <Flower className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
];
