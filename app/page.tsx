import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import StatCard from "@/components/stat-card"
import ContactForm from "@/components/contact-form"

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[500px] md:h-[600px] w-full">
            <Image src="/images/classroom.png" alt="StepSTEM classroom" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  <span className="text-white">Step</span>
                  <span className="text-cyan-400">STEM</span>
                </h1>
                <p className="text-white text-lg md:text-xl mb-8 bg-black/30 p-4 rounded-md">
                  Our dynamic StepSTEM educational program is dedicated to igniting curiosity and fostering innovation
                  among young learners. Partner with us to bring engaging and interactive STEM education to your
                  students, empowering them to explore, discover, and thrive in the exciting world of science,
                  technology, engineering, and mathematics.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard number="07" label="Schools Visited" bgColor="bg-black" textColor="text-white" />
            <StatCard number="17" label="Classes Taught" bgColor="bg-cyan-500" textColor="text-white" />
            <StatCard number="400+" label="Students Inspired" bgColor="bg-black" textColor="text-white" />
            <StatCard number="1" label="Future To Work Towards" bgColor="bg-cyan-500" textColor="text-white" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              At StepSTEM Educational Program, we believe that children are the future, and it's our duty to enlighten
              and educate them. Our mission is to provide a fun and interactive environment where they can learn about
              STEM-related topics while gaining knowledge that will benefit them for life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/outdoor-class.png" alt="StepSTEM outdoor class" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
              <p className="text-gray-700 mb-6">
                We offer an immersive experience that is focused on the students, providing them with the knowledge they
                need to be successful in life. Our lessons are engaging, fun, and interactive, cultivating to the
                students' needs.
              </p>
              <p className="text-gray-700 mb-6">
                StepSTEM Educational Program started as a passion project between two middle schoolers who wanted to
                make a difference in their community. What began as an initiative to teach second graders at their local
                elementary school grew into something much bigger. We have developed into a program that hopes to impact
                children all around the Bay Area!
              </p>
              <Link href="/about">
                <Button className="bg-cyan-500 hover:bg-cyan-600">Learn More About Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg">
              Our core focus at StepSTEM Educational Program is to educate students on the dangers associated with oil
              spills, their long-lasting impact on the environment, and the difficulty that comes with cleaning them up.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-none shadow-lg hover:bg-white/20 transition-all">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
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
                    className="h-6 w-6"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Lessons</h3>
                <p>
                  Our unique and interactive lesson plan is designed to teach students about complex topics in an
                  engaging and fun way.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-none shadow-lg hover:bg-white/20 transition-all">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
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
                    className="h-6 w-6"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Lesson Plans</h3>
                <p>
                  We provide comprehensive lesson plans that educators can use to teach STEM concepts in their
                  classrooms.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-none shadow-lg hover:bg-white/20 transition-all">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
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
                    className="h-6 w-6"
                  >
                    <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7 6 13 6 13s6-6 6-13Z" />
                    <circle cx="12" cy="8" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">School Visits</h3>
                <p>
                  We visit schools to deliver hands-on STEM activities and experiments that make learning fun and
                  memorable.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-lg">
              Please contact us if you are interested in our program being held at your school. We will promptly respond
              with any further details.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <ContactForm />

            <div className="mt-12 text-center">
              <p className="text-lg font-bold mb-2">EMAIL</p>
              <a href="mailto:stepSTEM2024@gmail.com" className="text-cyan-400 hover:underline">
                stepSTEM2024@gmail.com
              </a>

              <div className="flex justify-center gap-4 mt-6">
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-colors"
                >
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
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-colors"
                >
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
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
