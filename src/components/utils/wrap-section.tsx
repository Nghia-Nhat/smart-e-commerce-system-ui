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
};

export const WrapSection = ({
  title,
  subtitle,
  children,
  button,
  countdown,
  background,
  disableClassName = false,
}: WrapSectionProps) => {
  return (
    <section
      className={`mt-5 md:mt-8 grid grid-cols-1 p-5 md:p-10 justify-center ${background == true ? "bg-secondary" : ""}`}
    >
      <div className="flex justify-between md:px-14">
        <div className="flex gap-5 items-center mb-5">
          <div className="bg-orange-500 w-2 h-10 rounded-md"></div>
          <h2 className="text-orange-500 font-bold">{title}</h2>
        </div>
        {button !== false && <Button variant="default">View all</Button>}
      </div>
      <h1 className="md:text-2xl font-bold md:pl-14 md:mb-5 flex gap-6 items-center">
        {subtitle}
        {countdown == true && <Countdown />}
      </h1>
      <div className={disableClassName ? "" : "mt-2 flex justify-center"}>
        {children}
      </div>
      <Separator className="mt-8 md:mx-auto md:w-[90%]" />
    </section>
  );
};
