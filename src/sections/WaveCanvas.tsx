import { useRef, useEffect } from 'react'

const BREAKPOINT = 650
const WAVE_SPEED_DESKTOP = 0.004
const WAVE_SPEED_MOBILE = 0.002
const GLOW_SPEED = 0.02
const MOUSE_GLOW_RADIUS_DESKTOP = 200

const waveColors = [
  { r: 15, g: 20, b: 40 },
  { r: 40, g: 30, b: 80 },
  { r: 100, g: 60, b: 140 },
  { r: 160, g: 110, b: 200 },
  { r: 230, g: 210, b: 255 },
]

const glowColors = [
  { r: 255, g: 182, b: 160 },
  { r: 200, g: 168, b: 255 },
  { r: 110, g: 207, b: 255 },
]

class Wave {
  y: number
  length: number
  amplitude: number
  speed: number
  increment: number
  strokeColor: string
  fillColor: string
  shadowColor: string
  shadowBlur: number
  strokeWidth: number
  mouseGlowRadius: number
  mouseInfluenceStrength: number
  mouse: { x: number | undefined; y: number | undefined }
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.ctx = ctx
    this.y = canvas.height
    this.length = 0.0055
    this.amplitude = 54
    this.speed = 0.004
    this.increment = 0.04
    this.strokeColor = '#e0e0e0'
    this.fillColor = 'rgba(25, 25, 35, 0.6)'
    this.shadowColor = 'rgba(200, 180, 255, 0.3)'
    this.shadowBlur = 12
    this.strokeWidth = 1.5
    this.mouseGlowRadius = 200
    this.mouseInfluenceStrength = 0.5
    this.mouse = { x: undefined, y: undefined }

    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      this.mouse.x = event.clientX
      this.mouse.y = event.clientY
    })

    canvas.addEventListener('mouseleave', () => {
      this.mouse.x = undefined
      this.mouse.y = undefined
    })
  }

  init(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, amplitude: number, waveSpeed: number) {
    this.ctx = ctx
    this.canvas = canvas
    this.amplitude = amplitude
    this.speed = waveSpeed
    this.y = canvas.height
  }

  update(waveSpeed: number) {
    this.increment += waveSpeed
    this.ctx.shadowBlur = this.shadowBlur
    this.ctx.shadowColor = this.shadowColor
    this.ctx.beginPath()
    this.ctx.save()
    this.ctx.strokeStyle = this.strokeColor
    this.ctx.fillStyle = this.fillColor
    this.ctx.lineWidth = this.strokeWidth

    const amplitudeAtMouse = this.mouse.y !== undefined ? this.amplitude * 1.2 : this.amplitude

    this.ctx.moveTo(0, this.y)

    for (let x = 0; x <= this.canvas.width; x += 1) {
      const mouseDist = this.mouse.x !== undefined ? Math.abs(x - this.mouse.x) : Infinity
      const isCloseToMouse = mouseDist < 200
      const mouseFactor = isCloseToMouse ? (1 - mouseDist / 200) * this.mouseInfluenceStrength : 0

      const y =
        this.y +
        (this.mouse.y !== undefined ? this.mouse.y - this.canvas.height / 2 : 0) * mouseFactor +
        Math.sin(x * this.length + this.increment) * amplitudeAtMouse * (1 + mouseFactor) * Math.sin(this.increment)

      this.ctx.lineTo(x, y)
    }

    this.ctx.lineTo(this.canvas.width, this.canvas.height)
    this.ctx.lineTo(0, this.canvas.height)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    this.ctx.restore()
  }
}

function blendWithLuminance(
  imageData: ImageData,
  width: number,
  height: number,
  mouseX: number | undefined,
  mouseY: number | undefined,
  _mouseGlowRadius: number,
  speed: number
): ImageData {
  const time = Date.now() * speed
  const pixels = imageData.data
  const centerX = width / 2
  const centerY = height / 2
  const dx = (mouseX !== undefined ? mouseX : centerX) - centerX
  const dy = (mouseY !== undefined ? mouseY : centerY) - centerY
  const mouseDistSq = dx * dx + dy * dy

  for (let y = 0; y < height; y++) {
    const ny = y / height
    const dy_local = y - centerY

    for (let x = 0; x < width; x++) {
      const nx = x / width
      const idx = (y * width + x) * 4

      const r = pixels[idx]
      const g = pixels[idx + 1]
      const b = pixels[idx + 2]

      const luminance = Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b) / 255

      const blendAmount =
        Math.sin(nx * Math.PI) * Math.sin(ny * Math.PI) * 0.4 +
        0.3 +
        (Math.sin(luminance * Math.PI + time) * 0.5 + 0.5) * 0.3

      const dx_local = x - centerX
      const distSq = dx_local * dx_local + dy_local * dy_local
      const mouseFactor = Math.exp(-distSq / (mouseDistSq + 1))

      const glowIntensity =
        Math.sin(nx * Math.PI + time) * Math.sin(ny * Math.PI + time) * 0.5 + 0.5

      const glowIndex =
        Math.floor((Math.sin(time * 0.5) * 0.5 + 0.5) * glowColors.length) % glowColors.length
      const glow = glowColors[glowIndex]

      const glowR = glow.r * glowIntensity * mouseFactor
      const glowG = glow.g * glowIntensity * mouseFactor
      const glowB = glow.b * glowIntensity * mouseFactor

      const waveFactor =
        Math.sin(nx * Math.PI + time * 0.5) * Math.sin(ny * Math.PI + time * 0.5) * 0.5 + 0.5

      const waveColorIndex = Math.floor(waveFactor * waveColors.length) % waveColors.length
      const waveCol = waveColors[waveColorIndex]

      pixels[idx] = Math.min(255, Math.max(0, r * (1 - blendAmount) + waveCol.r * blendAmount + glowR))
      pixels[idx + 1] = Math.min(255, Math.max(0, g * (1 - blendAmount) + waveCol.g * blendAmount + glowG))
      pixels[idx + 2] = Math.min(255, Math.max(0, b * (1 - blendAmount) + waveCol.b * blendAmount + glowB))
    }
  }

  return imageData
}

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let wave = new Wave(canvas, ctx)
    let animationId: number

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      const isMobile = width < BREAKPOINT
      const waveSpeed = isMobile ? WAVE_SPEED_MOBILE : WAVE_SPEED_DESKTOP
      const amplitude = isMobile ? height * 0.25 : height * 0.2
      wave.init(ctx, canvas, amplitude, waveSpeed)
    }

    window.addEventListener('resize', resize)
    resize()

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.save()
      wave.update(WAVE_SPEED_DESKTOP)
      const imageData = ctx.getImageData(0, 0, width, height)
      ctx.putImageData(
        blendWithLuminance(
          imageData,
          width,
          height,
          wave.mouse.x,
          wave.mouse.y,
          MOUSE_GLOW_RADIUS_DESKTOP,
          GLOW_SPEED
        ),
        0,
        0
      )
      ctx.restore()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
