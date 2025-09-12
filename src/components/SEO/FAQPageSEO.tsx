import React from 'react'
import * as HelmetPkg from 'react-helmet-async'
const { Helmet } = HelmetPkg

interface FAQItem {
  question: string
  answer: string
}

interface FAQPageSEOProps {
  faqs: FAQItem[]
}

const FAQPageSEO: React.FC<FAQPageSEOProps> = ({ faqs }) => {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <Helmet>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData, null, 0) }}
      />
    </Helmet>
  )
}

export default FAQPageSEO