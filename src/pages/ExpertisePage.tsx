import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import ExpertiseHeader from '../components/expertise/ExpertiseHeader'
import KeyDirections from '../components/expertise/KeyDirections'
import FAQ from '../components/expertise/FAQ'
import WhyUs from '../components/expertise/WhyUs'
import ConsultationButton from '../components/ConsultationButton'
import SEOHead from '../components/SEO/SEOHead'
import { useStructuredData } from '../hooks/useStructuredData'
import { expertiseData } from '../data/expertiseData'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { FileText, MessageSquare, CheckCircle, Clock } from 'lucide-react'

// Named export for vite-react-ssg
export function Component() {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('overview')
  const { getProfessionalServiceData, getBreadcrumbData, getProductData, getFAQData } = useStructuredData()

  useEffect(() => {
    if (location.search.includes('from=directions')) {
      setActiveTab('overview')
    }
  }, [location])

  let expertise = null
  let selectedDirection = null
  let parentExpertiseSlug: string | null = null

  if (slug && expertiseData[slug]) {
    expertise = expertiseData[slug]
  } else {
    for (const key in expertiseData) {
      const exp = expertiseData[key]
      const found = exp.directions.find(d => d.slug === slug)
      if (found) {
        expertise = exp
        selectedDirection = found
        parentExpertiseSlug = key
        break
      }
    }
  }

  if (!expertise) {
    return <Navigate to="/ekspertyzy" replace />
  }

  const backgroundImage =
    (selectedDirection && selectedDirection.backgroundImage) || expertise.backgroundImage

  const stages = [
    { title: 'Подання заяви', description: 'Клієнт звертається із заявою про проведення експертизи, надаючи всю необхідну інформацію та документи.' },
    { title: 'Аналіз матеріалів', description: 'Експерти ретельно вивчають отримані матеріали, визначають обсяг робіт та обирають відповідну методологію дослідження.' },
    { title: 'Проведення експертних досліджень', description: 'Виконується комплекс необхідних досліджень, вимірювань і аналізів відповідно до чинних стандартів та методик.' },
    { title: 'Підготовка експертного висновку', description: 'На основі результатів досліджень формується обґрунтований, детальний експертний висновок, який містить висновки та обґрунтування.' },
  ]

  const pageTitle = selectedDirection ? selectedDirection.title : expertise.title
  const pageDescription = selectedDirection ? selectedDirection.description : expertise.description

  const breadcrumbItems = selectedDirection && parentExpertiseSlug ? [
    { label: 'Експертизи', href: '/ekspertyzy' },
    { label: expertise.title, href: `/ekspertyzy/${parentExpertiseSlug}` },
    { label: selectedDirection.title, isCurrentPage: true },
  ] : [
    { label: 'Експертизи', href: '/ekspertyzy' },
    { label: pageTitle, isCurrentPage: true },
  ]

  const structuredData = [
    getProfessionalServiceData(
      pageTitle,
      pageDescription,
      `https://expertise.com.ua/ekspertyzy/${slug}`,
      expertise.directions
    ),
    getProductData(
      pageTitle,
      pageDescription,
      'Судові експертизи',
      'Від 2000 грн'
    ),
    getBreadcrumbData([
      { name: 'Головна', url: 'https://expertise.com.ua' },
      { name: 'Експертизи', url: 'https://expertise.com.ua/ekspertyzy' },
      ...(selectedDirection && parentExpertiseSlug
        ? [
          { name: expertise.title, url: `https://expertise.com.ua/ekspertyzy/${parentExpertiseSlug}` },
          { name: selectedDirection.title, url: `https://expertise.com.ua/ekspertyzy/${slug}` },
        ]
        : [
          { name: pageTitle, url: `https://expertise.com.ua/ekspertyzy/${slug}` },
        ])
    ]),
    ...(expertise.faqs && expertise.faqs.length > 0 ? [getFAQData(expertise.faqs)] : [])
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${pageTitle} | НІСЕ`}
        description={`${pageDescription} - професійна експертиза від Незалежного Інституту Судових Експертиз`}
        keywords={`${pageTitle.toLowerCase()}, судова експертиза, НІСЕ, експертний висновок, ${pageTitle.toLowerCase()} експертиза`}
        url={`https://expertise.com.ua/ekspertyzy/${slug}`}
        image={backgroundImage ? `https://expertise.com.ua${backgroundImage}` : undefined}
        structuredData={structuredData}
      />
      <Navbar />
      <main className="flex-grow">
        <ExpertiseHeader
          title={pageTitle}
          description={pageDescription}
          backgroundImage={backgroundImage}
        />
        <Breadcrumbs items={breadcrumbItems}/>
        <div className="container-custom py-10">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="flex gap-2 items-center"><FileText size={18} /> Огляд</TabsTrigger>
              <TabsTrigger value="process" className="flex gap-2 items-center"><CheckCircle size={18} /> Етапи</TabsTrigger>
              <TabsTrigger value="directions" className="flex gap-2 items-center"><MessageSquare size={18} /> Напрямки</TabsTrigger>
              <TabsTrigger value="faq" className="flex gap-2 items-center"><Clock size={18} /> FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="animate-fade-in"><div className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-6" dangerouslySetInnerHTML={{ __html: selectedDirection ? selectedDirection.fullContent : expertise.content }} /></TabsContent>
            <TabsContent value="process" className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Етапи проведення експертизи</h2>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 hidden md:block" />
                  <div className="space-y-10">{stages.map((stage, idx) => (<div key={idx} className="flex flex-col md:flex-row items-start gap-4 md:gap-8 relative"><div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white font-bold text-lg z-10">{idx+1}</div><div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 flex-grow"><h3 className="text-xl font-semibold text-gray-900 mb-2">{stage.title}</h3><p className="text-gray-600">{stage.description}</p></div></div>))}</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="directions" className="animate-fade-in">
              {expertise.directions.length>0 ? (<div className="bg-white rounded-lg shadow-sm p-6"><h2 className="text-2xl font-semibold text-gray-900 mb-6">Напрямки експертизи</h2><KeyDirections directions={expertise.directions} currentSlug={slug!}/>{(selectedDirection && expertise.directions.filter(d=>d.slug!==slug).length===0)&&(<p className="text-gray-600">Немає інших напрямків для цієї експертизи.</p>)}</div>) : (<div className="bg-white rounded-lg shadow-sm p-6"><h2 className="text-2xl font-semibold text-gray-900 mb-4">Напрямки експертизи</h2><p className="text-gray-600">Для даної експертизи немає додаткових напрямків.</p></div>)}
            </TabsContent>
            <TabsContent value="faq" className="animate-fade-in"><FAQ faqs={expertise.faqs||[]}/>{expertise.faqs?.length===0&&(<div className="bg-white rounded-lg shadow-sm p-6 text-center"><p className="text-gray-600">На даний момент немає часто задаваних питань для цієї експертизи. Ви можете задати своє питання через форму консультації.</p></div>)}</TabsContent>
          </Tabs>
          {activeTab==='overview'&&!selectedDirection&&expertise.directions.length>0&&(<div className="mt-10"><KeyDirections directions={expertise.directions}/></div>)}
        </div>
        <WhyUs />
        <section className="py-16 bg-brand-blue text-white text-center"><div className="container-custom"><h2 className="text-3xl font-bold mb-6">Потрібна консультація експерта?</h2><p className="text-xl mb-8 max-w-2xl mx-auto">Наші спеціалісти допоможуть вам обрати оптимальне рішення для вашої ситуації</p><ConsultationButton className="bg-white !text-black hover:bg-gray-100"/></div></section>
      </main>
      <Footer />
    </div>
  )
}

// Generate static paths for all expertise and directions
export function getStaticPaths(): string[] {
  const top = Object.keys(expertiseData).map(slug => `ekspertyzy/${slug}`)
  const nested = Object.values(expertiseData).flatMap(exp => exp.directions.map(d => `ekspertyzy/${d.slug}`))
  return [...top, ...nested]
}

// Entry point for CSS import
export const entry = 'src/pages/ExpertisePage.tsx'
