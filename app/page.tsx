import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-400">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-black drop-shadow-md",
            font.className
          )}
        >
          Welcome To The Baze Meal System
        </h1>
        <p className="text-lg text-black font-semibold">
          Food app for restaurant and students
        </p>
        <div>
          <LoginButton>
            <Button
              variant="secondary"
              size="lg"
              className="hover:bg-green-200 hover:drop-shadow-lg"
            >
              Proceed To Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
