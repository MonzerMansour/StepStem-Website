"use server"

import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"
import { type Review, DEFAULT_REVIEWS } from "../types/review"

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

export async function getReviewById(id: string): Promise<Review | null> {
  try {
    const reviews = await getAllReviews()
    return reviews.find((review) => review.id === id) || null
  } catch (error) {
    console.error("Error fetching review:", error)
    return null
  }
}

export async function addReview(review: Omit<Review, "id">): Promise<Review> {
  try {
    const newReview: Review = {
      ...review,
      id: nanoid(),
    }

    const reviews = await getAllReviews()
    const updatedReviews = [...reviews, newReview]

    await kv.set(REVIEWS_KEY, updatedReviews)
    return newReview
  } catch (error) {
    console.error("Error adding review:", error)
    throw new Error("Failed to add review")
  }
}

export async function updateReview(id: string, updatedData: Partial<Review>): Promise<Review | null> {
  try {
    const reviews = await getAllReviews()
    const reviewIndex = reviews.findIndex((review) => review.id === id)

    if (reviewIndex === -1) {
      return null
    }

    const updatedReview = {
      ...reviews[reviewIndex],
      ...updatedData,
    }

    reviews[reviewIndex] = updatedReview
    await kv.set(REVIEWS_KEY, reviews)

    return updatedReview
  } catch (error) {
    console.error("Error updating review:", error)
    throw new Error("Failed to update review")
  }
}

export async function deleteReview(id: string): Promise<boolean> {
  try {
    const reviews = await getAllReviews()
    const filteredReviews = reviews.filter((review) => review.id !== id)

    if (filteredReviews.length === reviews.length) {
      return false
    }

    await kv.set(REVIEWS_KEY, filteredReviews)
    return true
  } catch (error) {
    console.error("Error deleting review:", error)
    throw new Error("Failed to delete review")
  }
}

export async function initializeReviews(defaultReviews: Review[] = DEFAULT_REVIEWS): Promise<void> {
  try {
    const existingReviews = await kv.get<Review[]>(REVIEWS_KEY)

    if (!existingReviews || existingReviews.length === 0) {
      await kv.set(REVIEWS_KEY, defaultReviews)
    }
  } catch (error) {
    console.error("Error initializing reviews:", error)
  }
}
