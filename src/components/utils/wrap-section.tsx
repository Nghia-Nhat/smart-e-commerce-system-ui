import React from "react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import Countdown from "./countdown";

type WrapSectionProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  button?: boolean;
  countdown?: boolean;
  background?: boolean;
  disableClassName?: boolean;
  handleOnClick?: () => void;
};

export const WrapSection = ({
  title,
  subtitle,
  children,
  button,
  countdown,
  background,
  disableClassName = false,
  handleOnClick,
}: WrapSectionProps) => {
  return (
    <section
      className={`grid grid-cols-1 p-2 md:p-10 justify-center ${background == true ? "bg-secondary" : ""}`}
    >
      <div className="flex justify-between md:px-14">
        <div className="flex gap-5 items-center mb-5">
          <div className="bg-orange-500 w-2 h-10 rounded-md"></div>
          <div className="text-orange-500 font-bold">{title}</div>
        </div>
      </div>
      <div className="md:text-2xl font-bold md:pl-14 md:mb-5 flex gap-6 items-center">
        {subtitle}
        {countdown == true && <Countdown />}
        {button !== false && (
          <Button
            variant="outline"
            onClick={handleOnClick}
            className="text-orange-500"
          >
            View all
          </Button>
        )}
      </div>
      <div className={disableClassName ? "" : "mt-2 flex justify-center"}>
        {children}
      </div>
      <Separator className="mt-8 md:mx-auto md:w-[90%]" />
    </section>
  );
};
