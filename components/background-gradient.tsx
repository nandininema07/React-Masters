"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function BackgroundGradient() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Fixed background gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Top-right gradient */}
        <div
          className="absolute -top-[30%] -right-[10%] w-[50%] h-[70%] rounded-full opacity-20 dark:opacity-10 blur-3xl"
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, rgba(124, 58, 237, 0) 70%)"
                : "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(124, 58, 237, 0) 70%)",
          }}
        />

        {/* Bottom-left gradient */}
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[70%] rounded-full opacity-20 dark:opacity-10 blur-3xl"
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(139, 92, 246, 0) 70%)"
                : "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)",
          }}
        />

        {/* Center gradient */}
        <div
          className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full opacity-10 dark:opacity-5 blur-3xl"
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle, rgba(192, 132, 252, 0.5) 0%, rgba(192, 132, 252, 0) 70%)"
                : "radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, rgba(192, 132, 252, 0) 70%)",
          }}
        />
      </div>

      {/* Background overlay for dark mode */}
      <div className="fixed inset-0 -z-10 bg-white dark:bg-gray-950 opacity-90 dark:opacity-90" />
    </>
  )
}

