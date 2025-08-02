"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LikeButton from "@/components/like-button" // Re-import LikeButton
import { Suspense, useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllArticleViews } from "@/app/actions/article-views"
import { getAllArticles } from "@/app/actions/article-actions" // Import getAllArticles
import type { Article } from "@/app/types/article" // Import Article type

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLightBackground, setIsLightBackground] = useState(false)
  const [articleViews, setArticleViews] = useState<Record<string, number>>({})
  const [articles, setArticles] = useState<Article[]>([]) // State to hold fetched articles
  const [loadingArticles, setLoadingArticles] = useState(true)

  useEffect(() => {
    const loadArticlesAndViews = async () => {
      setLoadingArticles(true)
      try {
        const fetchedArticles = await getAllArticles()
        // Sort articles by date in descending order (most recent first)
        const sortedArticles = fetchedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setArticles(sortedArticles)

        const views = await getAllArticleViews()
        setArticleViews(views)
      } catch (error) {
        console.error("Error loading articles or views:", error)
        // Fallback to hardcoded data if fetching fails
        setArticles([
          {
            id: "singapore-oil-spill",
            title: "Unraveling the Singapore Oil Spill Disaster",
            image: "/images/oil-spill-cleanup.webp",
            date: "Jul 16, 2024",
            readTime: "3 min read",
            views: 15,
            comments: 0,
            excerpt:
              "An in-depth look at the recent oil spill in Singapore and its environmental impact on marine ecosystems.",
            author: "stepSTEM24",
            content: "", // Content not needed for preview
          },
          {
            id: "elementary-stem",
            title: "Engaging Elementary Schoolers in STEM: StepSTEM Educational Program",
            image: "/images/oil-bird.jpeg",
            date: "Apr 1, 2024",
            readTime: "2 min read",
            views: 7,
            comments: 0,
            excerpt: "How our program is making STEM education accessible and engaging for elementary school students.",
            author: "stepSTEM24",
            content: "",
          },
          {
            id: "expanding-horizons",
            title: "Expanding Horizons: StepSTEM Educational Program's Future Goals",
            image: "/images/students-demo.webp",
            date: "Apr 1, 2024",
            readTime: "2 min read",
            views: 11,
            comments: 0,
            excerpt: "A look at our program's growth plans and vision for the future of STEM education.",
            author: "stepSTEM24",
            content: "",
          },
          {
            id: "oil-spills-impact",
            title: "Exploring the Impact of Oil Spills: StepSTEM Educational Program",
            image: "/images/plant-hands.jpeg",
            date: "Apr 1, 2024",
            readTime: "3 min read",
            views: 4,
            comments: 0,
            excerpt:
              "Understanding the environmental consequences of oil spills and how we teach students about this critical issue.",
            author: "stepSTEM24",
            content: "",
          },
        ])
      } finally {
        setLoadingArticles(false)
      }
    }
    loadArticlesAndViews()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredArticles = articles.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight = 350
      if (window.scrollY > heroSectionHeight) {
        setIsLightBackground(true)
      } else {
        setIsLightBackground(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Set initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const buttonClasses = isLightBackground
    ? "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-black border-gray-300"
    : "bg-white/10 text-white hover:bg-white/20 border-black/20"

  const expandedSearchClasses = isLightBackground ? "bg-gray-200 border-gray-300" : "bg-white/95 border-gray-200"

  const inputClasses = isLightBackground
    ? "text-gray-800 placeholder:text-gray-500"
    : "text-gray-800 placeholder:text-gray-500"

  const searchIconClasses = isLightBackground ? "text-gray-700" : "text-white"
  const closeIconClasses = isLightBackground ? "text-gray-700" : "text-gray-500"

  return (
    <div className="relative">
      <section className="relative w-full h-[400px] bg-gray-900 flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/news-header.webp"
          alt="News Header"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 z-0 opacity-50"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">News & Updates</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Stay informed with the latest news, articles, and insights from our community.
          </p>
        </div>
      </section>

      <div className="fixed right-4 top-4 z-50 pt-[60px]">
        <div className="relative">
          {!isSearchOpen ? (
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full backdrop-blur-sm transition-all duration-300 border-2 shadow-lg ${buttonClasses}`}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className={`h-5 w-5 ${searchIconClasses}`} />
            </Button>
          ) : (
            <div
              className={`flex items-center rounded-full border-2 shadow-lg transition-all duration-300 pr-2 ${expandedSearchClasses}`}
            >
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={`w-64 md:w-80 h-10 pl-4 pr-2 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 ${inputClasses}`}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full h-8 w-8 ${closeIconClasses}`}
                onClick={() => {
                  setSearchTerm("")
                  setIsSearchOpen(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          {isSearchOpen && searchTerm && (
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border w-80 max-h-96 overflow-y-auto">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((post) => (
                  <Link key={post.id} href={`/news/${post.id}`} onClick={() => setIsSearchOpen(false)}>
                    <div className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-gray-900 line-clamp-2">{post.title}</h3>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No articles found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="container mx-auto px-4 py-12 md:py-16">
        {loadingArticles ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-md bg-white animate-pulse">
                <div className="h-48 w-full bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No articles found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((post) => (
              <div
                key={post.id}
                className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                {/* This Link now only wraps the image and the text content that should navigate */}
                <Link href={`/news/${post.slug}`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                </Link>
                {/* The views and LikeButton are now outside the Link, preventing navigation on click */}
                <div className="flex items-center justify-between text-sm text-gray-500 mt-4 p-4 pt-0">
                  <span>{articleViews[post.id] !== undefined ? articleViews[post.id] : post.views} views</span>
                  <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
                    <LikeButton articleId={post.id} />
                  </Suspense>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
