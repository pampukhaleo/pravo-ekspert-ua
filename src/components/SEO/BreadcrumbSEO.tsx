import React from 'react'
import { Helmet } from 'react-helmet-async'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSEOProps {
  items: BreadcrumbItem[]
}

const BreadcrumbSEO: React.FC<BreadcrumbSEOProps> = ({ items }) => {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
    </Helmet>
  )
}

export default BreadcrumbSEO