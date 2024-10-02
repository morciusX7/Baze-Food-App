"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "./header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export const CardWrapper = ({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
}: CardWrapperProps) => {
  return (
    <Card className="flex flex-col w-[400px] h-[500px] shadow-md items-center justify-center">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-3">
        {children}
      </CardContent>
    </Card>
  );
};
