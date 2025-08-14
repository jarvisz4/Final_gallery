"use client"

import { useState, useRef, useEffect } from "react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Create audio element for background music
    const audio = new Audio()
    audio.src = "/placeholder-music.mp3" // Placeholder for romantic background music
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // Note: In a real app, this would need user interaction to work due to browser autoplay policies
        audioRef.current.play().catch(() => {
          console.log("Audio playback requires user interaction")
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <button onClick={toggleMusic} className="romantic-btn w-full flex items-center justify-center gap-2">
      <span>{isPlaying ? "🎵" : "🎶"}</span>
      {isPlaying ? "Pause the Music" : "Play the Music"}
    </button>
  )
}
