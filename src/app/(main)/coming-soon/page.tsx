import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <div className="text-xl md:text-4xl font-bold text-center">
        This site is coming soon ...
      </div>
      <Link href={"/"}>
        <Button size={"sm"}>Back to homepage</Button>
      </Link>
      <Image
        src="/svg/maintenance.svg"
        width={500}
        height={500}
        alt="Coming soon"
        draggable="false"
        className="select-none -mt-8"
      />
    </div>
  );
}
