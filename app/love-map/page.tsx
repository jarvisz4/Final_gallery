import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { LoveMap } from "@/components/love-map"

export default function LoveMapPage() {
  return (
    <div className="min-h-screen page-enter page-enter-active">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="cursive text-4xl md:text-5xl font-bold text-pink-600 mb-4">Our Love Map</h1>
            <p className="text-lg text-pink-700 max-w-2xl mx-auto leading-relaxed">
              Every place we've been together becomes sacred ground, marked with the footprints of our love story
            </p>
          </div>

          {/* Map */}
          <LoveMap />

          {/* Back to Home Button */}
          <div className="text-center mt-8">
            <Link href="/" className="romantic-btn inline-flex items-center gap-2 px-8 py-3">
              <span>♥</span>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
