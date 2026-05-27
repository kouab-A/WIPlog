import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import FavoritesProvider from "@/components/FavoritesProvider";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WIPlog — 未完成を、誇れ。",
  description: "制作の途中経過だけをシェアするSNS。完璧主義を手放して、今日の一歩を記録しよう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg-base)" }}>
        <ThemeProvider>
          <FavoritesProvider>
            <Navbar />
            <div className="flex max-w-[1200px] mx-auto w-full px-4 gap-5 pt-6 pb-12 items-start">

              {/* Left sidebar */}
              <aside className="hidden lg:block w-60 shrink-0 sticky top-[64px] max-h-[calc(100vh-72px)] overflow-y-auto">
                <LeftSidebar />
              </aside>

              {/* Center content */}
              <main className="flex-1 min-w-0">
                {children}
              </main>

              {/* Right sidebar */}
              <aside className="hidden xl:block w-60 shrink-0 sticky top-[64px] max-h-[calc(100vh-72px)] overflow-y-auto">
                <RightSidebar />
              </aside>

            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
