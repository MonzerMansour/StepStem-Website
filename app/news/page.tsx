"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import LikeButton from "@/components/like-button"
import ShareButton from "@/components/share-button"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getPublishedNewsArticles, type NewsArticle } from "../actions/news-actions"

export default function NewsPage() {
  const [blogPosts, setBlogPosts] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadArticles() {
      try {
        const articles = await getPublishedNewsArticles()
        setBlogPosts(articles)
      } catch (error) {
        console.error("Error loading articles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid md:grid-cols-2 gap-8 items-start">
                <Skeleton className="h-[300px] w-full rounded-lg" />
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/news-header.webp"
          alt="Water surface with sunlight"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-block bg-cyan-500 px-4 py-1 mb-4"></div>
              <h1 className="text-7xl font-bold mb-4">
                <span className="text-white">LATEST </span>
                <span className="text-cyan-400">NEWS</span>
              </h1>
              <p className="text-white text-lg max-w-2xl">
                Welcome to our program's news and updates section! Here you can find the latest information about our
                program. Stay tuned for exciting news and updates.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" className="bg-white/10 text-white rounded-full">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">No Articles Found</h2>
                <p className="text-gray-600">Check back soon for new articles!</p>
              </div>
            ) : (
              blogPosts.map((post, index) => (
                <article key={post.id} className="mb-16">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="relative h-[300px] rounded-lg overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg?height=300&width=400&query=news article"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                          <Image src="/images/logo.png" alt="Author" fill className="object-cover" />
                        </div>
                        <div className="text-sm text-gray-600">
                          {post.author}
                          <div className="flex items-center gap-2">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <Link href={`/news/${post.slug}`}>
                        <h2 className="text-3xl font-bold mb-3 hover:text-cyan-500 transition-colors">{post.title}</h2>
                      </Link>

                      <p className="text-gray-700 mb-4">{post.excerpt}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span>{post.views} views</span>
                          <ShareButton
                            url={`${typeof window !== "undefined" ? window.location.origin : ""}/news/${post.slug}`}
                            title={`Share: ${post.title}`}
                          />
                        </div>
                        <Suspense
                          fallback={
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-8 w-8 rounded-full" />
                              <Skeleton className="h-4 w-4" />
                            </div>
                          }
                        >
                          <LikeButton articleId={post.slug} />
                        </Suspense>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
