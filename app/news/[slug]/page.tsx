"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import LikeButton from "@/components/like-button"
import ShareButton from "@/components/share-button"
import { getAllArticles } from "../../actions/article-actions"
import { useEffect, useState } from "react"
import type { Article } from "../../types/article"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadArticle() {
      try {
        const articles = await getAllArticles()
        const foundArticle = articles.find((a) => a.slug === slug || a.id === slug)
        setArticle(foundArticle || null)
      } catch (error) {
        console.error("Error loading article:", error)
        setArticle(null)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <p className="mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link href="/news">
          <Button>Back to News</Button>
        </Link>
      </div>
    )
  }

  // Format the content with proper line breaks and paragraphs
  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((paragraph, index) => {
        if (paragraph.trim() === "") return null
        return (
          <p key={index} className="mb-4">
            {paragraph.trim()}
          </p>
        )
      })
      .filter(Boolean)
  }

  return (
    <article className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/news">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
              </Button>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                <Image src="/images/logo.png" alt="Author" fill className="object-cover" />
              </div>
              <div>
                <div className="font-medium">{article.author}</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span>{article.date}</span>
                  {article.updatedDate && (
                    <>
                      <span>•</span>
                      <span>Updated: {article.updatedDate}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
          </div>

          {/* Cover Image */}
          {article.image && (
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">{formatContent(article.content)}</div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{article.views} views</span>
                <ShareButton
                  url={typeof window !== "undefined" ? window.location.href : ""}
                  title="Share this article"
                />
              </div>
              <LikeButton articleId={article.id} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
