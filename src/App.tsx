import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Introduction from './sections/Introduction'
import Programs from './sections/Programs'
import ResearchSpotlight from './sections/ResearchSpotlight'
import CampusLife from './sections/CampusLife'
import Partners from './sections/Partners'
import CTA from './sections/CTA'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback)
    }
  }, [])

  const handleNavigate = (id: string) => {
    if (lenisRef.current) {
      const target = document.getElementById(id)
      if (target) {
        lenisRef.current.scrollTo(target, { offset: 0 })
      }
    }
  }

  return (
    <div className="relative">
      <Navigation onNavigate={handleNavigate} />
      <Hero onNavigate={handleNavigate} />
      <Introduction />
      <Programs />
      <ResearchSpotlight />
      <CampusLife />
      <Partners />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
