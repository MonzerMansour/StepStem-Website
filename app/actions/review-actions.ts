"use server"

import { kv } from "@vercel/kv"
import { z } from "zod"
import { revalidatePath } from "next/cache"

// Define the schema for reviews
export const reviewSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  school: z.string().min(1, "School is required"),
  content: z.string().min(1, "Content is required"),
  rating: z.number().min(1).max(5),
  date: z.string(),
  source: z.string().optional(),
})

export type Review = z.infer<typeof reviewSchema>

// Get all reviews
export async function getAllReviews(): Promise<Review[]> {
  try {
    const reviews = await kv.get<Review[]>("reviews")
    return reviews || []
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return []
  }
}

// Add a new review
export async function addReview(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Parse and validate the form data
    const rawData = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      school: formData.get("school") as string,
      content: formData.get("content") as string,
      rating: Number(formData.get("rating")),
      date: formData.get("date") as string,
      source: formData.get("source") as string,
    }

    // Validate the data
    const validatedData = reviewSchema.parse(rawData)

    // Get existing reviews
    const existingReviews = await getAllReviews()

    // Generate a unique ID for the new review
    const newReview: Review = {
      ...validatedData,
      id: crypto.randomUUID(),
    }

    // Add the new review to the list
    const updatedReviews = [...existingReviews, newReview]

    // Save to KV
    await kv.set("reviews", updatedReviews)

    // Revalidate the reviews page
    revalidatePath("/reviews")

    return { success: true }
  } catch (error) {
    console.error("Error adding review:", error)
    return {
      success: false,
      error:
        error instanceof z.ZodError
          ? error.errors.map((e) => `${e.path}: ${e.message}`).join(", ")
          : "Failed to add review",
    }
  }
}

// Update an existing review
export async function updateReview(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string

    if (!id) {
      return { success: false, error: "Review ID is required" }
    }

    // Parse and validate the form data
    const rawData = {
      id,
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      school: formData.get("school") as string,
      content: formData.get("content") as string,
      rating: Number(formData.get("rating")),
      date: formData.get("date") as string,
      source: formData.get("source") as string,
    }

    // Validate the data
    const validatedData = reviewSchema.parse(rawData)

    // Get existing reviews
    const existingReviews = await getAllReviews()

    // Find the review to update
    const reviewIndex = existingReviews.findIndex((review) => review.id === id)

    if (reviewIndex === -1) {
      return { success: false, error: "Review not found" }
    }

    // Update the review
    const updatedReviews = [...existingReviews]
    updatedReviews[reviewIndex] = validatedData

    // Save to KV
    await kv.set("reviews", updatedReviews)

    // Revalidate the reviews page
    revalidatePath("/reviews")

    return { success: true }
  } catch (error) {
    console.error("Error updating review:", error)
    return {
      success: false,
      error:
        error instanceof z.ZodError
          ? error.errors.map((e) => `${e.path}: ${e.message}`).join(", ")
          : "Failed to update review",
    }
  }
}

// Delete a review
export async function deleteReview(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Get existing reviews
    const existingReviews = await getAllReviews()

    // Filter out the review to delete
    const updatedReviews = existingReviews.filter((review) => review.id !== id)

    // Save to KV
    await kv.set("reviews", updatedReviews)

    // Revalidate the reviews page
    revalidatePath("/reviews")

    return { success: true }
  } catch (error) {
    console.error("Error deleting review:", error)
    return { success: false, error: "Failed to delete review" }
  }
}

// Initialize reviews if they don't exist yet
export async function initializeReviews(defaultReviews: Review[]): Promise<void> {
  try {
    const existingReviews = await kv.get<Review[]>("reviews")

    if (!existingReviews) {
      // Add IDs to the default reviews if they don't have them
      const reviewsWithIds = defaultReviews.map((review) => ({
        ...review,
        id: review.id || crypto.randomUUID(),
      }))

      await kv.set("reviews", reviewsWithIds)
      console.log("Reviews initialized successfully")
    }
  } catch (error) {
    console.error("Error initializing reviews:", error)
  }
}
