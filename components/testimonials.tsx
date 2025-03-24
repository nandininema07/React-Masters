"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Working Parent",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "This robot has completely transformed our family life. It helps with scheduling, reminders, and even assists the kids with homework. I can't imagine our busy household without it now!",
    rating: 5,
  },
  {
    name: "Robert Chen",
    role: "Tech Enthusiast",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "The smart home integration is flawless. It connects with all my existing devices and the voice recognition is the best I've experienced. Worth every penny for the convenience it brings.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Caregiver",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "I got this for my elderly mother who lives alone, and it's given our family such peace of mind. It reminds her to take medication, helps with video calls, and alerts us if there's anything unusual.",
    rating: 4,
  },
  {
    name: "James Wilson",
    role: "Small Business Owner",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "I use this both at home and in my small office. The scheduling features and ability to manage different environments is impressive. It's like having a personal assistant that never sleeps!",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Parent of Young Children",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "My kids absolutely love interacting with it! The educational games and activities keep them engaged while learning. It's also been great at establishing routines for bedtime and homework.",
    rating: 5,
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [autoScrollInterval, setAutoScrollInterval] = useState(null)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

      // If we've reached the end, reset to the beginning
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        scrollContainerRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        })
      }
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons)
      // Initial check
      checkScrollButtons()
      return () => scrollContainer.removeEventListener("scroll", checkScrollButtons)
    }
  }, [])

  // Auto-scrolling functionality
  useEffect(() => {
    if (isInView && !isPaused) {
      const interval = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
          const nextScrollPosition = scrollLeft + 300

          if (scrollLeft >= scrollWidth - clientWidth - 10) {
            // Reset to beginning when reaching the end
            scrollContainerRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            })
          } else {
            // Continue scrolling
            scrollContainerRef.current.scrollTo({
              left: nextScrollPosition,
              behavior: "smooth",
            })
          }
          checkScrollButtons()
        }
      }, 4000)

      setAutoScrollInterval(interval)
      return () => clearInterval(interval)
    } else if (autoScrollInterval) {
      clearInterval(autoScrollInterval)
    }
  }, [isInView, isPaused])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section ref={sectionRef} className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Discover how our robot assistant is changing lives and creating happier homes.
          </motion.p>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              scroll("left")
              setIsPaused(true)
              setTimeout(() => setIsPaused(false), 8000)
            }}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg ${
              canScrollLeft ? "opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 pt-4 px-4 -mx-4 scrollbar-hide snap-x"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex-shrink-0 w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] snap-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => {
              scroll("right")
              setIsPaused(true)
              setTimeout(() => setIsPaused(false), 8000)
            }}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg ${
              canScrollRight ? "opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Pause/Play button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

