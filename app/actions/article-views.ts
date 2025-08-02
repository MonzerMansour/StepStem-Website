"use server"

import { kv } from "@vercel/kv"

// Function to get the current view count for an article
export async function getViews(articleId: string): Promise<number> {
  console.log(`Attempting to get views for article: ${articleId}`)
  console.log(`KV_REST_API_URL: ${process.env.KV_REST_API_URL ? "SET" : "NOT SET"}`)
  console.log(`KV_REST_API_TOKEN: ${process.env.KV_REST_API_TOKEN ? "SET" : "NOT SET"}`)

  try {
    // Check if Redis is available
    await kv.ping()

    const views = await kv.get<number>(`article:${articleId}:views`)
    const viewCount = views || 0

    console.log(`Retrieved views for ${articleId}: ${viewCount}`)
    return viewCount
  } catch (error) {
    console.error(`Error getting views for article ${articleId}:`, error)
    return 0 // Return 0 on error
  }
}

// Function to increment the view count for an article
export async function incrementViews(articleId: string): Promise<number> {
  console.log(`Attempting to increment views for article: ${articleId}`)
  console.log(`KV_REST_API_URL: ${process.env.KV_REST_API_URL ? "SET" : "NOT SET"}`)
  console.log(`KV_REST_API_TOKEN: ${process.env.KV_REST_API_TOKEN ? "SET" : "NOT SET"}`)

  try {
    // Check Redis connection before incrementing
    await kv.ping()
    const newViews = await kv.incr(`article:${articleId}:views`)
    console.log(`Incremented views for ${articleId} to: ${newViews}`)
    return newViews
  } catch (error) {
    console.error(`Error incrementing views for article ${articleId}:`, error)
    // If increment fails, try to get current known views or 0
    try {
      const currentViews = await getViews(articleId)
      return currentViews + 1
    } catch (fallbackError) {
      console.error(`Fallback also failed for ${articleId}:`, fallbackError)
      return 1 // Return 1 as a last resort
    }
  }
}

// Admin function to initialize views for an article (e.g., for new articles)
export async function initializeArticleViews(articleId: string, initialViews = 0): Promise<number> {
  console.log(`Attempting to initialize views for article: ${articleId}`)
  console.log(`KV_REST_API_URL: ${process.env.KV_REST_API_URL ? "SET" : "NOT SET"}`)
  console.log(`KV_REST_API_TOKEN: ${process.env.KV_REST_API_TOKEN ? "SET" : "NOT SET"}`)

  try {
    await kv.ping()
    const currentViews = await kv.get<number>(`article:${articleId}:views`)
    if (currentViews === null) {
      await kv.set(`article:${articleId}:views`, initialViews)
      console.log(`Initialized views for ${articleId} with ${initialViews} views`)
      return initialViews
    }
    console.log(`Views already exist for ${articleId}, current: ${currentViews}`)
    return currentViews
  } catch (error) {
    console.error(`Error initializing views for article ${articleId}:`, error)
    return initialViews
  }
}

// Admin function to reset views for an article
export async function resetArticleViews(articleId: string): Promise<number> {
  console.log(`Attempting to reset views for article: ${articleId}`)
  try {
    await kv.ping()
    await kv.set(`article:${articleId}:views`, 0)
    console.log(`Reset views for ${articleId}`)
    return 0
  } catch (error) {
    console.error(`Error resetting views for article ${articleId}:`, error)
    return 0
  }
}

// Admin function to set views for an article
export async function setArticleViews(articleId: string, views: number): Promise<number> {
  console.log(`Attempting to set views for article: ${articleId} to ${views}`)
  try {
    await kv.ping()
    await kv.set(`article:${articleId}:views`, views)
    console.log(`Set views for ${articleId} to ${views}`)
    return views
  } catch (error) {
    console.error(`Error setting views for article ${articleId}:`, error)
    return views
  }
}

// Admin function to get all article views (for a dashboard, for example)
export async function getAllArticleViews(): Promise<Record<string, number>> {
  console.log(`Attempting to get all article views.`)
  try {
    await kv.ping()
    const keys = await kv.keys("article:*:views")
    const views: Record<string, number> = {}
    console.log(`Found ${keys.length} article view keys.`)
    for (const key of keys) {
      const articleId = key.replace("article:", "").replace(":views", "")
      const viewCount = await kv.get<number>(key)
      if (viewCount !== null) {
        views[articleId] = viewCount
      }
    }
    console.log("All article views retrieved successfully.")
    return views
  } catch (error) {
    console.error("Error getting all article views:", error)
    return {}
  }
}
