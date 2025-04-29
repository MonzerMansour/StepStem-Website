import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getAllReviews, initializeReviews } from "../actions/review-actions"
import { DEFAULT_REVIEWS } from "../types/review"

export default async function ReviewsPage() {
  // Initialize reviews with default data if they don't exist
  await initializeReviews(DEFAULT_REVIEWS)

  // Get all reviews from the database
  const reviews = await getAllReviews()

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[600px] w-full bg-gray-100">
            <Image
              src="/images/stepstem-team-teacher.png"
              alt="StepSTEM team with teacher"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-white">WHAT PEOPLE </span>
                <span className="text-cyan-400">SAY</span>
              </h1>
              <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md">
                StepSTEM believes that all students deserve to experience the wonders of STEM and to learn the
                importance of the environment. As we look to expand our program, we have been fortunate to visit a few
                local schools and receive tons of support from them. Read what teachers, administrators, and students
                have to say about their experiences with the StepSTEM Educational Program.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Testimonials<span className="text-cyan-500">.</span>
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-12"></div>

            <div className="space-y-8">
              {reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                          {review.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold">{review.name}</h3>
                        <p className="text-sm text-gray-500">
                          {review.role && `${review.role} at `}
                          {review.school}
                        </p>
                        {review.source && <p className="text-xs text-gray-500">Source: {review.source}</p>}
                      </div>
                      <div className="ml-auto">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 text-right mt-1">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gray-50 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
              <p className="text-gray-700 mb-6">
                Have you participated in the StepSTEM Educational Program? We'd love to hear about your experience!
                Please contact us to share your feedback.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdRPfjvhGSpwJsLqVGKCGtF8IyGDOy0m4YHIkw6_zY8zGtlAA/viewform?usp=sharing"
                className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit Your Review
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
