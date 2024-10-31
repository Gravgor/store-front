"use client"

import { useState } from "react"
import { Menu, X, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type MobileMenuProps = {
  categories: HttpTypes.StoreProductCategory[]
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        className="md:hidden p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Menu */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 bg-white transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Menu</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto h-full">
          {categories.map((category) => (
            <div key={category.id} className="border-b border-gray-200">
              <LocalizedClientLink 
                href={`/categories/${category.handle}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-base">{category.name}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </LocalizedClientLink>
            </div>
          ))}
        </div>
      </div>
    </>
  )
} 