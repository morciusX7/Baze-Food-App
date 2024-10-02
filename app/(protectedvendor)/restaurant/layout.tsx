import SideBar from "@/components/restaurant/side-bar";
import { Inter } from "next/font/google";
import PageWrapper from "@/components/restaurant/page-wrapper";
import MarginWidthWrapper from "@/components/restaurant/margin-width-wrapper";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export default async function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`bg-gray-200 ${inter.className}`}>
          <div className=" flex">
            <SideBar />
            <main className="flex-1">
              <MarginWidthWrapper>
                <PageWrapper>{children}</PageWrapper>
              </MarginWidthWrapper>
            </main>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
