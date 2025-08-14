"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Gauge } from "lucide-react"
import { sampleImages } from "@/lib/sample-data"

type Speed = "slow" | "medium" | "fast"

const speedSettings = {
  slow: 30,
  medium: 20,
  fast: 10,
}

export function InfiniteCarousel() {
  const [speed, setSpeed] = useState<Speed>("medium")
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Triple the images for seamless infinite scroll
  const tripleImages = [...sampleImages, ...sampleImages, ...sampleImages]

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let animationId: number
    const startTime = Date.now()

    const animate = () => {
      if (!isPaused && carousel) {
        const elapsed = Date.now() - startTime
        const distance = (elapsed / speedSettings[speed]) % (carousel.scrollWidth / 3)
        carousel.scrollLeft = distance
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [speed, isPaused])

  const handleManualScroll = (direction: "left" | "right") => {
    const carousel = carouselRef.current
    if (!carousel) return

    const scrollAmount = 320 // Width of one card plus gap
    const newScrollLeft = carousel.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount)

    carousel.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  const createFloatingHearts = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const heartsContainer = document.createElement("div")
    heartsContainer.className = "fixed pointer-events-none z-50"
    heartsContainer.style.left = `${rect.left + rect.width / 2}px`
    heartsContainer.style.top = `${rect.top}px`

    for (let i = 0; i < 3; i++) {
      const heart = document.createElement("div")
      heart.textContent = "♥"
      heart.className = "absolute text-pink-400 text-sm animate-pulse"
      heart.style.left = `${Math.random() * 40 - 20}px`
      heart.style.animationDelay = `${i * 0.2}s`
      heart.style.animation = "heart-float 1s ease-out forwards"
      heartsContainer.appendChild(heart)
    }

    document.body.appendChild(heartsContainer)
    setTimeout(() => document.body.removeChild(heartsContainer), 1000)
  }

  return (
    <div className="relative">
      {/* Speed Control */}
      <div className="flex justify-end mb-4">
        <div className="glass-card p-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-pink-600" />
            <select
              value={speed}
              onChange={(e) => setSpeed(e.target.value as Speed)}
              className="bg-transparent text-pink-700 text-sm focus:outline-none cursor-pointer"
            >
              <option value="slow">Slow</option>
              <option value="medium">Medium</option>
              <option value="fast">Fast</option>
            </select>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Manual Navigation Arrows */}
        <button
          onClick={() => handleManualScroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass-card p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/40"
        >
          <ChevronLeft className="w-6 h-6 text-pink-600" />
        </button>

        <button
          onClick={() => handleManualScroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 glass-card p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/40"
        >
          <ChevronRight className="w-6 h-6 text-pink-600" />
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false)
            setHoveredCard(null)
          }}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tripleImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="flex-shrink-0 relative group/card cursor-pointer"
              onMouseEnter={(e) => {
                setHoveredCard(`${image.id}-${index}`)
                createFloatingHearts(e)
              }}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="w-80 h-60 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-xl">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Hover Overlay */}
                {hoveredCard === `${image.id}-${index}` && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300">
                    <div className="text-center text-white p-4">
                      <h3 className="cursive text-2xl font-bold mb-2">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.caption}</p>
                      <p className="text-xs opacity-75 mt-2">{image.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mt-6">
        <p className="text-pink-600 text-sm">
          Hover to pause • Use arrows for manual control • Each photo holds a special memory
        </p>
      </div>
    </div>
  )
}
