import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ResearchSpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Text animation
      if (textRef.current) {
        const children = textRef.current.children
        gsap.fromTo(
          children,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.12,
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
      id="research"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 lg:py-40"
      style={{ background: '#0a0a0f' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="w-full lg:w-[55%]">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/research-lab.jpg"
                alt="Aurora Quantum Research Centre"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '16/10' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10, 10, 15, 0.4) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="w-full lg:w-[45%]">
            <p
              className="font-mono text-[12px] uppercase tracking-[0.05em] mb-4"
              style={{ color: '#6ecfff' }}
            >
              RESEARCH SPOTLIGHT
            </p>
            <h2
              className="font-display text-[36px] sm:text-[42px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.01em] mb-6"
              style={{ color: '#e8e6f0' }}
            >
              The Aurora Quantum Initiative
            </h2>
            <p
              className="font-body text-[15px] sm:text-[16px] leading-[1.7] tracking-[0.01em] mb-8"
              style={{ color: '#8a87a0' }}
            >
              Our newly inaugurated Quantum Research Centre houses one of Europe's most powerful quantum simulators. Led by Professor Elena Vasquez, the team recently achieved a breakthrough in error-correction algorithms, paving the way for fault-tolerant quantum computing within the decade.
            </p>

            {/* Stats */}
            <div className="flex gap-10 mb-8">
              <div>
                <div
                  className="font-display text-[32px] font-medium leading-[1.15] mb-1"
                  style={{ color: '#c8a8ff' }}
                >
                  €47M
                </div>
                <div
                  className="font-body text-[13px] font-medium uppercase tracking-[0.08em]"
                  style={{ color: '#8a87a0' }}
                >
                  Research Funding
                </div>
              </div>
              <div>
                <div
                  className="font-display text-[32px] font-medium leading-[1.15] mb-1"
                  style={{ color: '#c8a8ff' }}
                >
                  34
                </div>
                <div
                  className="font-body text-[13px] font-medium uppercase tracking-[0.08em]"
                  style={{ color: '#8a87a0' }}
                >
                  Active Projects
                </div>
              </div>
            </div>

            <button className="gradient-border-btn">Read the Paper</button>
          </div>
        </div>
      </div>
    </section>
  )
}
