"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { MoodSelector } from "@/components/mood-selector"
import { MusicPlayer } from "@/components/music-player"

export default function HomePage() {
  return (
    <div className="min-h-screen page-enter page-enter-active">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card text-center">
            <h1 className="cursive text-4xl md:text-6xl font-bold text-pink-600 mb-4">Welcome to Our Gallery</h1>
            <p className="text-lg md:text-xl text-pink-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Every moment with you is a treasure worth keeping, my love.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side - Control buttons */}
              <div className="space-y-4">
                <MoodSelector />

                <Link href="/timeline" className="romantic-btn w-full flex items-center justify-center gap-2">
                  <span>♥</span>
                  Enter Our Love Story
                </Link>

                <MusicPlayer />
              </div>

              {/* Right side - Floating hearts animation */}
              <div className="relative h-48 flex items-center justify-center">
                <div className="relative">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-pink-400 text-2xl animate-pulse"
                      style={{
                        left: `${Math.random() * 200 - 100}px`,
                        top: `${Math.random() * 200 - 100}px`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${2 + Math.random()}s`,
                      }}
                    >
                      ♥
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="mt-12">
              <Link href="/carousel" className="romantic-btn text-xl px-12 py-4 hover-hearts inline-block">
                Open Carousel
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12">
          <p className="text-pink-600 font-medium">Made with endless love, for my beloved person ❤️</p>
        </footer>
      </main>
    </div>
  )
}
