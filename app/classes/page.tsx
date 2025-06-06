"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, Users, Video, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const classes = [
  {
    id: 1,
    title: "Junior Robotics Camp",
    format: "live",
    duration: "4 sessions, 1 hour each",
    grade: "K-2",
    subject: "Engineering",
    description: "Build and program simple robots using kid-friendly tools and learn basic engineering concepts.",
  },
  {
    id: 2,
    title: "Scratch Programming Basics",
    format: "self-paced",
    duration: "6 modules, 30 min each",
    grade: "3-5",
    subject: "Technology",
    description: "Create your first computer programs with Scratch's visual programming language.",
  },
  {
    id: 3,
    title: "Kitchen Chemistry Lab",
    format: "live",
    duration: "3 sessions, 45 min each",
    grade: "K-5",
    subject: "Science",
    description: "Explore chemical reactions using safe household items in fun, hands-on experiments.",
  },
  {
    id: 4,
    title: "Math Games & Puzzles",
    format: "self-paced",
    duration: "8 modules, 20 min each",
    grade: "1-3",
    subject: "Mathematics",
    description: "Make math fun with interactive games, puzzles, and problem-solving challenges.",
  },
  {
    id: 5,
    title: "Space Exploration Adventure",
    format: "live",
    duration: "5 sessions, 1 hour each",
    grade: "2-5",
    subject: "Science",
    description: "Journey through our solar system and learn about planets, stars, and space missions.",
  },
  {
    id: 6,
    title: "3D Design Workshop",
    format: "self-paced",
    duration: "4 modules, 45 min each",
    grade: "3-5",
    subject: "Technology",
    description: "Design and create 3D models using beginner-friendly software tools.",
  },
]

export default function ClassCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [formatFilter, setFormatFilter] = useState("all")

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = subjectFilter === "all" || cls.subject === subjectFilter
    const matchesGrade = gradeFilter === "all" || cls.grade.includes(gradeFilter)
    const matchesFormat = formatFilter === "all" || cls.format === formatFilter

    return matchesSearch && matchesSubject && matchesGrade && matchesFormat
  })

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
              <Link href="/classes" className="text-[#00C9DB] font-semibold">
                Classes
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-[#00C9DB]">
                How It Works
              </Link>
              <Link href="/parent-info" className="text-gray-700 hover:text-[#00C9DB]">
                Parent Info
              </Link>
            </nav>
            <Button asChild className="bg-[#00C9DB] hover:bg-[#00B5C7] text-white">
              <Link href="/register">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            STEM Class <span className="text-[#00C9DB]">Catalog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover engaging STEM classes designed for elementary students. Choose from live interactive sessions or
            self-paced learning modules.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="K">Kindergarten</SelectItem>
                <SelectItem value="1">Grade 1</SelectItem>
                <SelectItem value="2">Grade 2</SelectItem>
                <SelectItem value="3">Grade 3</SelectItem>
                <SelectItem value="4">Grade 4</SelectItem>
                <SelectItem value="5">Grade 5</SelectItem>
              </SelectContent>
            </Select>
            <Select value={formatFilter} onValueChange={setFormatFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="live">Live Classes</SelectItem>
                <SelectItem value="self-paced">Self-Paced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Class Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <Card key={cls.id} className="border-2 hover:border-[#00C9DB] transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-black mb-2">{cls.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      {cls.format === "live" ? (
                        <Badge className="bg-[#00C9DB] text-white">
                          <Video className="w-3 h-3 mr-1" />
                          Live
                        </Badge>
                      ) : (
                        <Badge className="bg-black text-white">
                          <BookOpen className="w-3 h-3 mr-1" />
                          Self-Paced
                        </Badge>
                      )}
                      <Badge variant="outline">{cls.subject}</Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600">{cls.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-[#00C9DB]" />
                    {cls.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-[#00C9DB]" />
                    Grades {cls.grade}
                  </div>
                </div>
                <Button asChild className="w-full bg-[#00C9DB] hover:bg-[#00B5C7] text-white">
                  <Link href="/register">Register</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No classes found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}
