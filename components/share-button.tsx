"use client"

import { useState, useRef, useEffect } from "react"
import { Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ShareButtonProps {
  url: string
  title?: string
  className?: string
}

export default function ShareButton({ url, title = "Share this article", className }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Reset copied state when popup closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCopied(false), 300)
    }
  }, [isOpen])

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select()
      navigator.clipboard.writeText(inputRef.current.value)
      setCopied(true)

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className={cn("flex items-center gap-1", className)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Share article"
      >
        <Share2 className="h-4 w-4" />
        <span className="sr-only md:not-sr-only md:inline">Share</span>
      </Button>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 bottom-full mb-2 w-72 bg-white rounded-md shadow-lg p-4 z-50 border animate-in fade-in slide-in-from-top-5 duration-200"
        >
          <div className="text-sm font-medium mb-2">{title}</div>
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={url}
              readOnly
              className="flex-1 text-sm p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              onClick={(e) => e.currentTarget.select()}
            />
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy link"}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {copied ? "Link copied to clipboard!" : "Click to copy link"}
          </div>
        </div>
      )}
    </div>
  )
}
