import React from 'react'
import * as HelmetPkg from 'react-helmet-async'
const { Helmet } = HelmetPkg

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  structuredData?: object | object[]
}

const SEOHead: React.FC<SEOHeadProps> = ({
                                           title = "НІСЕ - Незалежний Інститут Судових Експертиз",
                                           description =
                                             "Експертиза є не лише належним доказом у судовому провадженні, але і засобом мирного врегулювання спірних питань!",
                                           keywords =
                                             "судова експертиза, незалежна експертиза, будівельно-технічна експертиза, оціночна експертиза, експертний висновок, Київ",
                                           image = "https://expertise.com.ua/logonise.png",
                                           url = "https://expertise.com.ua",
                                           type = "website",
                                           structuredData,
                                         }) => {
  const fullTitle = title.includes("НІСЕ") ? title : `${title} | НІСЕ`
  // normalize to array for JSON-LD
  const ldArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : null

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="НІСЕ" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="НІСЕ" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data (JSON-LD) */}
      {ldArray && (
        <script
          type="application/ld+json"
          // inject raw JSON to avoid HTML-escaping mismatches
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldArray) }}
        />
      )}
    </Helmet>
  )
}

export default SEOHead
