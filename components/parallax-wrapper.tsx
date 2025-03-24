"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
  offset?: number
}

export default function ParallaxWrapper({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
  offset = 100,
}: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  let x: any = 0
  let y: any = 0

  const up = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const down = useTransform(scrollYProgress, [0, 1], [-offset, offset])
  const left = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const right = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  switch (direction) {
    case "up":
      y = up
      break
    case "down":
      y = down
      break
    case "left":
      x = left
      break
    case "right":
      x = right
      break
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ x, y }}>{children}</motion.div>
    </div>
  )
}

