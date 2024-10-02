"use client";

import { useRouter } from "next/navigation";

interface VendorLoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const VendorLoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: VendorLoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/vendor/auth/login");
  };

  if (mode === "modal") {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
