"use client"

import { HttpTypes } from "@medusajs/types"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Thumbnail from "@modules/products/components/thumbnail"
import { Minus, Plus, X } from "lucide-react"
import DeleteButton from "@modules/common/components/delete-button"

export default function ItemsTemplate({ items }: { items: HttpTypes.StoreCartLineItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4">
          <div className="w-20 h-20 relative rounded-md overflow-hidden">
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h3 className="text-base font-medium">{item.title}</h3>
                <LineItemOptions variant={item.variant} />
              </div>
              <DeleteButton id={item.id}>
                <X className="w-4 h-4" />
              </DeleteButton>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center border rounded-md">
                <button className="p-2">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 border-x">{item.quantity}</span>
                <button className="p-2">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <LineItemPrice item={item} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}