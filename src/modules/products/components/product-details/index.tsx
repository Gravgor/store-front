"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { ChevronDown } from "@medusajs/icons"

type Props = {
  product: HttpTypes.StoreProduct
}

export default function ProductDetails({ product }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t pt-4">
      <button
        className="flex items-center justify-between w-full py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">Product Details</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>
      
      {isOpen && (
        <div className="pt-4 space-y-2 text-sm text-gray-700">
          <p>* 20L capacity</p>
          <p>* 700W output power</p>
          <p>* 6 power levels</p>
        </div>
      )}
    </div>
  )
} 