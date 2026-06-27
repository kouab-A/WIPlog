import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import FavoritesProvider from "@/components/FavoritesProvider";
import { DataProvider } from "@/lib/store";
import SidebarLayout from "@/components/SidebarLayout";
import CommentPanel from "@/components/CommentPanel";
import BottomNav from "@/components/BottomNav";
import PostModal from "@/components/PostModal";

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
          <DataProvider>
          <FavoritesProvider>
            <Navbar />
            <SidebarLayout>{children}</SidebarLayout>
            <CommentPanel />
            <PostModal />
            <BottomNav />
          </FavoritesProvider>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
