import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define blog post data
const blogPosts = {
  "singapore-oil-spill": {
    title: "Unraveling the Singapore Oil Spill Disaster",
    image: "/images/oil-spill-cleanup.webp",
    date: "Jul 16, 2024",
    readTime: "3 min read",
    views: 15,
    comments: 0,
    likes: 1,
    author: "stepSTEM24",
    content: `
      <p>The recent oil spill off the coast of Singapore has raised significant environmental concerns and highlighted the challenges of managing maritime disasters. On July 10, 2024, a cargo vessel collision resulted in approximately 500 tons of crude oil leaking into the Singapore Strait, one of the world's busiest shipping lanes.</p>
      
      <h2>Immediate Impact</h2>
      <p>The spill has affected several beaches and coastal areas, with cleanup crews working around the clock to mitigate the damage. Local wildlife, particularly seabirds and marine life, have been severely impacted. Rescue operations have been established to clean and rehabilitate affected animals.</p>
      
      <h2>Cleanup Efforts</h2>
      <p>Authorities have deployed containment booms, skimmers, and absorbent materials to contain and remove the oil. Hundreds of workers in protective gear are manually cleaning beaches, as seen in the image above. The cleanup is expected to take several weeks, with long-term monitoring planned for affected ecosystems.</p>
      
      <h2>Educational Opportunity</h2>
      <p>At StepSTEM, we view this unfortunate event as an important teaching moment. Our curriculum already includes lessons on oil spills and their environmental impact, and we'll be incorporating this real-world example into our educational materials. Students will learn about:</p>
      <ul>
        <li>The physics of oil dispersion in water</li>
        <li>Chemical properties of crude oil and its environmental persistence</li>
        <li>Biological impacts on marine ecosystems</li>
        <li>Engineering solutions for cleanup and prevention</li>
      </ul>
      
      <p>Through hands-on experiments and case studies, we help students understand the complexity of environmental disasters and inspire them to think about innovative solutions for the future.</p>
      
      <h2>Moving Forward</h2>
      <p>This incident serves as a reminder of the ongoing environmental challenges we face and the importance of preparing the next generation to address them. At StepSTEM, we remain committed to environmental education that empowers students to become informed and engaged citizens.</p>
    `,
  },
  "elementary-stem": {
    title: "Engaging Elementary Schoolers in STEM: StepSTEM Educational Program",
    image: "/images/oil-bird.jpeg",
    date: "Apr 1, 2024",
    readTime: "2 min read",
    views: 7,
    comments: 0,
    likes: 1,
    author: "stepSTEM24",
    content: `
      <p>Elementary school years are crucial for developing a child's interest in STEM subjects. At StepSTEM, we've designed our program specifically to capture the imagination of young learners and build a foundation for lifelong scientific curiosity.</p>
      
      <h2>Age-Appropriate Learning</h2>
      <p>Our curriculum adapts complex environmental concepts into engaging, hands-on activities that elementary students can understand and enjoy. By focusing on tangible examples like oil spills and their impact on wildlife (as shown in the image above), we make abstract scientific concepts concrete and memorable.</p>
      
      <h2>Recent Success Stories</h2>
      <p>Last month, we visited three elementary schools in the Bay Area, reaching over 200 students. The feedback from both teachers and students has been overwhelmingly positive. One second-grade teacher noted, "The oil spill cleanup experiment was a highlight for my class. They still talk about it weeks later!"</p>
      
      <h2>Our Approach</h2>
      <p>Our elementary school program includes:</p>
      <ul>
        <li>Interactive demonstrations that visualize environmental concepts</li>
        <li>Hands-on experiments where students become active participants</li>
        <li>Age-appropriate discussions about environmental responsibility</li>
        <li>Take-home materials that encourage continued exploration</li>
      </ul>
      
      <p>We believe that early exposure to environmental science not only builds STEM skills but also fosters a sense of stewardship for our planet.</p>
      
      <h2>Looking Ahead</h2>
      <p>We're expanding our elementary school program to include more schools in the coming months. Our goal is to reach 1,000 elementary students by the end of the year, inspiring the next generation of environmental scientists and engineers.</p>
    `,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/news">
          <Button>Back to News</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <section className="py-8">
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
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <Button variant="ghost" size="icon">
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

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            </div>

            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-12 pt-8 border-t flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{post.views} views</span>
                <span>{post.comments} comments</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-red-500">
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
      </section>
    </>
  )
}
