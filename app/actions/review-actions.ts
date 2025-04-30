"use server"

import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"

export interface Review {
  id: string
  name: string
  role?: string
  school: string
  content: string
  rating: number
  date: string
  source?: string
}

const REVIEWS_KEY = "reviews"

export async function getAllReviews(): Promise<Review[]> {
  try {
    const reviews = (await kv.get<Review[]>(REVIEWS_KEY)) || []
    return reviews
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return []
  }
}

export async function addReview(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string
    const role = formData.get("role") as string | undefined
    const school = formData.get("school") as string
    const content = formData.get("content") as string
    const rating = Number(formData.get("rating"))
    const date = formData.get("date") as string
    const source = formData.get("source") as string | undefined

    if (!name || !school || !content || !rating || !date) {
      return { success: false, error: "Missing required fields" }
    }

    const newReview: Review = {
      id: nanoid(),
      name,
      role,
      school,
      content,
      rating,
      date,
      source,
    }

    const reviews = await getAllReviews()
    const updatedReviews = [...reviews, newReview]

    await kv.set(REVIEWS_KEY, updatedReviews)
    return { success: true }
  } catch (error) {
    console.error("Error adding review:", error)
    return { success: false, error: "Failed to add review" }
  }
}

export async function updateReview(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const role = formData.get("role") as string | undefined
    const school = formData.get("school") as string
    const content = formData.get("content") as string
    const rating = Number(formData.get("rating"))
    const date = formData.get("date") as string
    const source = formData.get("source") as string | undefined

    if (!id || !name || !school || !content || !rating || !date) {
      return { success: false, error: "Missing required fields" }
    }

    const updatedReview: Review = {
      id,
      name,
      role,
      school,
      content,
      rating,
      date,
      source,
    }

    const reviews = await getAllReviews()
    const updatedReviews = reviews.map((r) => (r.id === id ? updatedReview : r))

    await kv.set(REVIEWS_KEY, updatedReviews)
    return { success: true }
  } catch (error) {
    console.error("Error updating review:", error)
    return { success: false, error: "Failed to update review" }
  }
}

export async function deleteReview(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const reviews = await getAllReviews()
    const updatedReviews = reviews.filter((r) => r.id !== id)

    await kv.set(REVIEWS_KEY, updatedReviews)
    return { success: true }
  } catch (error) {
    console.error("Error deleting review:", error)
    return { success: false, error: "Failed to delete review" }
  }
}

export async function initializeReviews(defaultReviews: Review[]): Promise<void> {
  try {
    const existingReviews = await kv.get<Review[]>(REVIEWS_KEY)

    if (!existingReviews || existingReviews.length === 0) {
      await kv.set(REVIEWS_KEY, defaultReviews)
    }
  } catch (error) {
    console.error("Error initializing reviews:", error)
  }
}
