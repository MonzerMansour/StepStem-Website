import Image from "next/image"

export default function CalgaryChapterPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Lexi Strachan",
      role: "Educator",
      image: "/images/lexi-strachan.jpeg",
      bio: "Lexi Strachan is a 9th grade student at F.E.O Junior High. She is very passionate about dancing, and loves music and science class.",
    },
    {
      name: "Deeksha Bagga",
      role: "Educator",
      image: "/images/deeksha-bagga.jpeg",
      bio: "Deeksha Bagga is a grade 9 student at FE Osborn. She's extremely passionate about sciences such as Biology, chemistry and medicine.",
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative">
          <div className="relative h-[500px] w-full">
            <Image
              src="/images/oil-spill-2.jpeg"
              alt="Oil spill cleanup operation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="inline-block bg-cyan-500 px-4 py-1 mb-4"></div>
                <h1 className="text-7xl font-bold mb-4">
                  <span className="text-white">CALGARY </span>
                  <span className="text-cyan-400">Chapter</span>
                </h1>
                <p className="text-white text-lg max-w-2xl bg-black/30 p-4 rounded-md">
                  StepSTEM Educational Program is proud to announce our expansion to Calgary, Alberta. This chapter
                  brings our innovative STEM curriculum to Canadian students, focusing on environmental education and
                  sustainability. Our dedicated team is passionate about inspiring young minds to become future
                  environmental stewards and STEM innovators through engaging, hands-on learning experiences.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative h-[250px] w-[200px] mb-6 overflow-hidden rounded-lg mx-auto">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-cyan-500 mb-2">{member.name}</h3>
                <p className="text-gray-700 mb-4">{member.role}</p>
                <p className="text-gray-600 text-base">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
