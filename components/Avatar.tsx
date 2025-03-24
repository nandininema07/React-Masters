"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

function RobotHead({ expression, isSpeaking }: { expression: string; isSpeaking: boolean }) {
  // Refs for all facial components
  const headRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  const leftEyebrowRef = useRef<THREE.Mesh>(null)
  const rightEyebrowRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  // Emotion configuration
  const emotions = {
    neutral: {
      color: "#3b82f6",
      eyebrow: { left: -0.1, right: 0.1, y: 1.8 },
      mouth: { width: 1, height: 0.2 }
    },
    happy: {
      color: "#10b981",
      eyebrow: { left: -0.2, right: 0.2, y: 1.75 },
      mouth: { width: 1.2, height: 0.8 }
    },
    sad: {
      color: "#6366f1",
      eyebrow: { left: 0.3, right: -0.3, y: 1.85 },
      mouth: { width: 0.8, height: 0.1 }
    },
    angry: {
      color: "#ef4444",
      eyebrow: { left: -0.4, right: 0.4, y: 1.7 },
      mouth: { width: 0.7, height: 0.3 }
    },
    surprised: {
      color: "#f59e0b",
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

    // Head follows mouse with smooth movement
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
      {/* Head container */}
      <group>
        {/* Face screen */}
        <mesh position={[0, 1.5, 0.6]}>
          <boxGeometry args={[1.2, 0.8, 0.1]} />
          <meshStandardMaterial 
            color="#1e293b" 
            metalness={0.3} 
            roughness={0.2} 
          />
        </mesh>

        {/* Eyebrows */}
        <mesh 
          ref={leftEyebrowRef} 
          position={[-0.4, currentEmotion.eyebrow.y, 0.66]} 
          rotation={[0, 0, currentEmotion.eyebrow.left]}
        >
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh 
          ref={rightEyebrowRef} 
          position={[0.4, currentEmotion.eyebrow.y, 0.66]} 
          rotation={[0, 0, currentEmotion.eyebrow.right]}
        >
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Eyes */}
        <mesh ref={leftEyeRef} position={[-0.3, 1.6, 0.66]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial 
            color={currentEmotion.color} 
            emissive={currentEmotion.color} 
            emissiveIntensity={2} 
          />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.3, 1.6, 0.66]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial 
            color={currentEmotion.color} 
            emissive={currentEmotion.color} 
            emissiveIntensity={2} 
          />
        </mesh>

        {/* Mouth */}
        <mesh ref={mouthRef} position={[0, 1.3, 0.66]}>
          <boxGeometry args={[0.5, 0.1, 0.01]} />
          <meshStandardMaterial 
            color={currentEmotion.color} 
            emissive={currentEmotion.color} 
            emissiveIntensity={1} 
          />
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1.5, 0.5]} />
          <meshStandardMaterial 
            color="#334155" 
            metalness={0.2} 
            roughness={0.3} 
          />
        </mesh>
      </group>
    </group>
  )
}

export default function Avatar({ expression = "neutral", isSpeaking = false }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RobotHead expression={expression} isSpeaking={isSpeaking} />
        <Environment preset="dawn" />
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