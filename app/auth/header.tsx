import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "../bazeLogo.png";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold")}>
        <Image src={Logo} alt="logo" />
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
      <h1 className={cn("text-3xl font-semibold")}>Baze Univeraity</h1>
    </div>
  );
};
