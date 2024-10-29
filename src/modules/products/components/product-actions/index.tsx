//@ts-nocheck
"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Heart } from "lucide-react"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) return
    return product.variants.find((v) => {
      const variantOptions = v.options?.reduce((acc, opt) => {
        acc[opt.option_id] = opt.value
        return acc
      }, {} as Record<string, string>)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return
    setIsAdding(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })
    setIsAdding(false)
  }

  return (
    <div className="flex flex-col gap-6" ref={actionsRef}>

      {/* Variant Selection */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Select variant</p>
        <div className="grid grid-cols-3 gap-2">
          {product.variants?.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                const newOptions = variant.options?.reduce((acc, opt) => {
                  acc[opt.option_id] = opt.value
                  return acc
                }, {} as Record<string, string>)
                setOptions(newOptions)
              }}
              className={`px-4 py-2 text-sm rounded-md border transition-colors
                ${isEqual(options, variant.options?.reduce((acc, opt) => {
                  acc[opt.option_id] = opt.value
                  return acc
                }, {} as Record<string, string>))
                  ? 'bg-black text-white border-black'
                  : 'border-gray-200 hover:border-gray-900'
                }
                ${variant.inventory_quantity === 0 ? 'line-through opacity-60' : ''}
              `}
              disabled={disabled || isAdding || variant.inventory_quantity === 0}
            >
              {variant.title}
            </button>
          ))}
        </div>
      </div>

      {/* Product Description */}
      <div className="text-gray-700">
        {product.description}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          onClick={handleAddToCart}
          disabled={!selectedVariant || disabled || isAdding}
          className="w-full py-4 bg-black text-white rounded-md flex items-center justify-center gap-2"
          isLoading={isAdding}
        >
          {!selectedVariant
            ? "Select variant"
            : isAdding
            ? "Adding..."
            : (
              <>
                <span className="text-base">Add to Bag</span>
              </>
            )}
        </Button>

        <button 
          className="w-full py-4 border border-gray-200 rounded-md flex items-center justify-center gap-2 hover:border-gray-900 transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span>Favorite</span>
        </button>
      </div>
    </div>
  )
}