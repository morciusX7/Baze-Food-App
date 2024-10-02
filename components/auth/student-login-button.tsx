"use client";

import { useRouter } from "next/navigation";

interface StudentLoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const StudentLoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: StudentLoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/student/auth/login");
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
