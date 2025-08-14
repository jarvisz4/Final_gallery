"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/carousel", label: "Carousel" },
  { href: "/timeline", label: "Timeline" },
  { href: "/polaroid", label: "Polaroid" },
  { href: "/love-map", label: "Love Map" },
  { href: "/login", label: "Login" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="glass-card mx-4 mt-4 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="cursive text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
          Our Gallery
        </Link>

        <div className="flex flex-wrap gap-2 md:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/30",
                pathname === item.href ? "bg-pink-400 text-white shadow-md" : "text-pink-700 hover:text-pink-800",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
