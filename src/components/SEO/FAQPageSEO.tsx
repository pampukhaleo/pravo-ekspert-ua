import React from 'react'
import { Helmet } from 'react-helmet-async'

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
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>
    </Helmet>
  )
}

export default FAQPageSEO