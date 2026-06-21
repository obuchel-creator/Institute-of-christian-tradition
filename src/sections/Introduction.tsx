import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function splitTextToChars(text: string) {
  return text.split('').map((char, i) => (
    <span className="char inline-block relative" key={i}>
      <span
        className="shadow-char absolute inset-0 blur-[2px] opacity-20"
        style={{ color: '#6ecfff' }}
        aria-hidden="true"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
      <span
        className="shadow-char absolute inset-0 blur-[4px] opacity-10"
        style={{ color: '#c8a8ff' }}
        aria-hidden="true"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
      <span className="visible-char relative">
        {char === ' ' ? '\u00A0' : char}
      </span>
    </span>
  ))
}

const stats = [
  { value: '130+', label: 'Years of Excellence' },
  { value: '12', label: 'Nobel Laureates' },
  { value: '4', label: 'Turing Awards' },
  { value: '200K', label: 'Alumni Worldwide' },
]

export default function Introduction() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((el, index) => {
        if (!el) return
        const chars = el.querySelectorAll('.char')

        chars.forEach((char) => {
          const shadowChars = char.querySelectorAll('.shadow-char')
          const visibleChar = char.querySelector('.visible-char')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: char,
              start: 'top bottom+=30%',
              end: 'top top+=10%',
              scrub: true,
            },
          })

          tl.fromTo(
            shadowChars,
            { scale: 1.3, opacity: 0.2 },
            {
              scale: 1,
              opacity: 0.6,
              stagger: 0.03,
              ease: 'power2.inOut',
              delay: index * 0.08,
            },
            0
          )

          tl.fromTo(
            shadowChars,
            { yPercent: 250 },
            {
              yPercent: 0,
              stagger: 0.03,
              ease: 'power2.inOut',
              delay: index * 0.08,
            },
            0
          )

          if (visibleChar) {
            tl.to(
              visibleChar,
              {
                ease: 'expo.out',
                yPercent: 0,
              },
              0
            )
          }

          tl.to(
            char.querySelectorAll('.shadow-char:not(:last-child)'),
            {
              yPercent: -60,
              ease: 'power3.inOut',
              opacity: 0,
            },
            0.14
          )

          const lastShadow = char.querySelector('.shadow-char:last-child')
          if (lastShadow) {
            tl.to(
              lastShadow,
              {
                yPercent: -500,
                ease: 'power4.inOut',
                opacity: 0,
              },
              0.52
            )
          }
        })
      })

      // Stats animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item')
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
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
      id="introduction"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: '#0a0a0f' }}
    >
      <div className="max-w-[900px] mx-auto px-6 sm:px-12 py-40">
        <h2
          className="font-display text-[36px] sm:text-[42px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] mb-8"
          style={{ color: '#e8e6f0' }}
          ref={(el) => { textRefs.current[0] = el }}
        >
          {splitTextToChars('Pioneering the Next Frontier of Knowledge')}
        </h2>

        <p
          className="font-body text-[15px] sm:text-[16px] leading-[1.7] tracking-[0.01em] mb-16"
          style={{ color: '#8a87a0' }}
          ref={(el) => { textRefs.current[1] = el }}
        >
          {splitTextToChars('For over 130 years, Aurora has been at the vanguard of human discovery. Today, our researchers collaborate across disciplines — from neural networks to renewable energy systems — to solve the defining challenges of our era. With 12 Nobel laureates, 4 Turing Award winners, and a global network of 200,000 alumni, Aurora is where ambitious minds come to transform the world.')}
        </p>

        <div
          ref={statsRef}
          className="flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div
                className="font-display text-[32px] sm:text-[40px] font-medium leading-[1.15] mb-1"
                style={{ color: '#c8a8ff' }}
              >
                {stat.value}
              </div>
              <div
                className="font-body text-[13px] font-medium uppercase tracking-[0.08em]"
                style={{ color: '#8a87a0' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
