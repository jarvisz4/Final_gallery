"use client"

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react"

interface MusicContextType {
  isPlaying: boolean
  toggleMusic: () => void
  startMusic: () => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = new Audio()
    audio.src = "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Placeholder romantic music
    audio.loop = true
    audio.volume = 0.2
    audioRef.current = audio

    const startTimer = setTimeout(() => {
      startMusic()
    }, 1000)

    return () => {
      clearTimeout(startTimer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {
        console.log("Audio autoplay blocked - user interaction required")
      })
      setIsPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(() => {
          console.log("Audio playback requires user interaction")
        })
        setIsPlaying(true)
      }
    }
  }

  return <MusicContext.Provider value={{ isPlaying, toggleMusic, startMusic }}>{children}</MusicContext.Provider>
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
