"use server"

import { Redis } from "@upstash/redis"

// Initialize Redis client using environment variables
const redis = Redis.fromEnv()

// Function to get the current like count for an article
export async function getLikeCount(articleId: string): Promise<number> {
  try {
    const count = await redis.get<number>(`article:${articleId}:likes`)
    return count || 0
  } catch (error) {
    console.error("Error getting like count:", error)
    return 0
  }
}

// Function to get like counts for multiple articles
export async function getLikeCounts(articleIds: string[]): Promise<Record<string, number>> {
  try {
    const pipeline = redis.pipeline()

    // Queue up all the get operations
    articleIds.forEach((id) => {
      pipeline.get(`article:${id}:likes`)
    })

    // Execute the pipeline
    const results = await pipeline.exec()

    // Map the results to article IDs
    const likeCounts: Record<string, number> = {}
    articleIds.forEach((id, index) => {
      likeCounts[id] = (results[index] as number) || 0
    })

    return likeCounts
  } catch (error) {
    console.error("Error getting like counts:", error)
    return articleIds.reduce((acc, id) => ({ ...acc, [id]: 0 }), {})
  }
}

// Function to check if a user has liked an article
export async function hasUserLikedArticle(articleId: string, userId: string): Promise<boolean> {
  try {
    const hasLiked = await redis.sismember(`article:${articleId}:likedBy`, userId)
    return !!hasLiked
  } catch (error) {
    console.error("Error checking if user liked article:", error)
    return false
  }
}

// Function to toggle a like for an article
export async function toggleArticleLike(articleId: string, userId: string): Promise<{ liked: boolean; count: number }> {
  try {
    const hasLiked = await hasUserLikedArticle(articleId, userId)

    if (hasLiked) {
      // Remove the like
      await redis.srem(`article:${articleId}:likedBy`, userId)
      await redis.decr(`article:${articleId}:likes`)
    } else {
      // Add the like
      await redis.sadd(`article:${articleId}:likedBy`, userId)
      await redis.incr(`article:${articleId}:likes`)
    }

    // Get the updated count
    const updatedCount = await getLikeCount(articleId)

    return {
      liked: !hasLiked,
      count: updatedCount,
    }
  } catch (error) {
    console.error("Error toggling article like:", error)
    const currentCount = await getLikeCount(articleId)
    return {
      liked: await hasUserLikedArticle(articleId, userId),
      count: currentCount,
    }
  }
}

// Initialize article likes if they don't exist yet
export async function initializeArticleLikes(articles: Record<string, number>): Promise<void> {
  try {
    // Process each article individually instead of using a pipeline
    // This avoids the "Pipeline is empty" error
    for (const [articleId, initialCount] of Object.entries(articles)) {
      // Use setnx (set if not exists) to only set the value if the key doesn't exist
      await redis.setnx(`article:${articleId}:likes`, initialCount)
    }

    console.log("Article likes initialized successfully")
  } catch (error) {
    console.error("Error initializing article likes:", error)
  }
}
