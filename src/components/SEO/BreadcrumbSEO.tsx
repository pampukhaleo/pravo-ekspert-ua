import React from 'react'
import { Head } from 'vite-react-ssg'

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
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
    </Head>
  )
}

export default BreadcrumbSEO