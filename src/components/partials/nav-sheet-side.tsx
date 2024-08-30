"use client";

import { Button } from "../ui/button";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCartIcon } from "../icons/common";
import Link from "next/link";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

type SheetSideProps = {
  side: SheetSide;
};

export function NavSheetSide({ side }: SheetSideProps) {
  const listMenu = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "🔥 Hot deals",
      href: "/hot-deal",
    },
    {
      id: 3,
      name: "Mall",
      href: "/coming-soon",
    },
    {
      id: 4,
      name: "Collections",
      href: "/coming-soon",
    },
    {
      id: 5,
      name: "Seller",
      href: "/coming-soon",
    },
  ];
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <DashboardIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle className="text-center">
              <Link href="/" className="text-xl font-bold">
                Triplee 🛒
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="min-h-[80vh] flex flex-col mt-5">
            {listMenu.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="p-2 h-full transition-all text-primary text-center hover:bg-secondary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
