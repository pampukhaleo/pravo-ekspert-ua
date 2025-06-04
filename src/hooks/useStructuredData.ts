
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
    getBreadcrumbData,
    getWebPageData
  };
};
