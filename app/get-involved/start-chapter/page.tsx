import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StartChapterPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[400px] w-full">
            <Image src="/images/classroom.png" alt="Students in a classroom" fill className="object-cover" priority />
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
                <span className="text-white">START A </span>
                <span className="text-cyan-400">CHAPTER</span>
              </h1>
              <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md mb-6">
                Expand StepSTEM's reach by starting a chapter in your community. Lead the way in bringing engaging STEM
                education to students in your area.
              </p>
              <a
                href="https://docs.google.com/forms/d/1eJTYmfn287KMmh4eY3BOVOV1Uw-yFEVyXxBYlCVaQfw/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Apply to Start a Chapter <ExternalLink className="ml-2 h-4 w-4" />
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
              <h2>Why Start a StepSTEM Chapter?</h2>
              <p>
                Starting a StepSTEM chapter in your community is a powerful way to make a difference in the lives of
                young students. By bringing our proven curriculum and hands-on approach to your area, you'll help
                inspire the next generation of STEM innovators and environmental stewards.
              </p>

              <h3>Benefits of Starting a Chapter:</h3>
              <ul>
                <li>
                  <strong>Make a Local Impact:</strong> Bring engaging STEM education to schools in your community that
                  might not otherwise have access to these resources.
                </li>
                <li>
                  <strong>Develop Leadership Skills:</strong> Gain valuable experience in organization, teaching, and
                  community outreach.
                </li>
                <li>
                  <strong>Join a Network:</strong> Connect with like-minded individuals across the country who share
                  your passion for STEM education.
                </li>
                <li>
                  <strong>Receive Support:</strong> Get access to StepSTEM's curriculum, training, and resources to help
                  your chapter succeed.
                </li>
              </ul>

              <h3>What You'll Need:</h3>
              <ul>
                <li>A team of at least 2-3 dedicated individuals</li>
                <li>Connections to local elementary or middle schools</li>
                <li>Passion for STEM education and environmental awareness</li>
                <li>Basic organizational and communication skills</li>
              </ul>

              <h3>How We'll Support You:</h3>
              <ul>
                <li>Comprehensive training for chapter leaders</li>
                <li>Access to our full curriculum and teaching materials</li>
                <li>Marketing materials and recruitment strategies</li>
                <li>Ongoing mentorship from experienced chapter leaders</li>
                <li>Regular check-ins and support from the StepSTEM team</li>
              </ul>

              <p>
                Starting a chapter is a rewarding experience that allows you to make a tangible difference in your
                community while developing valuable skills and connections. We're looking for passionate individuals who
                are committed to our mission and ready to lead.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-gray-700 mb-6">
                Fill out our Chapter Interest Form to begin the process. Our team will review your application and
                contact you to discuss next steps.
              </p>
              <a
                href="https://docs.google.com/forms/d/1eJTYmfn287KMmh4eY3BOVOV1Uw-yFEVyXxBYlCVaQfw/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Start Chapter Application <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">Have questions about starting a chapter?</p>
              <Link href="/#contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
