import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    image: '/campus-architecture.jpg',
    title: 'State-of-the-Art Facilities',
    description:
      'From our glass-walled Innovation Hub to the underground Quantum Lab, every space is designed to inspire collaboration and deep work.',
  },
  {
    image: '/students-collab.jpg',
    title: 'Global Student Body',
    description:
      'Students from 92 countries bring diverse perspectives to every classroom, lab, and dormitory conversation.',
  },
  {
    image: '/campus-green.jpg',
    title: 'Sustainability at Heart',
    description:
      'Our campus runs on 100% renewable energy, features Europe\'s largest university solar array, and maintains 40 hectares of protected woodland.',
  },
]

export default function CampusLife() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.campus-card')
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="campus"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 lg:py-40"
      style={{ background: '#0f1119' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <p
            className="font-mono text-[12px] uppercase tracking-[0.05em] mb-4"
            style={{ color: '#6ecfff' }}
          >
            CAMPUS LIFE
          </p>
          <h2
            className="font-display text-[36px] sm:text-[42px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] max-w-[700px]"
            style={{ color: '#e8e6f0' }}
          >
            A Community of Thinkers, Makers, and Dreamers
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="campus-card rounded-2xl overflow-hidden"
              style={{
                background: '#161825',
                border: '1px solid rgba(200, 168, 255, 0.08)',
              }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3
                  className="font-display text-[22px] sm:text-[24px] font-medium leading-[1.25] mb-3"
                  style={{ color: '#e8e6f0' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="font-body text-[14px] sm:text-[15px] leading-[1.7] tracking-[0.01em]"
                  style={{ color: '#8a87a0' }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
