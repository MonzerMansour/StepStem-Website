"use server"

import { kv } from "@vercel/kv"
import { put } from "@vercel/blob"
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

// Define the schema for people
const personSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  role: z.string().min(1),
  chapter: z.string().min(1),
  image: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().min(0),
})

export interface Person {
  id: string
  name: string
  role: string
  chapter: string
  image: string
  description?: string
  order: number
}

// Password for admin access
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "crazyshot92819"

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

// Upload image to Vercel Blob
export async function uploadImage(file: File) {
  try {
    // Generate a unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const filename = `people/${timestamp}-${randomString}.${fileExtension}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    return { success: true, url: blob.url }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { success: false, error: "Failed to upload image" }
  }
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

// People Management Functions

// Get all people from KV
export async function getAllPeople(): Promise<Person[]> {
  try {
    const people = await kv.get("people")
    return (people as Person[]) || []
  } catch (error) {
    console.error("Error fetching people:", error)
    return []
  }
}

// Initialize people with default data
export async function initializePeople(defaultPeople: Person[]) {
  try {
    const existingPeople = await kv.get("people")
    if (!existingPeople || (Array.isArray(existingPeople) && existingPeople.length === 0)) {
      await kv.set("people", defaultPeople)
      console.log("Initialized people with default data")
    }
  } catch (error) {
    console.error("Error initializing people:", error)
  }
}

// Add a new person
export async function addPerson(formData: FormData) {
  try {
    let imageUrl = formData.get("image") as string

    // Check if there's a file upload
    const imageFile = formData.get("imageFile") as File
    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadImage(imageFile)
      if (uploadResult.success) {
        imageUrl = uploadResult.url!
      } else {
        return { success: false, error: uploadResult.error }
      }
    }

    const rawData = {
      id: crypto.randomUUID(),
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      chapter: formData.get("chapter") as string,
      image: imageUrl,
      description: (formData.get("description") as string) || "",
      order: Number.parseInt(formData.get("order") as string, 10) || 0,
    }

    // Validate the data
    const validatedData = personSchema.parse(rawData)

    // Get existing people
    const existingPeople = await getAllPeople()

    // Add the new person
    const updatedPeople = [...existingPeople, validatedData]

    // Save to KV
    await kv.set("people", updatedPeople)

    return { success: true }
  } catch (error) {
    console.error("Error adding person:", error)
    return { success: false, error: "Failed to add person" }
  }
}

// Update an existing person
export async function updatePerson(formData: FormData) {
  try {
    const id = formData.get("id") as string
    let imageUrl = formData.get("image") as string

    // Check if there's a file upload
    const imageFile = formData.get("imageFile") as File
    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadImage(imageFile)
      if (uploadResult.success) {
        imageUrl = uploadResult.url!
      } else {
        return { success: false, error: uploadResult.error }
      }
    }

    const rawData = {
      id,
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      chapter: formData.get("chapter") as string,
      image: imageUrl,
      description: (formData.get("description") as string) || "",
      order: Number.parseInt(formData.get("order") as string, 10) || 0,
    }

    // Validate the data
    const validatedData = personSchema.parse(rawData)

    // Get existing people
    const existingPeople = await getAllPeople()

    // Update the person
    const updatedPeople = existingPeople.map((person) => (person.id === id ? validatedData : person))

    // Save to KV
    await kv.set("people", updatedPeople)

    return { success: true }
  } catch (error) {
    console.error("Error updating person:", error)
    return { success: false, error: "Failed to update person" }
  }
}

// Delete a person
export async function deletePerson(id: string) {
  try {
    // Get existing people
    const existingPeople = await getAllPeople()

    // Remove the person
    const updatedPeople = existingPeople.filter((person) => person.id !== id)

    // Save to KV
    await kv.set("people", updatedPeople)

    return { success: true }
  } catch (error) {
    console.error("Error deleting person:", error)
    return { success: false, error: "Failed to delete person" }
  }
}

// Reorder people
export async function reorderPeople(formData: FormData) {
  try {
    const peopleOrder = JSON.parse(formData.get("peopleOrder") as string)

    // Get existing people
    const existingPeople = await getAllPeople()

    // Update the order for each person
    const updatedPeople = existingPeople.map((person) => {
      const orderInfo = peopleOrder.find((p: any) => p.id === person.id)
      return orderInfo ? { ...person, order: orderInfo.order } : person
    })

    // Sort by order
    updatedPeople.sort((a, b) => a.order - b.order)

    // Save to KV
    await kv.set("people", updatedPeople)

    return { success: true }
  } catch (error) {
    console.error("Error reordering people:", error)
    return { success: false, error: "Failed to reorder people" }
  }
}
