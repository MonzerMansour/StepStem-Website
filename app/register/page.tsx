"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useState } from "react"

export default function RegistrationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    studentName: "",
    grade: "",
    guardianName: "",
    email: "",
    phone: "",
    course: "",
    timeSlot: "",
    accommodations: "",
    scholarship: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-[#00C9DB] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-black">Registration Complete!</CardTitle>
            <CardDescription>Thanks for signing up! You'll receive a confirmation email soon.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="bg-[#00C9DB] hover:bg-[#00B5C7] text-white">
              <Link href="/classes">Browse More Classes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#00C9DB] rounded-full mr-3"></div>
              <span className="text-2xl font-bold text-black">
                Step<span className="text-[#00C9DB]">STEM</span>
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#00C9DB]">
                Home
              </Link>
              <Link href="/online-program" className="text-gray-700 hover:text-[#00C9DB]">
                Online Program
              </Link>
              <Link href="/classes" className="text-gray-700 hover:text-[#00C9DB]">
                Classes
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-[#00C9DB]">
                How It Works
              </Link>
              <Link href="/parent-info" className="text-gray-700 hover:text-[#00C9DB]">
                Parent Info
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Register for <span className="text-[#00C9DB]">STEM Classes</span>
          </h1>
          <p className="text-xl text-gray-600">Sign up your child for our engaging online STEM program</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black">Registration Form</CardTitle>
            <CardDescription>Please fill out all required fields to complete your registration</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Student Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentName">Student Name *</Label>
                    <Input
                      id="studentName"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="grade">Grade *</Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value) => setFormData({ ...formData, grade: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="K">Kindergarten</SelectItem>
                        <SelectItem value="1">Grade 1</SelectItem>
                        <SelectItem value="2">Grade 2</SelectItem>
                        <SelectItem value="3">Grade 3</SelectItem>
                        <SelectItem value="4">Grade 4</SelectItem>
                        <SelectItem value="5">Grade 5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Guardian Contact Information</h3>
                <div>
                  <Label htmlFor="guardianName">Guardian Name *</Label>
                  <Input
                    id="guardianName"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Course Selection</h3>
                <div>
                  <Label htmlFor="course">Select Course *</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) => setFormData({ ...formData, course: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior-robotics">Junior Robotics Camp</SelectItem>
                      <SelectItem value="scratch-programming">Scratch Programming Basics</SelectItem>
                      <SelectItem value="kitchen-chemistry">Kitchen Chemistry Lab</SelectItem>
                      <SelectItem value="math-games">Math Games & Puzzles</SelectItem>
                      <SelectItem value="space-exploration">Space Exploration Adventure</SelectItem>
                      <SelectItem value="3d-design">3D Design Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeSlot">Preferred Time Slot</Label>
                  <Select
                    value={formData.timeSlot}
                    onValueChange={(value) => setFormData({ ...formData, timeSlot: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot (if applicable)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9:00 AM - 10:00 AM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (2:00 PM - 3:00 PM)</SelectItem>
                      <SelectItem value="evening">Evening (6:00 PM - 7:00 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Additional Information</h3>
                <div>
                  <Label htmlFor="accommodations">Accessibility Accommodations (Optional)</Label>
                  <Textarea
                    id="accommodations"
                    placeholder="Please describe any accommodations your child may need..."
                    value={formData.accommodations}
                    onChange={(e) => setFormData({ ...formData, accommodations: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scholarship"
                    checked={formData.scholarship}
                    onCheckedChange={(checked) => setFormData({ ...formData, scholarship: checked as boolean })}
                  />
                  <Label htmlFor="scholarship">Request financial assistance</Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#00C9DB] hover:bg-[#00B5C7] text-white text-lg py-3">
                Submit Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
