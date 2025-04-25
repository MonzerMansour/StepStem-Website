"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

// Define environmental issues
const environmentalIssues = [
  {
    id: "glacier-melting",
    title: "Glacier Melting",
    image: "/images/env-glacier.png",
    description:
      "Rising global temperatures are causing glaciers to melt at an alarming rate, contributing to sea level rise and threatening coastal communities worldwide. This loss of ice also disrupts freshwater supplies for millions of people and alters fragile ecosystems that depend on glacial environments.",
  },
  {
    id: "deforestation",
    title: "Deforestation",
    image: "/images/env-deforestation.jpg",
    description:
      "Deforestation destroys critical habitats for countless species and disrupts the carbon cycle, accelerating climate change. Each year, millions of acres of forests are cleared for agriculture, logging, and development, leading to biodiversity loss, soil erosion, and increased greenhouse gas emissions.",
  },
  {
    id: "illegal-hunting",
    title: "Illegal Hunting",
    image: "/images/env-hunting.png",
    description:
      "Poaching poses a grave threat to biodiversity by driving numerous species to the brink of extinction, disrupting delicate ecosystems and upsetting natural balances. Beyond ecological consequences, it undermines local economies dependent on tourism and perpetuates organized crime networks, necessitating robust enforcement of wildlife protection laws and community engagement to combat this illicit activity.",
  },
  {
    id: "wildfires",
    title: "Wildfires",
    image: "/images/env-wildfire.jpg",
    description:
      "Increasingly severe and frequent wildfires devastate forests, destroy homes, and release massive amounts of carbon dioxide into the atmosphere. Climate change has created hotter, drier conditions that make wildfires more dangerous and difficult to control, threatening both natural ecosystems and human communities.",
  },
  {
    id: "plastic-pollution",
    title: "Plastic Pollution",
    image: "/images/env-pollution.jpg",
    description:
      "Plastic pollution has reached crisis levels in our oceans, with millions of tons entering marine environments annually. Marine animals mistake plastic for food or become entangled in it, leading to injury and death. Microplastics have now entered the food chain and are found in drinking water worldwide, posing potential health risks to humans.",
  },
]

export default function EnvironmentPage() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)

  const currentIssue = environmentalIssues.find((issue) => issue.id === selectedIssue)

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[400px] w-full">
            <Image src="/images/env-glacier.png" alt="Environmental issues" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/30 text-white border-white/30 hover:bg-black/50 hover:text-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to About
                  </Button>
                </Link>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-white">The Environment </span>
                <span className="text-cyan-400">Matters</span>
              </h1>
              <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md">
                Our program emphasizes the importance of environmental stewardship and conservation through hands-on
                learning experiences. Learn about the critical environmental issues we address in our curriculum.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <p>
                At StepSTEM, we believe that environmental education is a crucial component of STEM learning. By
                understanding the challenges our planet faces, students can develop the knowledge, skills, and
                motivation to become environmental stewards and problem-solvers.
              </p>
              <p>
                Our curriculum covers various environmental issues, teaching students about their causes, impacts, and
                potential solutions. Through hands-on activities and experiments, we make these complex topics
                accessible and engaging for young learners.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-8">
              Environmental Issues<span className="text-cyan-500">.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {environmentalIssues.map((issue) => (
                <Dialog key={issue.id}>
                  <DialogTrigger asChild>
                    <div
                      className="relative h-[250px] rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                      onClick={() => setSelectedIssue(issue.id)}
                    >
                      <Image
                        src={issue.image || "/placeholder.svg"}
                        alt={issue.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{issue.title}</h3>
                        <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {issue.description.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-[300px] md:h-auto">
                        <Image
                          src={issue.image || "/placeholder.svg"}
                          alt={issue.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <DialogHeader>
                          <div className="flex items-center justify-between">
                            <DialogTitle className="text-2xl font-bold">{issue.title}</DialogTitle>
                            <DialogClose asChild>
                              <Button variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                              </Button>
                            </DialogClose>
                          </div>
                          <DialogDescription className="text-lg mt-4">{issue.description}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-6">
                          <h4 className="font-bold mb-2">How We Teach This:</h4>
                          <p className="text-gray-700">
                            Our curriculum includes hands-on activities, experiments, and discussions that help students
                            understand the causes and effects of {issue.title.toLowerCase()}. Through these engaging
                            learning experiences, students develop critical thinking skills and are empowered to take
                            action.
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Our Environmental Education Approach</h3>
              <p className="text-gray-700 mb-4">
                Our environmental education program focuses on teaching students about the critical challenges facing
                our planet and empowering them with the knowledge and skills to make a difference. Through hands-on
                activities, experiments, and discussions, we explore topics such as climate change, pollution,
                conservation, and sustainable practices.
              </p>
              <p className="text-gray-700">
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
