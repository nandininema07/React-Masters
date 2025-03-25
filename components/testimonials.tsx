"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Working Parent",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content:
      "This robot has completely transformed our family life. It helps with scheduling, reminders, and even assists the kids with homework. I can't imagine our busy household without it now!",
    rating: 5,
  },
  {
    name: "Robert Chen",
    role: "Tech Enthusiast",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content:
      "The smart home integration is flawless. It connects with all my existing devices and the voice recognition is the best I've experienced. Worth every penny for the convenience it brings.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Caregiver",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    content:
      "I got this for my elderly mother who lives alone, and it's given our family such peace of mind. It reminds her to take medication, helps with video calls, and alerts us if there's anything unusual.",
    rating: 4,
  },
  {
    name: "James Wilson",
    role: "Small Business Owner",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    content:
      "I use this both at home and in my small office. The scheduling features and ability to manage different environments is impressive. It's like having a personal assistant that never sleeps!",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Parent of Young Children",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    content:
      "My kids absolutely love interacting with it! The educational games and activities keep them engaged while learning. It's also been great at establishing routines for bedtime and homework.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Remote Worker",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    content:
      "As someone who works from home, this robot has been a game-changer. It helps manage my schedule, sets up video meetings, and even provides ambient background noise when I need to focus.",
    rating: 4,
  },
  {
    name: "David Kim",
    role: "Fitness Enthusiast",
    avatar: "https://randomuser.me/api/portraits/men/38.jpg",
    content:
      "I've integrated this robot into my fitness routine. It tracks my workouts, provides nutrition advice, and even helps me stay motivated with personalized coaching and reminders.",
    rating: 5,
  },
  {
    name: "Lisa Nguyen",
    role: "Language Learner",
    avatar: "https://randomuser.me/api/portraits/women/27.jpg",
    content:
      "The language learning features are incredible! It helps me practice conversation, provides real-time translation, and adapts to my learning style. It feels like having a personal language tutor.",
    rating: 5,
  },
  {
    name: "Michael Thompson",
    role: "Senior Executive",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    content:
      "Managing complex schedules and information is crucial in my role. This robot helps me stay organized, provides quick briefings, and even helps prepare presentations. It's like an always-on assistant.",
    rating: 4,
  }
];


export default function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons)
      checkScrollButtons()
      return () => scrollContainer.removeEventListener("scroll", checkScrollButtons)
    }
  }, [])

  // Circular scrolling effect
  useEffect(() => {
    if (isInView && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current
      const { scrollWidth, clientWidth } = scrollContainer

      const autoScroll = () => {
        const { scrollLeft } = scrollContainer
        const nextScrollPosition = scrollLeft + clientWidth

        scrollContainer.scrollTo({
          left: nextScrollPosition,
          behavior: "smooth"
        })

        checkScrollButtons()
      }

      // Set up interval for continuous scrolling
      const intervalId = setInterval(autoScroll, 4000)

      // Clean up interval on component unmount
      return () => clearInterval(intervalId)
    }
  }, [isInView])

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
            onClick={() => scroll("left")}
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
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg ${
              canScrollRight ? "opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  )
}