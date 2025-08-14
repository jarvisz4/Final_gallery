import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { InfiniteCarousel } from "@/components/infinite-carousel"

export default function CarouselPage() {
  return (
    <div className="min-h-screen page-enter page-enter-active">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="cursive text-4xl md:text-5xl font-bold text-pink-600 mb-4">Our Memory Carousel</h1>
            <p className="text-lg text-pink-700 max-w-2xl mx-auto leading-relaxed">
              Watch our beautiful moments flow like time itself - each image a chapter in our love story
            </p>
          </div>

          {/* Carousel */}
          <div className="glass-card p-6 mb-8">
            <InfiniteCarousel />
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
