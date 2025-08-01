"use client"

import { useEffect } from "react"
import { initializeArticleLikes } from "@/app/actions/article-likes"

// Initial like counts for articles
const initialLikeCounts: Record<string, number> = {
  "singapore-oil-spill": 1,
  "elementary-stem": 1,
  "expanding-horizons": 1,
  "oil-spills-impact": 1,
}

export default function InitializeLikes() {
  useEffect(() => {
    // Initialize article likes when the app loads
    initializeArticleLikes(initialLikeCounts)
  }, [])

  return null // This component doesn't render anything
}
