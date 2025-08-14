"use client"
import type { MouseEvent } from "react"
import { useState, useEffect } from "react"
import { Shuffle, X } from "lucide-react"

interface MemoryImage {
  id: string
  src: string
  title: string
  caption: string
  date: string
  location: string
}

const sampleImages: MemoryImage[] = [
  {
    id: "1",
    src: "/romantic-couple-sunset.png",
    title: "Our First Date",
    caption: "The moment I knew you were special",
    date: "2023-02-14",
    location: "Sunset Beach",
  },
  {
    id: "2",
    src: "/placeholder-89uvd.png",
    title: "Coffee & Laughter",
    caption: "Your smile brightens my world",
    date: "2023-03-20",
    location: "Downtown Cafe",
  },
  {
    id: "3",
    src: "/placeholder-i30di.png",
    title: "Adventure Together",
    caption: "Every step with you is an adventure",
    date: "2023-05-15",
    location: "Mountain Trail",
  },
  {
    id: "4",
    src: "/couple-cooking.png",
    title: "Cooking Together",
    caption: "Home is wherever you are",
    date: "2023-07-08",
    location: "Our Kitchen",
  },
  {
    id: "5",
    src: "/starry-night-dance.png",
    title: "Dancing Under Stars",
    caption: "Lost in your eyes, found in your arms",
    date: "2023-09-22",
    location: "Garden Party",
  },
  {
    id: "6",
    src: "/christmas-market-couple.png",
    title: "Winter Wonderland",
    caption: "Warm hearts in the cold",
    date: "2023-12-10",
    location: "Christmas Market",
  },
  {
    id: "7",
    src: "/tropical-beach-couple.png",
    title: "Beach Getaway",
    caption: "Paradise found in your company",
    date: "2024-01-25",
    location: "Tropical Beach",
  },
  {
    id: "8",
    src: "/elegant-couple-art-gallery.png",
    title: "Art & Culture",
    caption: "You're my favorite masterpiece",
    date: "2024-03-12",
    location: "Art Gallery",
  },
]

interface PolaroidData extends MemoryImage {
  rotation: number
  memoryNote: string
}

