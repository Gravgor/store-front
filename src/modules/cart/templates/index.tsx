import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import { X } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold">My Cart</h1>
            <LocalizedClientLink href="/store" className="hover:text-gray-700">
              <X className="w-6 h-6" />
            </LocalizedClientLink>
          </div>
        </div>

        {cart?.items?.length ? (
          <div className="flex-1 flex flex-col">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <ItemsTemplate items={cart?.items} />
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200">
              <div className="p-4 space-y-4">
                <Summary cart={cart as HttpTypes.StoreCart & { promotions: HttpTypes.StorePromotion[] }} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate