import { ArrowRight } from 'lucide-react'
import WaveCanvas from './WaveCanvas'

interface HeroProps {
  onNavigate: (id: string) => void
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden"
      style={{ background: '#0a0a0f' }}
    >
      <WaveCanvas />

      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-center px-6"
      >
        <div className="max-w-[700px]">
          <p
            className="font-mono text-[12px] uppercase tracking-[0.05em] mb-6"
            style={{ color: '#6ecfff' }}
          >
            EST. 1892 — Where Tradition Meets Tomorrow
          </p>

          <h1 className="font-display text-[40px] sm:text-[52px] lg:text-[64px] font-semibold leading-[1.05] tracking-[-0.02em] mb-6" style={{ color: '#e8e6f0' }}>
            <span className="block">Illuminating</span>{' '}
            <span className="block">Minds, Shaping Futures</span>
          </h1>

          <p
            className="font-body text-[16px] lg:text-[18px] leading-[1.6] tracking-[0.02em] mb-10 max-w-[600px] mx-auto"
            style={{ color: '#8a87a0' }}
          >
            Aurora University combines centuries of academic excellence with pioneering research in artificial intelligence, quantum computing, and sustainable technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('programs')}
              className="gradient-border-btn flex items-center gap-2"
            >
              Explore Programs
            </button>

            <button
              onClick={() => onNavigate('campus')}
              className="flex items-center gap-2 font-body text-[14px] font-medium tracking-[0.04em] transition-colors duration-300 hover:text-[#e8e6f0]"
              style={{ color: '#8a87a0' }}
            >
              Virtual Tour
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
