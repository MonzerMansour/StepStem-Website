"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import StatCard from "@/components/stat-card"
import ContactForm from "@/components/contact-form"
import ScrollIndicator from "@/components/scroll-indicator"
import TypedText from "@/components/typed-text"
import { getHomepageStatsFromKV } from "./actions/admin-actions"

// Default stats
const DEFAULT_STATS = {
  schoolsVisited: 8,
  classesTaught: 20,
  studentsInspired: 500,
  countriesImpacted: 3,
}

export default function Home() {
  const [stats, setStats] = useState(DEFAULT_STATS)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  // Function to load stats
  const loadStats = async () => {
    try {
      setIsLoading(true)
      const homeStats = await getHomepageStatsFromKV()
      console.log("Homepage: Fetched homepage stats from server action:", homeStats)

      if (homeStats && typeof homeStats.schoolsVisited === "number") {
        // If stats have changed, update the refresh key to force re-render of StatCard components
        if (
          homeStats.schoolsVisited !== stats.schoolsVisited ||
          homeStats.classesTaught !== stats.classesTaught ||
          homeStats.studentsInspired !== stats.studentsInspired ||
          (homeStats.countriesImpacted || 3) !== (stats.countriesImpacted || 3)
        ) {
          setStats(homeStats)
          setRefreshKey((prev) => prev + 1)
        }
      } else {
        console.error("Invalid stats data received:", homeStats)
        // If we get invalid data, use the default stats
        setStats(DEFAULT_STATS)
      }
    } catch (error) {
      console.error("Error loading stats:", error)
      // If there's an error, use the default stats
      setStats(DEFAULT_STATS)
    } finally {
      setIsLoading(false)
    }
  }

  // Load stats on component mount
  useEffect(() => {
    loadStats()

    // Set up an interval to periodically check for updates (every 30 seconds)
    const intervalId = setInterval(loadStats, 30000)

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId)
  }, [])

  // Listen for localStorage changes from admin page
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "stats_updated") {
        console.log("Homepage: Detected stats update, refreshing data")
        loadStats()
      }
    }

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Stats section with dynamic data
  const renderStatsSection = () => {
    return (
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              key={`schools-${refreshKey}`}
              number={stats.schoolsVisited.toString()}
              label="Schools Visited"
              bgColor="bg-black"
              textColor="text-white"
            />
            <StatCard
              key={`classes-${refreshKey}`}
              number={`${stats.classesTaught}+`}
              label="Classes Taught"
              bgColor="bg-cyan-500"
              textColor="text-white"
            />
            <StatCard
              key={`students-${refreshKey}`}
              number={`${stats.studentsInspired}+`}
              label="Students Inspired"
              bgColor="bg-black"
              textColor="text-white"
            />
            <StatCard
              key={`countries-${refreshKey}`}
              number={(stats.countriesImpacted || 3).toString()}
              label="Countries Impacted"
              bgColor="bg-cyan-500"
              textColor="text-white"
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Hero section content remains the same */}
        <div className="relative">
          <div className="relative h-[500px] md:h-[600px] w-full">
            <Image src="/images/classroom.png" alt="StepSTEM classroom" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="text-white">Step</span>
                  <span className="text-cyan-400">STEM</span>
                </h1>
                <TypedText
                  messages={[
                    "Ignite Curiosity",
                    "Foster Innovation",
                    "Interactive Education",
                    "Advance Learning",
                    "Spark Change",
                    "Fuel Exploration",
                  ]}
                  className="text-3xl md:text-5xl font-bold mb-4"
                />
                <p className="text-white text-lg md:text-xl mb-8 bg-black/30 p-4 rounded-md">
                  Our dynamic StepSTEM educational program is dedicated to igniting curiosity and fostering innovation
                  among young learners. Partner with us to bring engaging and interactive STEM education to your
                  students, empowering them to explore, discover, and thrive in the exciting world of science,
                  technology, engineering, and mathematics.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/services">
                    <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 text-white border-white hover:bg-white/20"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ScrollIndicator />
        </div>
      </section>

      {/* Render the stats section */}
      {renderStatsSection()}

      {/* Rest of the homepage content remains the same */}
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
              <CardContent className="p-6 text-white">
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
                    className="h-6 w-6 text-white"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Interactive Lessons</h3>
                <p className="text-white">
                  Our unique and interactive lesson plan is designed to teach students about complex topics in an
                  engaging and fun way.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-none shadow-lg hover:bg-white/20 transition-all">
              <CardContent className="p-6 text-white">
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
                    className="h-6 w-6 text-white"
                  >
                    <path d="M14 2 14 8 20 8" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Lesson Plans</h3>
                <p className="text-white">
                  We provide comprehensive lesson plans that educators can use to teach STEM concepts in their
                  classrooms.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-none shadow-lg hover:bg-white/20 transition-all">
              <CardContent className="p-6 text-white">
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
                    className="h-6 w-6 text-white"
                  >
                    <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7 6 13 6 13s6-6 6-13Z" />
                    <circle cx="12" cy="8" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">School Visits</h3>
                <p className="text-white">
                  We visit schools to deliver hands-on STEM activities and experiments that make learning fun and
                  memorable.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" className="bg-white text-cyan-600 border-white hover:bg-white/90">
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
                  href="https://www.instagram.com/step_stem_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-colors"
                  aria-label="StepSTEM Instagram"
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
                  href="https://www.facebook.com/people/StepStem/61561957779641/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-colors"
                  aria-label="StepSTEM Facebook"
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
