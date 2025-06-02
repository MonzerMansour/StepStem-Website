"use server"

import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"

export interface NewsArticle {
  id: string
  title: string
  slug: string
  image?: string
  date: string
  readTime: string
  views: number
  comments: number
  excerpt: string
  author: string
  content: string
  published: boolean
}

const NEWS_KEY = "news_articles"

// Default articles to initialize the system
const DEFAULT_ARTICLES: NewsArticle[] = [
  {
    id: "singapore-oil-spill",
    title: "Unraveling the Singapore Oil Spill Disaster",
    slug: "singapore-oil-spill",
    image: "/images/oil-spill-cleanup.webp",
    date: "Jul 16, 2024",
    readTime: "3 min read",
    views: 15,
    comments: 0,
    excerpt: "An in-depth look at the recent oil spill in Singapore and its environmental impact on marine ecosystems.",
    author: "stepSTEM24",
    content: `StepSTEM not only teaches students about the nature of oil spills and the STEM prospects available, but also emphasizes that this environmental problem remains relevant in the present day. Following the incident, we incorporated it into our 2024 revised curriculum, accessible under the Our Service section of the website. We tailor our explanation to suit the students' comprehension level, while also upholding our commitment to raising awareness. As part of this mission, we have written a detailed article covering the 2024 Singapore oil spill, including its cause, clean-up efforts, and impact.

On June 14, 2024, a significant maritime incident took place near the Pasir Panjang Terminal in Singapore, involving two vessels: the Netherlands-flagged dredger Vox Maxima and the stationary Singapore-flagged bunker vessel Marine Honour. The collision occurred at 2:18 pm, resulting in a devastating allision that led to the spillage of approximately 400 tonnes of low-sulfur fuel oil into the waters surrounding the area.

The collision led to immediate emergency response actions by local authorities and environmental agencies to manage and reduce the environmental impact of the oil spill. The marine ecosystem, including marine life and coastal habitats, faced a significant threat from the spilled fuel oil. The Maritime and Port Authority (MPA) notified the Sentosa Development Corporation (SDC) about the spill around 3:30 pm. Subsequently, the SDC cordoned off the affected areas that same night and initiated cleanup operations the following day, deploying workers to address the contamination on the beaches and surrounding waters of Sentosa Island. Multiple organizations deployed approximately 18 response vessels to contain and clean up the spill, utilizing floating pipes called booms to prevent further leakage around the Marine Honour. On June 16, the SDC dispatched an additional 100 trained personnel equipped with specialized tools including oil booms, vacuum pumps, oil dispersants, skimmers, absorbent materials, and more.

Following the oil spill, the Labrador Nature Reserve was shut down on June 15th. The next day, access to the beaches of St. John's Island, Lazarus Island, and Kusu Island was restricted to visitors due to the presence of oil slick and sheen in the surrounding waters. In order to safeguard the fish farms along the Johor Straits, the Singapore Food Agency initiated precautionary monitoring measures. Marine Stewards, a conservation group in Singapore, reported the rescue of an oil-covered kingfisher at Keppel Bay and the sighting of another oil-covered kingfisher at Lazarus Island. Furthermore, numerous instances of dead fish, sea snakes, lizards, and otters coated in oil were observed. Fortunately, the oil spill did not impact Singapore's water supply, as stated by the Public Utlities Board (PUB) on June 17.

By June 20, the majority of the oil had been cleaned from the impacted beaches. Grace Fu, the Minister for Sustainability and the Environment, announced that more than 71,000 kg of oil-soaked sand had been cleared from three beaches on Sentosa Island. Despite the slow progress in the cleanup efforts, this oil-related catastrophe not only harmed the wildlife, beaches, and residents of Sentosa Island but also had repercussions on neighboring countries. The government of Johor, Malaysia, confirmed that it had commenced monitoring the surrounding waters upon receiving notification from the MPA regarding the oil spill in Singapore. The Johor Department of Environment (DoE) sought assistance from various agencies to conduct patrols and monitor the water, as reported by Liang Tian Soon, the chairperson of the Johor Health and Environment Committee. Traces of oil slicks were observed off the Johor coast and on the shores of Sunjai Rengit, Teluk Ramunia, and Pengerang, prompting the initiation of cleanup operations on June 21. Moreover, Malaysian news sources estimated that approximately 200 fishermen had been unable to fish at sea due to the oil slicks since June 16.

The incident involving the Marine Honour has sparked a significant discussion surrounding maritime safety protocols and vessel navigation procedures. It has underscored the crucial importance of effective communication between ships to avert potential accidents in the future. The aftermath of the oil spill not only led to environmental concerns but also triggered a series of compensatory actions from the owners of the vessel towards various governmental bodies, including Singapore government agencies and neighboring countries' authorities. This unfortunate event has highlighted the intricate web of challenges faced in the maritime industry, emphasizing the need for rigorous safety measures to mitigate risks associated with maritime transportation. The incident has served as a poignant reminder of the potential consequences of lapses in safety protocols and the devastating impact they can have on the environment and local communities. Moving forward, it is imperative for all stakeholders in the maritime sector to prioritize safety, communication, and proactive measures to prevent similar disasters from happening again.`,
    published: true,
  },
  {
    id: "elementary-stem",
    title: "Engaging Elementary Schoolers in STEM: StepSTEM Educational Program",
    slug: "elementary-stem",
    image: "/images/oil-bird.jpeg",
    date: "Apr 1, 2024",
    readTime: "2 min read",
    views: 7,
    comments: 0,
    excerpt: "How our program is making STEM education accessible and engaging for elementary school students.",
    author: "stepSTEM24",
    content: `Are you looking for an exciting and interactive way to introduce your elementary school students to STEM topics? Look no further than the StepSTEM Educational Program! This engaging program is designed to teach students about important environmental concerns, such as oil spills, through hands-on activities and demonstrations.

At StepSTEM, we believe that the best way for students to learn is by doing. That's why our program offers one-hour sessions for each class, where students can actively participate and learn through a unique hands-on approach. Our oil spill project is a perfect example of this.

During the oil spill project, students gather around a table and witness the impact of an oil spill demonstration. They observe how the oil spreads and affects the surrounding environment, learning about the real-life consequences of oil spills. This interactive experience allows students to not only understand the science behind oil spills but also develop a sense of empathy and responsibility towards the environment.

But our program doesn't stop at just the oil spill project. We cover a wide range of STEM topics, all designed to engage and inspire young minds. From renewable energy to robotics, our sessions are carefully crafted to make learning fun and exciting. We believe that by introducing students to STEM at an early age, we can spark their curiosity and set them on a path towards future success.

Currently based in Santa Clara, our program caters to schools around the San Francisco Bay Area. However, our future goal is to expand to more schools and reach a wider audience of students within the next 1-3 years. We are committed to making STEM education accessible to all students, regardless of their location or background.

So, how can you get involved with the StepSTEM Educational Program? If you're a teacher or school administrator in the San Francisco Bay Area, simply reach out to us to schedule a session for your students. We'll bring all the necessary materials and equipment, ensuring a seamless and engaging experience for everyone involved.

If you're a parent, you can also encourage your child's school to participate in the StepSTEM program. Talk to their teachers or administrators about the benefits of STEM education and the unique learning opportunities our program provides. Together, we can make a difference in the lives of young learners and inspire them to become the problem solvers and innovators of tomorrow.

In conclusion, the StepSTEM Educational Program is a fantastic way to engage elementary schoolers in STEM topics. Through hands-on activities and interactive sessions, students can learn about important environmental concerns like oil spills while developing a passion for science, technology, engineering, and math. Join us in our mission to inspire the next generation of STEM leaders and make a positive impact on our world.`,
    published: true,
  },
  {
    id: "expanding-horizons",
    title: "Expanding Horizons: StepSTEM Educational Program's Future Goals",
    slug: "expanding-horizons",
    image: "/images/students-demo.webp",
    date: "Apr 1, 2024",
    readTime: "2 min read",
    views: 11,
    comments: 0,
    excerpt: "A look at our program's growth plans and vision for the future of STEM education.",
    author: "stepSTEM24",
    content: `StepSTEM Educational Program is on a mission to ignite a passion for STEM (Science, Technology, Engineering, and Mathematics) in elementary school students. With its engaging and interactive sessions, the program aims to make learning about environmental concerns, such as oil spills, a fun and hands-on experience. Currently serving schools in the San Francisco Bay Area, StepSTEM has set its sights on expanding its reach to more schools in the next 1-3 years.

Why is StepSTEM so passionate about reaching a wider audience of students? The answer lies in the power of education. By exposing young minds to STEM topics at an early age, StepSTEM believes it can shape the future generation of problem solvers and innovators. Here are a few examples of how StepSTEM's expansion can benefit students:

**Increased Access to STEM Education:** By expanding to more schools, StepSTEM can provide access to its engaging program to a larger number of students. This means more children will have the opportunity to explore STEM topics and develop a love for learning in a fun and interactive way.

**Diverse Learning Experiences:** Each school has its own unique environment and student population. By expanding to more schools, StepSTEM can tailor its sessions to cater to the specific needs and interests of different communities. This ensures that students from all backgrounds have the opportunity to engage with STEM topics in a way that resonates with them.

**Building a Stronger STEM Community:** As StepSTEM expands its reach, it will not only impact individual students but also contribute to building a stronger STEM community. By collaborating with more schools, StepSTEM can foster connections between students, teachers, and professionals in the field, creating a network of support and inspiration for future STEM enthusiasts.

So, how does StepSTEM plan to achieve its ambitious goals? Here are a few tips and strategies they have in mind:

**Partnering with Schools:** StepSTEM understands the importance of collaboration. By partnering with schools, they can integrate their program into the existing curriculum and ensure that students have access to STEM education on a regular basis. This also allows for long-term engagement and impact.

**Seeking Funding and Sponsorship:** Expanding to more schools requires resources. StepSTEM plans to actively seek funding and sponsorship opportunities to support their expansion efforts. By partnering with organizations that share their vision, they can secure the necessary resources to reach a wider audience.

**Continuous Program Improvement:** StepSTEM is committed to constantly improving its program based on feedback and evaluation. By staying up-to-date with the latest research and best practices in STEM education, they can provide the most effective and engaging learning experiences for students.

StepSTEM Educational Program's future goals are ambitious, but with the passion and dedication they bring to their work, there is no doubt that they will achieve them. By expanding their reach, StepSTEM aims to inspire and empower a generation of young minds to become the problem solvers and innovators of tomorrow. Together, let's support their mission and help shape a brighter future through STEM education.`,
    published: true,
  },
  {
    id: "oil-spills-impact",
    title: "Exploring the Impact of Oil Spills: StepSTEM Educational Program",
    slug: "oil-spills-impact",
    image: "/images/plant-hands.jpeg",
    date: "Apr 1, 2024",
    readTime: "3 min read",
    views: 4,
    comments: 0,
    excerpt:
      "Understanding the environmental consequences of oil spills and how we teach students about this critical issue.",
    author: "stepSTEM24",
    content: `In today's world, it is crucial for young learners to understand the importance of environmental conservation and the impact of human activities on our planet. That's where StepSTEM Educational Program comes in. This engaging and interactive program is specifically designed for elementary schoolers to learn about STEM topics, with a particular focus on environmental concerns like oil spills.

The StepSTEM program offers one-hour sessions for each class at local schools, providing a unique hands-on approach to teaching. One of the specific environmental topics covered is an oil spill project, which allows students to witness the impact of oil spills through a demonstration and a lesson on real oil spills.

The image above perfectly captures the essence of the StepSTEM program. It shows a classroom setting with students actively participating in a hands-on oil spill project. They are engaged and excited as they witness the consequences of oil spills through a demonstration using materials representing oil and water. This interactive experience allows students to truly understand the gravity of the situation and the importance of taking action to prevent such disasters.

So, why is it essential for young learners to explore the impact of oil spills?

Firstly, oil spills have devastating effects on marine life and ecosystems. By understanding the consequences of oil spills, students develop empathy and a sense of responsibility towards protecting our environment. They learn about the importance of preserving our oceans and the delicate balance of marine ecosystems.

Secondly, exploring the impact of oil spills helps students understand the role of science, technology, engineering, and mathematics (STEM) in addressing environmental challenges. They learn about the scientific methods used to clean up oil spills, the engineering solutions developed to prevent spills, and the technology used to monitor and mitigate the damage caused by these incidents.

Here are a few examples of the activities and discussions that take place during the StepSTEM oil spill project:

**Simulation:** Students participate in a hands-on simulation of an oil spill, using materials that represent oil and water. They witness how the oil spreads and contaminates the water, affecting marine life and coastal areas.

**Case Studies:** Students learn about real-life oil spills and their consequences. They explore case studies such as the Deepwater Horizon oil spill and the Exxon Valdez oil spill, understanding the long-term effects on the environment and the communities affected.

**Environmental Awareness:** Through discussions and group activities, students learn about the importance of environmental conservation and the role they can play in protecting our planet. They discuss ways to reduce oil consumption, promote renewable energy sources, and advocate for stricter regulations on oil drilling and transportation.

The StepSTEM program, currently based in Santa Clara, aims to expand its reach to more schools in the San Francisco Bay Area and beyond within the next 1-3 years. By doing so, they hope to educate and inspire a wider audience of students, fostering a generation of environmentally conscious individuals who are equipped with the knowledge and skills to tackle environmental challenges.

In conclusion, the StepSTEM Educational Program provides a unique and interactive learning experience for elementary schoolers to explore the impact of oil spills. By engaging in hands-on activities, discussions, and case studies, students develop a deep understanding of the consequences of oil spills and the importance of environmental conservation. Through this program, young learners are empowered to become advocates for our planet and make a positive impact on our environment.`,
    published: true,
  },
]

