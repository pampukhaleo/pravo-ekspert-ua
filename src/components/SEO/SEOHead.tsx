import React from 'react'
import * as HelmetPkg from 'react-helmet-async'
const { Helmet } = HelmetPkg

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  url?: string
  type?: 'website' | 'article'
  structuredData?: object | object[]
  robots?: string
  ogLocale?: string
  twitterSite?: string
}

const SEOHead: React.FC<SEOHeadProps> = ({
                                             title = "НІСЕ - Незалежний Інститут Судових Експертиз",
                                             description =
                                               "Експертиза є не лише належним доказом у судовому провадженні, але і засобом мирного врегулювання спірних питань!",
                                             keywords =
                                               "судова експертиза, незалежна експертиза, будівельно-технічна експертиза, оціночна експертиза, експертний висновок, Київ",
                                             image = "https://expertise.com.ua/logonise.png",
                                             imageAlt = "НІСЕ логотип",
                                             imageWidth,
                                             imageHeight,
                                             url = "https://expertise.com.ua",
                                             type = "website",
                                             structuredData,
                                             robots,
                                             ogLocale = "uk_UA",
                                             twitterSite = "@nise_ua",
                                           }) => {
  const fullTitle = title.includes("НІСЕ") ? title : `${title} | НІСЕ`
  
  // Normalize image to absolute URL
  const absoluteImage = image?.startsWith('http') ? image : `https://expertise.com.ua${image}`
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
      <meta name="generator" content="Lovable" />
      <meta name="robots" content={robots || "index, follow"} />
      <meta name="google-site-verification" content="your-verification-code" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content={imageWidth?.toString() || "1200"} />
      <meta property="og:image:height" content={imageHeight?.toString() || "630"} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content={absoluteImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="НІСЕ" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content={twitterSite} />

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
