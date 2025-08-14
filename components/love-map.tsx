"use client"

import type React from "react"

import { useState } from "react"
import { ZoomIn, ZoomOut, MapPin, X } from "lucide-react"
import { sampleImages, type MemoryImage } from "@/lib/sample-data"

interface MapLocation {
  id: string
  name: string
  x: number // Percentage position on map
  y: number // Percentage position on map
  memories: MemoryImage[]
  description: string
}

// Create map locations from sample data
const mapLocations: MapLocation[] = [
  {
    id: "sunset-beach",
    name: "Sunset Beach",
    x: 25,
    y: 70,
    memories: sampleImages.filter((img) => img.location === "Sunset Beach"),
    description: "Where our love story began with golden sunsets and endless conversations.",
  },
  {
    id: "downtown-cafe",
    name: "Downtown Cafe",
    x: 45,
    y: 40,
    memories: sampleImages.filter((img) => img.location === "Downtown Cafe"),
    description: "Our favorite spot for morning coffee and afternoon dreams.",
  },
  {
    id: "mountain-trail",
    name: "Mountain Trail",
    x: 70,
    y: 30,
    memories: sampleImages.filter((img) => img.location === "Mountain Trail"),
    description: "Adventures that brought us closer to the sky and to each other.",
  },
  {
    id: "our-kitchen",
    name: "Our Kitchen",
    x: 50,
    y: 50,
    memories: sampleImages.filter((img) => img.location === "Our Kitchen"),
    description: "Home sweet home, where every meal is made with love.",
  },
  {
    id: "garden-party",
    name: "Garden Party",
    x: 35,
    y: 60,
    memories: sampleImages.filter((img) => img.location === "Garden Party"),
    description: "Dancing under the stars, lost in each other's eyes.",
  },
  {
    id: "christmas-market",
    name: "Christmas Market",
    x: 60,
    y: 25,
    memories: sampleImages.filter((img) => img.location === "Christmas Market"),
    description: "Winter magic and warm hearts in the festive glow.",
  },
  {
    id: "tropical-beach",
    name: "Tropical Beach",
    x: 15,
    y: 80,
    memories: sampleImages.filter((img) => img.location === "Tropical Beach"),
    description: "Paradise found in crystal waters and your smile.",
  },
  {
    id: "art-gallery",
    name: "Art Gallery",
    x: 55,
    y: 35,
    memories: sampleImages.filter((img) => img.location === "Art Gallery"),
    description: "Surrounded by masterpieces, but you're the most beautiful art I've ever seen.",
  },
]

export function LoveMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  const createFloatingHearts = (e: React.MouseEvent) => {
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
      {/* Map Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="glass-card p-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-pink-600" />
            <span className="text-pink-700 font-medium">Our Love Journey</span>
          </div>
        </div>

        <div className="glass-card p-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white/30 rounded-lg transition-colors"
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="w-4 h-4 text-pink-600" />
            </button>
            <span className="text-pink-700 text-sm px-2">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white/30 rounded-lg transition-colors"
              disabled={zoomLevel >= 2}
            >
              <ZoomIn className="w-4 h-4 text-pink-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="glass-card p-6 overflow-hidden">
        <div
          className="relative w-full h-96 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border-2 border-pink-200 transition-transform duration-300"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center center",
          }}
        >
          {/* Decorative Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Simplified world map outline */}
              <path
                d="M10,20 Q30,15 50,25 Q70,20 90,30 L85,50 Q70,60 50,55 Q30,65 15,50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-pink-300"
              />
              <path
                d="M20,70 Q40,65 60,75 Q80,70 90,80 L85,90 Q60,85 40,90 Q20,85 15,80 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-pink-300"
              />
            </svg>
          </div>

          {/* Location Pins */}
          {mapLocations.map((location) => (
            <div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
              }}
              onClick={(e) => {
                setSelectedLocation(location)
                createFloatingHearts(e)
              }}
              onMouseEnter={() => setHoveredPin(location.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Heart-shaped pin */}
              <div className="relative">
                <div className="w-8 h-8 text-pink-500 hover:text-pink-600 transition-all duration-200 hover:scale-125">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-lg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>

                {/* Pin shadow */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-pink-300 opacity-30 rounded-full blur-sm"></div>

                {/* Hover tooltip */}
                {hoveredPin === location.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-white rounded-lg shadow-lg text-sm text-pink-700 whitespace-nowrap">
                    {location.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="glass-card p-4 mt-6">
        <div className="flex items-center justify-center gap-6 text-sm text-pink-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-pink-500">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span>Places We've Loved</span>
          </div>
          <div className="text-pink-600">Click any heart to explore our memories there</div>
        </div>
      </div>

      {/* Location Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-4xl max-h-[90vh] overflow-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 z-10 glass-card p-2 hover:bg-white/40 transition-colors"
              >
                <X className="w-6 h-6 text-pink-600" />
              </button>

              <div className="p-8">
                {/* Location Header */}
                <div className="text-center mb-6">
                  <h3 className="cursive text-3xl font-bold text-pink-600 mb-2">{selectedLocation.name}</h3>
                  <p className="text-pink-700 italic max-w-2xl mx-auto">{selectedLocation.description}</p>
                </div>

                {/* Photos from this location */}
                {selectedLocation.memories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedLocation.memories.map((memory) => (
                      <div key={memory.id} className="glass-card p-4">
                        <div className="w-full h-48 rounded-lg overflow-hidden mb-3">
                          <img
                            src={memory.src || "/placeholder.svg"}
                            alt={memory.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="cursive text-xl font-bold text-pink-600 mb-1">{memory.title}</h4>
                        <p className="text-pink-700 text-sm mb-2">{memory.caption}</p>
                        <p className="text-pink-600 text-xs">{new Date(memory.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-pink-600">
                      No photos from this location yet, but the memories live in our hearts.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
