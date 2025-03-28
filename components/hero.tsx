"use client"

import { useRef, useEffect, useState } from "react"
import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "./navbar"

const SplineModel = () => {
  return (
    <div className="w-full h-full">
      <Spline 
        scene="https://prod.spline.design/pXMX-2J6UH3bSWFP/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const highlights = [
    "Redefining",
    "Reinnovating",
    "Recreating",
    "Rejuvenating",
    "Revitalizing",
    "Reharmonizing",
    "Restoring",
    "Rebalancing",
    "Revolutionizing",
  ]

  const [currentHighlight, setCurrentHighlight] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlights.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const setHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setHeight()
    window.addEventListener('resize', setHeight)
    return () => window.removeEventListener('resize', setHeight)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <Navbar />
      
      {/* Animated background elements */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-5" />
      </motion.div>

      <div className="container h-full mx-auto px-4 flex flex-col md:flex-row items-center justify-center pt-20">
        {/* Text content with animations */}
        <motion.div 
          className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="block">
              <div className="text-left font-semibold h-20 md:h-24 lg:h-28 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentHighlight}
                    className="text-4xl md:text-6xl lg:text-7xl py-3 block"
                    style={{
                      background: "linear-gradient(to right, #4568DC, #B06AB3)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {highlights[currentHighlight]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </span>
            <motion.span 
              className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Home Assistance
            </motion.span>
          </h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Meet the intelligent companion that transforms your daily life with smart automation, personalized
            assistance, and seamless home integration.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link href="/simulation">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto px-8 py-6 text-lg">
                Try Now
              </Button>
            </Link>
            <Link href="/comparison">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto px-8 py-6 text-lg">
                Buy Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Spline Model Container */}
        <motion.div 
          className="w-full md:w-1/2 h-[500px] md:h-[800px] relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SplineModel />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{ opacity }}
      >
        <div className="animate-bounce flex flex-col items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll down</p>
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-300 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-gray-400 dark:bg-gray-300 rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}