export async function getAllNewsArticles(): Promise<NewsArticle[]> {
  try {
    const articles = (await kv.get<NewsArticle[]>(NEWS_KEY)) || []
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error fetching news articles:", error)
    return []
  }
}

export async function getPublishedNewsArticles(): Promise<NewsArticle[]> {
  try {
    const articles = await getAllNewsArticles()
    return articles.filter((article) => article.published)
  } catch (error) {
    console.error("Error fetching published news articles:", error)
    return []
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const articles = await getAllNewsArticles()
    return articles.find((article) => article.slug === slug) || null
  } catch (error) {
    console.error("Error fetching news article by slug:", error)
    return null
  }
}

export async function addNewsArticle(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const image = formData.get("image") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const author = formData.get("author") as string
    const readTime = formData.get("readTime") as string
    const published = formData.get("published") === "true"

    if (!title || !slug || !excerpt || !content || !author || !readTime) {
      return { success: false, error: "Missing required fields" }
    }

    // Check if slug already exists
    const existingArticle = await getNewsArticleBySlug(slug)
    if (existingArticle) {
      return { success: false, error: "An article with this slug already exists" }
    }

    const newArticle: NewsArticle = {
      id: nanoid(),
      title,
      slug,
      image: image || undefined,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      readTime,
      views: 0,
      comments: 0,
      excerpt,
      author,
      content,
      published,
    }

    const articles = await getAllNewsArticles()
    const updatedArticles = [...articles, newArticle]

    await kv.set(NEWS_KEY, updatedArticles)
    return { success: true }
  } catch (error) {
    console.error("Error adding news article:", error)
    return { success: false, error: "Failed to add news article" }
  }
}

