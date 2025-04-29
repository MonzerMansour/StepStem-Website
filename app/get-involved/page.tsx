import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Handshake } from "lucide-react"

export default function GetInvolvedPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/students-activity.png"
              alt="Students engaged in STEM activities"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-white">GET </span>
                <span className="text-cyan-400">INVOLVED</span>
              </h1>
              <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md">
                Join us in our mission to inspire the next generation through STEM education. There are multiple ways
                you can get involved with StepSTEM and make a difference in your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Ways to Get Involved<span className="text-cyan-500">.</span>
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-12"></div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Start a Chapter</h3>
                  <p className="text-gray-700 mb-6">
                    Bring StepSTEM to your community by starting a new chapter. Lead the way in providing STEM education
                    to students in your area.
                  </p>
                  <Link href="/get-involved/start-chapter" className="mt-auto">
                    <Button className="bg-cyan-500 hover:bg-cyan-600">Learn More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Become an Ambassador</h3>
                  <p className="text-gray-700 mb-6">
                    Represent StepSTEM in your school or community. Help spread awareness about our mission and
                    programs.
                  </p>
                  <Link href="/get-involved/ambassador" className="mt-auto">
                    <Button className="bg-cyan-500 hover:bg-cyan-600">Learn More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <Handshake className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Partner with Us</h3>
                  <p className="text-gray-700 mb-6">
                    Collaborate with StepSTEM as a school, organization, or business. Together, we can create greater
                    impact.
                  </p>
                  <Link href="/get-involved/partner" className="mt-auto">
                    <Button className="bg-cyan-500 hover:bg-cyan-600">Learn More</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                StepSTEM is growing rapidly, and we need passionate individuals and organizations to help us reach more
                students. Whether you're a student, educator, parent, or community leader, there's a place for you in
                our mission to inspire the next generation of STEM innovators.
              </p>
              <Link href="/#contact">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Contact Us for More Information
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
