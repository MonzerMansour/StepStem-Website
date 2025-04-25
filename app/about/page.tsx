import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import EnvironmentalIssues from "@/components/environmental-issues"

export default function AboutPage() {
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
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-white">ABOUT </span>
                <span className="text-cyan-400">StepSTEM</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              MISSION <span className="text-cyan-500">&</span> HISTORY
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mb-8"></div>

            <div className="prose prose-lg max-w-none">
              <p>
                At StepSTEM Educational Program, we believe that children are the future, and it's our duty to enlighten
                and educate them. Our mission is to provide a fun and interactive environment where they can learn about
                STEM-related topics while gaining knowledge that will benefit them for life. Our program is specifically
                designed to introduce them to STEM-related topics, particularly the environment and how to save it. We
                recognize the importance of cultivating the next generation of innovators, and with our program, we aim
                to do just that.
              </p>

              <p>
                We offer an immersive experience that is focused on the students, providing them with the knowledge they
                need to be successful in life. Our lessons are engaging, fun, and interactive, cultivating to the
                students' needs. Visit our services page to learn more about how we can help your child grasp the
                concepts of science, technology, engineering, and mathematics, and inspire them to become the next
                generation of innovators.
              </p>

              <p>
                StepSTEM Educational Program started as a passion project between two middle schoolers who wanted to
                make a difference in their community. What began as an initiative to teach second graders at their local
                elementary school grew into something much bigger. We have developed into a program that hopes to impact
                children all around the Bay Area! At StepSTEM, we believe that every child deserves access to the
                limitless opportunities that STEM can provide. Join us on this journey of discovery and exploration!
              </p>
            </div>

            <div className="mt-12">
              <Link href="/services">
                <Button className="bg-cyan-500 hover:bg-cyan-600">Explore Our Services</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Environment Matters<span className="text-cyan-500">.</span>
            </h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our environmental education program focuses on teaching students about the critical challenges facing our
              planet and empowering them with the knowledge and skills to make a difference.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <EnvironmentalIssues />
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-center">
                We believe that by fostering a deep connection to the natural world and an understanding of
                environmental issues at a young age, we can inspire the next generation of environmental stewards who
                will work to protect and preserve our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
