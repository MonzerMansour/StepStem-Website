"use server"

import { kv } from "@vercel/kv"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

// Define the schema for our stats
const statsSchema = z.object({
  schoolsVisited: z.number().int().min(0),
  classesTaught: z.number().int().min(0),
  studentsInspired: z.number().int().min(0),
})

const chapterStatsSchema = z.object({
  schoolsVisited: z.number().int().min(0),
  classesTaught: z.number().int().min(0),
  studentsInspired: z.number().int().min(0),
})

// Password for admin access
const ADMIN_PASSWORD = "crazyshot92819"

// Session duration in seconds (24 hours)
const SESSION_DURATION = 24 * 60 * 60

// Verify admin password
export async function verifyAdminPassword(formData: FormData) {
  const password = formData.get("password") as string

  if (password === ADMIN_PASSWORD) {
    // Set a secure cookie for the admin session
    const sessionId = crypto.randomUUID()
    cookies().set("admin_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_DURATION,
      path: "/",
    })

    // Store the session in KV with expiration
    await kv.set(`admin_session:${sessionId}`, true, { ex: SESSION_DURATION })

    return { success: true }
  }

  return { success: false, error: "Invalid password" }
}

// Check if user is authenticated
export async function checkAdminAuth() {
  const sessionId = cookies().get("admin_session")?.value

  if (!sessionId) {
    return false
  }

  const isValid = await kv.get(`admin_session:${sessionId}`)
  return !!isValid
}

// Logout admin
export async function logoutAdmin() {
  const sessionId = cookies().get("admin_session")?.value

  if (sessionId) {
    // Delete the session from KV
    await kv.del(`admin_session:${sessionId}`)
    // Clear the cookie
    cookies().delete("admin_session")
  }

  redirect("/admin")
}

// Get homepage stats from KV
export async function getHomepageStatsFromKV() {
  try {
    // IMPORTANT: Don't add query parameters to the key - just use the plain key
    const stats = await kv.get("homepage_stats")
    console.log("Retrieved homepage stats from KV:", stats)

    // If no stats are found, return default values
    if (!stats) {
      console.log("No homepage stats found, returning defaults")
      return {
        schoolsVisited: 8,
        classesTaught: 20,
        studentsInspired: 500,
      }
    }

    return stats
  } catch (error) {
    console.error("Error fetching homepage stats:", error)
    return {
      schoolsVisited: 8,
      classesTaught: 20,
      studentsInspired: 500,
    }
  }
}

// Update homepage stats directly with server action
export async function updateHomepageStatsDirectly(formData: FormData) {
  try {
    const rawData = {
      schoolsVisited: Number.parseInt(formData.get("schoolsVisited") as string, 10),
      classesTaught: Number.parseInt(formData.get("classesTaught") as string, 10),
      studentsInspired: Number.parseInt(formData.get("studentsInspired") as string, 10),
    }

    // Validate the data
    const validatedData = statsSchema.parse(rawData)

    console.log("Updating homepage stats with:", validatedData)

    // Save to KV
    await kv.set("homepage_stats", validatedData)

    // Verify the data was saved correctly
    const savedData = await kv.get("homepage_stats")
    console.log("Saved homepage stats:", savedData)

    return { success: true, stats: validatedData }
  } catch (error) {
    console.error("Error updating homepage stats:", error)
    return { success: false, error: "Failed to update stats" }
  }
}

// Get California chapter stats
export async function getCaliforniaStats() {
  try {
    const stats = await kv.get("california_stats")
    return (
      stats || {
        schoolsVisited: 8,
        classesTaught: 20,
        studentsInspired: 500,
      }
    )
  } catch (error) {
    console.error("Error fetching California stats:", error)
    return {
      schoolsVisited: 8,
      classesTaught: 20,
      studentsInspired: 500,
    }
  }
}

// Update California chapter stats
export async function updateCaliforniaStats(formData: FormData) {
  try {
    const rawData = {
      schoolsVisited: Number.parseInt(formData.get("caSchoolsVisited") as string, 10),
      classesTaught: Number.parseInt(formData.get("caClassesTaught") as string, 10),
      studentsInspired: Number.parseInt(formData.get("caStudentsInspired") as string, 10),
    }

    // Validate the data
    const validatedData = chapterStatsSchema.parse(rawData)

    // Save to KV
    await kv.set("california_stats", validatedData)

    return { success: true }
  } catch (error) {
    console.error("Error updating California stats:", error)
    return { success: false, error: "Failed to update stats" }
  }
}
