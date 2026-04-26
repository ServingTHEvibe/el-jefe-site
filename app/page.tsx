import PageLoader from '@/components/PageLoader'
import PromoBanner from '@/components/PromoBanner'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ScrollingCan from '@/components/ScrollingCan'
import CanShowcaseClient from '@/components/CanShowcaseClient'
import Manifesto from '@/components/Manifesto'
import CanReel from '@/components/CanReel'
import About from '@/components/About'
import SocialProof from '@/components/SocialProof'
import ProductSpotlight from '@/components/ProductSpotlight'
import PickYourFlavor from '@/components/PickYourFlavor'
import Merch from '@/components/Merch'
import StoreLocator from '@/components/StoreLocator'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-black">
      <PageLoader />
      <PromoBanner />
      <Nav />
      <ScrollingCan />
      <Hero />
      <CanShowcaseClient />
      <Manifesto />
      <CanReel />
      <About />
      <SocialProof />
      <ProductSpotlight />
      <PickYourFlavor />
      <Merch />
      <StoreLocator />
      <Footer />
    </main>
  )
}
