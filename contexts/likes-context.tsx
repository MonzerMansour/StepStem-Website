"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type LikesContextType = {
  likedArticles: Record<string, boolean>
  articleLikes: Record<string, number>
  toggleLike: (articleId: string) => void
  getLikeCount: (articleId: string) => number
  hasLiked: (articleId: string) => boolean
}

// Initial like counts for articles
const initialLikeCounts: Record<string, number> = {
  "singapore-oil-spill": 1,
  "elementary-stem": 1,
  "expanding-horizons": 1,
  "oil-spills-impact": 1,
}

const LikesContext = createContext<LikesContextType | undefined>(undefined)

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({})
  const [articleLikes, setArticleLikes] = useState<Record<string, number>>(initialLikeCounts)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load liked articles from localStorage on mount
  useEffect(() => {
    const loadLikedArticles = () => {
      try {
        const savedLikedArticles = localStorage.getItem("likedArticles")
        const savedArticleLikes = localStorage.getItem("articleLikes")

        if (savedLikedArticles) {
          setLikedArticles(JSON.parse(savedLikedArticles))
        }

        if (savedArticleLikes) {
          setArticleLikes(JSON.parse(savedArticleLikes))
        } else {
          setArticleLikes(initialLikeCounts)
        }
      } catch (error) {
        console.error("Error loading liked articles from localStorage:", error)
      }
      setIsLoaded(true)
    }

    loadLikedArticles()
  }, [])

  // Save liked articles to localStorage when they change
  useEffect(() => {
    if (!isLoaded) return

    try {
      localStorage.setItem("likedArticles", JSON.stringify(likedArticles))
      localStorage.setItem("articleLikes", JSON.stringify(articleLikes))
    } catch (error) {
      console.error("Error saving liked articles to localStorage:", error)
    }
  }, [likedArticles, articleLikes, isLoaded])

  const toggleLike = (articleId: string) => {
    setLikedArticles((prev) => {
      const wasLiked = prev[articleId]
      const newLikedArticles = { ...prev, [articleId]: !wasLiked }

      // Update like count
      setArticleLikes((prevLikes) => {
        const currentLikes = prevLikes[articleId] || 0
        return {
          ...prevLikes,
          [articleId]: wasLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1,
        }
      })

      return newLikedArticles
    })
  }

  const getLikeCount = (articleId: string) => {
    return articleLikes[articleId] || 0
  }

  const hasLiked = (articleId: string) => {
    return !!likedArticles[articleId]
  }

  return (
    <LikesContext.Provider value={{ likedArticles, articleLikes, toggleLike, getLikeCount, hasLiked }}>
      {children}
    </LikesContext.Provider>
  )
}

export function useLikes() {
  const context = useContext(LikesContext)
  if (context === undefined) {
    throw new Error("useLikes must be used within a LikesProvider")
  }
  return context
}
