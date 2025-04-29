"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, LogOut } from "lucide-react"
import {
  verifyAdminPassword,
  checkAdminAuth,
  logoutAdmin,
  getCaliforniaStats,
  updateCaliforniaStats,
  getHomepageStatsFromKV,
  updateHomepageStatsDirectly,
} from "../actions/admin-actions"

// Default stats
const DEFAULT_STATS = {
  schoolsVisited: 8,
  classesTaught: 20,
  studentsInspired: 500,
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [homepageStats, setHomepageStats] = useState(DEFAULT_STATS)
  const [californiaStats, setCaliforniaStats] = useState({
    schoolsVisited: 0,
    classesTaught: 0,
    studentsInspired: 0,
  })
  const router = useRouter()

  // Check if user is authenticated
  useEffect(() => {
    async function checkAuth() {
      try {
        const isAuth = await checkAdminAuth()
        setIsAuthenticated(isAuth)

        if (isAuth) {
          // Load stats if authenticated
          await loadStats()
        }
      } catch (err) {
        console.error("Auth check error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Load all stats
  const loadStats = async () => {
    try {
      // Load homepage stats using the server action
      const homeStats = await getHomepageStatsFromKV()
      console.log("Admin: Fetched homepage stats from server action:", homeStats)
      setHomepageStats(homeStats)

      // Load California stats
      const caStats = await getCaliforniaStats()
      setCaliforniaStats(caStats as any)
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const formData = new FormData()
      formData.append("password", password)

      const result = await verifyAdminPassword(formData)

      if (result.success) {
        setIsAuthenticated(true)
        await loadStats()
      } else {
        setError("Invalid password. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    await logoutAdmin()
    setIsAuthenticated(false)
  }

  // Handle homepage stats update
  const handleHomepageStatsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setError("")

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)

      // Use the server action directly instead of the API route
      const result = await updateHomepageStatsDirectly(formData)

      if (result.success) {
        setSuccessMessage("Homepage stats updated successfully!")
        setHomepageStats(result.stats)

        // Broadcast a message to other tabs that stats have been updated
        if (typeof window !== "undefined") {
          // Use a timestamp to ensure the event is always unique
          localStorage.setItem("stats_updated", Date.now().toString())
        }
      } else {
        setError(result.error || "Failed to update stats")
      }
    } catch (err) {
      setError("An error occurred while updating stats")
      console.error(err)
    }
  }

  // Handle California stats update
  const handleCaliforniaStatsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setError("")

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const result = await updateCaliforniaStats(formData)

      if (result.success) {
        setSuccessMessage("California chapter stats updated successfully!")
        // Refresh stats
        const caStats = await getCaliforniaStats()
        setCaliforniaStats(caStats as any)
      } else {
        setError(result.error || "Failed to update stats")
      }
    } catch (err) {
      setError("An error occurred while updating stats")
      console.error(err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">StepSTEM Admin</CardTitle>
            <CardDescription>Enter your password to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">StepSTEM Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {successMessage && (
          <Alert className="mb-6 bg-green-50 text-green-800">
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="homepage">
          <TabsList className="mb-6">
            <TabsTrigger value="homepage">Homepage Stats</TabsTrigger>
            <TabsTrigger value="california">California Chapter Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="homepage">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Statistics</CardTitle>
                <CardDescription>
                  Update the statistics displayed on the homepage. These numbers appear in the stats section below the
                  hero.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form id="homepage-form" onSubmit={handleHomepageStatsUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label htmlFor="schoolsVisited" className="text-sm font-medium">
                        Schools Visited
                      </label>
                      <Input
                        id="schoolsVisited"
                        name="schoolsVisited"
                        type="number"
                        min="0"
                        defaultValue={homepageStats.schoolsVisited}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="classesTaught" className="text-sm font-medium">
                        Classes Taught
                      </label>
                      <Input
                        id="classesTaught"
                        name="classesTaught"
                        type="number"
                        min="0"
                        defaultValue={homepageStats.classesTaught}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="studentsInspired" className="text-sm font-medium">
                        Students Inspired
                      </label>
                      <Input
                        id="studentsInspired"
                        name="studentsInspired"
                        type="number"
                        min="0"
                        defaultValue={homepageStats.studentsInspired}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" form="homepage-form" className="bg-cyan-500 hover:bg-cyan-600">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="california">
            <Card>
              <CardHeader>
                <CardTitle>California Chapter Statistics</CardTitle>
                <CardDescription>
                  Update the statistics displayed on the California chapter page. These numbers appear in the impact
                  section.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form id="california-form" onSubmit={handleCaliforniaStatsUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label htmlFor="caSchoolsVisited" className="text-sm font-medium">
                        Schools Visited
                      </label>
                      <Input
                        id="caSchoolsVisited"
                        name="caSchoolsVisited"
                        type="number"
                        min="0"
                        defaultValue={californiaStats.schoolsVisited}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="caClassesTaught" className="text-sm font-medium">
                        Classes Taught
                      </label>
                      <Input
                        id="caClassesTaught"
                        name="caClassesTaught"
                        type="number"
                        min="0"
                        defaultValue={californiaStats.classesTaught}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="caStudentsInspired" className="text-sm font-medium">
                        Students Inspired
                      </label>
                      <Input
                        id="caStudentsInspired"
                        name="caStudentsInspired"
                        type="number"
                        min="0"
                        defaultValue={californiaStats.studentsInspired}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" form="california-form" className="bg-cyan-500 hover:bg-cyan-600">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
