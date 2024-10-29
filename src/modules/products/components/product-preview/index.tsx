import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })


  const variantCount = product.variants?.length || 0

  return (
    <LocalizedClientLink 
      href={`/products/${product.handle}`} 
      className="group"
    >
      <div className="flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[1/1] w-full overflow-hidden rounded-md bg-gray-100 hover:opacity-90 transition-opacity">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col mt-4">
          {/* Title */}
          <Text 
            className="text-ui-fg-base font-medium" 
            data-testid="product-title"
          >
            {product.title}
          </Text>
          
          {/* Brand/Collection Name */}
          <Text className="text-ui-fg-subtle text-sm">
            {product.collection?.title || "TranquiScents"}
          </Text>
          
          {/* Price */}
          <div className="flex items-center gap-x-2 mt-1">
            {cheapestPrice && (
              <Text className="text-ui-fg-base font-medium">
                {cheapestPrice.calculated_price}
              </Text>
            )}
          </div>
          
          {/* Variants Count */}
          {variantCount > 0 && (
            <Text className="text-ui-fg-subtle text-sm mt-1">
              {variantCount} {variantCount === 1 ? 'variant' : 'variants'}
            </Text>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
