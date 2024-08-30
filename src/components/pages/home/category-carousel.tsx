import Link from "next/link";
import * as React from "react";
import { categories } from "./category.constant";

export function CategoryCarousel({ isViewMore }: { isViewMore: boolean }) {
  const itemsToShow = isViewMore ? 16 : 8;

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 justify-evenly gap-5 md:gap-10 mt-4">
      {categories.slice(0, itemsToShow).map((category, index) => (
        <Link
          key={index}
          href={`/search?category=${category.category}`}
          className="w-20 h-20 md:w-28 md:h-28 border rounded-md flex justify-center items-center hover:text-primary hover:border-2 hover:border-primary"
        >
          <div>
            {category.icon}
            <div className="text-center text-sm mt-1">
              {category.display_category}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