export async function updateNewsArticle(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const image = formData.get("image") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const author = formData.get("author") as string
    const readTime = formData.get("readTime") as string
    const published = formData.get("published") === "true"

    if (!id || !title || !slug || !excerpt || !content || !author || !readTime) {
      return { success: false, error: "Missing required fields" }
    }

    const articles = await getAllNewsArticles()
    const articleIndex = articles.findIndex((article) => article.id === id)

    if (articleIndex === -1) {
      return { success: false, error: "Article not found" }
    }

    // Check if slug already exists for a different article
    const existingArticle = await getNewsArticleBySlug(slug)
    if (existingArticle && existingArticle.id !== id) {
      return { success: false, error: "An article with this slug already exists" }
    }

    const updatedArticle: NewsArticle = {
      ...articles[articleIndex],
      title,
      slug,
      image: image || undefined,
      excerpt,
      content,
      author,
      readTime,
      published,
    }

    articles[articleIndex] = updatedArticle
    await kv.set(NEWS_KEY, articles)
    return { success: true }
  } catch (error) {
    console.error("Error updating news article:", error)
    return { success: false, error: "Failed to update news article" }
  }
}

export async function deleteNewsArticle(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const articles = await getAllNewsArticles()
    const updatedArticles = articles.filter((article) => article.id !== id)

    await kv.set(NEWS_KEY, updatedArticles)
    return { success: true }
  } catch (error) {
    console.error("Error deleting news article:", error)
    return { success: false, error: "Failed to delete news article" }
  }
}

export async function incrementArticleViews(slug: string): Promise<void> {
  try {
    const articles = await getAllNewsArticles()
    const articleIndex = articles.findIndex((article) => article.slug === slug)

    if (articleIndex !== -1) {
      articles[articleIndex].views += 1
      await kv.set(NEWS_KEY, articles)
    }
  } catch (error) {
    console.error("Error incrementing article views:", error)
  }
}

export async function initializeNewsArticles(): Promise<void> {
  try {
    const existingArticles = await kv.get<NewsArticle[]>(NEWS_KEY)

    if (!existingArticles || existingArticles.length === 0) {
      await kv.set(NEWS_KEY, DEFAULT_ARTICLES)
      console.log("News articles initialized with default data")
    }
  } catch (error) {
    console.error("Error initializing news articles:", error)
  }
}
