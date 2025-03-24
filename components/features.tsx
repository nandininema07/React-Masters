"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { Home, Users, Battery, Wifi, Brain, Shield } from "lucide-react"

function RobotModel({ featureIndex }) {
  // Using a placeholder duck model - replace with your actual robot model
  const { scene } = useGLTF("/assets/3d/duck.glb")

  // You could modify the robot's position or animation based on featureIndex
  const rotationY = (featureIndex * Math.PI) / 3

  return <primitive object={scene} scale={2} position={[0, -1, 0]} rotation={[0, rotationY, 0]} />
}

const features = [
  {
    title: "Smart Home Integration",
    description: "Seamlessly connects with your existing smart home devices for complete home automation.",
    icon: Home,
  },
  {
    title: "Interactive Companion",
    description: "Engages with children and adults through natural conversation and personalized interactions.",
    icon: Users,
  },
  {
    title: "Auto-Docking Charging",
    description: "Automatically returns to its charging station when battery is low, ensuring it's always ready.",
    icon: Battery,
  },
  {
    title: "Advanced Connectivity",
    description: "Stays connected via Wi-Fi, Bluetooth, and cellular backup for uninterrupted service.",
    icon: Wifi,
  },
  {
    title: "AI-Powered Learning",
    description: "Learns your preferences and routines over time to provide increasingly personalized assistance.",
    icon: Brain,
  },
  {
    title: "Privacy Protection",
    description: "Built-in privacy features ensure your data stays secure and your conversations remain private.",
    icon: Shield,
  },
]

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const featuresContainerRef = useRef<HTMLDivElement>(null)

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

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index === selectedFeature ? null : index)
    // Scroll to the clicked feature
    const featureElement = featuresContainerRef.current?.children[index] as HTMLElement
    featureElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section 
      id="features" 
      ref={sectionRef} 
      className="relative h-screen flex items-stretch overflow-hidden"
    >
      <div className="container mx-auto px-4 flex h-full">
        {/* Fixed 3D Model on the left */}
        <div className="w-1/2 sticky top-0 h-full flex items-center justify-center">
          <div className="w-full h-full max-h-[600px] flex items-center justify-center">
            <Canvas 
              className="w-full h-full"
              camera={{ position: [0, 0, 5], fov: 50 }}
            >
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <RobotModel featureIndex={activeFeature} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
              <Environment preset="apartment" />
            </Canvas>
          </div>
        </div>

        {/* Scrollable feature cards on the right */}
        <div 
          ref={featuresContainerRef}
          className="w-1/2 overflow-y-auto h-full pt-[10vh] pb-[10vh]"
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
                onClick={() => handleFeatureClick(index)}
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
                  className={`p-6 rounded-xl w-full transition-all duration-300 ${
                    selectedFeature === index
                      ? "ring-4 ring-primary/50 bg-primary/10 border border-primary/20 shadow-2xl"
                      : activeFeature === index
                      ? "bg-primary/10 border border-primary/20 shadow-lg"
                      : "bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      selectedFeature === index
                        ? "bg-primary text-white"
                        : activeFeature === index
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary"
                    }`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  
                  {/* Optional: Add a detail view when selected */}
                  {selectedFeature === index && (
                    <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                      <p className="font-medium text-primary">Additional Details</p>
                      <p className="text-sm text-gray-500">
                        More information about {feature.title} can be added here.
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}