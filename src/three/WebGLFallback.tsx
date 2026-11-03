import { Component, useEffect, useRef, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
interface N { x: number; y: number; vx: number; vy: number }
export default function WebGLFallback() {
  const ref = useRef<HTMLCanvasElement>(null), rm = useReducedMotion()
  useEffect(() => {
    const c = ref.current!, g = c.getContext('2d')!
    let W = 0, H = 0, id = 0, nodes: N[] = []; const m = { x: -999, y: -999 }
    const resize = () => { W = c.width = innerWidth; H = c.height = innerHeight; nodes = Array.from({ length: innerWidth < 700 ? 28 : 60 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 })) }
    const move = (e: PointerEvent) => { m.x = e.clientX; m.y = e.clientY }
    const draw = () => {
      g.clearRect(0, 0, W, H); const sc = scrollY / Math.max(1, document.body.scrollHeight)
      for (const p of nodes) { if (!rm) { p.x += p.vx; p.y += p.vy } if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; const dx = p.x - m.x, dy = p.y - m.y; if (!rm && dx * dx + dy * dy < 22500) { p.x += dx * .01; p.y += dy * .01 } }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i], b = nodes[j], q = (a.x - b.x) ** 2 + (a.y - b.y) ** 2; if (q < 24000) { g.strokeStyle = `hsla(${200 + sc * 90},90%,65%,${.16 * (1 - q / 24000)})`; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke() } }
      g.fillStyle = `hsla(${200 + sc * 90},90%,70%,.6)`; for (const p of nodes) { g.beginPath(); g.arc(p.x, p.y, 1.6, 0, 7); g.fill() }
      if (!rm) id = requestAnimationFrame(draw)
    }
    resize(); draw(); addEventListener('resize', resize); addEventListener('pointermove', move)
    return () => { cancelAnimationFrame(id); removeEventListener('resize', resize); removeEventListener('pointermove', move) }
  }, [rm])
  return <canvas id="bg" ref={ref} aria-hidden="true" />
}

export function hasWebGL(): boolean {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false }
}
export class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(e: unknown) { console.warn('3D scene failed, using 2D fallback', e) }
  render() { return this.state.failed ? <WebGLFallback /> : this.props.children }
}
