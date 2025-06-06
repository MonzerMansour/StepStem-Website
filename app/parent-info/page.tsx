import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download, Mail, Phone, Calendar } from "lucide-react"
import Link from "next/link"

export default function ParentInfoPage() {
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
              <Link href="/how-it-works" className="text-gray-700 hover:text-[#00C9DB]">
                How It Works
              </Link>
              <Link href="/parent-info" className="text-[#00C9DB] font-semibold">
                Parent Info
              </Link>
            </nav>
            <Button asChild className="bg-[#00C9DB] hover:bg-[#00B5C7] text-white">
              <Link href="/register">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Parent <span className="text-[#00C9DB]">Information Hub</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our online STEM program. Find answers to common questions and helpful
            resources.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black">Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to the most common questions about our online STEM program
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tech-requirements">
                    <AccordionTrigger className="text-left font-semibold">
                      What technology do I need for my child to participate?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="mb-3">For our online STEM classes, you'll need:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>A computer, tablet, or smartphone with internet connection</li>
                        <li>Zoom app installed (for live classes)</li>
                        <li>Google account for Classroom access (for self-paced courses)</li>
                        <li>Basic household materials for hands-on activities (we provide supply lists)</li>
                        <li>Webcam and microphone (built-in is fine)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="missed-session">
                    <AccordionTrigger className="text-left font-semibold">
                      What if my child misses a live session?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="mb-3">Don't worry! We understand that schedules can be unpredictable:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>All live sessions are recorded and available for 30 days</li>
                        <li>Activity materials and instructions are shared in Google Classroom</li>
                        <li>Students can catch up on missed content at their own pace</li>
                        <li>Our instructors are available for one-on-one support if needed</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cost">
                    <AccordionTrigger className="text-left font-semibold">
                      Is there a cost for the program?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="mb-3">Our pricing varies by program type:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Live classes: $25-40 per session (depending on duration and materials)</li>
                        <li>Self-paced courses: $15-25 per module</li>
                        <li>Multi-class packages available at discounted rates</li>
                        <li>Financial assistance available - check the scholarship option during registration</li>
                        <li>All materials lists provided; most use common household items</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="recordings">
                    <AccordionTrigger className="text-left font-semibold">Are classes recorded?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="mb-3">Yes! Here's our recording policy:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>All live classes are automatically recorded</li>
                        <li>Recordings are available to registered students for 30 days</li>
                        <li>Student faces/voices may be included - we get consent during registration</li>
                        <li>Self-paced courses include pre-recorded video lessons</li>
                        <li>Recordings can be downloaded for offline viewing</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="age-appropriate">
                    <AccordionTrigger className="text-left font-semibold">
                      How do you ensure content is age-appropriate?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="mb-3">We carefully design all content for elementary learners:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Classes are grouped by grade ranges (K-2, 3-5, etc.)</li>
                        <li>Activities use safe, household materials only</li>
                        <li>Instructors are trained in child development and online safety</li>
                        <li>Content follows national STEM education standards</li>
                        <li>Parent/guardian supervision recommended for younger children</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="support">
                    <AccordionTrigger className="text-left font-semibold">
                      What kind of support is available?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="mb-3">We provide comprehensive support:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Technical support for platform access</li>
                        <li>Educational support from certified STEM instructors</li>
                        <li>Parent resources and progress updates</li>
                        <li>Accommodation support for students with special needs</li>
                        <li>24/7 email support and live chat during class hours</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Resources Sidebar */}
          <div className="space-y-6">
            {/* Weekly Schedule Downloads */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#00C9DB]" />
                  Weekly Schedules
                </CardTitle>
                <CardDescription>Download printable schedules for planning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Live Classes Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Self-Paced Deadlines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Supply Lists by Class
                </Button>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black">Contact Support</CardTitle>
                <CardDescription>Need help? We're here for you!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-[#00C9DB]" />
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm">support@stepstem.org</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-[#00C9DB]" />
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-sm">(555) 123-STEM</p>
                  </div>
                </div>
                <Button className="w-full bg-[#00C9DB] hover:bg-[#00B5C7] text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/classes">Browse All Classes</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/register">Register for Classes</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/online-program">Program Overview</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
