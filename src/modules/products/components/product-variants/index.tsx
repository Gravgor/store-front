"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

type Props = {
  product: HttpTypes.StoreProduct
}

export default function ProductVariants({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.id)

  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {product.variants?.map((variant) => (
        <button
          key={variant.id}
          onClick={() => setSelectedVariant(variant.id)}
          className={`py-2 px-4 border rounded-md text-sm ${
            selectedVariant === variant.id
              ? "border-black bg-black text-white"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          {variant.title}
        </button>
      ))}
    </div>
  )
} 