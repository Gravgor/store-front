import React, { Suspense } from "react"
import { Heading } from "@medusajs/ui"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import { HeartIcon } from "lucide-react"
import Breadcrumb from "@modules/common/components/breadcrumb"
import ProductDetails from "../components/product-details"
import ProductVariants from "../components/product-variants"
import ProductPrice from "../components/product-price"


type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: product.collection?.title || "Products", href: `/collections/${product.collection?.handle}` },
    { label: product.title, href: `/products/${product.handle}` },
  ]

  return (
    <div className="content-container py-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex flex-col lg:flex-row gap-8 pt-8">
        {/* Left side - Image Gallery */}
        <div className="flex-1">
          <div className="sticky top-20">
            <ImageGallery images={product.images || []} />
          </div>
        </div>

        {/* Right side - Product Info */}
        <div className="flex-1 max-w-[500px]">
          <div className="space-y-8">
            <div>
              <Heading level="h1" className="text-3xl font-bold mb-2">
                {product.title}
              </Heading>
              <ProductPrice product={product} variant={product.variants?.[0]}/>
            </div>

            {/* Add to Cart & Favorite Buttons */}
            <div className="space-y-4">
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
              
            </div>

            {/* Product Details Accordion */}
            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
