"use server"

import { kv } from "@vercel/kv"
import { z } from "zod"
import type { Article } from "../types/article"

// Define the schema for articles
const articleSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().min(1),
  date: z.string().min(1),
  readTime: z.string().min(1),
  views: z.number().int().min(0),
  comments: z.number().int().min(0),
  excerpt: z.string().min(1),
  author: z.string().min(1),
  content: z.string().min(1),
})

// Get all articles from KV
export async function getAllArticles(): Promise<Article[]> {
  try {
    const articles = await kv.get("articles")
    return (articles as Article[]) || []
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

// Initialize articles with default data
export async function initializeArticles(defaultArticles: Article[]) {
  try {
    const existingArticles = await kv.get("articles")
    if (!existingArticles || (Array.isArray(existingArticles) && existingArticles.length === 0)) {
      await kv.set("articles", defaultArticles)
      console.log("Initialized articles with default data")
    }
  } catch (error) {
    console.error("Error initializing articles:", error)
  }
}

// Add a new article
export async function addArticle(formData: FormData) {
  try {
    const rawData = {
      id: formData.get("slug") as string, // Use slug as ID
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      image: formData.get("image") as string,
      date: formData.get("date") as string,
      readTime: formData.get("readTime") as string,
      views: Number.parseInt(formData.get("views") as string, 10) || 0,
      comments: Number.parseInt(formData.get("comments") as string, 10) || 0,
      excerpt: formData.get("excerpt") as string,
      author: formData.get("author") as string,
      content: formData.get("content") as string,
    }

    // Validate the data
    const validatedData = articleSchema.parse(rawData)

    // Get existing articles
    const existingArticles = await getAllArticles()

    // Check if slug already exists
    const slugExists = existingArticles.some((article) => article.slug === validatedData.slug)
    if (slugExists) {
      return { success: false, error: "An article with this slug already exists" }
    }

    // Add the new article
    const updatedArticles = [...existingArticles, validatedData]

    // Save to KV
    await kv.set("articles", updatedArticles)

    return { success: true }
  } catch (error) {
    console.error("Error adding article:", error)
    return { success: false, error: "Failed to add article" }
  }
}

// Update an existing article
export async function updateArticle(formData: FormData) {
  try {
    const id = formData.get("id") as string
    const rawData = {
      id,
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      image: formData.get("image") as string,
      date: formData.get("date") as string,
      readTime: formData.get("readTime") as string,
      views: Number.parseInt(formData.get("views") as string, 10) || 0,
      comments: Number.parseInt(formData.get("comments") as string, 10) || 0,
      excerpt: formData.get("excerpt") as string,
      author: formData.get("author") as string,
      content: formData.get("content") as string,
    }

    // Validate the data
    const validatedData = articleSchema.parse(rawData)

    // Get existing articles
    const existingArticles = await getAllArticles()

    // Check if slug already exists for a different article
    const slugExists = existingArticles.some((article) => article.slug === validatedData.slug && article.id !== id)
    if (slugExists) {
      return { success: false, error: "An article with this slug already exists" }
    }

    // Update the article
    const updatedArticles = existingArticles.map((article) => (article.id === id ? validatedData : article))

    // Save to KV
    await kv.set("articles", updatedArticles)

    return { success: true }
  } catch (error) {
    console.error("Error updating article:", error)
    return { success: false, error: "Failed to update article" }
  }
}

// Delete an article
export async function deleteArticle(id: string) {
  try {
    // Get existing articles
    const existingArticles = await getAllArticles()

    // Remove the article
    const updatedArticles = existingArticles.filter((article) => article.id !== id)

    // Save to KV
    await kv.set("articles", updatedArticles)

    return { success: true }
  } catch (error) {
    console.error("Error deleting article:", error)
    return { success: false, error: "Failed to delete article" }
  }
}
