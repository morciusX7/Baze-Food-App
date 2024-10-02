import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col pt-2 px-4 space-y-2 ml-12 bg-zinc-100 flex-grow h-auto pb-4">
      {children}
    </div>
  );
}
