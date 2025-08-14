"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const moodThemes = [
  { name: "Soft Pink", gradient: "from-pink-200 to-pink-300", id: "pink" },
  { name: "Lavender Dreams", gradient: "from-purple-200 to-pink-200", id: "lavender" },
  { name: "Peachy Sunset", gradient: "from-orange-200 to-pink-200", id: "peach" },
]

export function MoodSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMood, setCurrentMood] = useState(moodThemes[0])

  const changeMood = (theme: (typeof moodThemes)[0]) => {
    setCurrentMood(theme)
    setIsOpen(false)
    // Apply the gradient to the body
    document.body.className = document.body.className.replace(
      /bg-gradient-to-br from-\w+-\d+ to-\w+-\d+/,
      `bg-gradient-to-br ${theme.gradient}`,
    )
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="romantic-btn w-full flex items-center justify-center gap-2">
        <span>🎨</span>
        Change Mood
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-2 z-50">
          {moodThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => changeMood(theme)}
              className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/30 transition-colors ${
                currentMood.id === theme.id ? "bg-white/40" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.gradient}`} />
                <span className="text-pink-700">{theme.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
