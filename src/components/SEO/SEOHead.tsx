
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: object;
}

const SEOHead = ({
  title = "НІСЕ - Незалежний Інститут Судових Експертиз",
  description = "Експертиза є не лише належним доказом у судовому провадженні, але і засобом мирного врегулювання спірних питань!",
  keywords = "судова експертиза, незалежна експертиза, будівельно-технічна експертиза, оціночна експертиза, експертний висновок, Київ",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://nise.com.ua",
  type = "website",
  structuredData
}: SEOHeadProps) => {
  const fullTitle = title.includes("НІСЕ") ? title : `${title} | НІСЕ`;
  
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
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
