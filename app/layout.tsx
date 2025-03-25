import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout"; // ✅ Use the new client component
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FamBot - Intelligent Home Assistant Robot",
  description:
    "Meet FamBot, the intelligent robot companion that transforms your daily life with smart automation, personalized assistance, and seamless home integration.",
    icons: {
      icon: "/assets/BLUEBOT.png",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
