"use client"

import { useState, useEffect, useRef } from "react"

interface StatCardProps {
  number: string
  label: string
  bgColor: string
  textColor: string
}

export default function StatCard({ number, label, bgColor, textColor }: StatCardProps) {
  // Parse the number to get the numeric part and any suffix (like +)
  const match = number.match(/^(\d+)(.*)$/)
  const numericPart = match ? Number.parseInt(match[1], 10) : 0
  const suffixPart = match ? match[2] || "" : ""

  // Initialize count with 0 to enable animation
  const [count, setCount] = useState(0)
  const [suffix, setSuffix] = useState(suffixPart)
  const targetRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const previousNumberRef = useRef<string>(number)
  const isInitialMount = useRef(true)

  // Update suffix when it changes
  useEffect(() => {
    setSuffix(suffixPart)
  }, [suffixPart])

  // Handle number changes
  useEffect(() => {
    // Skip the first render since we want to animate from 0
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // If the number has changed
    if (previousNumberRef.current !== number) {
      console.log(`StatCard: Number changed from ${previousNumberRef.current} to ${number}`)

      // If we've already animated once, animate to the new target
      if (hasAnimated.current) {
        animateToNewTarget(numericPart)
      }

      // Update the previous number reference
      previousNumberRef.current = number
    }
  }, [number, numericPart])

  // Set up intersection observer to trigger initial animation when element is in view
  useEffect(() => {
    if (!targetRef.current || hasAnimated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the animation from 0 to the target number
            animateCount(numericPart)
            hasAnimated.current = true
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(targetRef.current)

    return () => {
      observer.disconnect()
    }
  }, [numericPart])

  // Clean up any ongoing animations when component unmounts
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [])

  // Function to animate from current count to new target
  const animateToNewTarget = (newTarget: number) => {
    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    // Get the current count value
    const startValue = count
    const changeInValue = newTarget - startValue

    // Don't animate if there's no change
    if (changeInValue === 0) return

    const duration = 1000 // Animation duration in ms
    const frameDuration = 1000 / 60 // 60fps
    const totalFrames = Math.round(duration / frameDuration)

    let frame = 0

    animationRef.current = setInterval(() => {
      frame++

      // Use easeOutQuad for smoother animation
      const progress = frame / totalFrames
      const easeProgress = 1 - Math.pow(1 - progress, 2)

      const currentCount = Math.floor(startValue + changeInValue * easeProgress)
      setCount(currentCount)

      if (frame === totalFrames) {
        clearInterval(animationRef.current as NodeJS.Timeout)
        animationRef.current = null
        setCount(newTarget)
      }
    }, frameDuration)
  }

  // Function to animate from 0 to target
  const animateCount = (targetValue: number) => {
    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    const startValue = 0
    const changeInValue = targetValue - startValue
    const duration = 1500 // Animation duration in ms
    const frameDuration = 1000 / 60 // 60fps
    const totalFrames = Math.round(duration / frameDuration)

    let frame = 0

    animationRef.current = setInterval(() => {
      frame++

      // Use easeOutQuad for smoother animation
      const progress = frame / totalFrames
      const easeProgress = 1 - Math.pow(1 - progress, 2)

      const currentCount = Math.floor(startValue + changeInValue * easeProgress)
      setCount(currentCount)

      if (frame === totalFrames) {
        clearInterval(animationRef.current as NodeJS.Timeout)
        animationRef.current = null
        setCount(targetValue)
      }
    }, frameDuration)
  }

  return (
    <div
      ref={targetRef}
      className={`${bgColor} ${textColor} p-8 text-center rounded-lg shadow-lg transition-transform hover:scale-105`}
    >
      <div className="text-6xl md:text-7xl font-bold mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-xl font-medium">{label}</div>
    </div>
  )
}
