"use client"

import { v4 as uuidv4 } from "uuid"

export function getUserId(): string {
  if (typeof window === "undefined") {
    return ""
  }

  // Try to get the user ID from localStorage
  let userId = localStorage.getItem("userId")

  // If no user ID exists, create one and store it
  if (!userId) {
    userId = uuidv4()
    localStorage.setItem("userId", userId)
  }

  return userId
}
