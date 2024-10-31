import { Suspense } from "react"
import { getCategoriesList } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { HttpTypes, StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import { Search, Heart, ChevronDown } from "lucide-react"
import MobileMenu from "@modules/layout/components/mobile-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { product_categories } = await getCategoriesList()
  console.log(product_categories)

  return (
    <>
      <div className="sticky top-0 inset-x-0 z-50">
        <header className="relative h-14 bg-white border-b border-gray-200">
          <nav className="content-container h-full px-4">
            <div className="flex items-center h-full">
              {/* Left Section */}
              <div className="flex items-center">
                <div className="md:hidden">
                  <MobileMenu categories={product_categories} />
                </div>
                <LocalizedClientLink href="/" className="text-lg font-medium mr-8">
                  The Tiny Grand
                </LocalizedClientLink>

                {/* Desktop Categories */}
                <div className="hidden md:flex items-center space-x-6">
                  {product_categories.map((category) => (
                    <LocalizedClientLink
                      key={category.id}
                      href={`/categories/${category.handle}`}
                      className="text-sm hover:text-gray-600 flex items-center"
                    >
                      {category.name}
                      <ChevronDown className="w-4 h-4 ml-0.5" />
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4 ml-auto">
                {/* Desktop Search Input */}
                <div className="hidden md:block relative">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="w-[200px] px-4 py-1.5 pl-8 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-sm"
                  />
                  <Search className="w-4 h-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Mobile Search Icon */}
                <button className="md:hidden hover:text-gray-600">
                  <Search className="w-5 h-5" />
                </button>

                <LocalizedClientLink href="/account" className="hover:text-gray-600">
                  <Heart className="w-5 h-5" />
                </LocalizedClientLink>
                
                <Suspense fallback={<CartButton />}>
                  <CartButton />
                </Suspense>
              </div>
            </div>
          </nav>
        </header>

        {/* Sale Banner */}
        <div className="bg-black text-white py-1.5 text-center text-sm">
          <span>Sale 50% OFF</span>
          <LocalizedClientLink href="/sale" className="ml-2 underline">
            Shop Now
          </LocalizedClientLink>
        </div>
      </div>
    </>
  )
}