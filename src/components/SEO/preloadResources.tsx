import React from 'react'
import * as HelmetPkg from 'react-helmet-async'
const { Helmet } = HelmetPkg

interface PreloadResourcesProps {
  fonts?: string[]
  styles?: string[]
  scripts?: string[]
  images?: string[]
}

const PreloadResources: React.FC<PreloadResourcesProps> = ({
  fonts = [],
  styles = [],
  scripts = [],
  images = []
}) => {
  return (
    <Helmet>
      {/* Preload critical fonts */}
      {fonts.map((font, index) => (
        <link
          key={`font-${index}`}
          rel="preload"
          href={font}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
      
      {/* Preload critical CSS */}
      {styles.map((style, index) => (
        <link
          key={`style-${index}`}
          rel="preload"
          href={style}
          as="style"
        />
      ))}
      
      {/* Preload critical scripts */}
      {scripts.map((script, index) => (
        <link
          key={`script-${index}`}
          rel="preload"
          href={script}
          as="script"
        />
      ))}
      
      {/* Preload critical images */}
      {images.map((image, index) => (
        <link
          key={`image-${index}`}
          rel="preload"
          href={image}
          as="image"
        />
      ))}
      
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  )
}

export default PreloadResources