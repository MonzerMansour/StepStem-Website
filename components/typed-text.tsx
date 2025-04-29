"use client"

import { useState, useEffect } from "react"

interface TypedTextProps {
  messages: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayAfterType?: number
  className?: string
}

export default function TypedText({
  messages,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterType = 3000,
  className = "",
}: TypedTextProps) {
  // Animation phases: 0 = typing, 1 = pausing, 2 = deleting
  const [phase, setPhase] = useState<0 | 1 | 2>(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")

  // Handle typing phase
  useEffect(() => {
    if (!messages.length) return

    const currentMessage = messages[currentMessageIndex]

    // Typing phase
    if (phase === 0) {
      if (currentText.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentMessage.slice(0, currentText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, move to pause phase
        setPhase(1)
      }
    }

    // Pause phase
    if (phase === 1) {
      const timeout = setTimeout(() => {
        setPhase(2) // Move to deleting phase after pause
      }, delayAfterType)
      return () => clearTimeout(timeout)
    }

    // Deleting phase
    if (phase === 2) {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Finished deleting, move to next message and back to typing phase
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length)
        setPhase(0)
      }
    }
  }, [currentText, phase, currentMessageIndex, messages, typingSpeed, deletingSpeed, delayAfterType])

  return (
    <div className={className}>
      <span className="text-white">{currentText || "\u00A0"}</span>
    </div>
  )
}
