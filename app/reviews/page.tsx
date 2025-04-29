import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getAllReviews, initializeReviews } from "../actions/review-actions"

// Default reviews for initialization
const DEFAULT_REVIEWS = [
  {
    id: "1",
    name: "Principal Leanna Goldenberg",
    role: "Principal",
    school: "Montague Elementary School",
    content:
      "Rohit Pandravada and Akhil Ranjeet, as part of their FTC (First Tech Challenge) STEM program, have embarked on a mission to inspire and educate our 2nd graders with innovative science lessons. These young visionaries brainstormed a variety of engaging science innovation lessons, and our 2nd-grade teacher team enthusiastically selected the STEM Oil Clean-Up Challenge as their project. Rohit and Akhil meticulously planned and flawlessly executed an interactive and captivating lesson for our second graders. Their collaboration with our teachers, combined with their exemplary class management skills, resulted in an enriching learning experience for our students.",
    rating: 5,
    date: "August 25, 2023",
  },
  {
    id: "2",
    name: "Montague Weekly Newsletter",
    school: "Montague Elementary School",
    content:
      "This lesson focused on bringing awareness to the real life issue of oil spill pollution and the difficulties scientist and engineers face when trying to clean oil out of our waterways and oceans. The second graders were engaged and excited to be learning along with kids just like them! We are very proud of these student leaders and look forward to promoting their program. Thank you Akhil and Rohit for all the work that went into planning and implementing such an engaging lesson for our students!",
    rating: 5,
    date: "August 25, 2023",
    source: "Montague Weekly Newsletter",
  },
  {
    id: "3",
    name: "Principal Leanna Goldenberg",
    role: "Principal",
    school: "Montague Elementary School",
    content:
      "The StepSTEM program is a wonderful presentation that fit right into my school's science curriculum! Akhil and Prutha were well prepared and knowledgeable, they built a quick rapport with my students, and they kept the class engaged with their fun and educational activities. They taught students about the dangers, challenges, and environmental impacts of oil spills, and how scientists can help. At the end of the presentation, students were inspired to create a positive impact on their environment! Thank you for bringing StepSTEM to my classroom!",
    rating: 5,
    date: "March 15, 2024",
  },
  {
    id: "4",
    name: "Ms. Nina Paoloni",
    role: "Teacher",
    school: "Stratford Pomeroy Elementary",
    content:
      "The high school students who presented the lesson about oil spills to our 2nd and 3rd graders did an outstanding job! They were incredibly well-prepared and delivered a lesson that was both educational and engaging. The activities they planned were interactive and really captured the students' attention. One highlight was when the younger students got to participate in cleaning up an oil spill by scooping out the oil from the water—a hands-on activity that they thoroughly enjoyed! Throughout the entire lesson, the older students were remarkably polite and intentional in their interactions. They fostered a positive learning environment and left a lasting impression on both the students and teachers alike. It was a pleasure to see such dedication and enthusiasm for teaching and learning. Great job to all involved!",
    rating: 5,
    date: "February 8, 2024",
  },
  {
    id: "5",
    name: "Ms. Saravanan",
    role: "Teacher",
    school: "Stratford Winchester Elementary",
    content:
      "Thank you for your presentation yesterday about oil spills and their impact on marine organisms. The lesson aligned perfectly with the environmental citizenship topics we've been focusing on with the students. Your lesson was well-planned and delivered, and the execution was smooth and age-appropriate.",
    rating: 5,
    date: "January 22, 2024",
  },
]

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
