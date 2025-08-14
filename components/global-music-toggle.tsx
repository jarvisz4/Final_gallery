"use client"

import { useMusic } from "@/contexts/music-context"
import { Volume2, VolumeX } from "lucide-react"

export function GlobalMusicToggle() {
  const { isPlaying, toggleMusic } = useMusic()

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-50 glass-card p-3 rounded-full hover:scale-110 transition-all duration-300"
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? <Volume2 className="w-5 h-5 text-pink-600" /> : <VolumeX className="w-5 h-5 text-pink-400" />}
    </button>
  )
}
