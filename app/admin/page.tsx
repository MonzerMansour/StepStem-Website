"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, LogOut, Plus, Pencil, Trash2, Star } from "lucide-react"
import {
  verifyAdminPassword,
  checkAdminAuth,
  logoutAdmin,
  getCaliforniaStats,
  updateCaliforniaStats,
  getHomepageStatsFromKV,
  updateHomepageStatsDirectly,
} from "../actions/admin-actions"
import {
  getAllReviews,
  addReview,
  updateReview,
  deleteReview,
  initializeReviews,
  type Review,
} from "../actions/review-actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Default stats
const DEFAULT_STATS = {
  schoolsVisited: 8,
  classesTaught: 20,
  studentsInspired: 500,
}

// Default reviews
const DEFAULT_REVIEWS = [
  {
    id: "1",
    name: "Principal Leanna Goldenberg",
    role: "Principal",
    school: "Montague Elementary School",
    content:
      "Rohit Pandravada and Akhil Ranjeet, as part of their FTC (First Tech Challenge) STEM program, have embarked on a mission to inspire and educate our 2nd graders with innovative science lessons. These young visionaries brainstormed a variety of engaging science innovation lessons, and our 2nd-grade teacher team enthusiastically selected the STEM Oil Clean-Up Challenge as their project. Rohit and Akhil meticulously planned and flawlessly executed an interactive and captivating lesson for our second graders. Their collaboration with our teachers, combined with their exemplary class management skills, resulted in an enriching learning experience for our students.",
    rating: 5,
    date: "August 25, 2023",
  },
  {
    id: "2",
    name: "Montague Weekly Newsletter",
    school: "Montague Elementary School",
    content:
      "This lesson focused on bringing awareness to the real life issue of oil spill pollution and the difficulties scientist and engineers face when trying to clean oil out of our waterways and oceans. The second graders were engaged and excited to be learning along with kids just like them! We are very proud of these student leaders and look forward to promoting their program. Thank you Akhil and Rohit for all the work that went into planning and implementing such an engaging lesson for our students!",
    rating: 5,
    date: "August 25, 2023",
    source: "Montague Weekly Newsletter",
  },
]

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
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentReview, setCurrentReview] = useState<Review | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null)
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
          await loadReviews()
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

  // Load all reviews
  const loadReviews = async () => {
    try {
      // Initialize reviews with default data if they don't exist
      await initializeReviews(DEFAULT_REVIEWS)

      // Load reviews
      const allReviews = await getAllReviews()
      setReviews(allReviews)
    } catch (error) {
      console.error("Error loading reviews:", error)
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
        await loadReviews()
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

  // Handle review form submission (add or update)
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setError("")

    try {
      const formData = new FormData(e.target as HTMLFormElement)

      // Determine if this is an add or update operation
      const isUpdate = !!formData.get("id")

      // Call the appropriate server action
      const result = isUpdate ? await updateReview(formData) : await addReview(formData)

      if (result.success) {
        setSuccessMessage(`Review ${isUpdate ? "updated" : "added"} successfully!`)
        setIsReviewDialogOpen(false)
        // Refresh reviews
        await loadReviews()
      } else {
        setError(result.error || `Failed to ${isUpdate ? "update" : "add"} review`)
      }
    } catch (err) {
      setError("An error occurred while submitting the review")
      console.error(err)
    }
  }

  // Handle review deletion
  const handleDeleteReview = async () => {
    if (!reviewToDelete) return

    try {
      const result = await deleteReview(reviewToDelete)

      if (result.success) {
        setSuccessMessage("Review deleted successfully!")
        setIsDeleteDialogOpen(false)
        setReviewToDelete(null)
        // Refresh reviews
        await loadReviews()
      } else {
        setError(result.error || "Failed to delete review")
      }
    } catch (err) {
      setError("An error occurred while deleting the review")
      console.error(err)
    }
  }

  // Open the review dialog for adding a new review
  const handleAddReview = () => {
    setCurrentReview(null)
    setIsReviewDialogOpen(true)
  }

  // Open the review dialog for editing an existing review
  const handleEditReview = (review: Review) => {
    setCurrentReview(review)
    setIsReviewDialogOpen(true)
  }

  // Open the delete confirmation dialog
  const handleDeleteConfirmation = (id: string) => {
    setReviewToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  // Format date for input field
  const formatDateForInput = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toISOString().split("T")[0]
    } catch (e) {
      return new Date().toISOString().split("T")[0]
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
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
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

          <TabsContent value="reviews">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Reviews Management</CardTitle>
                  <CardDescription>Add, edit, or delete reviews that appear on the reviews page.</CardDescription>
                </div>
                <Button onClick={handleAddReview} className="bg-cyan-500 hover:bg-cyan-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Review
                </Button>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No reviews found. Click "Add Review" to create your first review.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-bold">{review.name}</h3>
                              <p className="text-sm text-gray-500">
                                {review.role && `${review.role} at `}
                                {review.school}
                                {review.source && ` • Source: ${review.source}`}
                              </p>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditReview(review)}
                                className="flex items-center"
                              >
                                <Pencil className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteConfirmation(review.id!)}
                                className="flex items-center text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-3">{review.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Form Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentReview ? "Edit Review" : "Add New Review"}</DialogTitle>
          </DialogHeader>
          <form id="review-form" onSubmit={handleReviewSubmit}>
            {currentReview && <input type="hidden" name="id" value={currentReview.id} />}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name *
                  </label>
                  <Input id="name" name="name" defaultValue={currentReview?.name || ""} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Input id="role" name="role" defaultValue={currentReview?.role || ""} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="school" className="text-sm font-medium">
                  School *
                </label>
                <Input id="school" name="school" defaultValue={currentReview?.school || ""} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="rating" className="text-sm font-medium">
                    Rating (1-5) *
                  </label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    defaultValue={currentReview?.rating || 5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date *
                  </label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={
                      currentReview?.date
                        ? formatDateForInput(currentReview.date)
                        : formatDateForInput(new Date().toISOString())
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="source" className="text-sm font-medium">
                  Source (optional)
                </label>
                <Input id="source" name="source" defaultValue={currentReview?.source || ""} />
              </div>
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content *
                </label>
                <Textarea id="content" name="content" rows={6} defaultValue={currentReview?.content || ""} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                {currentReview ? "Update Review" : "Add Review"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this review? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteReview}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
