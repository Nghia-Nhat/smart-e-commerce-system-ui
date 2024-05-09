'use client';
import { ShoppingCartIcon, StarIcon } from '@/components/icons/common';
import ProductNotFound from '@/components/pages/error/product-not-found';
import ProductDetailSkeleton from '@/components/pages/product/product-detail-skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductDetail({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    //fetch data by product id from dummyjson service
    const [product, setProduct] = useState<ProductType | null>(null);
    const [image, setImage] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${params.slug}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                return res.json();
            })
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
                setError('Product not found');
            });
    }, [params.slug]);

    
    if (error) {
        return <ProductNotFound/>;
    }

    if (!product) {
        return <ProductDetailSkeleton />;
    }

    // After get data
    const price = Math.round(
        product.price * (1 - product.discountPercentage / 100)
    );

    const handleChangeImage = (source: string) => {
        setImage(source);
    };

    return (
        <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full lg:sticky top-0 sm:flex gap-2">
                    <div className="sm:space-y-3 w-16 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                        {product.images &&
                            product.images.map((source, index) => (
                                <Image
                                    key={index}
                                    src={source}
                                    alt="Product"
                                    width={500}
                                    height={500}
                                    object-fit="cover"
                                    className="w-full cursor-pointer border-2"
                                    onClick={() => handleChangeImage(source)}
                                    priority
                                />
                            ))}
                    </div>
                    <Image
                        src={image || product.thumbnail}
                        alt="thumbnail"
                        width={500}
                        height={500}
                        object-fit="cover"
                        priority
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-800">
                        {product.title}
                    </h2>
                    <div className="flex items-center flex-wrap gap-2 mt-4">
                        <span className="text-2xl font-bold text-destructive">
                            ${price}
                        </span>
                        <span className="text-lg line-through text-slate-400">
                            ${product.price}
                        </span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                        {Array.from({ length: 5 }, (v, i) => (
                            <StarIcon key={i} className="h-5 w-5" />
                        ))}
                    </div>
                    <div className="mt-6 flex gap-2 items-center">
                        <h3 className="text-lg font-bold text-gray-800">
                            Stock:
                        </h3>
                        <span>{product.stock}</span>
                    </div>
                    <div className="mt-6 flex gap-2 items-center">
                        <h3 className="text-lg font-bold text-gray-800">
                            Number:
                        </h3>
                        <Input
                            type="number"
                            className="max-w-[100px]"
                            defaultValue={1}
                            min={1}
                            max={product.stock}
                        />
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-gray-800">
                            About the item
                        </h3>
                        <div className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                            {product.description}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        {/* <ToastSimple className="text-destructive hover:bg-destructive hover:text-destructive-foreground" description="🎊 Added to your wishlist already."/> */}
                        <Button className="flex-1">
                            <ShoppingCartIcon className="mr-2 h-4 w-4" /> Add to
                            cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
