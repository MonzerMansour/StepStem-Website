import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SingaporeOilSpillArticle() {
  return (
    <article className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/news">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
              </Button>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                <Image src="/images/logo.png" alt="Author" fill className="object-cover" />
              </div>
              <div>
                <div className="font-medium">stepstem24</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span>Jul 16, 2024</span>
                  <span>•</span>
                  <span>3 min read</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Unraveling the Singapore Oil Spill Disaster</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              StepSTEM not only teaches students about the nature of oil spills and the STEM prospects available, but
              also emphasizes that this environmental problem remains relevant in the present day. Following the
              incident, we incorporated it into our 2024 revised curriculum, accessible under the Our Service section of
              the website. We tailor our explanation to suit the students' comprehension level, while also upholding our
              commitment to raising awareness. As part of this mission, we have written a detailed article covering the
              2024 Singapore oil spill, including its cause, clean-up efforts, and impact.
            </p>

            <p>
              On June 14, 2024, a significant maritime incident took place near the Pasir Panjang Terminal in Singapore,
              involving two vessels: the Netherlands-flagged dredger Vox Maxima and the stationary Singapore-flagged
              bunker vessel Marine Honour. The collision occurred at 2:18 pm, resulting in a devastating allision that
              led to the spillage of approximately 400 tonnes of low-sulfur fuel oil into the waters surrounding the
              area.
            </p>

            <p>
              The collision led to immediate emergency response actions by local authorities and environmental agencies
              to manage and reduce the environmental impact of the oil spill. The marine ecosystem, including marine
              life and coastal habitats, faced a significant threat from the spilled fuel oil. The Maritime and Port
              Authority (MPA) notified the Sentosa Development Corporation (SDC) about the spill around 3:30 pm.
              Subsequently, the SDC cordoned off the affected areas that same night and initiated cleanup operations the
              following day, deploying workers to address the contamination on the beaches and surrounding waters of
              Sentosa Island. Multiple organizations deployed approximately 18 response vessels to contain and clean up
              the spill, utilizing floating pipes called booms to prevent further leakage around the Marine Honour. On
              June 16, the SDC dispatched an additional 100 trained personnel equipped with specialized tools including
              oil booms, vacuum pumps, oil dispersants, skimmers, absorbent materials, and more.
            </p>

            <figure className="my-8">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gettyimages-2157177168-qGsM8QdsAfTqdDfWN1bxntO4B2IiV1.webp"
                  alt="Workers clean up the oil slick in plastic bags on Sentosa Island's Tanjong Beach in Singapore"
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                Workers clean up the oil slick in plastic bags on Sentosa Island's Tanjong Beach in Singapore on June
                16, 2024 (Photo: Roslan Rahman/AFP/Getty Images)
              </figcaption>
            </figure>

            <p>
              Following the oil spill, the Labrador Nature Reserve was shut down on June 15th. The next day, access to
              the beaches of St. John's Island, Lazarus Island, and Kusu Island was restricted to visitors due to the
              presence of oil slick and sheen in the surrounding waters. In order to safeguard the fish farms along the
              Johor Straits, the Singapore Food Agency initiated precautionary monitoring measures. Marine Stewards, a
              conservation group in Singapore, reported the rescue of an oil-covered kingfisher at Keppel Bay and the
              sighting of another oil-covered kingfisher at Lazarus Island. Furthermore, numerous instances of dead
              fish, sea snakes, lizards, and otters coated in oil were observed. Fortunately, the oil spill did not
              impact Singapore's water supply, as stated by the Public Utlities Board (PUB) on June 17.
            </p>

            <figure className="my-8">
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/81d08b_200d96c94ad242b9af7a08f68b9028af~mv2-ZwhScKrgbqD41BRbZTMyXSLzGilvYn.png"
                  alt="Two kingfishers covered in oil from the spill"
                  fill
                  className="object-contain bg-gray-100"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                The two kingfishers mentioned above, covered in the fuel oil from the spill (Photo: Acres)
              </figcaption>
            </figure>

            <p>
              By June 20, the majority of the oil had been cleaned from the impacted beaches. Grace Fu, the Minister for
              Sustainability and the Environment, announced that more than 71,000 kg of oil-soaked sand had been cleared
              from three beaches on Sentosa Island. Despite the slow progress in the cleanup efforts, this oil-related
              catastrophe not only harmed the wildlife, beaches, and residents of Sentosa Island but also had
              repercussions on neighboring countries. The government of Johor, Malaysia, confirmed that it had commenced
              monitoring the surrounding waters upon receiving notification from the MPA regarding the oil spill in
              Singapore. The Johor Department of Environment (DoE) sought assistance from various agencies to conduct
              patrols and monitor the water, as reported by Liang Tian Soon, the chairperson of the Johor Health and
              Environment Committee. Traces of oil slicks were observed off the Johor coast and on the shores of Sunjai
              Rengit, Teluk Ramunia, and Pengerang, prompting the initiation of cleanup operations on June 21. Moreover,
              Malaysian news sources estimated that approximately 200 fishermen had been unable to fish at sea due to
              the oil slicks since June 16.
            </p>

            <p>
              The incident involving the Marine Honour has sparked a significant discussion surrounding maritime safety
              protocols and vessel navigation procedures. It has underscored the crucial importance of effective
              communication between ships to avert potential accidents in the future. The aftermath of the oil spill not
              only led to environmental concerns but also triggered a series of compensatory actions from the owners of
              the vessel towards various governmental bodies, including Singapore government agencies and neighboring
              countries' authorities. This unfortunate event has highlighted the intricate web of challenges faced in
              the maritime industry, emphasizing the need for rigorous safety measures to mitigate risks associated with
              maritime transportation. The incident has served as a poignant reminder of the potential consequences of
              lapses in safety protocols and the devastating impact they can have on the environment and local
              communities. Moving forward, it is imperative for all stakeholders in the maritime sector to prioritize
              safety, communication, and proactive measures to prevent similar disasters from happening again.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/news/elementary-stem" className="block group">
                <div className="relative h-[200px] rounded-lg overflow-hidden mb-3">
                  <Image
                    src="/images/oil-bird.jpeg"
                    alt="Oil-covered bird"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h4 className="font-bold group-hover:text-cyan-500 transition-colors">
                  Engaging Elementary Schoolers in STEM: StepSTEM Educational Program
                </h4>
              </Link>
              <Link href="/news/expanding-horizons" className="block group">
                <div className="relative h-[200px] rounded-lg overflow-hidden mb-3">
                  <Image
                    src="/images/students-demo.webp"
                    alt="Students demonstration"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h4 className="font-bold group-hover:text-cyan-500 transition-colors">
                  Expanding Horizons: StepSTEM Educational Program's Future Goals
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
