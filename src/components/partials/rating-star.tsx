import React from "react";
import { StarIcon } from "../icons/common";

export default function RatingStar({ number }: { number: number }) {
  return (
    <div className="flex gap-1 border border-orange-400 bg-yellow-100 rounded-sm px-2 justify-center items-center">
      <StarIcon className="h-3 w-3" />
      <span className="text-orange-400 text-xs">{number.toFixed(1)}</span>
    </div>
  );
}
