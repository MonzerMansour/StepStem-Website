"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface EnvironmentalCarouselProps {
  isOpen: boolean
  onClose: () => void
  initialIssueId?: string
}

export default function EnvironmentalCarousel({ isOpen, onClose, initialIssueId }: EnvironmentalCarouselProps) {
  const initialIndex = initialIssueId ? environmentalIssues.findIndex((issue) => issue.id === initialIssueId) : 0
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0)

  if (!isOpen) return null

  const currentIssue = environmentalIssues[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? environmentalIssues.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === environmentalIssues.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div
        className="relative max-w-5xl w-full mx-4 bg-white rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-[300px] md:h-[500px]">
            <Image
              src={currentIssue.image || "/placeholder.svg"}
              alt={currentIssue.title}
              fill
              className="object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{currentIssue.title}</h2>
            <p className="text-gray-700 mb-6">{currentIssue.description}</p>
            <div className="mt-6">
              <h4 className="font-bold mb-2">How We Teach This:</h4>
              <p className="text-gray-700">
                Our curriculum includes hands-on activities, experiments, and discussions that help students understand
                the causes and effects of {currentIssue.title.toLowerCase()}. Through these engaging learning
                experiences, students develop critical thinking skills and are empowered to take action.
              </p>
            </div>
            <div className="flex justify-between mt-8">
              <div className="text-sm text-gray-500">
                {currentIndex + 1} of {environmentalIssues.length}
              </div>
              <div className="flex gap-1">
                {environmentalIssues.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-cyan-500" : "bg-gray-300"}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
