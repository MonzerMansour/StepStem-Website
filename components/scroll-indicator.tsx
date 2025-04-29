"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Hide the indicator after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer animate-bounce"
      onClick={scrollDown}
    >
      <span className="text-white text-sm mb-2">Scroll Down</span>
      <ChevronDown className="h-6 w-6 text-white" />
    </div>
  )
}
