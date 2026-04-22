import PromoBanner from '@/components/PromoBanner'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ScrollingCan from '@/components/ScrollingCan'
import Manifesto from '@/components/Manifesto'
import About from '@/components/About'
import SocialProof from '@/components/SocialProof'
import ProductSpotlight from '@/components/ProductSpotlight'
import Flavors from '@/components/Flavors'
import Merch from '@/components/Merch'
import StoreLocator from '@/components/StoreLocator'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-black">
      <PromoBanner />
      <Nav />
      <ScrollingCan />
      <Hero />
      <Manifesto />
      <About />
      <SocialProof />
      <ProductSpotlight />
      <Flavors />
      <Merch />
      <StoreLocator />
      <Footer />
    </main>
  )
}
