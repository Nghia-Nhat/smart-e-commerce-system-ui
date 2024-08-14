"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "../../icons/common";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageSearch from "./image-search";
import { Search, Camera } from "lucide-react";
import { useFindProductsByTitle } from "@/hooks/useProduct";
import { useRouter } from "next/navigation";
type SearchDialogProps = {
  textColor?: string;
};

export function SearchDialog({ textColor }: SearchDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [search, setSearch] = React.useState("")
  const { push } = useRouter()

  
  const handleSearchChange = (e: any) => {
    const text = e.target.value;
    setSearch(text)
  }

  const handleSubmit = (e: any) => {
    if (e.keyCode === 13) {
      push("/search-result?productTitle=" + search)
    }
  }

  if (isDesktop) {
    return (
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          onChange={handleSearchChange}
          onKeyDown={handleSubmit}
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
        {/* Search image */}
        <SearchImage open={open} setOpen={setOpen} />
      </div>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <SearchIcon
            className={`h-[1.2rem] w-[1.2rem] ${textColor ?? "text-light"}`}
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined} className="px-4">
        <DrawerTitle>Search product</DrawerTitle>
        <SearchComponents setOpen={setOpen} />
        <DrawerFooter className="pt-2 px-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SearchComponents({
  className,
  setOpen,
}: {
  className?: string;
  setOpen: any;
}) {
  return (
    <>
      <Tabs defaultValue="common">
        <TabsList className="m-4 ml-0 md:ml-0">
          <TabsTrigger value="common">Search</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>
        <TabsContent value="common">
          <form className={cn("grid items-start gap-4", className)}>
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
        <TabsContent value="image">
          <ImageSearch setOpen={setOpen} />
        </TabsContent>
      </Tabs>
    </>
  );
}

function SearchImage({ open, setOpen }: { open: boolean; setOpen: any }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Camera className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer" />
    </DialogTrigger>
    <DialogContent className="md:max-w-[600px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>Search product</DialogTitle>
      </DialogHeader>
      <ImageSearch setOpen={setOpen} />
    </DialogContent>
  </Dialog>
  );
}
