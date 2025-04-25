import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"

export default function ServicesPage() {
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
                Our core focus at StepSTEM Educational Program is to educate students on the dangers associated with oil
                spills, their long lasting impact on the environment, and the difficulty that comes with cleaning them
                up. Our unique and interactive lesson plan is designed to teach students about this complex topic in an
                engaging and fun way. Our educators lead students through a quick lesson, an exciting and hands-on
                experiment, and a quick game to finish. We believe that providing students with a hands-on, experiential
                learning environment will help them make meaningful and lasting connections with the material. Below is
                the lesson plan we will follow during our visit.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">
                Lesson Plans<span className="text-cyan-500">.</span>
              </h3>
              <p className="text-gray-700 mb-8">
                Below are the writeups for the StepSTEM program, the slide we will present to the students, and an
                approximate schedule of the lesson. Please note that edits to the content may be made according to the
                needs of the school we are visiting and the grade we are teaching.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
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
                    <h4 className="text-center font-medium mb-4">Lesson Plan 1</h4>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Download size={16} /> Download
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
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
                    <h4 className="text-center font-medium mb-4">Lesson Plan 2</h4>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Download size={16} /> Download
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
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
                    <h4 className="text-center font-medium mb-4">Lesson Plan 3</h4>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Download size={16} /> Download
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">
                Our Services<span className="text-cyan-500">.</span>
              </h3>

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

            <div className="mt-12 text-center">
              <Link href="/contact">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Request Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
