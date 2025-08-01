"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getAllPeople, type Person } from "../actions/admin-actions"

export default function EllicottCityChapterPage() {
  const [teamMembers, setTeamMembers] = useState<Person[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTeamMembers() {
      try {
        const allPeople = await getAllPeople()
        const ellicottCityMembers = allPeople
          .filter((person) => person.chapter === "Ellicott City")
          .sort((a, b) => a.order - b.order)
        setTeamMembers(ellicottCityMembers)
      } catch (error) {
        console.error("Error loading team members:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTeamMembers()
  }, [])

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[500px] w-full">
            <Image src="/images/oil-spill-1.webp" alt="Oil spill aerial view" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="inline-block bg-cyan-500 px-4 py-1 mb-4"></div>
                <h1 className="text-7xl font-bold mb-4">
                  <span className="text-white">ELLICOTT CITY </span>
                  <span className="text-cyan-400">Chapter</span>
                </h1>
                <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md">
                  StepSTEM Educational Program is expanding to Ellicott City, Maryland. This chapter is dedicated to
                  bringing STEM education and environmental awareness to students in the area. Our team of passionate
                  educators and volunteers is committed to making a difference in the community by teaching students
                  about important environmental issues and inspiring the next generation of STEM leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">TEAM MEMBERS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {isLoading ? (
              <div className="col-span-3 text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading team members...</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No team members found for the Ellicott City chapter.
              </div>
            ) : (
              teamMembers.map((member, index) => (
                <div key={member.id} className="flex flex-col items-center text-center">
                  <div className="relative h-[250px] w-[200px] mb-6 overflow-hidden rounded-lg mx-auto">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-500 mb-2">{member.name}</h3>
                  <p className="text-gray-700 mb-4">{member.role}</p>
                  <p className="text-gray-600 text-base">{member.description || ""}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
