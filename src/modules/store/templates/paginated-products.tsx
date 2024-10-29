
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { FindParams, StoreProductParams } from "@medusajs/types"

const PRODUCTS_PER_PAGE = 12

export default async function PaginatedProducts({
  categoryId,
  collectionId,
  productsIds,
  sortBy,
  page,
  countryCode,
}: {
  categoryId?: string
  collectionId?: string
  productsIds?: string[]
  sortBy?: SortOptions
  page: number
  countryCode: string
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: FindParams & StoreProductParams = {
    limit: PRODUCTS_PER_PAGE,
    offset: (page - 1) * PRODUCTS_PER_PAGE,
    order: sortBy,
  }

  if (categoryId) {
    queryParams.category_id = [categoryId]
  }

  if (collectionId) {
    queryParams.collection_id = [collectionId]
  }

  if (productsIds) {
    queryParams.id = productsIds
  }

  const { response: { products, count } } = await getProductsList({
    queryParams,
    countryCode
  })

  if (!products.length) {
    return null
  }

  // Calculate total pages
  const totalPages = Math.ceil(count / PRODUCTS_PER_PAGE)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductPreview 
            key={product.id} 
            product={product} 
            region={region} 
          />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <Pagination
          page={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}