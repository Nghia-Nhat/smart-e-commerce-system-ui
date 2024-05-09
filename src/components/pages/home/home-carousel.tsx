'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export function HomeCarousel() {
    const plugin = React.useRef(Autoplay({ delay: 2000, reset: true }));

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
            opts={{
                align: 'center',
                loop: true,
            }}
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <Card className="w-full">
                            <Image
                                src={`/images/thumbnail_${index}.jpg`}
                                alt="thumbnail"
                                width={1200}
                                height={300}
                                object-fit="cover"
                                className='rounded-md'
                                priority
                            />
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* <CarouselPrevious />
      <CarouselNext /> */}
        </Carousel>
    );
}
