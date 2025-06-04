
interface OrganizationData {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
    postalCode: string;
  };
  contactPoint: {
    "@type": string;
    telephone: string[];
    email: string;
    contactType: string;
  };
  sameAs: string[];
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    bestRating: string;
    ratingCount: string;
  };
}

interface ServiceData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
  areaServed: string;
  serviceType: string;
  offers?: {
    "@type": string;
    availability: string;
    priceCurrency: string;
  };
}

interface ProfessionalServiceData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
    logo: string;
    address: {
      "@type": string;
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    telephone: string[];
    email: string;
  };
  serviceType: string;
  areaServed: {
    "@type": string;
    name: string;
  };
  availableChannel: {
    "@type": string;
    serviceUrl: string;
    serviceName: string;
  };
  category: string;
  audience: {
    "@type": string;
    audienceType: string;
  };
  hasOfferCatalog?: {
    "@type": string;
    name: string;
    itemListElement: Array<{
      "@type": string;
      name: string;
      description: string;
    }>;
  };
}

interface WebPageData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  mainEntity: {
    "@type": string;
    name: string;
  };
  breadcrumb: {
    "@type": string;
    itemListElement: Array<{
      "@type": string;
      position: number;
      name: string;
      item: string;
    }>;
  };
}

interface FAQData {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

interface LocalBusinessData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  logo: string;
  telephone: string[];
  email: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: string;
  };
}

interface ArticleData {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": string;
    name: string;
    url?: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  image?: string;
  url: string;
  articleSection: string;
  wordCount?: number;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
}

export const useStructuredData = () => {
  const getOrganizationData = (): OrganizationData => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
    url: "https://nise.com.ua",
    logo: "https://nise.com.ua/logonise.png",
    description: "Незалежний інститут судових експертиз, що надає професійні експертні послуги у різних галузях",
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
      addressLocality: "Київ",
      addressCountry: "UA",
      postalCode: "04207"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ["(044) 581 30 90", "(050) 360 16 82", "(067) 5555 222"],
      email: "info@nise.com.ua",
      contactType: "customer service"
    },
    sameAs: [],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      ratingCount: "127"
    }
  });

  const getServiceData = (serviceName: string, serviceDescription: string): ServiceData => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "Organization",
      name: "НІСЕ",
      url: "https://nise.com.ua"
    },
    areaServed: "Україна",
    serviceType: "Судова експертиза",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "UAH"
    }
  });

  const getProfessionalServiceData = (
    serviceName: string, 
    serviceDescription: string, 
    serviceUrl: string,
    directions?: Array<{ title: string; description: string }>
  ): ProfessionalServiceData => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
      url: "https://nise.com.ua",
      logo: "https://nise.com.ua/logonise.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
        addressLocality: "Київ",
        addressRegion: "Київська область",
        postalCode: "04207",
        addressCountry: "UA"
      },
      telephone: ["(044) 581 30 90", "(050) 360 16 82", "(067) 5555 222"],
      email: "info@nise.com.ua"
    },
    serviceType: "Судова експертиза",
    areaServed: {
      "@type": "Country",
      name: "Україна"
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: serviceUrl,
      serviceName: serviceName
    },
    category: "Експертні послуги",
    audience: {
      "@type": "Audience",
      audienceType: "Юридичні особи та приватні клієнти"
    },
    hasOfferCatalog: directions && directions.length > 0 ? {
      "@type": "OfferCatalog",
      name: `Напрямки ${serviceName.toLowerCase()}`,
      itemListElement: directions.map(direction => ({
        "@type": "Offer",
        name: direction.title,
        description: direction.description
      }))
    } : undefined
  });

  const getFAQData = (faqs: Array<{ question: string; answer: string }>): FAQData => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  });

  const getLocalBusinessData = (): LocalBusinessData => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
    description: "Професійні судові експертизи всіх видів. Атестовані експерти Мін'юсту України.",
    url: "https://nise.com.ua",
    logo: "https://nise.com.ua/logonise.png",
    telephone: ["(044) 581 30 90", "(050) 360 16 82", "(067) 5555 222"],
    email: "info@nise.com.ua",
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
      addressLocality: "Київ",
      addressRegion: "Київська область",
      postalCode: "04207",
      addressCountry: "UA"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.4501,
      longitude: 30.5234
    },
    openingHours: [
      "Mo-Fr 09:00-18:00"
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127"
    }
  });

  const getArticleData = (
    title: string,
    description: string,
    datePublished: string,
    url: string,
    imageUrl?: string,
    content?: string
  ): ArticleData => ({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: "НІСЕ",
      url: "https://nise.com.ua"
    },
    publisher: {
      "@type": "Organization",
      name: "НІСЕ",
      logo: {
        "@type": "ImageObject",
        url: "https://nise.com.ua/logonise.png"
      }
    },
    image: imageUrl,
    url: url,
    articleSection: "Новини",
    wordCount: content ? content.replace(/<[^>]*>/g, '').split(/\s+/).length : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  });

  const getBreadcrumbData = (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  });

  const getWebPageData = (name: string, description: string, url: string, breadcrumbItems: Array<{ name: string; url: string }>): WebPageData => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "Organization",
      name: "НІСЕ"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  });

  return {
    getOrganizationData,
    getServiceData,
    getProfessionalServiceData,
    getFAQData,
    getLocalBusinessData,
    getArticleData,
    getBreadcrumbData,
    getWebPageData
  };
};
