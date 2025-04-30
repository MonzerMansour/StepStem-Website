import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, School, Globe } from "lucide-react"

export default function DonatePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[400px] w-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stepstem-donation-page-photo.jpg-Opg5FLznSLUt1OV8s6IZfhb3Ogo4bN.jpeg"
              alt="StepSTEM educator teaching a classroom of elementary students"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-white">SUPPORT </span>
                <span className="text-cyan-400">OUR MISSION</span>
              </h1>
              <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md mb-6">
                Your donation helps us bring engaging STEM education to more students across the country. Together, we
                can inspire the next generation of environmental stewards and innovators.
              </p>
              <a href="https://hcb.hackclub.com/donations/start/stepstem" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Donate Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Why Support StepSTEM<span className="text-cyan-500">?</span>
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-12"></div>

            <div className="prose prose-lg max-w-none mb-12">
              <p>
                At StepSTEM, we believe that every child deserves access to quality STEM education. Your donation helps
                us expand our reach, develop new curriculum materials, and bring our hands-on learning experiences to
                underserved communities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Educational Materials</h3>
                  <p className="text-gray-700">
                    Your donation helps us develop and distribute high-quality educational materials to schools across
                    the country.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <School className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">School Programs</h3>
                  <p className="text-gray-700">
                    We use donations to fund our visits to schools, bringing hands-on STEM activities directly to
                    students.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Program Expansion</h3>
                  <p className="text-gray-700">
                    Your support helps us expand to new regions, reaching more students with our environmental education
                    programs.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg mb-16">
              <h3 className="text-2xl font-bold mb-4">Where Your Money Goes</h3>
              <p className="text-gray-700 mb-6">
                We're committed to transparency and ensuring your donation makes the maximum impact. Here's how we
                allocate the funds we receive:
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-500 mb-2">70%</div>
                  <p className="text-gray-700">Program Development & Delivery</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-500 mb-2">20%</div>
                  <p className="text-gray-700">Educational Materials & Supplies</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-500 mb-2">10%</div>
                  <p className="text-gray-700">Administrative & Outreach</p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold mb-2">Is my donation tax-deductible?</h4>
                  <p className="text-gray-700">
                    StepSTEM is a registered 501(c)(3) nonprofit organization. Donations are tax-deductible to the
                    extent allowed by law, and appropriate documentation will be provided for your tax purposes.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">How are my donations used?</h4>
                  <p className="text-gray-700">
                    We use donations for supplies and programs to further our organization. Your contributions directly
                    support our educational initiatives, allowing us to purchase necessary materials, develop
                    curriculum, and bring STEM education to more students across different communities.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Can I donate materials instead of money?</h4>
                  <p className="text-gray-700">
                    Yes, we accept in-kind donations of educational materials, supplies, and equipment. Please contact
                    us to discuss your specific donation and how it can support our programs.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
              <p className="text-gray-700 mb-6">
                Your support helps us inspire the next generation of environmental stewards and STEM innovators. Every
                donation, no matter the size, makes a difference.
              </p>
              <a href="https://hcb.hackclub.com/donations/start/stepstem" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                  Donate Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
