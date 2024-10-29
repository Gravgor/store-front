import { Suspense } from "react"
import { getCategoriesList } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { HttpTypes, StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import ChevronDown from "@modules/common/icons/chevron-down"
import { Search, Heart } from "lucide-react"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <>
      <div className="sticky top-0 inset-x-0 z-50">
        <header className="relative h-16 bg-white border-b border-gray-200">
          <nav className="content-container flex items-center justify-between h-full">
            {/* Logo */}
            <LocalizedClientLink href="/" className="text-2xl font-bold">
              The Tiny Grand
            </LocalizedClientLink>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {product_categories.map((category) => (
                <CategoryDropdown 
                  key={category.id} 
                  category={category}
                />
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-3 pr-10 py-2 border border-gray-200 rounded-md text-sm"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              
              <LocalizedClientLink href="/account" className="hover:text-gray-600">
                <Heart className="w-6 h-6" />
              </LocalizedClientLink>
              
              <Suspense fallback={<CartButton />}>
                <CartButton />
              </Suspense>
            </div>
          </nav>
        </header>
      </div>
      
      {/* Sale Banner */}
      <div className="bg-black text-white py-2 text-center">
        <span>Sale 50% OFF</span>
        <LocalizedClientLink href="/sale" className="ml-2 underline">
          Shop Now
        </LocalizedClientLink>
      </div>
    </>
  )
}

const CategoryDropdown = ({ 
  category 
}: { 
  category: HttpTypes.StoreProductCategory
}) => {
  return (
    <div className="group relative">
      <button className="flex items-center space-x-1 py-2">
        <span>{category.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
        <LocalizedClientLink 
          href={`/categories/${category.handle}`} 
          className="block px-4 py-2 hover:bg-gray-100"
        >
          All {category.name}
        </LocalizedClientLink>
        
        {/* Child Categories */}
        {category.category_children?.map((child: HttpTypes.StoreProductCategory) => (
          <LocalizedClientLink
            key={child.id}
            href={`/categories/${child.handle}`}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            {child.name}
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}