'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchIcon } from '../icons/common';
import { Badge } from '@/components/ui/badge';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

type SearchDialogProps = {
    textColor?: string;
};

export function SearchDialog({ textColor }: SearchDialogProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <SearchIcon className={`h-[1.2rem] w-[1.2rem] ${textColor??'text-light'}`} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                    <SearchIcon className={`h-[1.2rem] w-[1.2rem] ${textColor??'text-light'}`} />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <ProfileForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function ProfileForm({ className }: React.ComponentProps<'form'>) {
    return (
        <>
            <Tabs defaultValue="common">
                <TabsList className="m-4 md:ml-0">
                    <TabsTrigger value="common">Search</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                </TabsList>
                <TabsContent value="common">
                    <form className={cn('grid items-start gap-4', className)}>
                        <div className="grid gap-2">
                            <Input
                                type="text"
                                id="search"
                                placeholder="Typing something ..."
                            />
                        </div>
                        <Button>
                            <SearchIcon className="mr-2 h-4 w-4" /> Search
                        </Button>
                    </form>
                </TabsContent>
                <TabsContent value="description">
                    <form className={cn('grid items-start gap-4', className)}>
                        <div className="grid gap-2">
                            <Textarea placeholder="Describe product details..." />
                        </div>
                        <Button>
                            <SearchIcon className="mr-2 h-4 w-4" /> Search
                        </Button>
                    </form>
                </TabsContent>
                <TabsContent value="image">
                    <form className={cn('grid items-start gap-4', className)}>
                        <div className="grid min-h-[250px] h-fit border-4 border-dashed rounded-lg">
                            <div className="grid items-end w-full gap-1.5 p-2">
                                {/* <Image
                                    className="preview"
                                    src="/images/banner.jpg"
                                    height={500}
                                    width={500}
                                    alt="Image"
                                ></Image> */}
                                <Input id="picture" type="file" className="" />
                            </div>
                        </div>
                        <Button>
                            <SearchIcon className="mr-2 h-4 w-4" /> Search
                        </Button>
                    </form>
                </TabsContent>
            </Tabs>
        </>
    );
}
