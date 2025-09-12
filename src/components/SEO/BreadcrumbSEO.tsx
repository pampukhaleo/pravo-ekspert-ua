import React from 'react'
import * as HelmetPkg from 'react-helmet-async'
const { Helmet } = HelmetPkg

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData, null, 0) }}
      />
    </Helmet>
  )
}

export default BreadcrumbSEO