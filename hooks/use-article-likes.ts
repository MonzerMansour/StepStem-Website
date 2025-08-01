"use client"

import { useState, useEffect, useCallback } from "react"
import { getUserId } from "@/lib/user-id"
import { getLikeCount, hasUserLikedArticle, toggleArticleLike } from "@/app/actions/article-likes"
import useSWR from "swr"

export function useArticleLike(articleId: string) {
  const userId = getUserId()
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Use SWR to fetch and cache the like count
  const { data: likeCount, mutate } = useSWR(`article:${articleId}:likes`, () => getLikeCount(articleId), {
    refreshInterval: 10000, // Refresh every 10 seconds
    dedupingInterval: 5000, // Dedupe requests within 5 seconds
  })

  // Check if the current user has liked the article
  useEffect(() => {
    if (!userId) return

    async function checkIfLiked() {
      try {
        const liked = await hasUserLikedArticle(articleId, userId)
        setIsLiked(liked)
      } catch (error) {
        console.error("Error checking if article is liked:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkIfLiked()
  }, [articleId, userId])

  // Function to toggle the like
  const toggleLike = useCallback(async () => {
    if (!userId) return

    try {
      setIsLoading(true)
      const result = await toggleArticleLike(articleId, userId)
      setIsLiked(result.liked)
      mutate(result.count)
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setIsLoading(false)
    }
  }, [articleId, userId, mutate])

  return {
    isLiked,
    likeCount: likeCount || 0,
    toggleLike,
    isLoading,
  }
}

// Hook to get like counts for multiple articles
export function useArticleLikes(articleIds: string[]) {
  const [isLoading, setIsLoading] = useState(true)
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({})

  // Use SWR to fetch and cache all like counts
  const { data, mutate } = useSWR(
    articleIds.length > 0 ? ["articleLikes", ...articleIds] : null,
    async () => {
      const counts = await fetch("/api/article-likes?ids=" + articleIds.join(",")).then((res) => res.json())
      return counts
    },
    {
      refreshInterval: 10000, // Refresh every 10 seconds
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
      onSuccess: (data) => {
        setLikeCounts(data)
        setIsLoading(false)
      },
    },
  )

  return {
    likeCounts: data || {},
    isLoading,
    mutate,
  }
}
