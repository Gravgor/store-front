import Link from "next/link"
import { ChevronRight } from "@medusajs/icons"
import React from "react"

type BreadcrumbItem = {
  label: string
  href: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          <Link 
            href={item.href}
            className={index === items.length - 1 ? "text-gray-900" : "hover:text-gray-900"}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  )
} 