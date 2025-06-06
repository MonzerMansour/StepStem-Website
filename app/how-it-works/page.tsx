import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Video, Lightbulb, Award, Quote } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#00C9DB] rounded-full mr-3"></div>
              <span className="text-2xl font-bold text-black">
                Step<span className="text-[#00C9DB]">STEM</span>
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#00C9DB]">
                Home
              </Link>
              <Link href="/online-program" className="text-gray-700 hover:text-[#00C9DB]">
                Online Program
              </Link>
              <Link href="/classes" className="text-gray-700 hover:text-[#00C9DB]">
                Classes
              </Link>
              <Link href="/how-it-works" className="text-[#00C9DB] font-semibold">
                How It Works
              </Link>
              <Link href="/parent-info" className="text-gray-700 hover:text-[#00C9DB]">
                Parent Info
              </Link>
            </nav>
            <Button asChild className="bg-[#00C9DB] hover:bg-[#00B5C7] text-white">
              <Link href="/register">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            How Our Online <span className="text-[#00C9DB]">STEM Program</span> Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with StepSTEM is simple! Follow these four easy steps to begin your child's STEM learning
            journey.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className="text-center border-2 hover:border-[#00C9DB] transition-colors">
              <CardHeader>
                <div className="w-20 h-20 bg-[#00C9DB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#00C9DB]" />
                </div>
                <CardTitle className="text-xl font-bold text-black">Pick a Class</CardTitle>
                <CardDescription>Choose from live or self-paced options</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse our catalog of engaging STEM classes designed for grades K-5. Select live interactive sessions
                  or self-paced modules that fit your schedule.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-center border-2 hover:border-[#00C9DB] transition-colors">
              <CardHeader>
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-[#00C9DB]" />
                </div>
                <CardTitle className="text-xl font-bold text-black">Join Online</CardTitle>
                <CardDescription>Access via Zoom or Google Classroom</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect through our easy-to-use platforms. Live classes use Zoom with breakout rooms, while self-paced
                  courses are hosted on Google Classroom.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-center border-2 hover:border-[#00C9DB] transition-colors">
              <CardHeader>
                <div className="w-20 h-20 bg-[#00C9DB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-[#00C9DB]" />
                </div>
                <CardTitle className="text-xl font-bold text-black">Learn & Create</CardTitle>
                <CardDescription>Interactive projects and experiments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Engage in hands-on activities, build projects, conduct experiments, and collaborate with peers in a
                  supportive learning environment.
                </p>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="text-center border-2 hover:border-[#00C9DB] transition-colors">
              <CardHeader>
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">4</span>
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#00C9DB]" />
                </div>
                <CardTitle className="text-xl font-bold text-black">Earn Certificate</CardTitle>
                <CardDescription>Celebrate your achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Complete your course and receive a digital certificate to showcase your new STEM skills and knowledge.
                  Build your learning portfolio!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-[#00C9DB]">
            <CardContent className="p-8 text-center">
              <Quote className="w-12 h-12 text-[#00C9DB] mx-auto mb-6" />
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                "My daughter absolutely loves the robotics class! She's learned so much about engineering and
                problem-solving. The instructors are fantastic and really know how to engage young learners. We couldn't
                be happier with StepSTEM's online program."
              </blockquote>
              <div className="text-lg font-semibold text-black">Sarah Johnson</div>
              <div className="text-gray-600">Parent of Emma, Grade 3</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#00C9DB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of students already learning STEM with StepSTEM</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#00C9DB] hover:bg-gray-100 text-lg px-8 py-4">
              <Link href="/classes">Browse Classes</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#00C9DB] text-lg px-8 py-4"
            >
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
