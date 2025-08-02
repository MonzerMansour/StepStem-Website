"use client"

import { useEffect } from "react"

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import LikeButton from "@/components/like-button"
import ShareButton from "@/components/share-button"
import { incrementViews } from "@/app/actions/article-views"
import { getAllArticles } from "@/app/actions/article-actions"
import type { Article } from "@/app/types/article"
import { Loader2 } from "lucide-react"
import { Suspense } from "react" // Import Suspense from React

// Placeholder for blog post data (will be fetched dynamically)
const defaultBlogPosts = [
  {
    id: "singapore-oil-spill",
    title: "Unraveling the Singapore Oil Spill Disaster",
    image: "/images/oil-spill-cleanup.webp",
    date: "Jul 16, 2024",
    readTime: "3 min read",
    views: 15,
    comments: 0,
    excerpt: "An in-depth look at the recent oil spill in Singapore and its environmental impact on marine ecosystems.",
    content:
      "StepSTEM not only teaches students about the nature of oil spills and the STEM prospects available, but also emphasizes that this environmental problem remains relevant in the present day...",
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
    content:
      "Are you looking for an exciting and interactive way to introduce your elementary school students to STEM topics?...",
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
    content:
      "At StepSTEM, we are constantly striving to expand our reach and enhance our educational programs. Our future goals include developing new curriculum modules, partnering with more schools, and reaching a wider student demographic. We believe in fostering a love for STEM from an early age and are committed to providing engaging and impactful learning experiences. Stay tuned for more updates on our journey to inspire the next generation of innovators.",
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
    content:
      "Oil spills are a significant environmental concern, impacting marine life, coastal ecosystems, and human communities. Our StepSTEM educational program delves into the science behind oil spills, their ecological consequences, and the innovative solutions being developed to mitigate their effects. Through hands-on activities and engaging discussions, students learn about environmental stewardship and the role of STEM in addressing real-world challenges. Join us in exploring this critical issue and empowering students to become agents of change.",
  },
]

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [article, setArticle] = useState<Article | null>(null)
  const [currentViews, setCurrentViews] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticleAndIncrementViews = async () => {
      setLoading(true)
      try {
        const allArticles = await getAllArticles()
        const foundArticle = allArticles.find((a) => a.slug === slug) || defaultBlogPosts.find((a) => a.slug === slug)

        if (foundArticle) {
          setArticle(foundArticle)
          // Increment views only if the article is found
          const newViews = await incrementViews(foundArticle.id)
          setCurrentViews(newViews)
        } else {
          console.error(`Article with slug ${slug} not found.`)
          setArticle(null)
        }
      } catch (error) {
        console.error("Error fetching article or incrementing views:", error)
        setArticle(null) // Handle error by setting article to null
      } finally {
        setLoading(false)
      }
    }

    fetchArticleAndIncrementViews()
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        <p>Article not found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <article className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-80 w-full">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <div className="relative h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-2">
              <Image src="/images/logo.png" alt="Author" fill className="object-cover" />
            </div>
            <span>{article.author}</span>
            <Separator orientation="vertical" className="h-4 mx-3" />
            <span>{article.date}</span>
            <Separator orientation="vertical" className="h-4 mx-3" />
            <span>{article.readTime}</span>
            <Separator orientation="vertical" className="h-4 mx-3" />
            <span>{currentViews !== null ? currentViews : article.views} views</span>
          </div>
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
            <p>{article.content}</p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <Suspense fallback={<div>Loading likes...</div>}>
              <LikeButton articleId={article.id} />
            </Suspense>
            <ShareButton
              url={`${typeof window !== "undefined" ? window.location.origin : ""}/news/${article.slug}`}
              title={`Check out this article: ${article.title}`}
            />
          </div>
        </div>
      </article>
      <div className="mt-12 text-center">
        <Link href="/news">
          <Button variant="outline" className="text-cyan-600 border-cyan-600 hover:bg-cyan-50 bg-transparent">
            Back to All News
          </Button>
        </Link>
      </div>
    </div>
  )
}
