"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                FamBot
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Features
            </Link>
            <Link
              href="/comparison"
              className="text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Product Comparison
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              About Us
            </Link>
            <ThemeToggle />
            <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#features"
              className="block py-2 text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/comparison"
              className="block py-2 text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Product Comparison
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <div className="flex justify-center mb-2">
              <ThemeToggle />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  )
}

