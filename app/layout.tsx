import type React from "react"
import type { Metadata } from "next"
import { Dancing_Script, Inter } from "next/font/google"
import "./globals.css"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing-script",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Our Gallery - Made with Love",
  description: "A romantic gallery of our precious memories together",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-gradient-to-br from-pink-200 to-pink-300 overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="hearts-container">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="heart-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                }}
              >
                ♥
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
