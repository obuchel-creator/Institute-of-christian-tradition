import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Brain,
  Atom,
  Leaf,
  Dna,
  BarChart3,
  Cog,
  Shield,
  Rocket,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const programs = [
  {
    name: 'Artificial Intelligence',
    icon: Brain,
    description: 'Machine learning, deep neural networks, and autonomous systems',
    courses: ['Neural Architecture', 'Reinforcement Learning', 'Computer Vision'],
  },
  {
    name: 'Quantum Computing',
    icon: Atom,
    description: 'Quantum algorithms, cryptography, and next-gen computation',
    courses: ['Quantum Algorithms', 'Qubit Engineering', 'Post-Quantum Crypto'],
  },
  {
    name: 'Sustainable Engineering',
    icon: Leaf,
    description: 'Clean energy, circular design, and climate resilience',
    courses: ['Renewable Systems', 'Carbon Engineering', 'Smart Grids'],
  },
  {
    name: 'Computational Biology',
    icon: Dna,
    description: 'Genomics, bioinformatics, and precision medicine',
    courses: ['Genomic Analysis', 'Protein Folding', 'Synthetic Biology'],
  },
  {
    name: 'Data Science',
    icon: BarChart3,
    description: 'Statistical modeling, big data, and predictive analytics',
    courses: ['Statistical Inference', 'Distributed Systems', 'Visualization'],
  },
  {
    name: 'Robotics',
    icon: Cog,
    description: 'Autonomous systems, human-robot interaction, and mechatronics',
    courses: ['Kinematics', 'SLAM Systems', 'HRI Design'],
  },
  {
    name: 'Cybersecurity',
    icon: Shield,
    description: 'Threat intelligence, secure systems, and digital forensics',
    courses: ['Cryptographic Protocols', 'Threat Analysis', 'Forensics'],
  },
  {
    name: 'Space Systems',
    icon: Rocket,
    description: 'Satellite engineering, orbital mechanics, and astrophysics',
    courses: ['Orbital Dynamics', 'Satellite Design', 'Astrophysics'],
  },
]

export default function Programs() {
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
        const cards = cardsRef.current.querySelectorAll('.card-container')
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
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
      id="programs"
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
            ACADEMIC PROGRAMS
          </p>
          <h2
            className="font-display text-[36px] sm:text-[42px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.01em]"
            style={{ color: '#e8e6f0' }}
          >
            Eight Pillars of Discovery
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {programs.map((program) => {
            const Icon = program.icon
            return (
              <div
                key={program.name}
                className="card-container group"
                role="group"
                aria-label={program.name}
                style={{ height: '360px' }}
              >
                <div className="card-inner">
                  {/* Front */}
                  <div className="card-front">
                    <div className="mb-6">
                      <Icon
                        size={32}
                        style={{ color: '#c8a8ff' }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3
                      className="font-display text-[22px] sm:text-[24px] font-medium leading-[1.25] mb-3"
                      style={{ color: '#e8e6f0' }}
                    >
                      {program.name}
                    </h3>
                    <p
                      className="font-body text-[14px] leading-[1.7] tracking-[0.01em] mb-6"
                      style={{ color: '#8a87a0' }}
                    >
                      {program.description}
                    </p>
                    <span
                      className="font-body text-[13px] font-medium tracking-[0.04em] mt-auto transition-colors duration-300 group-hover:text-[#c8a8ff]"
                      style={{ color: '#8a87a0' }}
                    >
                      Learn more
                    </span>
                  </div>

                  {/* Back */}
                  <div className="card-back">
                    <h3
                      className="font-display text-[20px] font-medium leading-[1.25] mb-4"
                      style={{ color: '#e8e6f0' }}
                    >
                      {program.name}
                    </h3>
                    <div className="mb-4">
                      <p
                        className="font-body text-[12px] font-medium uppercase tracking-[0.08em] mb-2"
                        style={{ color: '#8a87a0' }}
                      >
                        Key Courses
                      </p>
                      <ul className="space-y-1.5">
                        {program.courses.map((course) => (
                          <li
                            key={course}
                            className="font-body text-[14px] leading-[1.6]"
                            style={{ color: '#e8e6f0' }}
                          >
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p
                      className="font-mono text-[11px] uppercase tracking-[0.05em] mb-4"
                      style={{ color: '#ffb6a0' }}
                    >
                      Apply by Jan 15
                    </p>
                    <button className="gradient-solid-btn text-[13px] py-2.5 px-5 mt-auto w-fit">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
