import { useEffect, useState, useRef } from 'react'

interface NavigationProps {
  onNavigate: (id: string) => void
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Programs', id: 'programs' },
    { label: 'Research', id: 'research' },
    { label: 'Campus', id: 'campus' },
    { label: 'Apply', id: 'apply' },
  ]

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between h-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <button
          onClick={() => onNavigate('hero')}
          className="font-body text-[13px] font-medium uppercase tracking-[0.1em] text-[#e8e6f0] hover:opacity-80 transition-opacity"
        >
          AURORA
        </button>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="font-body text-[13px] font-medium uppercase tracking-[0.08em] text-[#8a87a0] hover:text-[#e8e6f0] transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('apply')}
            className="font-body text-[14px] font-semibold tracking-[0.04em] px-6 py-2.5 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, #c8a8ff, #6ecfff)',
              color: '#0a0a0f',
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </nav>
  )
}
