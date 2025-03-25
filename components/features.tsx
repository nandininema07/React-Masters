"use client"

import { useState, useEffect, useRef } from "react"
import Spline from '@splinetool/react-spline'
import { motion, AnimatePresence } from "framer-motion"
import { Home, Users, Battery, Wifi, Brain, Shield, ChevronRight } from "lucide-react"

const features = [
  {
    title: "Smart Home Integration",
    description: "Seamlessly connects with your existing smart home devices for complete home automation.",
    icon: Home,
    details: [
      "Compatibility with major smart home platforms",
      "Voice command integration",
      "Automated routines and scenes",
      "Energy efficiency optimization"
    ]
  },
  {
    title: "Interactive Companion",
    description: "Engages with children and adults through natural conversation and personalized interactions.",
    icon: Users,
    details: [
      "Advanced natural language processing",
      "Emotional intelligence algorithms",
      "Personalized interaction modes",
      "Educational and entertainment capabilities"
    ]
  },
  {
    title: "Auto-Docking Charging",
    description: "Automatically returns to its charging station when battery is low, ensuring it's always ready.",
    icon: Battery,
    details: [
      "Intelligent battery management",
      "Automatic charging detection",
      "Quick charge capabilities",
      "Battery health monitoring"
    ]
  },
  {
    title: "Advanced Connectivity",
    description: "Stays connected via Wi-Fi, Bluetooth, and cellular backup for uninterrupted service.",
    icon: Wifi,
    details: [
      "Multi-network connectivity",
      "Seamless network switching",
      "Secure encrypted connections",
      "Global coverage support"
    ]
  },
  {
    title: "AI-Powered Learning",
    description: "Learns your preferences and routines over time to provide increasingly personalized assistance.",
    icon: Brain,
    details: [
      "Machine learning algorithms",
      "Adaptive behavior patterns",
      "Privacy-first data processing",
      "Continuous performance improvement"
    ]
  },
  {
    title: "Privacy Protection",
    description: "Built-in privacy features ensure your data stays secure and your conversations remain private.",
    icon: Shield,
    details: [
      "End-to-end encryption",
      "Local data processing",
      "User consent controls",
      "Transparent data management"
    ]
  },
]

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const featuresContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const container = featuresContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollProgress = container.scrollTop / (container.scrollHeight - container.clientHeight)
      const currentFeatureIndex = Math.min(
        Math.floor(scrollProgress * features.length),
        features.length - 1
      )
      setActiveFeature(currentFeatureIndex)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      id="features" 
      ref={sectionRef} 
      className="relative h-screen flex items-stretch overflow-hidden"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row h-full">
        {/* Spline Model - Full width on mobile, half on desktop */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-full md:sticky top-0 flex items-center justify-center">
          <div className="w-full h-full max-h-[400px] md:max-h-[600px]">
            <Spline
              scene="https://prod.spline.design/q0WK9SIpRBytluWm/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Feature cards - Maintains your exact design */}
        <div 
          ref={featuresContainerRef}
          className="w-full md:w-1/2 overflow-y-auto h-[60vh] md:h-full pt-[10vh] pb-[10vh]"
          style={{
            scrollSnapType: 'y mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="space-y-[10vh]">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="scroll-snap-align-center cursor-pointer h-[80vh]"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{ 
                  scrollSnapAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  transform: `scale(${1 - Math.abs(activeFeature - index) * 0.1})`,
                  opacity: `${activeFeature === index ? 1 : 0.6}`,
                  transition: 'transform 0.3s, opacity 0.3s'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-xl w-full transition-all duration-300 relative overflow-hidden ${
                    activeFeature === index
                      ? "bg-primary/10 border border-primary/20 shadow-lg"
                      : "bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                          activeFeature === index
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary"
                        }`}
                      >
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {hoveredFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 bg-primary/5 rounded-lg overflow-hidden"
                      >
                        <div className="p-4">
                          <h4 className="font-semibold text-primary mb-2">Feature Highlights</h4>
                          <ul className="space-y-2">
                            {feature.details.map((detail, detailIndex) => (
                              <li 
                                key={detailIndex} 
                                className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                              >
                                <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}