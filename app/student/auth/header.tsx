import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";
import stu_login_img from "../../pngwing 2.png";

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
        <Image src={stu_login_img} alt="student image" />
      </h1>
      <p className="font-semibold text-2xl">{label}</p>
    </div>
  );
};
