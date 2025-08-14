"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, Heart } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginMessage, setLoginMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginMessage("")

    // Simulate authentication process
    setTimeout(() => {
      if (email && password) {
        setLoginMessage("Welcome back, my love! 💕")
        // In a real app, this would redirect to a protected area or set auth state
        setTimeout(() => {
          window.location.href = "/"
        }, 1500)
      } else {
        setLoginMessage("Please fill in both fields, darling.")
      }
      setIsLoading(false)
    }, 1000)
  }

  const createFloatingHearts = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const heartsContainer = document.createElement("div")
    heartsContainer.className = "fixed pointer-events-none z-50"
    heartsContainer.style.left = `${rect.left + rect.width / 2}px`
    heartsContainer.style.top = `${rect.top}px`

    for (let i = 0; i < 5; i++) {
      const heart = document.createElement("div")
      heart.textContent = "♥"
      heart.className = "absolute text-pink-400 text-sm"
      heart.style.left = `${Math.random() * 60 - 30}px`
      heart.style.animation = "heart-float 1.5s ease-out forwards"
      heart.style.animationDelay = `${i * 0.1}s`
      heartsContainer.appendChild(heart)
    }

    document.body.appendChild(heartsContainer)
    setTimeout(() => document.body.removeChild(heartsContainer), 1500)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-pink-700 font-medium">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-800 placeholder-pink-400"
              placeholder="your.love@example.com"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-pink-700 font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-800 placeholder-pink-400"
              placeholder="Our secret password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Login Message */}
        {loginMessage && (
          <div className="text-center p-3 glass rounded-lg">
            <p className="text-pink-700 font-medium">{loginMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          onClick={createFloatingHearts}
          className={`w-full romantic-btn py-4 text-lg font-semibold transition-all duration-300 ${
            isLoading ? "opacity-75 cursor-not-allowed" : "hover-hearts"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing In...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Enter Our Private Space
            </div>
          )}
        </button>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-pink-600 text-sm flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Only we can see this. 🔒
          </p>
        </div>

        {/* Back to Gallery Link */}
        <div className="text-center pt-4">
          <Link href="/" className="text-pink-600 hover:text-pink-700 transition-colors text-sm underline">
            Back to Our Gallery
          </Link>
        </div>
      </form>
    </div>
  )
}
