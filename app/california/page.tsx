"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getCaliforniaStats } from "../actions/admin-actions"

export default function CaliforniaChapterPage() {
  const [stats, setStats] = useState({
    schoolsVisited: 8,
    classesTaught: 20,
    studentsInspired: 500,
  })

  useEffect(() => {
    async function loadStats() {
      try {
        const caStats = await getCaliforniaStats()
        setStats(caStats as any)
      } catch (error) {
        console.error("Error loading California stats:", error)
      }
    }

    loadStats()
  }, [])

  // Team members data
  const teamMembers = [
    {
      name: "Akhil Ranjeet",
      role: "Co-President of StepSTEM",
      image: "/images/akhil.png",
      bio: "Akhil Ranjeet is a member of the class of 2028 at Saint Francis High School. He believes that all students should experience the wonders of STEM and understand the importance of our environment. In his free time, he enjoys playing the piano, tennis, reading, and spreading STEM to his community.",
    },
    {
      name: "Monzer Mansour",
      role: "Web Director of StepSTEM",
      image: "/images/web-director.png",
      bio: "Monzer Mansour is a member of the class of 2028 at Saint Francis High School. He is passionate about web development and creating digital experiences that help spread STEM education. In his free time, he enjoys coding, traveling, and exploring new technologies that can enhance StepSTEM's online presence.",
    },
    {
      name: "Prutha Pandit",
      role: "Marketing Director of StepSTEM",
      image: "/images/prutha.png",
      bio: "Prutha Pandit is a member of the class of 2028 at Stratford Preparatory Blackford. She is dedicated to StepSTEM's goal of enlightening students about STEM and environmental issues. In her free time, she enjoys swimming, art, writing, teaching students, and spending time with her friends and family.",
    },
    {
      name: "Rohit Pandravada",
      role: "Co-President of StepSTEM",
      image: "/images/rohit.png",
      bio: "Rohit Pandravada is a member of the class of 2028 at Santa Clara High School. He is committed to StepSTEM's mission of spreading joy and knowledge throughout the local children community. In his free time, he finds passion in singing, playing the violin, playing tennis, and helping the community.",
    },
    {
      name: "Arhaan Swaminath",
      role: "Educator",
      image: "/images/arhaan-swaminath.jpg",
      bio: "Arhaan Swaminath is a member of the class of 2028 at Santa Clara High School. With two years of robotics experience, he is passionate about engineering and mathematics. In his free time, he enjoys playing the viola, 3D printing, and competing in shotput and discus.",
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[500px] w-full">
            <Image
              src="/images/california-header.png"
              alt="Oil spill aerial view"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="inline-block bg-cyan-500 px-4 py-1 mb-4"></div>
                <h1 className="text-7xl font-bold mb-4">
                  <span className="text-white">SILICON VALLEY </span>
                  <span className="text-cyan-400">Chapter</span>
                </h1>
                <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md">
                  StepSTEM Educational Program was founded by a group of passionate high school students from the Bay
                  Area, California. The program is powered by young individuals who are driven to make a difference in
                  the world. They are dedicated to educating students about STEM and environmental issues, believing
                  that these fields hold the key to a better future. Meet the team of forward-thinking student educators
                  and learn about the roles they play in StepSTEM below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              TEAM MEMBERS<span className="text-cyan-500">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* First row: Akhil and Rohit */}
            <div className="flex flex-col items-center text-center">
              <div className="relative h-[250px] w-[200px] mb-6 overflow-hidden rounded-lg mx-auto">
                <Image
                  src={teamMembers[0].image || "/placeholder.svg"}
                  alt={teamMembers[0].name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-2">{teamMembers[0].name}</h3>
              <p className="text-gray-700 mb-4">{teamMembers[0].role}</p>
              <p className="text-gray-600 text-base">{teamMembers[0].bio}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative h-[250px] w-[200px] mb-6 overflow-hidden rounded-lg mx-auto">
                <Image
                  src={teamMembers[3].image || "/placeholder.svg"}
                  alt={teamMembers[3].name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-2">{teamMembers[3].name}</h3>
              <p className="text-gray-700 mb-4">{teamMembers[3].role}</p>
              <p className="text-gray-600 text-base">{teamMembers[3].bio}</p>
            </div>

            {/* Second row: Monzer and Prutha */}
            <div className="flex flex-col items-center text-center">
              <div className="relative h-[250px] w-[200px] mb-6 overflow-hidden rounded-lg mx-auto">
                <Image
                  src={teamMembers[1].image || "/placeholder.svg"}
                  alt={teamMembers[1].name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-2">{teamMembers[1].name}</h3>
              <p className="text-gray-700 mb-4">{teamMembers[1].role}</p>
              <p className="text-gray-600 text-base">{teamMembers[1].bio}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative h-[250px] w-[200px] mb-6 overflow-hidden rounded-lg mx-auto">
                <Image
                  src={teamMembers[2].image || "/placeholder.svg"}
                  alt={teamMembers[2].name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-2">{teamMembers[2].name}</h3>
              <p className="text-gray-700 mb-4">{teamMembers[2].role}</p>
              <p className="text-gray-600 text-base">{teamMembers[2].bio}</p>
            </div>
          </div>

          {/* Third row: Arhaan */}
          <div className="max-w-md mx-auto mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-[250px] w-[200px] mb-6 overflow-hidden rounded-lg mx-auto">
                <Image
                  src={teamMembers[4].image || "/placeholder.svg"}
                  alt={teamMembers[4].name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-2">{teamMembers[4].name}</h3>
              <p className="text-gray-700 mb-4">{teamMembers[4].role}</p>
              <p className="text-gray-600 text-base">{teamMembers[4].bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Our Silicon Valley Impact<span className="text-cyan-500">.</span>
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-8"></div>

            <div className="prose prose-lg max-w-none mb-12">
              <p>
                The Silicon Valley Chapter of StepSTEM has been making significant strides in bringing STEM education to
                schools across the Bay Area. Our dedicated team has visited multiple schools, reaching hundreds of
                students with our interactive lessons on environmental science and oil spill cleanup.
              </p>
              <p>
                Our program has been particularly successful in helping students understand the environmental challenges
                facing Silicon Valley, from drought and wildfires to coastal pollution. Through hands-on experiments and
                engaging activities, we're inspiring the next generation of environmental stewards and STEM
                professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
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
                  <h3 className="text-xl font-bold mb-2">{stats.schoolsVisited} Schools</h3>
                  <p className="text-gray-700">
                    We've visited {stats.schoolsVisited} schools across the Bay Area, bringing our interactive STEM
                    program to diverse communities.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{stats.studentsInspired}+ Students</h3>
                  <p className="text-gray-700">
                    We've reached over {stats.studentsInspired} students with our engaging STEM curriculum and hands-on
                    experiments.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
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
                  <h3 className="text-xl font-bold mb-2">{stats.classesTaught}+ Classes</h3>
                  <p className="text-gray-700">
                    We've conducted over {stats.classesTaught} classes, each featuring our specialized curriculum on
                    environmental science and oil spill cleanup.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Future Plans</h3>
              <p className="text-gray-700 mb-6">
                The Silicon Valley Chapter of StepSTEM is expanding rapidly. Our goals for the coming year include:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
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
                    className="h-5 w-5 text-cyan-500 mr-2 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Reaching 10 more schools across Silicon Valley</span>
                </li>
                <li className="flex items-start">
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
                    className="h-5 w-5 text-cyan-500 mr-2 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    Developing new curriculum modules focused on Silicon Valley's specific environmental challenges
                  </span>
                </li>
                <li className="flex items-start">
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
                    className="h-5 w-5 text-cyan-500 mr-2 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Partnering with local environmental organizations for field trips and extended learning</span>
                </li>
                <li className="flex items-start">
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
                    className="h-5 w-5 text-cyan-500 mr-2 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Expanding our team of educators and volunteers</span>
                </li>
              </ul>

              <div className="text-center mt-8">
                <Link href="/#contact">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                    Get Involved
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
