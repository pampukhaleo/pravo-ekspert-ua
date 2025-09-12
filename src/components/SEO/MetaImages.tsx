import React from 'react'
import * as HelmetPkg from 'react-helmet-async'
const { Helmet } = HelmetPkg

interface MetaImagesProps {
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  title?: string
  description?: string
}

const MetaImages: React.FC<MetaImagesProps> = ({
  image = "https://expertise.com.ua/logonise.png",
  imageAlt = "НІСЕ логотип",
  imageWidth = 1200,
  imageHeight = 630,
  title = "НІСЕ - Незалежний Інститут Судових Експертиз",
  description = "Експертиза є не лише належним доказом у судовому провадженні, але і засобом мирного врегулювання спірних питань!"
}) => {
  // Normalize image to absolute URL
  const absoluteImage = image?.startsWith('http') ? image : `https://expertise.com.ua${image}`

  return (
    <Helmet>
      {/* Enhanced Open Graph */}
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:image:type" content="image/png" />

      {/* Twitter Card Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      
      {/* Additional social media platforms */}
      <meta property="vk:image" content={absoluteImage} />
      <meta property="telegram:image" content={absoluteImage} />
      
      {/* Pinterest Rich Pins */}
      <meta property="pinterest:description" content={description} />
      <meta property="pinterest:media" content={absoluteImage} />
      
      {/* WhatsApp sharing */}
      <meta property="og:image:secure_url" content={absoluteImage} />
    </Helmet>
  )
}

export default MetaImages