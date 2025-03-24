"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Heart, Clock, Shield, Smile } from "lucide-react"
import ParallaxWrapper from "./parallax-wrapper"

const impactCards = [
  {
    title: "Family Assistance",
    description: "Helps families manage daily tasks, coordinate schedules, and keep the home running smoothly.",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Elderly Support",
    description: "Provides companionship and assistance to elderly individuals, helping them maintain independence.",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Home Security",
    description: "Monitors your home when you're away and alerts you to any unusual activity.",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Emotional Wellbeing",
    description: "Creates a positive atmosphere with personalized interactions and entertainment options.",
    icon: Smile,
    color: "from-yellow-500 to-amber-500",
  },
]

export default function Impact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

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
            Making a Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            See how our robot transforms daily life and creates meaningful impact for different households.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactCards.map((card, index) => (
            <ParallaxWrapper key={index} direction={index % 2 === 0 ? "up" : "down"} speed={0.2} offset={30}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
              >
                <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                <div className="p-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r mb-6 flex items-center justify-center text-white shadow-lg mx-auto md:mx-0 md:mb-8 lg:mb-6 lg:mx-auto xl:mx-0 xl:mb-8 2xl:mx-auto ${card.color}">
                    <card.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center md:text-left lg:text-center xl:text-left 2xl:text-center">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center md:text-left lg:text-center xl:text-left 2xl:text-center">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            </ParallaxWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

