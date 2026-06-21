import { Linkedin, Twitter, Youtube, Instagram } from 'lucide-react'

const footerLinks = {
  Study: ['Undergraduate', 'Graduate', 'PhD Programs', 'Online Courses', 'Executive Education'],
  Research: ['Quantum Initiative', 'AI Lab', 'Sustainability', 'Publications', 'Partnerships'],
  Connect: ['Contact', 'Visit Campus', 'Alumni Network', 'Careers', 'Press'],
}

export default function Footer() {
  const socialIcons = [
    { Icon: Linkedin, label: 'LinkedIn' },
    { Icon: Twitter, label: 'Twitter' },
    { Icon: Youtube, label: 'YouTube' },
    { Icon: Instagram, label: 'Instagram' },
  ]

  return (
    <footer
      className="relative w-full"
      style={{
        background: '#0a0a0f',
        borderTop: '1px solid rgba(200, 168, 255, 0.08)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 pt-16 sm:pt-20 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Col 1 - Brand */}
          <div>
            <p
              className="font-body text-[13px] font-medium uppercase tracking-[0.1em] mb-4"
              style={{ color: '#e8e6f0' }}
            >
              AURORA
            </p>
            <p
              className="font-body text-[14px] leading-[1.7] tracking-[0.01em]"
              style={{ color: '#8a87a0' }}
            >
              Illuminating minds since 1892. A private research university in Zurich, Switzerland.
            </p>
          </div>

          {/* Col 2 - Study */}
          <div>
            <p
              className="font-body text-[13px] font-medium uppercase tracking-[0.08em] mb-4"
              style={{ color: '#e8e6f0' }}
            >
              Study
            </p>
            <ul className="space-y-2.5">
              {footerLinks.Study.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-[14px] leading-[1.6] transition-colors duration-300 hover:text-[#e8e6f0]"
                    style={{ color: '#8a87a0' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Research */}
          <div>
            <p
              className="font-body text-[13px] font-medium uppercase tracking-[0.08em] mb-4"
              style={{ color: '#e8e6f0' }}
            >
              Research
            </p>
            <ul className="space-y-2.5">
              {footerLinks.Research.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-[14px] leading-[1.6] transition-colors duration-300 hover:text-[#e8e6f0]"
                    style={{ color: '#8a87a0' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Connect */}
          <div>
            <p
              className="font-body text-[13px] font-medium uppercase tracking-[0.08em] mb-4"
              style={{ color: '#e8e6f0' }}
            >
              Connect
            </p>
            <ul className="space-y-2.5">
              {footerLinks.Connect.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-[14px] leading-[1.6] transition-colors duration-300 hover:text-[#e8e6f0]"
                    style={{ color: '#8a87a0' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(200, 168, 255, 0.08)' }}
        >
          <p
            className="font-body text-[13px] tracking-[0.01em]"
            style={{ color: '#8a87a0' }}
          >
            © 2025 Aurora University. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialIcons.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="transition-colors duration-300 hover:text-[#e8e6f0]"
                style={{ color: '#8a87a0' }}
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
