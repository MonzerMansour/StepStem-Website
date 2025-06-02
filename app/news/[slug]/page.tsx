import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import LikeButton from "@/components/like-button"
import ShareButton from "@/components/share-button"
import { getNewsArticleBySlug, incrementArticleViews } from "../../actions/news-actions"
import { notFound } from "next/navigation"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const article = await getNewsArticleBySlug(slug)

  if (!article || !article.published) {
    notFound()
  }

  // Increment view count
  await incrementArticleViews(slug)

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
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
          </div>

          {article.image && (
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {article.content.split("\n").map((paragraph, index) => {
              if (paragraph.trim() === "") return <br key={index} />

              // Handle bold text with **text**
              if (paragraph.includes("**")) {
                const parts = paragraph.split("**")
                return (
                  <p key={index}>
                    {parts.map((part, partIndex) =>
                      partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part,
                    )}
                  </p>
                )
              }

              return <p key={index}>{paragraph}</p>
            })}
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{article.views} views</span>
                <ShareButton
                  url={typeof window !== "undefined" ? window.location.href : ""}
                  title="Share this article"
                />
              </div>
              <LikeButton articleId={slug} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
