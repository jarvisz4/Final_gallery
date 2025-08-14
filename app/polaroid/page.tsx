import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { PolaroidGallery } from "@/components/polaroid-gallery"

export default function PolaroidPage() {
  return (
    <div className="min-h-screen page-enter page-enter-active">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="cursive text-4xl md:text-5xl font-bold text-pink-600 mb-4">Polaroid Memories</h1>
            <p className="text-lg text-pink-700 max-w-2xl mx-auto leading-relaxed">
              Like scattered polaroids on a table, each photo captures a moment frozen in time - imperfect, authentic,
              and beautiful
            </p>
          </div>

          {/* Gallery */}
          <div className="glass-card p-8 mb-8">
            <PolaroidGallery />
          </div>

          {/* Instructions */}
          <div className="text-center mb-8">
            <p className="text-pink-600 text-sm">
              Hover to see captions • Click for memory notes • Shuffle for a new arrangement
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="text-center">
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
