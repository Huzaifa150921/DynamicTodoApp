import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import "@/app/lib/CronEmail"
import Navbar from "@/app/components/navbar/Navbar";
import Notifier from "@/app/components/uielements/toast/Notifier";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A complete Solution for tracking your daily tasks with features like add,  update, delete ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <Notifier />
        {children}
      </body>
    </html>
  );
}
