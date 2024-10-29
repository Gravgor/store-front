"use client"

import { useState } from "react"
import { ChevronDown } from "@medusajs/icons"

export default function CategoryFilters() {
  return (
    <dialog id="filter-sheet" className="modal">
      <div className="w-full max-w-xs bg-white h-full">
        <FilterAccordion title="Categories">
          <div>Categories</div>
        </FilterAccordion>
        
        <FilterAccordion title="Vendors">
          <div>Vendors</div>
        </FilterAccordion>
        
        <FilterAccordion title="Colors">
          <div>Colors</div>
        </FilterAccordion>
        
        <FilterAccordion title="Rating">
          <div>Rating</div>
        </FilterAccordion>
        
        <FilterAccordion title="Price">
          <div>Price</div>
        </FilterAccordion>
      </div>
    </dialog>
  )
}

function FilterAccordion({ 
  title, 
  children 
}: { 
  title: string
  children: React.ReactNode 
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b">
      <button 
        className="flex justify-between items-center w-full py-4 px-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          {children}
        </div>
      )}
    </div>
  )
}