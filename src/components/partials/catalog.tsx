import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Link from "next/link";

type ItemType = {
  id: number;
  src: string;
  name: string;
  nextItem: boolean;
};

export const Catalog = () => {
  const list: ItemType[] = [
    {
      id: 1,
      src: "/images/icon_1.png",
      name: "Flash sale",
      nextItem: true,
    },
    {
      id: 2,
      src: "/images/icon_2.png",
      name: "Discount code",
      nextItem: true,
    },
    {
      id: 3,
      src: "/images/icon_3.png",
      name: "Sale off 50%",
      nextItem: true,
    },
    {
      id: 4,
      src: "/images/icon_4.png",
      name: "International goods",
      nextItem: true,
    },
    {
      id: 5,
      src: "/images/icon_5.png",
      name: "Vouchers",
      nextItem: true,
    },
    {
      id: 6,
      src: "/images/icon_6.png",
      name: "Choice",
      nextItem: true,
    },
    {
      id: 7,
      src: "/images/icon_7.png",
      name: "Phone services",
      nextItem: false,
    },
  ];

  return (
    <div className="grid grid-cols-4 lg:grid-cols-7 w-full h-fit items-center space-x-4 text-sm my-6 md:mx-10 gap-4">
      {list.map((item) => (
        <div key={item.id} className="flex justify-evenly items-center ">
          <div className="h-20 p-1 md:p-2 text-center">
            <Link
              href="#"
              className="inline-block hover:text-primary hover:-translate-y-1"
            >
              <Image
                className="mx-auto"
                src={item.src} // Using dynamic src
                width={50}
                height={50}
                alt={item.name} // Alt text based on item name
              />
              <div className="pt-2">{item.name}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
