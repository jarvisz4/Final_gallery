"use client"

import { useMusic } from "@/contexts/music-context"

export function MusicPlayer() {
  const { isPlaying, toggleMusic } = useMusic()

  return (
    <button onClick={toggleMusic} className="romantic-btn w-full flex items-center justify-center gap-2">
      <span>{isPlaying ? "🎵" : "🎶"}</span>
      {isPlaying ? "Pause the Music" : "Play the Music"}
    </button>
  )
}
