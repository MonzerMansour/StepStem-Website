import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define blog post data
const blogPosts = [
  {
    id: "singapore-oil-spill",
    title: "Unraveling the Singapore Oil Spill Disaster",
    image: "/images/oil-spill-cleanup.webp",
    date: "Jul 16, 2024",
    readTime: "3 min read",
    views: 15,
    comments: 0,
    likes: 1,
    excerpt: "An in-depth look at the recent oil spill in Singapore and its environmental impact on marine ecosystems.",
    author: "stepSTEM24",
  },
  {
    id: "elementary-stem",
    title: "Engaging Elementary Schoolers in STEM: StepSTEM Educational Program",
    image: "/images/oil-bird.jpeg",
    date: "Apr 1, 2024",
    readTime: "2 min read",
    views: 7,
    comments: 0,
    likes: 1,
    excerpt: "How our program is making STEM education accessible and engaging for elementary school students.",
    author: "stepSTEM24",
  },
  {
    id: "expanding-horizons",
    title: "Expanding Horizons: StepSTEM Educational Program's Future Goals",
    image: "/images/students-demo.webp",
    date: "Apr 1, 2024",
    readTime: "2 min read",
    views: 11,
    comments: 0,
    likes: 1,
    excerpt: "A look at our program's growth plans and vision for the future of STEM education.",
    author: "stepSTEM24",
  },
  {
    id: "oil-spills-impact",
    title: "Exploring the Impact of Oil Spills: StepSTEM Educational Program",
    image: "/images/plant-hands.jpeg",
    date: "Apr 1, 2024",
    readTime: "3 min read",
    views: 4,
    comments: 0,
    likes: 1,
    excerpt:
      "Understanding the environmental consequences of oil spills and how we teach students about this critical issue.",
    author: "stepSTEM24",
  },
]

export default function NewsPage() {
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
            {blogPosts.map((post, index) => (
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
                      <div className="ml-auto">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </Button>
                      </div>
                    </div>

                    <Link href={`/news/${post.id}`}>
                      <h2 className="text-3xl font-bold mb-3 hover:text-cyan-500 transition-colors">{post.title}</h2>
                    </Link>

                    <p className="text-gray-700 mb-4">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>{post.views} views</span>
                        <span>{post.comments} comments</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </Button>
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
