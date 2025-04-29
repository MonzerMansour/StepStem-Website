import Image from "next/image"

export default function EllicottCityChapterPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Rowah Abdelghani",
      role: "Educator",
      image: "/images/rowah-abdelghani.jpeg",
      bio: "Rowah is a member of the class of 2026 at Marriotts Ridge High School. She enjoys many hobbies such as crocheting, reading, Taekwondo, debate and robotics. She is interested in biotechnology and robotics, and hopes to pursue either research or forensics.",
    },
    {
      name: "Sawinder Kaur",
      role: "Educator",
      image: "/images/sawinder-kaur.jpeg",
      bio: "Sawinder is a member of the class of 2026 at Marriotts Ridge High School. Outside of her academic pursuits, she is passionate about badminton and the violin. She has a strong interest in STEM related topics, particularly in biology, and is fascinated by physiology. Looking ahead, she plan to major in biology, with aspirations to pursue a career in medicine, where she can use her education to make a meaningful impact.",
    },
    {
      name: "Hansika Vegesna",
      role: "Educator",
      image: "/images/hansika-vegesna.jpeg",
      bio: "Hansika Vegesna is a member of the class of 2026 at Marriotts Ridge High School. She is committed to StepSTEM's mission of introducing STEM concepts to young children. In her free time, she enjoys watching, reading, helping the community, and spending time with her friends and family.",
    },
  ]

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
