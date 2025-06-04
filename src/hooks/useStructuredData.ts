
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
    sameAs: []
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
    serviceType: "Судова експертиза"
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

  return {
    getOrganizationData,
    getServiceData,
    getBreadcrumbData
  };
};
