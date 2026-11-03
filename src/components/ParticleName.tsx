import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
interface P { tx: number; ty: number; x: number; y: number; h: number }
export default function ParticleName() {
  const ref = useRef<HTMLCanvasElement>(null), rm = useReducedMotion()
  useEffect(() => {
    const c = ref.current!, g = c.getContext('2d')!, mob = innerWidth < 700, m = { x: -999, y: -999 }
    let ps: P[] = [], W = 0, H = 0, r = 1, id = 0, alive = true
    const build = () => {
      r = devicePixelRatio > 1 ? 1.5 : 1; W = c.width = c.clientWidth * r; H = c.height = c.clientHeight * r
      const o = document.createElement('canvas'); o.width = W; o.height = H; const x = o.getContext('2d')!
      const font = (s: number) => `700 ${s}px "Space Grotesk",Inter,sans-serif`
      let fs = H * .8; x.font = font(fs); const w = x.measureText('AKASH R').width; if (w > W * .92) fs *= W * .92 / w
      x.font = font(fs); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('AKASH R', W / 2, H / 2)
      const d = x.getImageData(0, 0, W, H).data, step = Math.max(4, Math.round(W / (mob ? 150 : 230))), pts: [number, number][] = []
      for (let y = 0; y < H; y += step) for (let xx = 0; xx < W; xx += step) if (d[(y * W + xx) * 4 + 3] > 128) pts.push([xx, y])
      ps = pts.map(t => ({ tx: t[0], ty: t[1], x: rm ? t[0] : Math.random() * W, y: rm ? t[1] : Math.random() * H, h: 190 + t[0] / W * 100 }))
    }
    const move = (e: PointerEvent) => { const b = c.getBoundingClientRect(); m.x = (e.clientX - b.left) * r; m.y = (e.clientY - b.top) * r }
    const leave = () => { m.x = -999 }
    const draw = () => {
      if (!alive) return
      g.clearRect(0, 0, W, H); const R = (70 * r) ** 2
      for (const p of ps) {
        const dx = p.x - m.x, dy = p.y - m.y, q = dx * dx + dy * dy
        if (q < R && q > 0 && !rm) { const f = (1 - q / R) * 18 / Math.sqrt(q); p.x += dx * f; p.y += dy * f }
        p.x += (p.tx - p.x) * (rm ? 1 : .06); p.y += (p.ty - p.y) * (rm ? 1 : .06)
        g.fillStyle = `hsl(${p.h},90%,68%)`; g.fillRect(p.x, p.y, 2.2 * r, 2.2 * r)
      }
      if (!rm) id = requestAnimationFrame(draw)
    }
    const start = () => { build(); draw() }
    document.fonts ? document.fonts.ready.then(() => { if (alive) start() }) : start()
    addEventListener('resize', build); c.addEventListener('pointermove', move); c.addEventListener('pointerleave', leave)
    return () => { alive = false; cancelAnimationFrame(id); removeEventListener('resize', build); c.removeEventListener('pointermove', move); c.removeEventListener('pointerleave', leave) }
  }, [rm])
  return <canvas id="name" ref={ref} role="img" aria-label="AKASH R" />
}
