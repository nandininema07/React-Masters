"use client"; // ✅ This ensures the component is a Client Component

import { useState, useEffect } from "react";
import Cursor from "@/components/cursor";
import Loader from "@/components/loader";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Show loader for 2 seconds
  }, []);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <Cursor />
        {loading ? <Loader /> : children}
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  );
}
