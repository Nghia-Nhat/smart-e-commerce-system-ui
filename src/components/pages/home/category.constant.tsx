import { JeansIcon, AccessoriesIcon, SocksIcon, ClothesSuit, ElectronicIcon, PantsIcon, CoatIcon, SkirtIcon, UnderwearIcon, GridIcon } from '@/components/icons/common';
import { Armchair, Crown, Flower, Footprints, Gem, Shirt } from 'lucide-react';

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
        category: 'jeans',
        display_category: 'Jeans',
        icon: <JeansIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'accessories',
        display_category: 'Accessories',
        icon: <AccessoriesIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'socks',
        display_category: 'Socks',
        icon: <SocksIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'suits',
        display_category: 'Suits',
        icon: <ClothesSuit className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'pants',
        display_category: 'Pants',
        icon: <PantsIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'electronics',
        display_category: 'Electronics',
        icon: <ElectronicIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'coats',
        display_category: 'Coats',
        icon: <CoatIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'skirts',
        display_category: 'Skirts',
        icon: <SkirtIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
    {
        category: 'underwear',
        display_category: 'Underwear',
        icon: <UnderwearIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
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
    {
        category: 'plus',
        display_category: 'Others',
        icon: <GridIcon className='w-6 h-6 md:w-8 md:h-8 mx-auto'/>,
    },
];
