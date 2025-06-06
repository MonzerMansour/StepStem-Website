import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Users, Award, BookOpen, Clock, Monitor } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OnlineProgramPage() {
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
              <Link href="/online-program" className="text-[#00C9DB] font-semibold">
                Online Program
              </Link>
              <Link href="/classes" className="text-gray-700 hover:text-[#00C9DB]">
                Classes
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-[#00C9DB]">
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
      <section className="relative bg-gradient-to-r from-black/70 to-black/50 text-white py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Students learning STEM"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            STEM Learning From <span className="text-[#00C9DB]">Anywhere</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Live & Self-Paced Classes for Grades K–5</p>
          <Button asChild size="lg" className="bg-[#00C9DB] hover:bg-[#00B5C7] text-white text-lg px-8 py-4">
            <Link href="/register">Enroll Now</Link>
          </Button>
        </div>
      </section>

      {/* Program Summary */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            Interactive STEM Education at Your Fingertips
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our Online Elementary STEM Program brings the excitement of hands-on science, technology, engineering, and
            mathematics directly to your home. Through live interactive classes and self-paced learning modules,
            students in grades K-5 explore, create, and discover while building critical thinking skills and STEM
            confidence in a supportive online environment.
          </p>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">Choose Your Learning Style</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Live Classes Card */}
            <Card className="border-2 hover:border-[#00C9DB] transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-[#00C9DB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Live Classes</CardTitle>
                <CardDescription className="text-gray-600">Real-time interactive learning</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#00C9DB] mr-2" />
                    Zoom sessions with breakout rooms
                  </li>
                  <li className="flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-[#00C9DB] mr-2" />
                    Hands-on activities you do at home
                  </li>
                  <li className="flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#00C9DB] mr-2" />
                    Scheduled weekly sessions
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Self-Paced Card */}
            <Card className="border-2 hover:border-[#00C9DB] transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Self-Paced Courses</CardTitle>
                <CardDescription className="text-gray-600">Learn on your schedule</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-gray-700">
                  <li>Google Classroom integration</li>
                  <li>Scratch programming projects</li>
                  <li>Khan Academy partnerships</li>
                  <li>Interactive video lessons</li>
                </ul>
              </CardContent>
            </Card>

            {/* Certificates Card */}
            <Card className="border-2 hover:border-[#00C9DB] transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-[#00C9DB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Certificates</CardTitle>
                <CardDescription className="text-gray-600">Celebrate achievements</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-gray-700">
                  <li>Digital completion certificates</li>
                  <li>Progress tracking</li>
                  <li>Skill badges</li>
                  <li>Portfolio building</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#00C9DB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to Start Your STEM Journey?</h2>
          <p className="text-xl text-white/90 mb-8">
            Explore our full catalog of engaging classes designed for young learners
          </p>
          <Button asChild size="lg" className="bg-white text-[#00C9DB] hover:bg-gray-100 text-lg px-8 py-4">
            <Link href="/classes">Explore Classes</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
