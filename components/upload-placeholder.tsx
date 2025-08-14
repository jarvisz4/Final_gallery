"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Calendar, MapPin, Type, ImageIcon } from "lucide-react"

export function UploadPlaceholder() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for future upload functionality
    alert("Upload functionality coming soon! This will integrate with your chosen backend service.")
  }

  return (
    <div className="glass-card p-6">
      <h3 className="cursive text-2xl font-bold text-pink-600 mb-4 text-center">Add New Memory</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-pink-700 font-medium">Choose Photo</label>
          <div className="relative">
            <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="photo-upload" />
            <label
              htmlFor="photo-upload"
              className="flex items-center justify-center gap-2 w-full p-4 glass rounded-lg border-2 border-dashed border-pink-300 hover:border-pink-400 cursor-pointer transition-colors"
            >
              <ImageIcon className="w-5 h-5 text-pink-400" />
              <span className="text-pink-600">{selectedFile ? selectedFile.name : "Click to select a photo"}</span>
            </label>
          </div>
        </div>

        {/* Caption */}
        <div className="space-y-2">
          <label htmlFor="caption" className="block text-pink-700 font-medium">
            Caption
          </label>
          <div className="relative">
            <Type className="absolute left-3 top-3 w-5 h-5 text-pink-400" />
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-800 placeholder-pink-400 resize-none"
              placeholder="Describe this beautiful moment..."
              rows={3}
            />
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label htmlFor="date" className="block text-pink-700 font-medium">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400" />
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-pink-700 font-medium">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400" />
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-800 placeholder-pink-400"
              placeholder="Where was this taken?"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full romantic-btn py-3 flex items-center justify-center gap-2">
          <Upload className="w-5 h-5" />
          Add to Our Gallery
        </button>
      </form>

      <div className="mt-4 p-3 glass rounded-lg">
        <p className="text-pink-600 text-sm text-center">
          This is a preview of the upload functionality. Integration with your preferred backend service coming soon!
        </p>
      </div>
    </div>
  )
}
