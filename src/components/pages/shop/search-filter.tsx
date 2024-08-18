"use client";

import { CheckBoxItem } from "@/components/common/checkbox-item";
import { FilterIcon, StarIcon } from "@/components/icons/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [error, setError] = useState(false);
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleChangeQueryParams = (field: string, value: string) => {
    router.push(pathname + "?" + createQueryString(field, value));
  };

  const handleChangeMinPrice = (e: any) => {
    const price = e.target.value;
    setMinPrice((prev) => price);
  };

  const handleChangeMaxPrice = (e: any) => {
    const price = e.target.value;
    setMaxPrice((prev) => price);
  };

  const handleApplyPrice = () => {
    setError(false);

    if (minPrice > maxPrice) {
      setError(true);
      return
    };
    if (minPrice) {
      params.set("minPrice", minPrice.toString());
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice.toString());
    }

    router.push(pathname + "?" + params.toString());
  };

  const handleLocationChange = (value: string, checked: boolean) => {
    setSelectedLocations((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((location) => location !== value);
      }
    });
  };

  useEffect(() => {
    if (selectedLocations.length > 0) {
      router.push(pathname + "?" + createQueryString("locationId", selectedLocations.join(',')));
    }
  }, [selectedLocations, router, pathname, createQueryString])

  return (
    <aside className="hidden md:block p-5">
      <h2 className="flex items-center gap-2 font-bold">
        <FilterIcon className="h-4 w-4" /> SEARCH FILTER
      </h2>
      {/* Shipped from */}
      <div>
        <h3 className="my-5 font-semibold text-sm">Shipped from</h3>
        <div className="flex flex-col gap-4">
          <CheckBoxItem value="HCM" label="Ho Chi Minh" onChange={handleLocationChange} />
          <CheckBoxItem value="HN" label="Ha Noi"  onChange={handleLocationChange} />
          <CheckBoxItem value="DN" label="Da Nang"  onChange={handleLocationChange} />
          <CheckBoxItem value="VT" label="Vung Tau" onChange={handleLocationChange} />
        </div>
        <Separator className="my-6" />
      </div>
      {/* Price Range */}
      <div>
        <h3 className="my-5 font-semibold text-sm">Price Range</h3>
        <div>
          <div className="flex gap-2 items-center">
            <Input
              className="hideArrowInputNumber"
              placeholder="Min"
              type="number"
              onChange={handleChangeMinPrice}
              value={minPrice}
            />
            <Separator className="w-5" />
            <Input
              className="hideArrowInputNumber"
              placeholder="Max"
              type="number"
              onChange={handleChangeMaxPrice}
              value={maxPrice}
            />
          </div>
          {error && <div className="text-destructive font-semibold text-xs mt-2 text-center">
          Max Price must more than Min Price</div>}
          <Button className="w-full mt-4" onClick={() => handleApplyPrice()}>
            Apply
          </Button>
        </div>
        <Separator className="my-6" />
      </div>
      {/* Rating */}
      <div>
        <h3 className="my-5 font-semibold text-sm">Rating</h3>
        <div className="flex flex-col gap-2">
          <button
            className="flex items-center"
            onClick={() => handleChangeQueryParams("rating", "5")}
          >
            {Array.from({ length: 5 }, (v, i) => (
              <StarIcon key={i} className="h-4 w-4" />
            ))}
          </button>
          <button
            className="flex items-center"
            onClick={() => handleChangeQueryParams("rating", "4")}
          >
            {Array.from({ length: 4 }, (v, i) => (
              <StarIcon key={i} className="h-4 w-4" />
            ))}
            <span className="ml-2 text-sm">& Up</span>
          </button>
          <button
            className="flex items-center"
            onClick={() => handleChangeQueryParams("rating", "3")}
          >
            {Array.from({ length: 3 }, (v, i) => (
              <StarIcon key={i} className="h-4 w-4" />
            ))}
            <span className="ml-2 text-sm">& Up</span>
          </button>
          <button
            className="flex items-center"
            onClick={() => handleChangeQueryParams("rating", "2")}
          >
            {Array.from({ length: 2 }, (v, i) => (
              <StarIcon key={i} className="h-4 w-4" />
            ))}
            <span className="ml-2 text-sm">& Up</span>
          </button>
          <button
            className="flex items-center"
            onClick={() => handleChangeQueryParams("rating", "1")}
          >
            {Array.from({ length: 1 }, (v, i) => (
              <StarIcon key={i} className="h-4 w-4" />
            ))}
            <span className="ml-2 text-sm">& Up</span>
          </button>
        </div>
        <Separator className="mt-6" />
      </div>
      <Button className="w-full mt-4" onClick={() => router.push(pathname)}>Clear all</Button>
    </aside>
  );
};

export default SearchFilter;
