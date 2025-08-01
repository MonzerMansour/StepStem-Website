"use client"

import { useState } from "react"
import Image from "next/image"
import EnvironmentalCarousel from "./environmental-carousel"

// Define environmental issues
const environmentalIssues = [
  {
    id: "glacier-melting",
    title: "Glacier Melting",
    image: "/images/env-glacier.png",
    description:
      "Rising global temperatures are causing glaciers to melt at an alarming rate, contributing to sea level rise.",
  },
  {
    id: "deforestation",
    title: "Deforestation",
    image: "/images/env-deforestation.jpg",
    description:
      "Deforestation destroys critical habitats for countless species and disrupts the carbon cycle, accelerating climate change.",
  },
  {
    id: "illegal-hunting",
    title: "Illegal Hunting",
    image: "/images/env-hunting.png",
    description:
      "Poaching poses a grave threat to biodiversity by driving numerous species to the brink of extinction.",
  },
  {
    id: "wildfires",
    title: "Wildfires",
    image: "/images/env-wildfire.jpg",
    description:
      "Increasingly severe and frequent wildfires devastate forests, destroy homes, and release carbon dioxide.",
  },
  {
    id: "plastic-pollution",
    title: "Plastic Pollution",
    image: "/images/env-pollution.jpg",
    description:
      "Plastic pollution has reached crisis levels in our oceans, with millions of tons entering marine environments annually.",
  },
]

export default function EnvironmentalIssues() {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false)
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null)

  const openCarousel = (issueId: string) => {
    setSelectedIssueId(issueId)
    setIsCarouselOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {environmentalIssues.map((issue) => (
          <div
            key={issue.id}
            className="relative h-[200px] md:h-[300px] overflow-hidden cursor-pointer group"
            onClick={() => openCarousel(issue.id)}
          >
            <Image
              src={issue.image || "/placeholder.svg"}
              alt={issue.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-xl font-bold text-white mb-2">{issue.title}</h3>
              <p className="text-white/90 text-sm">{issue.description}</p>
            </div>
          </div>
        ))}
      </div>

      <EnvironmentalCarousel
        isOpen={isCarouselOpen}
        onClose={() => setIsCarouselOpen(false)}
        initialIssueId={selectedIssueId || undefined}
      />
    </>
  )
}
