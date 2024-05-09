import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailSkeleton = () => {
    return (
        <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full lg:sticky top-0 sm:flex gap-2">
                    <Skeleton className="w-full h-96" />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-800"></h2>
                    <Skeleton className="w-full h-8" />
                    <div className="flex space-x-2 "></div>
                    <div className="mt-4">
                        <Skeleton className="w-16 h-8" />
                        <div className="flex flex-wrap gap-4 mt-4">
                            <Skeleton className="w-24 h-8" />
                        </div>
                        <Skeleton className="w-full mt-4 px-4 py-3 rounded" />
                    </div>
                    <div className="mt-8">
                        <Skeleton className="w-24 h-8" />
                        <div className="space-y-3 list-disc mt-4">
                            <Skeleton className="w-full h-8 space-y-3 list-disc mt-4" />
                            <Skeleton className="w-full h-8 space-y-3 list-disc mt-4" />
                            <Skeleton className="w-2/3 h-8 space-y-3 list-disc mt-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;
