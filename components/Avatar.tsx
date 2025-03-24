"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

function RobotHead({ expression, isSpeaking }: { expression: string; isSpeaking: boolean }) {
  const { theme } = useTheme()
  const headRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  const leftEyebrowRef = useRef<THREE.Mesh>(null)
  const rightEyebrowRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  // Theme-based colors
  const themeColors = {
    light: {
      face: "#e2e8f0",
      body: "#cbd5e1",
      eyebrow: "#475569",
      ambientIntensity: 0.8,
      pointIntensity: 1.2,
      pointColor: "#f5f5f5",
      envPreset: "city"
    },
    dark: {
      face: "#1e293b",
      body: "#334155",
      eyebrow: "#f8fafc",
      ambientIntensity: 0.5,
      pointIntensity: 1,
      pointColor: "#ffffff",
      envPreset: "dawn"
    }
  }

  const currentTheme = themeColors[theme as keyof typeof themeColors] || themeColors.dark

  // Expression configuration
  const emotions = {
    neutral: {
      color: theme === "dark" ? "#3b82f6" : "#2563eb",
      eyebrow: { left: -0.1, right: 0.1, y: 1.8 },
      mouth: { width: 1, height: 0.2 }
    },
    happy: {
      color: theme === "dark" ? "#10b981" : "#059669",
      eyebrow: { left: -0.2, right: 0.2, y: 1.75 },
      mouth: { width: 1.2, height: 0.8 }
    },
    sad: {
      color: theme === "dark" ? "#6366f1" : "#4f46e5",
      eyebrow: { left: 0.3, right: -0.3, y: 1.85 },
      mouth: { width: 0.8, height: 0.1 }
    },
    angry: {
      color: theme === "dark" ? "#ef4444" : "#dc2626",
      eyebrow: { left: -0.4, right: 0.4, y: 1.7 },
      mouth: { width: 0.7, height: 0.3 }
    },
    surprised: {
      color: theme === "dark" ? "#f59e0b" : "#d97706",
      eyebrow: { left: 0.5, right: -0.5, y: 1.9 },
      mouth: { width: 0.7, height: 1.2 }
    }
  }

  const currentEmotion = emotions[expression as keyof typeof emotions] || emotions.neutral
  const [isBlinking, setIsBlinking] = useState(false)
  const [mouthOpenness, setMouthOpenness] = useState(0)
  const [headBob, setHeadBob] = useState(0)

  // Floating animation
  useEffect(() => {
    let frameId: number
    const animate = () => {
      setHeadBob(Math.sin(Date.now() / 800) * 0.1)
      frameId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frameId)
  }, [])

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
    }, Math.random() * 3000 + 2000)
    return () => clearInterval(blinkInterval)
  }, [])

  // Speaking animation
  useEffect(() => {
    if (isSpeaking) {
      const speakInterval = setInterval(() => {
        setMouthOpenness(Math.random() * 0.5)
      }, 100)
      return () => clearInterval(speakInterval)
    } else {
      setMouthOpenness(0)
    }
  }, [isSpeaking])

  // Animation frame updates
  useFrame(() => {
    if (!headRef.current || !leftEyeRef.current || !rightEyeRef.current || 
        !mouthRef.current || !leftEyebrowRef.current || !rightEyebrowRef.current) return

    // Head follows mouse
    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      mouse.x * 0.3,
      0.05
    )
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      mouse.y * 0.2,
      0.05
    )
    headRef.current.position.y = headBob

    // Eye blinking
    const eyeScale = isBlinking ? 0.1 : 1
    leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScale, 0.3)
    rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScale, 0.3)

    // Eyebrows expression
    leftEyebrowRef.current.rotation.z = THREE.MathUtils.lerp(
      leftEyebrowRef.current.rotation.z,
      currentEmotion.eyebrow.left,
      0.1
    )
    rightEyebrowRef.current.rotation.z = THREE.MathUtils.lerp(
      rightEyebrowRef.current.rotation.z,
      currentEmotion.eyebrow.right,
      0.1
    )
    leftEyebrowRef.current.position.y = THREE.MathUtils.lerp(
      leftEyebrowRef.current.position.y,
      currentEmotion.eyebrow.y,
      0.1
    )
    rightEyebrowRef.current.position.y = THREE.MathUtils.lerp(
      rightEyebrowRef.current.position.y,
      currentEmotion.eyebrow.y,
      0.1
    )

    // Mouth expression
    const targetMouthWidth = currentEmotion.mouth.width
    const targetMouthHeight = isSpeaking 
      ? currentEmotion.mouth.height + mouthOpenness 
      : currentEmotion.mouth.height

    mouthRef.current.scale.x = THREE.MathUtils.lerp(
      mouthRef.current.scale.x,
      targetMouthWidth,
      0.3
    )
    mouthRef.current.scale.y = THREE.MathUtils.lerp(
      mouthRef.current.scale.y,
      targetMouthHeight,
      0.3
    )
  })

  return (
    <group ref={headRef} position={[0, 0, 0]}>
      <group>
        {/* Face screen */}
        <mesh position={[0, 1.5, 0.6]}>
          <boxGeometry args={[1.2, 0.8, 0.1]} />
          <meshStandardMaterial 
            color={currentTheme.face} 
            metalness={0.3} 
            roughness={theme === "dark" ? 0.2 : 0.4}
          />
        </mesh>

        {/* Eyebrows */}
        <mesh 
          ref={leftEyebrowRef} 
          position={[-0.4, currentEmotion.eyebrow.y, 0.66]} 
          rotation={[0, 0, currentEmotion.eyebrow.left]}
        >
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial color={currentTheme.eyebrow} />
        </mesh>
        <mesh 
          ref={rightEyebrowRef} 
          position={[0.4, currentEmotion.eyebrow.y, 0.66]} 
          rotation={[0, 0, currentEmotion.eyebrow.right]}
        >
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial color={currentTheme.eyebrow} />
        </mesh>

        {/* Eyes */}
        <mesh ref={leftEyeRef} position={[-0.3, 1.6, 0.66]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial 
            color={currentEmotion.color} 
            emissive={currentEmotion.color} 
            emissiveIntensity={theme === "dark" ? 2 : 1.5}
          />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.3, 1.6, 0.66]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial 
            color={currentEmotion.color} 
            emissive={currentEmotion.color} 
            emissiveIntensity={theme === "dark" ? 2 : 1.5}
          />
        </mesh>

        {/* Mouth */}
        <mesh ref={mouthRef} position={[0, 1.3, 0.66]}>
          <boxGeometry args={[0.5, 0.1, 0.01]} />
          <meshStandardMaterial 
            color={currentEmotion.color} 
            emissive={currentEmotion.color} 
            emissiveIntensity={theme === "dark" ? 1 : 0.8}
          />
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1.5, 0.5]} />
          <meshStandardMaterial 
            color={currentTheme.body} 
            metalness={0.2} 
            roughness={theme === "dark" ? 0.3 : 0.5}
          />
        </mesh>
      </group>
    </group>
  )
}

export default function Avatar({ expression = "neutral", isSpeaking = false }) {
  const { theme } = useTheme()
  
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={theme === "dark" ? 0.5 : 0.8} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={theme === "dark" ? 1 : 1.2}
          color={theme === "dark" ? "#ffffff" : "#f5f5f5"}
        />
        <Environment preset={theme === "dark" ? "dawn" : "city"} />
        <RobotHead expression={expression} isSpeaking={isSpeaking} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI / 2 + 0.5}
        />
      </Canvas>
    </div>
  )
}