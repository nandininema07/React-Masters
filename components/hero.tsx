"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "./navbar"
import ParallaxWrapper from "./parallax-wrapper"

function RobotModel() {
  // Using a placeholder duck model - replace with your actual robot model
  const { scene } = useGLTF("/assets/3d/duck.glb")
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />
}

export default function Hero() {
  const canvasRef = useRef(null)

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent">
      <Navbar />
      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center pt-20">
        <ParallaxWrapper direction="up" speed={0.3} className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Redefining
            </span>{" "}
            Home Assistance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
            Meet the intelligent companion that transforms your daily life with smart automation, personalized
            assistance, and seamless home integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/simulation">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">Try Now</Button>
            </Link>
            <Link href="/comparison">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto">
                Buy Now
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </ParallaxWrapper>

        <ParallaxWrapper direction="down" speed={0.2} className="w-full md:w-1/2 h-[400px] md:h-[500px]">
          <Canvas ref={canvasRef} camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <RobotModel />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            <Environment preset="apartment" />
          </Canvas>
        </ParallaxWrapper>
      </div>

      {/* Remove this div
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent" />
      */}
    </section>
  )
}

