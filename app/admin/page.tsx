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
import { Loader2, Save, LogOut, Plus, Pencil, Trash2, Star, ArrowUp, ArrowDown, X } from "lucide-react"
import {
  verifyAdminPassword,
  checkAdminAuth,
  logoutAdmin,
  getCaliforniaStats,
  updateCaliforniaStats,
  getHomepageStatsFromKV,
  updateHomepageStatsDirectly,
  getAllPeople,
  addPerson,
  updatePerson,
  deletePerson,
  initializePeople,
  reorderPeople,
  type Person,
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
import {
  getAllArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  initializeArticles,
} from "../actions/article-actions"
import type { Article } from "../types/article"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

// Default articles
const DEFAULT_ARTICLES: Article[] = [
  {
    id: "singapore-oil-spill",
    title: "Unraveling the Singapore Oil Spill Disaster",
    slug: "singapore-oil-spill",
    image: "/images/oil-spill-cleanup.webp",
    date: "Jul 16, 2024",
    readTime: "3 min read",
    views: 15,
    comments: 0,
    excerpt: "An in-depth look at the recent oil spill in Singapore and its environmental impact on marine ecosystems.",
    author: "stepSTEM24",
    content:
      "StepSTEM not only teaches students about the nature of oil spills and the STEM prospects available, but also emphasizes that this environmental problem remains relevant in the present day...",
  },
  {
    id: "elementary-stem",
    title: "Engaging Elementary Schoolers in STEM: StepSTEM Educational Program",
    slug: "elementary-stem",
    image: "/images/oil-bird.jpeg",
    date: "Apr 1, 2024",
    readTime: "2 min read",
    views: 7,
    comments: 0,
    excerpt: "How our program is making STEM education accessible and engaging for elementary school students.",
    author: "stepSTEM24",
    content:
      "Are you looking for an exciting and interactive way to introduce your elementary school students to STEM topics?...",
  },
]

// Default people
const DEFAULT_PEOPLE: Person[] = [
  {
    id: "1",
    name: "Rohit Pandravada",
    role: "Co-Founder & CEO",
    chapter: "California",
    image: "/images/rohit.png",
    description: "Passionate about STEM education and environmental awareness.",
    order: 1,
  },
  {
    id: "2",
    name: "Akhil Ranjeet",
    role: "Co-Founder & CTO",
    chapter: "California",
    image: "/images/akhil.png",
    description: "Technology enthusiast focused on educational innovation.",
    order: 2,
  },
  {
    id: "3",
    name: "Prutha Patel",
    role: "Director of Operations",
    chapter: "California",
    image: "/images/prutha.png",
    description: "Experienced in program management and educational outreach.",
    order: 3,
  },
  {
    id: "4",
    name: "Rowah Abdelghani",
    role: "Chapter Lead",
    chapter: "Calgary",
    image: "/images/rowah-abdelghani.jpeg",
    description: "Leading STEM initiatives in Calgary.",
    order: 1,
  },
  {
    id: "5",
    name: "Sawinder Kaur",
    role: "Education Coordinator",
    chapter: "Calgary",
    image: "/images/sawinder-kaur.jpeg",
    description: "Coordinating educational programs in Calgary.",
    order: 2,
  },
  {
    id: "6",
    name: "Hansika Vegesna",
    role: "Chapter Lead",
    chapter: "Ellicott City",
    image: "/images/hansika-vegesna.jpeg",
    description: "Leading STEM education in Ellicott City.",
    order: 1,
  },
  {
    id: "7",
    name: "Lexi Strachan",
    role: "Program Manager",
    chapter: "Ellicott City",
    image: "/images/lexi-strachan.jpeg",
    description: "Managing educational programs in Ellicott City.",
    order: 2,
  },
  {
    id: "8",
    name: "Deeksha Bagga",
    role: "Outreach Coordinator",
    chapter: "Ellicott City",
    image: "/images/deeksha-bagga.jpeg",
    description: "Coordinating community outreach efforts.",
    order: 3,
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
  const [articles, setArticles] = useState<Article[]>([])
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false)
  const [isDeleteArticleDialogOpen, setIsDeleteArticleDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null)
  const [people, setPeople] = useState<Person[]>([])
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
  const [isPersonDialogOpen, setIsPersonDialogOpen] = useState(false)
  const [isDeletePersonDialogOpen, setIsDeletePersonDialogOpen] = useState(false)
  const [personToDelete, setPersonToDelete] = useState<string | null>(null)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
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
          await loadArticles()
          await loadPeople()
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

  // Load all articles
  const loadArticles = async () => {
    try {
      // Initialize articles with default data if they don't exist
      await initializeArticles(DEFAULT_ARTICLES)

      // Load articles
      const allArticles = await getAllArticles()
      setArticles(allArticles)
    } catch (error) {
      console.error("Error loading articles:", error)
    }
  }

  // Load all people
  const loadPeople = async () => {
    try {
      // Initialize people with default data if they don't exist
      await initializePeople(DEFAULT_PEOPLE)

      // Load people
      const allPeople = await getAllPeople()
      setPeople(allPeople.sort((a, b) => a.order - b.order))
    } catch (error) {
      console.error("Error loading people:", error)
    }
  }

  // Handle image file selection
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Clear selected image
  const clearSelectedImage = () => {
    setSelectedImageFile(null)
    setImagePreview(null)
    // Clear the file input
    const fileInput = document.getElementById("imageFile") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
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
        await loadArticles()
        await loadPeople()
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

  // Handle article form submission (add or update)
  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setError("")

    try {
      const formData = new FormData(e.target as HTMLFormElement)

      // Determine if this is an add or update operation
      const isUpdate = !!formData.get("id")

      // Call the appropriate server action
      const result = isUpdate ? await updateArticle(formData) : await addArticle(formData)

      if (result.success) {
        setSuccessMessage(`Article ${isUpdate ? "updated" : "added"} successfully!`)
        setIsArticleDialogOpen(false)
        // Refresh articles
        await loadArticles()
      } else {
        setError(result.error || `Failed to ${isUpdate ? "update" : "add"} article`)
      }
    } catch (err) {
      setError("An error occurred while submitting the article")
      console.error(err)
    }
  }

  // Handle article deletion
  const handleDeleteArticle = async () => {
    if (!articleToDelete) return

    try {
      const result = await deleteArticle(articleToDelete)

      if (result.success) {
        setSuccessMessage("Article deleted successfully!")
        setIsDeleteArticleDialogOpen(false)
        setArticleToDelete(null)
        // Refresh articles
        await loadArticles()
      } else {
        setError(result.error || "Failed to delete article")
      }
    } catch (err) {
      setError("An error occurred while deleting the article")
      console.error(err)
    }
  }

  // Open the article dialog for adding a new article
  const handleAddArticle = () => {
    setCurrentArticle(null)
    setIsArticleDialogOpen(true)
  }

  // Open the article dialog for editing an existing article
  const handleEditArticle = (article: Article) => {
    setCurrentArticle(article)
    setIsArticleDialogOpen(true)
  }

  // Open the delete confirmation dialog for articles
  const handleDeleteArticleConfirmation = (id: string) => {
    setArticleToDelete(id)
    setIsDeleteArticleDialogOpen(true)
  }

  // Handle person form submission (add or update)
  const handlePersonSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setError("")
    setIsUploading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)

      // Add the selected image file if there is one
      if (selectedImageFile) {
        formData.append("imageFile", selectedImageFile)
      }

      // Determine if this is an add or update operation
      const isUpdate = !!formData.get("id")

      // Call the appropriate server action
      const result = isUpdate ? await updatePerson(formData) : await addPerson(formData)

      if (result.success) {
        setSuccessMessage(`Person ${isUpdate ? "updated" : "added"} successfully!`)
        setIsPersonDialogOpen(false)
        // Clear image selection
        clearSelectedImage()
        // Refresh people
        await loadPeople()
      } else {
        setError(result.error || `Failed to ${isUpdate ? "update" : "add"} person`)
      }
    } catch (err) {
      setError("An error occurred while submitting the person")
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  // Handle person deletion
  const handleDeletePerson = async () => {
    if (!personToDelete) return

    try {
      const result = await deletePerson(personToDelete)

      if (result.success) {
        setSuccessMessage("Person deleted successfully!")
        setIsDeletePersonDialogOpen(false)
        setPersonToDelete(null)
        // Refresh people
        await loadPeople()
      } else {
        setError(result.error || "Failed to delete person")
      }
    } catch (err) {
      setError("An error occurred while deleting the person")
      console.error(err)
    }
  }

  // Open the person dialog for adding a new person
  const handleAddPerson = () => {
    setCurrentPerson(null)
    clearSelectedImage()
    setIsPersonDialogOpen(true)
  }

  // Open the person dialog for editing an existing person
  const handleEditPerson = (person: Person) => {
    setCurrentPerson(person)
    clearSelectedImage()
    setIsPersonDialogOpen(true)
  }

  // Open the delete confirmation dialog for people
  const handleDeletePersonConfirmation = (id: string) => {
    setPersonToDelete(id)
    setIsDeletePersonDialogOpen(true)
  }

  // Handle person reordering
  const handleReorderPerson = async (personId: string, direction: "up" | "down") => {
    const currentPeople = [...people]
    const personIndex = currentPeople.findIndex((p) => p.id === personId)

    if (personIndex === -1) return

    const newIndex = direction === "up" ? personIndex - 1 : personIndex + 1

    if (newIndex < 0 || newIndex >= currentPeople.length) return

    // Swap the people
    const temp = currentPeople[personIndex]
    currentPeople[personIndex] = currentPeople[newIndex]
    currentPeople[newIndex] = temp

    // Update order values
    currentPeople.forEach((person, index) => {
      person.order = index + 1
    })

    // Update state immediately for UI responsiveness
    setPeople(currentPeople)

    try {
      // Prepare the order data
      const peopleOrder = currentPeople.map((person, index) => ({
        id: person.id,
        order: index + 1,
      }))

      const formData = new FormData()
      formData.append("peopleOrder", JSON.stringify(peopleOrder))

      const result = await reorderPeople(formData)

      if (result.success) {
        setSuccessMessage("People reordered successfully!")
      } else {
        setError(result.error || "Failed to reorder people")
        // Reload people on error
        await loadPeople()
      }
    } catch (err) {
      setError("An error occurred while reordering people")
      console.error(err)
      // Reload people on error
      await loadPeople()
    }
  }

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
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
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
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
            <TabsTrigger value="news">News Articles</TabsTrigger>
            <TabsTrigger value="people">People Management</TabsTrigger>
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

          <TabsContent value="news">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>News Articles Management</CardTitle>
                  <CardDescription>Add, edit, or delete news articles that appear on the news page.</CardDescription>
                </div>
                <Button onClick={handleAddArticle} className="bg-cyan-500 hover:bg-cyan-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Article
                </Button>
              </CardHeader>
              <CardContent>
                {articles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No articles found. Click "Add Article" to create your first article.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <Card key={article.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold">{article.title}</h3>
                              <p className="text-sm text-gray-500">
                                By {article.author} • {article.date} • {article.readTime}
                              </p>
                              <p className="text-sm text-gray-500">
                                Slug: /{article.slug} • Views: {article.views} • Comments: {article.comments}
                              </p>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditArticle(article)}
                                className="flex items-center"
                              >
                                <Pencil className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteArticleConfirmation(article.id!)}
                                className="flex items-center text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2 mb-2">{article.excerpt}</p>
                          {article.image && (
                            <div className="relative h-32 w-48 rounded overflow-hidden">
                              <img
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="people">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">People Management</h2>
                  <p className="text-gray-600">Add, edit, delete, and reorder team members for each chapter.</p>
                </div>
                <Button onClick={handleAddPerson} className="bg-cyan-500 hover:bg-cyan-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Person
                </Button>
              </div>

              <Tabs defaultValue="california" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="california">California</TabsTrigger>
                  <TabsTrigger value="calgary">Calgary</TabsTrigger>
                  <TabsTrigger value="ellicott-city">Ellicott City</TabsTrigger>
                </TabsList>

                <TabsContent value="california" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>California Chapter Team</CardTitle>
                      <CardDescription>Manage team members for the California chapter.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {people.filter((person) => person.chapter === "California").length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          No people found for California chapter. Click "Add Person" to create your first team member.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {people
                            .filter((person) => person.chapter === "California")
                            .sort((a, b) => a.order - b.order)
                            .map((person, index, filteredArray) => (
                              <Card key={person.id} className="overflow-hidden">
                                <CardContent className="p-6">
                                  <div className="flex items-start gap-4">
                                    <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                                      <img
                                        src={person.image || "/placeholder.svg"}
                                        alt={person.name}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <h3 className="text-lg font-bold">{person.name}</h3>
                                          <p className="text-sm text-gray-500">
                                            {person.role} • {person.chapter} Chapter
                                          </p>
                                          <p className="text-sm text-gray-400">Order: {person.order}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <div className="flex flex-col space-y-1">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleReorderPerson(person.id, "up")}
                                              disabled={index === 0}
                                              className="h-8 w-8 p-0"
                                            >
                                              <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleReorderPerson(person.id, "down")}
                                              disabled={index === filteredArray.length - 1}
                                              className="h-8 w-8 p-0"
                                            >
                                              <ArrowDown className="h-4 w-4" />
                                            </Button>
                                          </div>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEditPerson(person)}
                                            className="flex items-center"
                                          >
                                            <Pencil className="h-4 w-4 mr-1" /> Edit
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeletePersonConfirmation(person.id)}
                                            className="flex items-center text-red-500 hover:text-red-700"
                                          >
                                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                                          </Button>
                                        </div>
                                      </div>
                                      {person.description && (
                                        <p className="text-gray-700 text-sm line-clamp-2">{person.description}</p>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calgary" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calgary Chapter Team</CardTitle>
                      <CardDescription>Manage team members for the Calgary chapter.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {people.filter((person) => person.chapter === "Calgary").length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          No people found for Calgary chapter. Click "Add Person" to create your first team member.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {people
                            .filter((person) => person.chapter === "Calgary")
                            .sort((a, b) => a.order - b.order)
                            .map((person, index, filteredArray) => (
                              <Card key={person.id} className="overflow-hidden">
                                <CardContent className="p-6">
                                  <div className="flex items-start gap-4">
                                    <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                                      <img
                                        src={person.image || "/placeholder.svg"}
                                        alt={person.name}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <h3 className="text-lg font-bold">{person.name}</h3>
                                          <p className="text-sm text-gray-500">
                                            {person.role} • {person.chapter} Chapter
                                          </p>
                                          <p className="text-sm text-gray-400">Order: {person.order}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <div className="flex flex-col space-y-1">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleReorderPerson(person.id, "up")}
                                              disabled={index === 0}
                                              className="h-8 w-8 p-0"
                                            >
                                              <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleReorderPerson(person.id, "down")}
                                              disabled={index === filteredArray.length - 1}
                                              className="h-8 w-8 p-0"
                                            >
                                              <ArrowDown className="h-4 w-4" />
                                            </Button>
                                          </div>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEditPerson(person)}
                                            className="flex items-center"
                                          >
                                            <Pencil className="h-4 w-4 mr-1" /> Edit
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeletePersonConfirmation(person.id)}
                                            className="flex items-center text-red-500 hover:text-red-700"
                                          >
                                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                                          </Button>
                                        </div>
                                      </div>
                                      {person.description && (
                                        <p className="text-gray-700 text-sm line-clamp-2">{person.description}</p>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ellicott-city" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ellicott City Chapter Team</CardTitle>
                      <CardDescription>Manage team members for the Ellicott City chapter.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {people.filter((person) => person.chapter === "Ellicott City").length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          No people found for Ellicott City chapter. Click "Add Person" to create your first team
                          member.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {people
                            .filter((person) => person.chapter === "Ellicott City")
                            .sort((a, b) => a.order - b.order)
                            .map((person, index, filteredArray) => (
                              <Card key={person.id} className="overflow-hidden">
                                <CardContent className="p-6">
                                  <div className="flex items-start gap-4">
                                    <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                                      <img
                                        src={person.image || "/placeholder.svg"}
                                        alt={person.name}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <h3 className="text-lg font-bold">{person.name}</h3>
                                          <p className="text-sm text-gray-500">
                                            {person.role} • {person.chapter} Chapter
                                          </p>
                                          <p className="text-sm text-gray-400">Order: {person.order}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <div className="flex flex-col space-y-1">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleReorderPerson(person.id, "up")}
                                              disabled={index === 0}
                                              className="h-8 w-8 p-0"
                                            >
                                              <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleReorderPerson(person.id, "down")}
                                              disabled={index === filteredArray.length - 1}
                                              className="h-8 w-8 p-0"
                                            >
                                              <ArrowDown className="h-4 w-4" />
                                            </Button>
                                          </div>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEditPerson(person)}
                                            className="flex items-center"
                                          >
                                            <Pencil className="h-4 w-4 mr-1" /> Edit
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeletePersonConfirmation(person.id)}
                                            className="flex items-center text-red-500 hover:text-red-700"
                                          >
                                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                                          </Button>
                                        </div>
                                      </div>
                                      {person.description && (
                                        <p className="text-gray-700 text-sm line-clamp-2">{person.description}</p>
                                      )}
                                    </div>
                                  </div>
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

      {/* Article Form Dialog */}
      <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentArticle ? "Edit Article" : "Add New Article"}</DialogTitle>
          </DialogHeader>
          <form id="article-form" onSubmit={handleArticleSubmit}>
            {currentArticle && <input type="hidden" name="id" value={currentArticle.id} />}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={currentArticle?.title || ""}
                    required
                    onChange={(e) => {
                      const slugInput = document.getElementById("slug") as HTMLInputElement
                      if (slugInput && !currentArticle) {
                        slugInput.value = generateSlug(e.target.value)
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="slug" className="text-sm font-medium">
                    Slug *
                  </label>
                  <Input id="slug" name="slug" defaultValue={currentArticle?.slug || ""} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="author" className="text-sm font-medium">
                    Author *
                  </label>
                  <Input id="author" name="author" defaultValue={currentArticle?.author || "stepSTEM24"} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="readTime" className="text-sm font-medium">
                    Read Time *
                  </label>
                  <Input
                    id="readTime"
                    name="readTime"
                    defaultValue={currentArticle?.readTime || "3 min read"}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date *
                  </label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={
                      currentArticle?.date
                        ? formatDateForInput(currentArticle.date)
                        : formatDateForInput(new Date().toISOString())
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="views" className="text-sm font-medium">
                    Views
                  </label>
                  <Input id="views" name="views" type="number" min="0" defaultValue={currentArticle?.views || 0} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="comments" className="text-sm font-medium">
                    Comments
                  </label>
                  <Input
                    id="comments"
                    name="comments"
                    type="number"
                    min="0"
                    defaultValue={currentArticle?.comments || 0}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Cover Image URL or Path *
                </label>
                <Input id="image" name="image" type="text" defaultValue={currentArticle?.image || ""} required />
                <p className="text-xs text-gray-500">
                  Enter a full URL (https://example.com/image.jpg) or a relative path (/images/image.jpg)
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="excerpt" className="text-sm font-medium">
                  Excerpt *
                </label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  rows={3}
                  key={`excerpt-${currentArticle?.id || "new"}`}
                  defaultValue={currentArticle?.excerpt || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content *
                </label>
                <Textarea
                  id="content"
                  name="content"
                  rows={10}
                  key={currentArticle?.id || "new"}
                  defaultValue={currentArticle?.content || ""}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsArticleDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                {currentArticle ? "Update Article" : "Add Article"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Article Confirmation Dialog */}
      <Dialog open={isDeleteArticleDialogOpen} onOpenChange={setIsDeleteArticleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this article? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteArticleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteArticle}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Person Form Dialog */}
      <Dialog open={isPersonDialogOpen} onOpenChange={setIsPersonDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentPerson ? "Edit Person" : "Add New Person"}</DialogTitle>
          </DialogHeader>
          <form id="person-form" onSubmit={handlePersonSubmit}>
            {currentPerson && <input type="hidden" name="id" value={currentPerson.id} />}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="personName" className="text-sm font-medium">
                    Name *
                  </label>
                  <Input id="personName" name="name" defaultValue={currentPerson?.name || ""} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="personRole" className="text-sm font-medium">
                    Role *
                  </label>
                  <Input id="personRole" name="role" defaultValue={currentPerson?.role || ""} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="personChapter" className="text-sm font-medium">
                    Chapter *
                  </label>
                  <Select name="chapter" defaultValue={currentPerson?.chapter || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="California">California</SelectItem>
                      <SelectItem value="Calgary">Calgary</SelectItem>
                      <SelectItem value="Ellicott City">Ellicott City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="personOrder" className="text-sm font-medium">
                    Order *
                  </label>
                  <Input
                    id="personOrder"
                    name="order"
                    type="number"
                    min="1"
                    defaultValue={currentPerson?.order || 1}
                    required
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Profile Image *</label>

                {/* File Upload */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileSelect}
                      className="flex-1"
                    />
                    {selectedImageFile && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={clearSelectedImage}
                        className="flex items-center gap-1 bg-transparent"
                      >
                        <X className="h-4 w-4" />
                        Clear
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Upload an image file (JPG, PNG, etc.) or use the URL field below
                  </p>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="flex justify-center">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}

                {/* URL Input (fallback) */}
                <div className="space-y-2">
                  <label htmlFor="personImage" className="text-sm font-medium">
                    Or enter Image URL/Path
                  </label>
                  <Input
                    id="personImage"
                    name="image"
                    defaultValue={currentPerson?.image || ""}
                    placeholder="https://example.com/image.jpg or /images/image.jpg"
                  />
                  <p className="text-xs text-gray-500">Leave empty if uploading a file above</p>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="personDescription" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="personDescription"
                  name="description"
                  rows={3}
                  defaultValue={currentPerson?.description || ""}
                  placeholder="Brief description about this person..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsPersonDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {currentPerson ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{currentPerson ? "Update Person" : "Add Person"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Person Confirmation Dialog */}
      <Dialog open={isDeletePersonDialogOpen} onOpenChange={setIsDeletePersonDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this person? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeletePersonDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeletePerson}
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
