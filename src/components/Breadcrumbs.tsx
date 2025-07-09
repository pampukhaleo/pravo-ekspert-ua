import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ChevronRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './ui/breadcrumb'

interface BreadcrumbItemProps {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItemProps[]
  className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  if (items.length === 0) return null
  return (
    <nav aria-label="Breadcrumb" className={`bg-gray-50 border-b border-gray-200 py-4 ${className}`}>
      <div className="container-custom">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center space-x-2 text-sm text-gray-600">
            {/* Home Link */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center hover:text-brand-blue transition-colors">
                  <Home className="h-4 w-4 mr-1" />
                  Головна
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {items.map((item, idx) => [
              <BreadcrumbSeparator key={`sep-${idx}`}>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </BreadcrumbSeparator>,
              <BreadcrumbItem key={`item-${idx}`}>
                {item.href && !item.isCurrentPage ? (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.href}
                      className="hover:text-brand-blue transition-colors"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-gray-900 font-medium">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>,
            ])}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  )
}

export default Breadcrumbs
