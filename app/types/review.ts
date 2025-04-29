export type Review = {
  id: string
  name: string
  role?: string
  school: string
  content: string
  rating: number
  date: string
  source?: string
}

// Default reviews for initialization
export const DEFAULT_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Principal Leanna Goldenberg",
    role: "Principal",
    school: "Montague Elementary School",
    content:
      "Rohit Pandravada and Akhil Ranjeet, as part of their FTC (First Tech Challenge) STEM program, have embarked on a mission to inspire and educate our 2nd graders with innovative science lessons. These young visionaries brainstormed a variety of engaging science innovation lessons, and our 2nd-grade teacher team enthusiastically selected the STEM Oil Clean-Up Challenge as their project. Rohit and Akhil meticulously planned and flawlessly executed an interactive and captivating lesson for our second graders. Their collaboration with our teachers, combined with their exemplary class management skills, resulted in an enriching learning experience for our students.",
    rating: 5,
    date: "August 25, 2023",
  },
  {
    id: "2",
    name: "Montague Weekly Newsletter",
    school: "Montague Elementary School",
    content:
      "This lesson focused on bringing awareness to the real life issue of oil spill pollution and the difficulties scientist and engineers face when trying to clean oil out of our waterways and oceans. The second graders were engaged and excited to be learning along with kids just like them! We are very proud of these student leaders and look forward to promoting their program. Thank you Akhil and Rohit for all the work that went into planning and implementing such an engaging lesson for our students!",
    rating: 5,
    date: "August 25, 2023",
    source: "Montague Weekly Newsletter",
  },
  {
    id: "3",
    name: "Principal Leanna Goldenberg",
    role: "Principal",
    school: "Montague Elementary School",
    content:
      "The StepSTEM program is a wonderful presentation that fit right into my school's science curriculum! Akhil and Prutha were well prepared and knowledgeable, they built a quick rapport with my students, and they kept the class engaged with their fun and educational activities. They taught students about the dangers, challenges, and environmental impacts of oil spills, and how scientists can help. At the end of the presentation, students were inspired to create a positive impact on their environment! Thank you for bringing StepSTEM to my classroom!",
    rating: 5,
    date: "March 15, 2024",
  },
  {
    id: "4",
    name: "Ms. Nina Paoloni",
    role: "Teacher",
    school: "Stratford Pomeroy Elementary",
    content:
      "The high school students who presented the lesson about oil spills to our 2nd and 3rd graders did an outstanding job! They were incredibly well-prepared and delivered a lesson that was both educational and engaging. The activities they planned were interactive and really captured the students' attention. One highlight was when the younger students got to participate in cleaning up an oil spill by scooping out the oil from the water—a hands-on activity that they thoroughly enjoyed! Throughout the entire lesson, the older students were remarkably polite and intentional in their interactions. They fostered a positive learning environment and left a lasting impression on both the students and teachers alike. It was a pleasure to see such dedication and enthusiasm for teaching and learning. Great job to all involved!",
    rating: 5,
    date: "February 8, 2024",
  },
  {
    id: "5",
    name: "Ms. Saravanan",
    role: "Teacher",
    school: "Stratford Winchester Elementary",
    content:
      "Thank you for your presentation yesterday about oil spills and their impact on marine organisms. The lesson aligned perfectly with the environmental citizenship topics we've been focusing on with the students. Your lesson was well-planned and delivered, and the execution was smooth and age-appropriate.",
    rating: 5,
    date: "January 22, 2024",
  },
]
