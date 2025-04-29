"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { updateStats, resetStats } from "../actions/admin-actions"
import { addReview, updateReview, deleteReview, getAllReviews } from "../actions/review-actions"
import type { Review } from "../types/review"
import { useEffect } from "react"

export default function AdminPage() {
  const [stats, setStats] = useState({
    schools: "",
    students: "",
    volunteers: "",
    countries: "",
  })

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [newReview, setNewReview] = useState<Omit<Review, "id">>({
    name: "",
    role: "",
    school: "",
    content: "",
    rating: 5,
    date: new Date().toISOString().split("T")[0],
    source: "",
  })
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getAllReviews()
        setReviews(fetchedReviews)
        setLoading(false)
      } catch (err) {
        setError("Failed to load reviews")
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStats({
      ...stats,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdateStats = async () => {
    try {
      await updateStats(stats)
      setSuccess("Stats updated successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to update stats")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleResetStats = async () => {
    try {
      await resetStats()
      setSuccess("Stats reset successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to reset stats")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleNewReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    })
  }

  const handleNewReviewRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview({
      ...newReview,
      rating: Number.parseInt(e.target.value),
    })
  }

  const handleAddReview = async () => {
    try {
      const addedReview = await addReview(newReview)
      setReviews([...reviews, addedReview])
      setNewReview({
        name: "",
        role: "",
        school: "",
        content: "",
        rating: 5,
        date: new Date().toISOString().split("T")[0],
        source: "",
      })
      setSuccess("Review added successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to add review")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleEditingReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingReview) {
      setEditingReview({
        ...editingReview,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleEditingReviewRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingReview) {
      setEditingReview({
        ...editingReview,
        rating: Number.parseInt(e.target.value),
      })
    }
  }

  const handleUpdateReview = async () => {
    if (!editingReview) return

    try {
      const updatedReview = await updateReview(editingReview.id, editingReview)
      if (updatedReview) {
        setReviews(reviews.map((review) => (review.id === updatedReview.id ? updatedReview : review)))
        setEditingReview(null)
        setSuccess("Review updated successfully!")
        setTimeout(() => setSuccess(null), 3000)
      }
    } catch (err) {
      setError("Failed to update review")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleDeleteReview = async (id: string) => {
    try {
      const success = await deleteReview(id)
      if (success) {
        setReviews(reviews.filter((review) => review.id !== id))
        setDeleteConfirmId(null)
        setSuccess("Review deleted successfully!")
        setTimeout(() => setSuccess(null), 3000)
      }
    } catch (err) {
      setError("Failed to delete review")
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="stats">
        <TabsList className="mb-4">
          <TabsTrigger value="stats">Homepage Stats</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Update Homepage Statistics</CardTitle>
              <CardDescription>
                Update the statistics displayed on the homepage. These numbers will be animated on page load.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="schools" className="block text-sm font-medium mb-1">
                    Schools
                  </label>
                  <Input
                    id="schools"
                    name="schools"
                    placeholder="Number of schools"
                    value={stats.schools}
                    onChange={handleStatsChange}
                  />
                </div>
                <div>
                  <label htmlFor="students" className="block text-sm font-medium mb-1">
                    Students
                  </label>
                  <Input
                    id="students"
                    name="students"
                    placeholder="Number of students"
                    value={stats.students}
                    onChange={handleStatsChange}
                  />
                </div>
                <div>
                  <label htmlFor="volunteers" className="block text-sm font-medium mb-1">
                    Volunteers
                  </label>
                  <Input
                    id="volunteers"
                    name="volunteers"
                    placeholder="Number of volunteers"
                    value={stats.volunteers}
                    onChange={handleStatsChange}
                  />
                </div>
                <div>
                  <label htmlFor="countries" className="block text-sm font-medium mb-1">
                    Countries
                  </label>
                  <Input
                    id="countries"
                    name="countries"
                    placeholder="Number of countries"
                    value={stats.countries}
                    onChange={handleStatsChange}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleUpdateStats}>Update Stats</Button>
                <Button variant="outline" onClick={handleResetStats}>
                  Reset Stats
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Manage Reviews</CardTitle>
              <CardDescription>Add, edit, or delete reviews that appear on the reviews page.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add New Review</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Review</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Reviewer's name"
                          value={newReview.name}
                          onChange={handleNewReviewChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium mb-1">
                          Role (optional)
                        </label>
                        <Input
                          id="role"
                          name="role"
                          placeholder="Reviewer's role"
                          value={newReview.role}
                          onChange={handleNewReviewChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="school" className="block text-sm font-medium mb-1">
                          School
                        </label>
                        <Input
                          id="school"
                          name="school"
                          placeholder="School name"
                          value={newReview.school}
                          onChange={handleNewReviewChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium mb-1">
                          Review Content
                        </label>
                        <Textarea
                          id="content"
                          name="content"
                          placeholder="Review content"
                          value={newReview.content}
                          onChange={handleNewReviewChange}
                          rows={5}
                        />
                      </div>
                      <div>
                        <label htmlFor="rating" className="block text-sm font-medium mb-1">
                          Rating (1-5)
                        </label>
                        <Input
                          id="rating"
                          name="rating"
                          type="number"
                          min="1"
                          max="5"
                          value={newReview.rating}
                          onChange={handleNewReviewRatingChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-1">
                          Date
                        </label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={newReview.date}
                          onChange={handleNewReviewChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="source" className="block text-sm font-medium mb-1">
                          Source (optional)
                        </label>
                        <Input
                          id="source"
                          name="source"
                          placeholder="Source of the review"
                          value={newReview.source}
                          onChange={handleNewReviewChange}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleAddReview}>Add Review</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {loading ? (
                <p>Loading reviews...</p>
              ) : reviews.length === 0 ? (
                <p>No reviews found. Add your first review!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">{review.name}</h3>
                            <p className="text-sm text-gray-500">
                              {review.role && `${review.role} at `}
                              {review.school}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setEditingReview(review)}>
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Review</DialogTitle>
                                </DialogHeader>
                                {editingReview && (
                                  <div className="grid gap-4 py-4">
                                    <div>
                                      <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                                        Name
                                      </label>
                                      <Input
                                        id="edit-name"
                                        name="name"
                                        value={editingReview.name}
                                        onChange={handleEditingReviewChange}
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="edit-role" className="block text-sm font-medium mb-1">
                                        Role (optional)
                                      </label>
                                      <Input
                                        id="edit-role"
                                        name="role"
                                        value={editingReview.role || ""}
                                        onChange={handleEditingReviewChange}
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="edit-school" className="block text-sm font-medium mb-1">
                                        School
                                      </label>
                                      <Input
                                        id="edit-school"
                                        name="school"
                                        value={editingReview.school}
                                        onChange={handleEditingReviewChange}
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="edit-content" className="block text-sm font-medium mb-1">
                                        Review Content
                                      </label>
                                      <Textarea
                                        id="edit-content"
                                        name="content"
                                        value={editingReview.content}
                                        onChange={handleEditingReviewChange}
                                        rows={5}
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="edit-rating" className="block text-sm font-medium mb-1">
                                        Rating (1-5)
                                      </label>
                                      <Input
                                        id="edit-rating"
                                        name="rating"
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={editingReview.rating}
                                        onChange={handleEditingReviewRatingChange}
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="edit-date" className="block text-sm font-medium mb-1">
                                        Date
                                      </label>
                                      <Input
                                        id="edit-date"
                                        name="date"
                                        type="date"
                                        value={editingReview.date.split("T")[0]}
                                        onChange={handleEditingReviewChange}
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="edit-source" className="block text-sm font-medium mb-1">
                                        Source (optional)
                                      </label>
                                      <Input
                                        id="edit-source"
                                        name="source"
                                        value={editingReview.source || ""}
                                        onChange={handleEditingReviewChange}
                                      />
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <DialogClose asChild>
                                    <Button onClick={handleUpdateReview}>Save Changes</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="destructive" size="sm" onClick={() => setDeleteConfirmId(review.id)}>
                                  Delete
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirm Deletion</DialogTitle>
                                </DialogHeader>
                                <p>Are you sure you want to delete this review? This action cannot be undone.</p>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <DialogClose asChild>
                                    <Button variant="destructive" onClick={() => handleDeleteReview(review.id)}>
                                      Delete
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                          {review.source && <span className="text-sm text-gray-500 ml-2">Source: {review.source}</span>}
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
  )
}
