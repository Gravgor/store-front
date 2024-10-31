//@ts-nocheck
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Heading } from "@medusajs/ui"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import CategoryFilters from "./category-filters"
import CategoryActions from "./category-actions"


export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: string
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const length = categories.length

  const category = categories[categories.length - 1]
  if (!category || !countryCode) notFound()

  return (
    <div className="content-container py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <Heading className="text-xl md:text-2xl">
          {category.name} ({length})
        </Heading>
        
        <CategoryActions initialSort={sort} />
      </div>

      <div className="flex gap-8">
        {/* Filters */}
        <CategoryFilters />

        {/* Products Grid */}
        <div className="flex-1">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
