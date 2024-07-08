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
import { SearchIcon } from '../../icons/common';
import { Badge } from '@/components/ui/badge';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ImageSearch from './image-search';
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
                <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
                    <DialogTitle>Search product</DialogTitle>
                    <SearchComponents setOpen={setOpen}/>
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
            <DrawerContent aria-describedby={undefined} className="px-4">
                <DrawerTitle >Search product</DrawerTitle>
                <SearchComponents  setOpen={setOpen}/>
                <DrawerFooter className="pt-2 px-0">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function SearchComponents({ className, setOpen }: { className?: string, setOpen: any}) {
    return (
        <>
            <Tabs defaultValue="common">
                <TabsList className="m-4 ml-0 md:ml-0">
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
                    <ImageSearch setOpen={setOpen}/>
                </TabsContent>
            </Tabs>
        </>
    );
}
