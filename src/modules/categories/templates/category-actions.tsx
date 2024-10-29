"use client"

import {  ChevronDown } from "@medusajs/icons"
import { FilterIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function CategoryActions({ initialSort }: { initialSort: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sort, setSort] = useState(initialSort)

  const handleSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("sortBy", newSort)
    setSort(newSort)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-4">
      <button 
        className="flex items-center gap-2 text-sm border px-4 py-2 rounded-md"
      >
        <FilterIcon />
        Hide filters
      </button>
      
      <div className="relative">
        <select 
          className="appearance-none border rounded-md px-4 py-2 pr-8 text-sm"
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="created_at">Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4" />
      </div>
    </div>
  )
}