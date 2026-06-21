import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const children = contentRef.current.children
        gsap.fromTo(
          children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
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

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="apply"
      ref={sectionRef}
      className="relative w-full py-32 sm:py-40 lg:py-48"
      style={{ background: '#0f1119' }}
    >
      <div ref={contentRef} className="max-w-[700px] mx-auto px-6 sm:px-12 text-center">
        <h2
          className="font-display text-[36px] sm:text-[42px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] mb-6"
          style={{ color: '#e8e6f0' }}
        >
          Ready to Shape the Future?
        </h2>
        <p
          className="font-body text-[15px] sm:text-[16px] leading-[1.7] tracking-[0.01em] mb-10"
          style={{ color: '#8a87a0' }}
        >
          Applications for the 2026 intake are now open. Join a community of exceptional minds pushing the boundaries of what's possible.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="gradient-solid-btn">Apply for 2026</button>
          <button className="gradient-border-btn">Download Prospectus</button>
        </div>
      </div>
    </section>
  )
}
