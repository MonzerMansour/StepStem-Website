import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AmbassadorPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/stepstem-students-group.png"
              alt="StepSTEM student ambassadors"
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
                <span className="text-white">BECOME AN </span>
                <span className="text-cyan-400">AMBASSADOR</span>
              </h1>
              <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md mb-6">
                Represent StepSTEM in your school and community. Help us spread awareness about our mission and inspire
                others to get involved in STEM education.
              </p>
              <a
                href="https://docs.google.com/forms/d/1XIepGlzKJ8bZe4N2doUUgGuilpzeqRRI1UhQOV-QFD0/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Apply to Become an Ambassador <ExternalLink className="ml-2 h-4 w-4" />
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
              <h2>The StepSTEM Ambassador Program</h2>
              <p>
                StepSTEM Ambassadors are passionate advocates who represent our organization in their schools and
                communities. As an Ambassador, you'll help raise awareness about environmental issues and STEM
                education, while developing valuable leadership and communication skills.
              </p>

              <h3>What Ambassadors Do:</h3>
              <ul>
                <li>
                  <strong>Represent StepSTEM:</strong> Serve as the face of StepSTEM in your school or community,
                  sharing our mission and values.
                </li>
                <li>
                  <strong>Raise Awareness:</strong> Educate others about environmental issues and the importance of STEM
                  education.
                </li>
                <li>
                  <strong>Organize Events:</strong> Host information sessions, workshops, or fundraisers to support
                  StepSTEM's mission.
                </li>
                <li>
                  <strong>Connect Schools:</strong> Help identify and connect with schools that could benefit from our
                  programs.
                </li>
                <li>
                  <strong>Share Content:</strong> Create and share content about StepSTEM on social media and other
                  platforms.
                </li>
              </ul>

              <h3>Benefits of Being an Ambassador:</h3>
              <ul>
                <li>Develop leadership, public speaking, and organizational skills</li>
                <li>Build your resume with meaningful volunteer experience</li>
                <li>Connect with a network of like-minded individuals</li>
                <li>Receive exclusive StepSTEM merchandise and recognition</li>
                <li>Make a real difference in your community</li>
                <li>Potential for letters of recommendation and references</li>
              </ul>

              <h3>Who Can Apply:</h3>
              <p>
                We welcome applications from middle school, high school, and college students who are passionate about
                STEM education and environmental issues. The ideal Ambassador is:
              </p>
              <ul>
                <li>Enthusiastic about STEM and environmental education</li>
                <li>A good communicator with strong interpersonal skills</li>
                <li>Reliable and able to commit 2-4 hours per month</li>
                <li>Creative and willing to take initiative</li>
                <li>Interested in making a positive impact in their community</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Apply to Become an Ambassador</h3>
              <p className="text-gray-700 mb-6">
                Ready to represent StepSTEM? Fill out our Ambassador Application Form to get started. Our team will
                review your application and contact you about next steps.
              </p>
              <a
                href="https://docs.google.com/forms/d/1XIepGlzKJ8bZe4N2doUUgGuilpzeqRRI1UhQOV-QFD0/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Ambassador Application <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">Have questions about the Ambassador program?</p>
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
