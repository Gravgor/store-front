import { getProductsList, getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"

export default async function NewArrivals({
  countryCode,
}: {
  countryCode: string
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Get the latest 6 products, sorted by created_at
  const { response } = await getProductsListWithSort({
    countryCode,
    queryParams: {
      limit: 6,
      order: "created_at",
    },
  })
  console.log(response.products)

  if (!response.products.length) {
    return null
  }

  return (
    <div className="py-12">
      <div className="content-container max-w-6xl mx-auto">
        <Heading level="h2" className="text-2xl font-bold mb-8">
          New Arrivals
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {response.products.map((product) => (
            <div key={product.id} className="animate-fadeIn">
              <ProductPreview 
                product={product} 
                region={region} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 