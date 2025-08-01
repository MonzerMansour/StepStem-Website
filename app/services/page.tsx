"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"
import LessonPlanDialog from "@/components/lesson-plan-dialog"

export default function ServicesPage() {
  const [activeLessonPlan, setActiveLessonPlan] = useState<string | null>(null)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)

  // Lesson Plan 1 Content
  const lessonPlan1Content = (
    <div className="prose prose-lg max-w-none">
      <div className="bg-cyan-50 p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-center mb-4">OIL CLEANUP CHALLENGE LESSON PLAN</h2>
        <h3 className="text-xl font-bold mb-4">LESSON PLAN</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-cyan-100">
              <th className="border border-gray-300 px-4 py-2">ACTION</th>
              <th className="border border-gray-300 px-4 py-2">DESCRIPTION</th>
              <th className="border border-gray-300 px-4 py-2">DURATION</th>
              <th className="border border-gray-300 px-4 py-2">NOTES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Setting Up</td>
              <td className="border border-gray-300 px-4 py-2">
                During the break before the program, we will come set up the tank and water in the outdoor area where
                the project will be held.
              </td>
              <td className="border border-gray-300 px-4 py-2">10-15 minutes (excluded from the total time)</td>
              <td className="border border-gray-300 px-4 py-2">
                This means we would prefer to have the program after lunch or recess
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium">Introduction</td>
              <td className="border border-gray-300 px-4 py-2">
                We introduce ourselves to the students, lead them outside, and let them choose the feathers to put in as
                marine life.
              </td>
              <td className="border border-gray-300 px-4 py-2">10 minutes</td>
              <td className="border border-gray-300 px-4 py-2">
                We would give the teacher some time to settle down the class after their break before entering
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Display</td>
              <td className="border border-gray-300 px-4 py-2">
                We will conduct a small show of a boat crossing the sea and accidentally dumping oil in it.
              </td>
              <td className="border border-gray-300 px-4 py-2">5 minutes</td>
              <td className="border border-gray-300 px-4 py-2">
                This would be funny and entertaining for the students
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium">Rules</td>
              <td className="border border-gray-300 px-4 py-2">
                We explain the rules to the students and show them the materials.
              </td>
              <td className="border border-gray-300 px-4 py-2">5 minutes</td>
              <td className="border border-gray-300 px-4 py-2">N/A</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Activity</td>
              <td className="border border-gray-300 px-4 py-2">
                Students come up and get two tries to scoop oil out of the tank.
              </td>
              <td className="border border-gray-300 px-4 py-2">15 minutes</td>
              <td className="border border-gray-300 px-4 py-2">
                One of us would entertain the students as the others guides the student scooping the oil
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-medium">Lesson (Simultaneous Cleanup)</td>
              <td className="border border-gray-300 px-4 py-2">
                We show how all the feathers are affected and how there is still so much oil in the tank. Then we give
                short lesson on real life spills and their effects.
              </td>
              <td className="border border-gray-300 px-4 py-2">5 minutes</td>
              <td className="border border-gray-300 px-4 py-2">
                This lesson could be cut short by the interest of the students which will be judged during the lesson
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">STEM and FTC</td>
              <td className="border border-gray-300 px-4 py-2">
                We talk about how the students can try to solve it and say how FTC could be a great program to get
                started with STEM
              </td>
              <td className="border border-gray-300 px-4 py-2">5 minutes</td>
              <td className="border border-gray-300 px-4 py-2">
                This lesson could be cut short by the interest of the students which will be judged during the lesson
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">Made with Visme</p>
      </div>
    </div>
  )

  // Contact Dialog Content
  const contactDialogContent = (
    <div className="text-center">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
          <FileText className="h-8 w-8 text-cyan-600" />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4">Access Restricted</h3>
      <p className="mb-6">
        This lesson plan is available upon request. Please contact us to get access to this material.
      </p>
      <div className="flex justify-center">
        <Link href="/#contact">
          <Button className="bg-cyan-500 hover:bg-cyan-600">Contact Us</Button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/students-activity.png"
              alt="StepSTEM students activity"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-white">WHAT </span>
                <span className="text-cyan-400">WE DO</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              PROGRAM <span className="text-cyan-500">&</span> PROJECTS
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mb-8"></div>

            <div className="prose prose-lg max-w-none">
              <p>
                At StepSTEM Educational Program, we offer a diverse range of STEM educational experiences covering
                various scientific and environmental topics. While one of our signature lessons focuses on oil spills,
                their environmental impact, and cleanup challenges, we also teach students about neuroscience, ocean
                acidification, renewable energy, and other important STEM subjects. Our unique and interactive lesson
                plans are designed to make complex topics engaging and accessible through hands-on activities tailored
                to different age groups.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Our Services</h3>

              <div className="grid md:grid-cols-2 gap-8">
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
                    <h4 className="text-xl font-bold mb-2">School Visits</h4>
                    <p className="text-gray-700 mb-4">
                      We bring our interactive STEM program directly to your school, providing hands-on learning
                      experiences for students of all ages.
                    </p>
                    <ul className="space-y-2 text-gray-700 mb-4">
                      <li className="flex items-center">
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
                          className="h-5 w-5 text-cyan-500 mr-2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        45-60 minute sessions
                      </li>
                      <li className="flex items-center">
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
                          className="h-5 w-5 text-cyan-500 mr-2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Hands-on experiments
                      </li>
                      <li className="flex items-center">
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
                          className="h-5 w-5 text-cyan-500 mr-2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        All materials provided
                      </li>
                    </ul>
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
                    <h4 className="text-xl font-bold mb-2">Curriculum Development</h4>
                    <p className="text-gray-700 mb-4">
                      We offer custom curriculum development for schools looking to enhance their STEM education
                      programs.
                    </p>
                    <ul className="space-y-2 text-gray-700 mb-4">
                      <li className="flex items-center">
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
                          className="h-5 w-5 text-cyan-500 mr-2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Grade-appropriate content
                      </li>
                      <li className="flex items-center">
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
                          className="h-5 w-5 text-cyan-500 mr-2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Aligned with standards
                      </li>
                      <li className="flex items-center">
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
                          className="h-5 w-5 text-cyan-500 mr-2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Teacher resources included
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">Lesson Plans</h3>
              <p className="text-gray-700 mb-8">
                Below are the writeups for the StepSTEM program, the slides we will present to the students, and an
                approximate schedule of the lesson. Please note that edits to the content may be made according to the
                needs of the school we are visiting and the grade we are teaching.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveLessonPlan("plan1")}
                >
                  <CardContent className="p-6">
                    <div className="bg-red-500 text-white text-center py-2 mb-4 rounded">PDF</div>
                    <div className="flex justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <h4 className="text-center font-medium mb-4">Oil Cleanup Challenge Lesson Plan</h4>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <FileText size={16} /> View Lesson Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setContactDialogOpen(true)}
                >
                  <CardContent className="p-6">
                    <div className="bg-red-500 text-white text-center py-2 mb-4 rounded">PDF</div>
                    <div className="flex justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <h4 className="text-center font-medium mb-4">Neuroscience Lesson Plan</h4>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <FileText size={16} /> Request Access
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setContactDialogOpen(true)}
                >
                  <CardContent className="p-6">
                    <div className="bg-red-500 text-white text-center py-2 mb-4 rounded">PDF</div>
                    <div className="flex justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <h4 className="text-center font-medium mb-4">Ocean Acidification and pH Lesson Plan</h4>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <FileText size={16} /> Request Access
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/#contact">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Request Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Plan 1 Dialog */}
      <LessonPlanDialog
        isOpen={activeLessonPlan === "plan1"}
        onClose={() => setActiveLessonPlan(null)}
        title="Oil Cleanup Challenge Lesson Plan"
        content={lessonPlan1Content}
      />

      {/* Contact Dialog for restricted lesson plans */}
      <LessonPlanDialog
        isOpen={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
        title="Request Access"
        content={contactDialogContent}
      />
    </>
  )
}