export function PolaroidGallery() {
  const [polaroids, setPolaroids] = useState<PolaroidData[]>([])
  const [selectedPolaroid, setSelectedPolaroid] = useState<PolaroidData | null>(null)

  // Initialize polaroids with random rotations and memory notes
  useEffect(() => {
    const initialPolaroids: PolaroidData[] = sampleImages.map((image) => ({
      ...image,
      rotation: Math.random() * 20 - 10, // Random rotation between -10 and 10 degrees
      memoryNote: getMemoryNote(image.title),
    }))
    setPolaroids(initialPolaroids)
  }, [])

  // Generate memory notes for each polaroid
  const getMemoryNote = (title: string): string => {
    const notes: { [key: string]: string } = {
      "Our First Date":
        "I was so nervous, but your smile made everything perfect. I knew right then that you were someone special.",
      "Coffee & Laughter":
        "The way you laugh at my terrible jokes still makes my heart skip a beat. This was the moment I fell for you.",
      "Adventure Together":
        "Every mountain we climb together feels like conquering the world. You make me braver than I ever thought possible.",
      "Cooking Together":
        "Burnt dinner, flour everywhere, but the best night ever. Home isn't a place, it's wherever you are.",
      "Dancing Under Stars": "Time stopped when we danced. In your arms, I found my forever dance partner.",
      "Winter Wonderland": "Cold hands, warm hearts. You make even the coldest days feel like spring.",
      "Beach Getaway":
        "Sun, sand, and you - my definition of paradise. Every sunset is more beautiful when shared with you.",
      "Art & Culture": "You appreciate beauty in everything, but you're the most beautiful masterpiece I've ever seen.",
    }
    return notes[title] || "Another beautiful memory with the love of my life."
  }

  // Shuffle the rotation angles
  const shuffleLayout = () => {
    setPolaroids((prev) =>
      prev.map((polaroid) => ({
        ...polaroid,
        rotation: Math.random() * 20 - 10,
      })),
    )
  }

  const createFloatingHearts = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const heartsContainer = document.createElement("div")
    heartsContainer.className = "fixed pointer-events-none z-40"
    heartsContainer.style.left = `${rect.left + rect.width / 2}px`
    heartsContainer.style.top = `${rect.top}px`

    for (let i = 0; i < 3; i++) {
      const heart = document.createElement("div")
      heart.textContent = "♥"
      heart.className = "absolute text-pink-400 text-sm"
      heart.style.left = `${Math.random() * 40 - 20}px`
      heart.style.animation = "heart-float 1s ease-out forwards"
      heart.style.animationDelay = `${i * 0.2}s`
      heartsContainer.appendChild(heart)
    }

    document.body.appendChild(heartsContainer)
    setTimeout(() => document.body.removeChild(heartsContainer), 1000)
  }

  return (
    <div className="relative">
      {/* Shuffle Button */}
      <div className="flex justify-center mb-8">
        <button onClick={shuffleLayout} className="romantic-btn flex items-center gap-2 px-6 py-3">
          <Shuffle className="w-4 h-4" />
          Shuffle Layout
        </button>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {polaroids.map((polaroid, index) => (
          <div
            key={polaroid.id}
            className="polaroid-container group cursor-pointer"
            style={{
              transform: `rotate(${polaroid.rotation}deg)`,
              transition: "transform 0.3s ease",
            }}
            onClick={(e) => {
              setSelectedPolaroid(polaroid)
              createFloatingHearts(e)
            }}
            onMouseEnter={(e) => {
              const element = e.currentTarget as HTMLElement
              element.style.transform = `rotate(${polaroid.rotation + (Math.random() * 6 - 3)}deg) scale(1.05)`
            }}
            onMouseLeave={(e) => {
              const element = e.currentTarget as HTMLElement
              element.style.transform = `rotate(${polaroid.rotation}deg) scale(1)`
            }}
          >
            {/* Polaroid Frame */}
            <div className="bg-white p-4 pb-16 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
              {/* Photo */}
              <div className="w-64 h-48 overflow-hidden bg-gray-100">
                <img
                  src={polaroid.src || "/placeholder.svg"}
                  alt={polaroid.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Handwritten Caption (appears on hover) */}
              <div className="absolute bottom-2 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p
                  className="text-gray-700 text-sm text-center transform -rotate-1"
                  style={{
                    fontFamily: "cursive",
                    fontSize: "14px",
                    lineHeight: "1.2",
                  }}
                >
                  {polaroid.title}
                </p>
              </div>
            </div>

            {/* Tape Effect */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-yellow-100 opacity-60 rotate-12 shadow-sm"></div>
          </div>
        ))}
      </div>

      {/* Modal for Large View */}
      {selectedPolaroid && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-4xl max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setSelectedPolaroid(null)}
              className="absolute top-4 right-4 z-10 glass-card p-2 hover:bg-white/40 transition-colors"
            >
              <X className="w-6 h-6 text-pink-600" />
            </button>

            <div className="p-8">
              {/* Large Polaroid */}
              <div className="bg-white p-6 pb-20 shadow-2xl mx-auto max-w-lg mb-6">
                <div className="w-full h-80 overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={selectedPolaroid.src || "/placeholder.svg"}
                    alt={selectedPolaroid.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-700 text-center cursive text-lg">{selectedPolaroid.title}</p>

                {/* Tape Effect */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-yellow-100 opacity-60 rotate-12 shadow-sm"></div>
              </div>

              {/* Memory Note */}
              <div className="glass-card p-6 max-w-2xl mx-auto">
                <h3 className="cursive text-2xl font-bold text-pink-600 mb-4 text-center">Memory Note</h3>
                <p className="text-pink-700 leading-relaxed text-center italic">{selectedPolaroid.memoryNote}</p>
                <div className="flex items-center justify-center gap-6 mt-4 text-sm text-pink-600">
                  <span>📅 {new Date(selectedPolaroid.date).toLocaleDateString()}</span>
                  <span>📍 {selectedPolaroid.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
