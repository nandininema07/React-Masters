"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import TextLoop from "react-text-loop"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "./navbar"
import Spline from '@splinetool/react-spline/next';

// 1. First try - Your custom model
function CustomModel() {
  const { scene } = useGLTF("/models/robot.glb")
  const modelRef = useRef()
  
  useFrame(({ clock }) => {
    modelRef.current.rotation.y = clock.getElapsedTime() * 0.3
  })

  return <primitive ref={modelRef} object={scene} scale={2} position={[0, -1, 0]} />
}

// 2. Fallback - Drei's duck model
function DuckModel() {
  const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf")
  const modelRef = useRef()
  
  useFrame(({ clock }) => {
    modelRef.current.rotation.y = clock.getElapsedTime() * 0.3
  })

  return <primitive ref={modelRef} object={scene} scale={2} position={[0, -1, 0]} />
}

// 3. Final fallback - Simple geometry
function FallbackModel() {
  const modelRef = useRef()
  
  useFrame(({ clock }) => {
    modelRef.current.rotation.y = clock.getElapsedTime() * 0.3
  })

  return (
    <mesh ref={modelRef} position={[0, -1, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.3} />
    </mesh>
  )
}

function Model() {
  const [loadState, setLoadState] = useState<'loading' | 'custom' | 'duck' | 'fallback'>('loading')

  useEffect(() => {
    // Try loading custom model first
    try {
      const { scene } = useGLTF("/models/robot.glb")
      setLoadState('custom')
      return
    } catch (e) {
      console.log("Custom model not found, trying duck model...")
    }

    // Then try duck model
    try {
      const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf")
      setLoadState('duck')
    } catch (e) {
      console.log("Duck model failed, using fallback")
      setLoadState('fallback')
    }
  }, [])

  return (
    <>
      {loadState === 'custom' && <CustomModel />}
      {loadState === 'duck' && <DuckModel />}
      {loadState === 'fallback' && <FallbackModel />}
      {loadState === 'loading' && <FallbackModel />}
    </>
  )
}

export default function Hero() {
  const canvasRef = useRef(null)
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
              <div className="text-left font-semibold h-20 md:h-24 lg:h-28 flex items-center">
                <TextLoop interval={2500} springConfig={{ stiffness: 180, damping: 12 }}>
                  {highlights.map((item, index) => (
                    <motion.span
                      key={index}
                      className="coloredText text-5xl md:text-6xl lg:text-7xl mx-5 py-3 block"
                      style={{
                        background: "linear-gradient(to right, #4568DC, #B06AB3)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </TextLoop>
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

        {/* 3D Model Container */}
        <motion.div 
          className="w-full md:w-1/2 h-[50vh] md:h-full relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Canvas 
            ref={canvasRef} 
            camera={{ position: [0, 0, 5], fov: 50 }}
            className="absolute inset-0"
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Model />
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={1} 
              enablePan={false}
              minPolarAngle={Math.PI/4}
              maxPolarAngle={Math.PI/2}
            />
            <Environment preset="studio" />
          </Canvas>
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