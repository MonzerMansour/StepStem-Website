"use server"

import { kv } from "@vercel/kv"
import { z } from "zod"
import type { Article } from "../types/article"

// Define the schema for our articles
const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  image: z
    .string()
    .min(1, "Image is required")
    .refine((val) => {
      // Allow relative paths starting with / or full URLs
      return val.startsWith("/") || val.startsWith("http://") || val.startsWith("https://")
    }, "Image must be a valid URL or relative path starting with /"),
  author: z.string().min(1, "Author is required"),
  date: z.string().min(1, "Date is required"),
  readTime: z.string().min(1, "Read time is required"),
  views: z.number().int().min(0),
  comments: z.number().int().min(0),
})

// Get all articles
export async function getAllArticles(): Promise<Article[]> {
  try {
    const articles = await kv.get("news_articles")
    return (articles as Article[]) || []
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

// Initialize articles with default data if they don't exist
export async function initializeArticles(defaultArticles: Article[]) {
  try {
    const existingArticles = await kv.get("news_articles")
    if (!existingArticles) {
      await kv.set("news_articles", defaultArticles)
    }
  } catch (error) {
    console.error("Error initializing articles:", error)
  }
}

// Add a new article
export async function addArticle(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      image: formData.get("image") as string,
      author: formData.get("author") as string,
      date: formData.get("date") as string,
      readTime: formData.get("readTime") as string,
      views: Number.parseInt(formData.get("views") as string, 10) || 0,
      comments: Number.parseInt(formData.get("comments") as string, 10) || 0,
    }

    // Validate the data
    const validatedData = articleSchema.parse(rawData)

    // Get existing articles
    const articles = await getAllArticles()

    // Check if slug already exists
    const existingSlug = articles.find((article) => article.slug === validatedData.slug)
    if (existingSlug) {
      return { success: false, error: "An article with this slug already exists" }
    }

    // Create new article with ID
    const newArticle: Article = {
      ...validatedData,
      id: crypto.randomUUID(),
    }

    // Add to articles array
    const updatedArticles = [...articles, newArticle]

    // Save to KV
    await kv.set("news_articles", updatedArticles)

    return { success: true }
  } catch (error) {
    console.error("Error adding article:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to add article" }
  }
}

// Update an existing article
export async function updateArticle(formData: FormData) {
  try {
    const id = formData.get("id") as string
    const rawData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      image: formData.get("image") as string,
      author: formData.get("author") as string,
      date: formData.get("date") as string,
      readTime: formData.get("readTime") as string,
      views: Number.parseInt(formData.get("views") as string, 10) || 0,
      comments: Number.parseInt(formData.get("comments") as string, 10) || 0,
    }

    // Validate the data
    const validatedData = articleSchema.parse(rawData)

    // Get existing articles
    const articles = await getAllArticles()

    // Check if slug already exists for a different article
    const existingSlug = articles.find((article) => article.slug === validatedData.slug && article.id !== id)
    if (existingSlug) {
      return { success: false, error: "An article with this slug already exists" }
    }

    // Find and update the article
    const updatedArticles = articles.map((article) => (article.id === id ? { ...validatedData, id } : article))

    // Save to KV
    await kv.set("news_articles", updatedArticles)

    return { success: true }
  } catch (error) {
    console.error("Error updating article:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to update article" }
  }
}

// Delete an article
export async function deleteArticle(id: string) {
  try {
    // Get existing articles
    const articles = await getAllArticles()

    // Filter out the article to delete
    const updatedArticles = articles.filter((article) => article.id !== id)

    // Save to KV
    await kv.set("news_articles", updatedArticles)

    return { success: true }
  } catch (error) {
    console.error("Error deleting article:", error)
    return { success: false, error: "Failed to delete article" }
  }
}
