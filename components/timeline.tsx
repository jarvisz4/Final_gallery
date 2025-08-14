"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Calendar, Filter, X } from "lucide-react"
import { sampleImages, type MemoryImage } from "@/lib/sample-data"

interface GroupedMemories {
  [year: string]: {
    [month: string]: MemoryImage[]
  }
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function Timeline() {
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [lightboxImage, setLightboxImage] = useState<MemoryImage | null>(null)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Group memories by year and month
  const groupedMemories: GroupedMemories = sampleImages.reduce((acc, image) => {
    const date = new Date(image.date)
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")

    if (!acc[year]) acc[year] = {}
    if (!acc[year][month]) acc[year][month] = []
    acc[year][month].push(image)

    return acc
  }, {} as GroupedMemories)

  // Get available years and months for filters
  const availableYears = Object.keys(groupedMemories).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
  const availableMonths =
    selectedYear === "all"
      ? Array.from(new Set(sampleImages.map((img) => new Date(img.date).getMonth() + 1)))
      : Object.keys(groupedMemories[selectedYear] || {}).map((m) => Number.parseInt(m))

  // Filter memories based on selected year and month
  const filteredMemories = Object.entries(groupedMemories).reduce((acc, [year, months]) => {
    if (selectedYear !== "all" && year !== selectedYear) return acc

    const filteredMonths = Object.entries(months).reduce(
      (monthAcc, [month, memories]) => {
        if (selectedMonth !== "all" && month !== selectedMonth.padStart(2, "0")) return monthAcc
        monthAcc[month] = memories
        return monthAcc
      },
      {} as { [month: string]: MemoryImage[] },
    )

    if (Object.keys(filteredMonths).length > 0) {
      acc[year] = filteredMonths
    }
    return acc
  }, {} as GroupedMemories)

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Attach observer to timeline cards
  useEffect(() => {
    const cards = document.querySelectorAll(".timeline-card")
    cards.forEach((card) => {
      if (observerRef.current) {
        observerRef.current.observe(card)
      }
    })

    return () => {
      cards.forEach((card) => {
        if (observerRef.current) {
          observerRef.current.unobserve(card)
        }
      })
    }
  }, [filteredMemories])

  const createFloatingHearts = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const heartsContainer = document.createElement("div")
    heartsContainer.className = "fixed pointer-events-none z-50"
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
      {/* Filters */}
      <div className="glass-card p-4 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-pink-600" />
            <span className="text-pink-700 font-medium">Filter by:</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pink-600" />
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value)
                setSelectedMonth("all")
              }}
              className="bg-white/20 text-pink-700 px-3 py-1 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white/20 text-pink-700 px-3 py-1 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
            disabled={selectedYear === "all"}
          >
            <option value="all">All Months</option>
            {availableMonths.map((month) => (
              <option key={month} value={month.toString().padStart(2, "0")}>
                {monthNames[month - 1]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 to-pink-500"></div>

        {Object.entries(filteredMemories).map(([year, months]) => (
          <div key={year} className="mb-12">
            {/* Year Header */}
            <div className="sticky top-4 z-20 mb-8">
              <div className="glass-card inline-block px-6 py-3 ml-16">
                <h2 className="cursive text-3xl font-bold text-pink-600">{year}</h2>
              </div>
            </div>

            {Object.entries(months).map(([month, memories]) => (
              <div key={`${year}-${month}`} className="mb-8">
                {/* Month Header */}
                <div className="flex items-center mb-6">
                  <div className="w-4 h-4 bg-pink-400 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  <div className="glass-card ml-4 px-4 py-2">
                    <h3 className="text-lg font-semibold text-pink-700">{monthNames[Number.parseInt(month) - 1]}</h3>
                  </div>
                </div>

                {/* Memory Cards */}
                <div className="ml-16 space-y-6">
                  {memories.map((memory, index) => (
                    <div
                      key={memory.id}
                      id={`card-${memory.id}`}
                      className={`timeline-card glass-card p-4 cursor-pointer transition-all duration-500 hover:scale-105 hover-hearts ${
                        visibleCards.has(`card-${memory.id}`) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                      }`}
                      onClick={(e) => {
                        setLightboxImage(memory)
                        createFloatingHearts(e)
                      }}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/30">
                          <img
                            src={memory.src || "/placeholder.svg"}
                            alt={memory.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="cursive text-xl font-bold text-pink-600 mb-1">{memory.title}</h4>
                          <p className="text-pink-700 text-sm mb-2">{memory.caption}</p>
                          <div className="flex items-center gap-4 text-xs text-pink-600">
                            <span>{new Date(memory.date).toLocaleDateString()}</span>
                            <span>📍 {memory.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-4xl max-h-[90vh] overflow-auto">
            <div className="relative">
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 glass-card p-2 hover:bg-white/40 transition-colors"
              >
                <X className="w-6 h-6 text-pink-600" />
              </button>

              <div className="p-6">
                <div className="mb-4">
                  <img
                    src={lightboxImage.src || "/placeholder.svg"}
                    alt={lightboxImage.title}
                    className="w-full max-h-96 object-contain rounded-lg"
                  />
                </div>

                <div className="text-center">
                  <h3 className="cursive text-3xl font-bold text-pink-600 mb-2">{lightboxImage.title}</h3>
                  <p className="text-lg text-pink-700 mb-4">{lightboxImage.caption}</p>
                  <div className="flex items-center justify-center gap-6 text-sm text-pink-600">
                    <span>📅 {new Date(lightboxImage.date).toLocaleDateString()}</span>
                    <span>📍 {lightboxImage.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
