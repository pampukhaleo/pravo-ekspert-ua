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

interface ProductData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  brand: {
    "@type": string;
    name: string;
    url: string;
    logo: string;
  };
  category: string;
  offers: {
    "@type": string;
    availability: string;
    priceCurrency: string;
    priceRange?: string;
    seller: {
      "@type": string;
      name: string;
      url: string;
    };
  };
  provider: {
    "@type": string;
    name: string;
    url: string;
    telephone: string[];
    email: string;
  };
  serviceType: string;
  areaServed: string;
}

interface ContactPointData {
  "@context": string;
  "@type": string;
  contactType: string;
  telephone: string[];
  email: string;
  availableLanguage: string[];
  hoursAvailable: {
    "@type": string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  areaServed: string;
  parentOrganization: {
    "@type": string;
    name: string;
    url: string;
  };
}

interface EventData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  eventStatus: string;
  eventAttendanceMode: string;
  location: {
    "@type": string;
    name: string;
    address: {
      "@type": string;
      streetAddress: string;
      addressLocality: string;
      addressCountry: string;
      postalCode: string;
    };
  } | {
    "@type": string;
    url: string;
  };
  organizer: {
    "@type": string;
    name: string;
    url: string;
    email: string;
  };
  offers?: {
    "@type": string;
    price: string;
    priceCurrency: string;
    availability: string;
    url?: string;
  };
  audience?: {
    "@type": string;
    audienceType: string;
  };
}

export const useStructuredData = () => {
  const getOrganizationData = (): OrganizationData => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
    url: "https://expertise.com.ua",
    logo: "https://expertise.com.ua/logonise.png",
    description: "Незалежний інститут судових експертиз, що надає професійні експертні послуги у різних галузях з 2008 року. Атестовані експерти Мін'юсту України.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
      addressLocality: "Київ",
      addressCountry: "UA",
      postalCode: "04207"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ["+380445813090", "+380503601682", "+380675555222"],
      email: "info@nise.com.ua",
      contactType: "customer service"
    },
    sameAs: [
      "https://www.facebook.com/nise.com.ua",
      "https://www.linkedin.com/company/nise-com-ua"
    ],
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
      url: "https://expertise.com.ua"
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
      url: "https://expertise.com.ua",
      logo: "https://expertise.com.ua/logonise.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
        addressLocality: "Київ",
        addressRegion: "Київська область",
        postalCode: "04207",
        addressCountry: "UA"
      },
      telephone: ["+380445813090", "+380503601682", "+380675555222"],
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
    url: "https://expertise.com.ua",
    logo: "https://expertise.com.ua/logonise.png",
    telephone: ["+380445813090", "+380503601682", "+380675555222"],
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
      url: "https://expertise.com.ua"
    },
    publisher: {
      "@type": "Organization",
      name: "НІСЕ",
      logo: {
        "@type": "ImageObject",
        url: "https://expertise.com.ua/logonise.png"
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

  const getProductData = (
    serviceName: string,
    serviceDescription: string,
    category: string = "Судові експертизи",
    priceRange?: string
  ): ProductData => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: serviceName,
    description: serviceDescription,
    brand: {
      "@type": "Brand",
      name: "НІСЕ",
      url: "https://expertise.com.ua",
      logo: "https://expertise.com.ua/logonise.png"
    },
    category: category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "UAH",
      priceRange: priceRange,
      seller: {
        "@type": "Organization",
        name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
        url: "https://expertise.com.ua"
      }
    },
    provider: {
      "@type": "Organization",
      name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
      url: "https://expertise.com.ua",
      telephone: ["(044) 581 30 90", "(050) 360 16 82", "(067) 5555 222"],
      email: "info@nise.com.ua"
    },
    serviceType: "Судова експертиза",
    areaServed: "Україна"
  });

  const getContactPointData = (): ContactPointData => ({
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: ["(044) 581 30 90", "(050) 360 16 82", "(067) 5555 222"],
    email: "info@nise.com.ua",
    availableLanguage: ["Ukrainian", "Russian"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    },
    areaServed: "Україна",
    parentOrganization: {
      "@type": "Organization",
      name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
      url: "https://expertise.com.ua"
    }
  });

  const getEventData = (
    eventName: string,
    eventDescription: string,
    startDate: string,
    endDate?: string,
    isOnline: boolean = false,
    price?: string,
    eventUrl?: string
  ): EventData => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName,
    description: eventDescription,
    startDate: startDate,
    endDate: endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: isOnline 
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: isOnline ? {
      "@type": "VirtualLocation",
      url: eventUrl || "https://expertise.com.ua"
    } : {
      "@type": "Place",
      name: "Офіс НІСЕ",
      address: {
        "@type": "PostalAddress",
        streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
        addressLocality: "Київ",
        addressCountry: "UA",
        postalCode: "04207"
      }
    },
    organizer: {
      "@type": "Organization",
      name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
      url: "https://expertise.com.ua",
      email: "info@nise.com.ua"
    },
    offers: price ? {
      "@type": "Offer",
      price: price,
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
      url: eventUrl
    } : undefined,
    audience: {
      "@type": "Audience",
      audienceType: "Юристи, експерти, представники бізнесу"
    }
  });

  const getWebSiteData = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
    alternateName: "НІСЕ",
    url: "https://expertise.com.ua",
    description: "Професійні судові експертизи всіх видів. Атестовані експерти Мін'юсту України.",
    publisher: {
      "@type": "Organization",
      name: "НІСЕ",
      url: "https://expertise.com.ua",
      logo: "https://expertise.com.ua/logonise.png"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://expertise.com.ua/ekspertyzy?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    sameAs: [
      "https://www.facebook.com/nise.com.ua",
      "https://www.linkedin.com/company/nise-com-ua"
    ]
  });

  return {
    getOrganizationData,
    getServiceData,
    getProfessionalServiceData,
    getFAQData,
    getLocalBusinessData,
    getArticleData,
    getBreadcrumbData,
    getWebPageData,
    getProductData,
    getContactPointData,
    getEventData,
    getWebSiteData
  };
};
