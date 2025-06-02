"use client"

import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import LikeButton from "@/components/like-button"
import ShareButton from "@/components/share-button"
import { Suspense, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllArticles } from "../actions/article-actions"
import type { Article } from "../types/article"

export default function NewsPage() {
  const [blogPosts, setBlogPosts] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadArticles() {
      try {
        const articles = await getAllArticles()
        // Sort articles by date (newest first)
        const sortedArticles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setBlogPosts(sortedArticles)
      } catch (error) {
        console.error("Error loading articles:", error)
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

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
            {loading ? (
              // Loading skeleton
              <div className="space-y-16">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="grid md:grid-cols-2 gap-8 items-start">
                    <Skeleton className="h-[300px] rounded-lg" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">No articles found</h2>
                <p className="text-gray-600">Check back later for new articles and updates.</p>
              </div>
            ) : (
              blogPosts.map((post, index) => (
                <article key={post.id} className="mb-16">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="relative h-[300px] rounded-lg overflow-hidden">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
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
                          <LikeButton articleId={post.id} />
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
