import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { School, Building2, Users } from "lucide-react"

export default function PartnerPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/outdoor-class.png"
              alt="StepSTEM outdoor class"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/get-involved">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/30 text-white border-white/30 hover:bg-black/50 hover:text-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Get Involved
                  </Button>
                </Link>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-white">PARTNER </span>
                <span className="text-cyan-400">WITH US</span>
              </h1>
              <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md mb-6">
                Collaborate with StepSTEM to create greater impact. We partner with schools, organizations, and
                businesses to bring STEM education to more students.
              </p>
              <a
                href="https://docs.google.com/forms/d/17anQLrAocMnRIKRddgtfQ1Nf7GGW4zDMo_Kepn8WJLI/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Submit Partnership Interest <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <h2>Partnership Opportunities</h2>
              <p>
                At StepSTEM, we believe in the power of collaboration. By partnering with schools, organizations, and
                businesses, we can expand our reach and create a greater impact in STEM education. We offer various
                partnership opportunities tailored to different types of organizations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <School className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Schools</h3>
                  <p className="text-gray-700 mb-4">
                    Partner with us to bring our STEM curriculum to your students. We offer flexible programs that can
                    be integrated into your existing schedule.
                  </p>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li>• In-school workshops and presentations</li>
                    <li>• After-school programs</li>
                    <li>• Custom curriculum development</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Organizations</h3>
                  <p className="text-gray-700 mb-4">
                    Collaborate with us to expand your educational offerings or community outreach initiatives.
                  </p>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li>• Co-branded educational programs</li>
                    <li>• Joint grant applications</li>
                    <li>• Resource sharing</li>
                    <li>• Cross-promotion opportunities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Businesses</h3>
                  <p className="text-gray-700 mb-4">
                    Support our mission while enhancing your corporate social responsibility initiatives.
                  </p>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li>• Sponsorship opportunities</li>
                    <li>• Employee volunteer programs</li>
                    <li>• Donation matching</li>
                    <li>• Event hosting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <h3>Benefits of Partnering with StepSTEM</h3>
              <ul>
                <li>
                  <strong>Access to Quality STEM Education:</strong> Bring our proven curriculum and engaging teaching
                  methods to your community.
                </li>
                <li>
                  <strong>Customized Solutions:</strong> We work with you to develop programs that meet your specific
                  needs and goals.
                </li>
                <li>
                  <strong>Increased Impact:</strong> Together, we can reach more students and make a greater difference
                  in STEM education.
                </li>
                <li>
                  <strong>Enhanced Visibility:</strong> Partnership opportunities include co-branding and
                  cross-promotion.
                </li>
                <li>
                  <strong>Community Engagement:</strong> Demonstrate your commitment to education and environmental
                  awareness.
                </li>
              </ul>

              <h3>Our Partnership Process</h3>
              <ol>
                <li>
                  <strong>Initial Consultation:</strong> We'll discuss your goals, needs, and how we might work
                  together.
                </li>
                <li>
                  <strong>Proposal Development:</strong> Based on our conversation, we'll create a customized
                  partnership proposal.
                </li>
                <li>
                  <strong>Agreement:</strong> Once we've aligned on the details, we'll formalize our partnership.
                </li>
                <li>
                  <strong>Implementation:</strong> We'll work together to bring our partnership to life.
                </li>
                <li>
                  <strong>Evaluation and Growth:</strong> We'll regularly assess our impact and look for ways to enhance
                  our collaboration.
                </li>
              </ol>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Interested in Partnering with Us?</h3>
              <p className="text-gray-700 mb-6">
                Fill out our Partnership Interest Form to start the conversation. Our team will review your information
                and contact you to discuss potential collaboration opportunities.
              </p>
              <a
                href="https://docs.google.com/forms/d/17anQLrAocMnRIKRddgtfQ1Nf7GGW4zDMo_Kepn8WJLI/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Partnership Interest Form <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">Have specific questions about partnerships?</p>
              <Link href="/#contact">
                <Button variant="outline">Contact Us Directly</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
