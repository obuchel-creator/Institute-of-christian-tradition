import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const partners = [
  'CERN',
  'Max Planck Institute',
  'MIT Media Lab',
  'DeepMind',
  'NASA JPL',
  'ETH Zurich',
  'Imperial College',
  'Siemens',
  'Bosch Research',
]

function initCarousel(ring: HTMLDivElement | null) {
  if (!ring) return
  const items = ring.querySelectorAll<HTMLDivElement>('.carousel-item')
  const radius = 280
  const angleStep = 360 / items.length

  items.forEach((item, index) => {
    const angle = index * angleStep
    item.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`
  })
}

export default function Partners() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in carousel
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    // Initialize carousel positions
    initCarousel(ringRef.current)

    // Scroll interaction
    let scrollTimeout: ReturnType<typeof setTimeout>

    const wheelHandler = (e: WheelEvent) => {
      if (!ringRef.current) return
      const ring = ringRef.current
      const currentTransform = getComputedStyle(ring).transform
      let currentRotateY = 0

      if (currentTransform && currentTransform !== 'none') {
        const values = currentTransform.split('(')[1].split(')')[0].split(',')
        const a = parseFloat(values[0])
        const b = parseFloat(values[1])
        currentRotateY = Math.round(Math.atan2(b, a) * (180 / Math.PI))
      }

      const newRotateY = currentRotateY + e.deltaY * 0.1
      ring.style.animation = 'none'
      ring.style.transform = `rotateY(${newRotateY}deg)`

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        ring.style.animation = 'spin 18s linear infinite'
        ring.style.transform = ''
      }, 1000)
    }

    window.addEventListener('wheel', wheelHandler, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('wheel', wheelHandler)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: '#0a0a0f' }}
    >
      <p
        ref={labelRef}
        className="font-body text-[13px] font-medium uppercase tracking-[0.08em] text-center mb-12"
        style={{ color: '#8a87a0' }}
      >
        TRUSTED BY LEADING INSTITUTIONS
      </p>

      <div
        ref={carouselRef}
        className="carousel-container"
        aria-label="Partner institutions"
      >
        <div ref={ringRef} className="carousel-ring">
          {partners.map((name) => (
            <div
              key={name}
              className="carousel-item"
              aria-hidden="true"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
