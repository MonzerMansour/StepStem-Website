"use client"

// Function to save stats to localStorage
export function saveStatsToLocalStorage(stats: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("homepageStats", JSON.stringify(stats))

    // Trigger a storage event to notify other tabs
    localStorage.setItem("stats_updated", Date.now().toString())
  }
}

// Function to get stats from localStorage
export function getStatsFromLocalStorage() {
  if (typeof window !== "undefined") {
    const stats = localStorage.getItem("homepageStats")
    return stats ? JSON.parse(stats) : null
  }
  return null
}
