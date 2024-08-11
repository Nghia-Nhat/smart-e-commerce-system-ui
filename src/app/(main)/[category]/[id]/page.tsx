'use client';
import { StarIcon } from '@/components/icons/common';
import ButtonAddToCart from '@/components/pages/product/button-add-to-cart';
import ProductDetailSkeleton from '@/components/pages/product/product-detail-skeleton';
import { Form, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useOneProductByCategoryAndId } from '@/hooks/useProduct';
import { ItemProps, ProductType } from '@/types/product.type';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateCartItemQuantity } from '@/hooks/useCart';
import PageNotFound from '@/components/pages/error/product-not-found';
import Navbar from '@/components/partials/navbar';
import ScrollToTop from '@/components/partials/scroll-to-top';
import NavbarMobile from '@/components/partials/navbar-mobile';
import Footer from '@/components/partials/footer';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { WrapSection } from '@/components/utils/wrap-section';
import RelatedProduct from '@/components/partials/related-products';
import RatingStar from '@/components/partials/rating-star';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

export default function ProductDetailPage() {
    const params = useParams<{ category: string; id: string }>();
    const { data, isLoading, isError } = useOneProductByCategoryAndId(
        params.category,
        params.id
    );

    if (isLoading) {
        return <ProductDetailSkeleton />;
    }

    if (isError || !data) {
        return <PageNotFound />;
    }

    return (
        <ProductDetail
            product={data.product}
            relatedProducts={data.relatedProducts}
            isLoading={isLoading}
        />
    );
}

const productDetailSchema = z.object({
    productID: z.string(),
    quantity: z.string(),
});

export function ProductDetail({
    product,
    relatedProducts,
    isLoading,
}: {
    product: ProductType;
    relatedProducts: ItemProps[];
    isLoading: boolean;
}) {
    const { mutate: addToCart } = useUpdateCartItemQuantity();
    const [quantity, setQuantity] = useState(1);
    // After get data
    const discount = product?.discount;
    const priceBeforeDiscount = (product?.price * (1 + discount / 100)).toFixed(
        2
    );

    const form = useForm<z.infer<typeof productDetailSchema>>({
        resolver: zodResolver(productDetailSchema),
        defaultValues: {
            productID: product.productID,
            quantity: '1',
        },
    });

    const { setValue } = form;

    function onSubmit(data: z.infer<typeof productDetailSchema>) {
        addToCart(data);
    }

    const handleIncreaseQuantity = (e: React.MouseEvent) => {
        e.preventDefault();
        const inQty = quantity + 1;
        setQuantity(inQty);
        setValue('quantity', inQty.toString());
    };

    const handleDecreaseQuantity = (e: React.MouseEvent) => {
        e.preventDefault();
        const deQty = quantity - 1;
        setQuantity((prev) => {
            if (prev === 1) return 1;
            return deQty;
        });
        setValue('quantity', deQty.toString());
    };

    const handleChangeQuantity = (e: any) => {
        const value = e.target.value;
        const qty = value < 1 || !value ? 1 : value;
        setQuantity(qty);
        setValue('quantity', value.toString());
    }    

    return (
        <>
            <Navbar />
            <main className="h-fit min-h-[90vh]">
                <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="w-full lg:sticky top-0 sm:flex gap-2">
                            <Image
                                src={product.imageURL}
                                alt="thumbnail"
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                        <div className="sticky right-0 top-0 left-0">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <h2 className="text-2xl font-extrabold text-gray-800">
                                        {product.productTitle}
                                    </h2>
                                    <div className="flex gap-4 h-5 mt-4 items-center">
                                        <RatingStar number={product.rating} />
                                        <Separator orientation="vertical" />
                                        <span className="font-semibold text-sm">
                                            5k Reviewer
                                        </span>
                                        <Separator orientation="vertical" />
                                        <span className="font-semibold text-sm">
                                            1.2k Sold
                                        </span>
                                    </div>
                                    <div className="flex h-5 items-center flex-wrap gap-2 mt-4">
                                        <span className="text-2xl font-bold text-destructive">
                                            ${product.price}
                                        </span>
                                        <span className="text-sm line-through text-slate-400">
                                            ${priceBeforeDiscount}
                                        </span>
                                        <div className='bg-red-500 text-white text-xs rounded-sm font-semibold px-2'>{discount}% Discount</div>
                                        <Separator orientation="vertical" />
                                        <span className="text-green-500 font-semibold">
                                            In stock
                                        </span>
                                    </div>
                                    <div className="flex h-5 items-center flex-wrap gap-10 mt-6">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            Promotion
                                        </h3>
                                        <div className='flex items-center gap-5'>
                                            <div className='flex items-center gap-2'>
                                                <Image
                                                    className="h-6 w-6"
                                                    src={'/images/freeShip.png'}
                                                    width={50}
                                                    height={50}
                                                    alt={'Free Ship Image'}
                                                />
                                                <span className="font-semibold text-sm">Free ship</span>
                                            </div>
    
                                            <div className='flex items-center gap-2'>
                                                <Image
                                                    className="h-6 w-6"
                                                    src={'/images/icon_5.png'}
                                                    width={50}
                                                    height={50}
                                                    alt={'Free Ship Image'}
                                                />
                                                <span className="font-semibold text-sm">Extra Voucher</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            About the item
                                        </h3>
                                        <div className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                                            {product.productTitle} is a high quality
                                            product. Designed by professional
                                            designers, it has produced a superior
                                            and creative product. The product brings
                                            high value to the owner, can be used
                                            daily and is easy to use.
                                        </div>
                                    </div>
    
                                    <div className="mt-6 flex gap-2 items-center">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            Quantity
                                        </h3>
                                        <FormField
                                            control={form.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            onClick={
                                                                handleDecreaseQuantity
                                                            }
                                                        >
                                                            <Minus />
                                                        </Button>
                                                        <Input
                                                            className="max-w-[60px] text-center"
                                                            {...field}
                                                            onChange={handleChangeQuantity}
                                                            value={quantity}
                                                        />
                                                        <Button
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            onClick={
                                                                handleIncreaseQuantity
                                                            }
                                                        >
                                                            <Plus />
                                                        </Button>
                                                    </div>
                                                    <FormMessage />
                                                </>
                                            )}
                                        />
                                        <ButtonAddToCart />
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
                <WrapSection
                    background={false}
                    title="Find more"
                    subtitle="⚡Related Item"
                    button={false}
                    countdown={false}
                >
                    <div className="flex overflow-x-auto max-w-screen gap-4 scrollbar-hide md:ml-10 py-2">
                        {/* <RelatedProduct
                            products={relatedProducts.product}
                            isLoading={isLoading}
                        /> */}
                    </div>
                </WrapSection>
            </main>
            {/* Some utils */}
            <ScrollToTop />
            <NavbarMobile />
            <Footer />
        </>
    );
}
