//@ts-nocheck
import { getCategoriesList } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading } from "@medusajs/ui"
import Image from "next/image"

export default async function FeaturedCategories() {
  const { product_categories } = await getCategoriesList(
  )

  // Map of category handles to their display properties
  const categoryDisplayData = {
    beauty: {
      image: "/images/categories/beauty.jpg",
      textColor: "text-orange-500",
    },
    electronics: {
      image: "/images/categories/electronics.jpg",
      textColor: "text-black",
    },
    fashion: {
      image: "/images/categories/fashion.jpg",
      textColor: "text-black",
    },
    furniture: {
      image: "/images/categories/furniture.jpg",
      textColor: "text-black",
    },
  }

  return (
    <div className="py-12">
      <div className="content-container max-w-6xl mx-auto">
        <Heading level="h2" className="text-3xl font-bold mb-8">
          Featured Categories
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product_categories.map((category) => (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="group relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={categoryDisplayData[category.handle]?.image || ""}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Category Name - Top Left */}
              <div className="absolute top-6 left-6">
                <h3 className={`text-xl font-medium ${categoryDisplayData[category.handle]?.textColor || 'text-black'}`}>
                  {category.name}
                </h3>
              </div>

              {/* White Background Overlay on Hover */}
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  )
}