"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"

export default function ImageGallery({ 
  images 
}: { 
  images: { url: string }[] 
}) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="aspect-square relative">
        <Image
          src={images[currentImage]?.url || "/placeholder.png"}
          alt="Product image"
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-5 gap-2 mt-4">
        {images.map((image, index) => (
          <button
            key={image.url}
            className={`aspect-square relative border-2 ${
              currentImage === index ? "border-black" : "border-transparent"
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={image.url}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            onClick={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  )
}
