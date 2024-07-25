'use client';
import { StarIcon } from '@/components/icons/common';
import ProductNotFound from '@/components/pages/error/product-not-found';
import ButtonAddToCart from '@/components/pages/product/button-add-to-cart';
import ProductDetailSkeleton from '@/components/pages/product/product-detail-skeleton';
import {
    Form,
    FormField,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useOneProductByCategoryAndId } from '@/hooks/useProduct';
import { ProductType } from '@/types/product.type';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateCartItemQuantity } from '@/hooks/useCart';

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
        return <ProductNotFound />;
    }

    return <ProductDetail product={data} />;
}

const productDetailSchema = z.object({
    productID: z.string(),
    quantity: z.string(),
});

export function ProductDetail({ product }: { product: ProductType }) {
    const {mutate: addToCart} = useUpdateCartItemQuantity()

    // After get data
    const price = Math.round(product.price * (1 - product.discount / 100));
    const form = useForm<z.infer<typeof productDetailSchema>>({
        resolver: zodResolver(productDetailSchema),
        defaultValues: {
            productID: product.productID,
            quantity: '1',
        },
    });


    function onSubmit(data: z.infer<typeof productDetailSchema>) {
        addToCart(data)
    }

    return (
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <h2 className="text-2xl font-extrabold text-gray-800">
                            {product.productTitle}
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
                                Quantity:
                            </h3>
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <>
                                        <Input
                                            type="number"
                                            className="max-w-[100px]"
                                            min={1}
                                            max={product.stock}
                                            {...field}
                                        />
                                        <FormMessage />
                                    </>
                                )}
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
                            <ButtonAddToCart />
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
