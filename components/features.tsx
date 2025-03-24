"use client"

import { useState, useEffect, useRef, createRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { motion, useInView, useScroll } from "framer-motion"
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
  const sectionRef = useRef(null)
  const modelRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Feature card refs for intersection observer
  const featureRefs = useRef([])
  featureRefs.current = features.map((_, i) => featureRefs.current[i] ?? createRef())

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setActiveFeature(index)
          }
        },
        { threshold: 0.7 },
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-transparent relative min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Intelligent Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Designed to make your life easier with cutting-edge technology and intuitive interactions.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-start">
          {/* Fixed 3D Model on the left */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-20 h-[400px] mb-10 lg:mb-0">
            <Canvas ref={modelRef} camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <RobotModel featureIndex={activeFeature} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
              <Environment preset="apartment" />
            </Canvas>
          </div>

          {/* Scrollable feature cards on the right */}
          <div className="w-full lg:w-1/2 space-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                ref={featureRefs.current[index]}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.7 }}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  activeFeature === index
                    ? "bg-primary/10 border border-primary/20 shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
                }`}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

