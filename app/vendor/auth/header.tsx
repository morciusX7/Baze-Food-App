import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";
import ven_login_img from "../../pngwing 3.png";

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
        <Image src={ven_login_img} alt="vendor image" />
      </h1>
      <p className="font-semibold text-2xl">{label}</p>
    </div>
  );
};
