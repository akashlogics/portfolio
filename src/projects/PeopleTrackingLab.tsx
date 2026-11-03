import { useRef } from 'react'
import { useCanvas } from '../hooks/useCanvas'
import { useReducedMotion } from '../hooks/useReducedMotion'
interface Q { x: number; y: number; v: number; m: string; t: number[] }
export default function PeopleTrackingLab() {
  const rm = useReducedMotion()
  const q = useRef<Q[]>([{ x: 30, y: 140, v: .8, m: 'WALKING', t: [] }, { x: 300, y: 210, v: -2, m: 'CYCLING', t: [] }, { x: 150, y: 100, v: -.6, m: 'WALKING', t: [] }])
  const canvas = useCanvas((g, W, H) => {
    g.fillStyle = '#070b16'; g.fillRect(0, 0, W, H); g.strokeStyle = '#1a2238'; g.setLineDash([6, 6]); g.strokeRect(4, 40, W / 2 - 8, H - 60); g.strokeRect(W / 2 + 4, 40, W / 2 - 8, H - 60); g.setLineDash([])
    g.fillStyle = '#8a94ab'; g.textAlign = 'left'; g.font = '11px monospace'; g.fillText('ZONE A', 10, 34); g.fillText('ZONE B', W / 2 + 10, 34)
    q.current.forEach((p, i) => {
      if (!rm) p.x += p.v; if (p.x > W - 20 || p.x < 20) p.v *= -1; p.x = Math.max(20, Math.min(W - 20, p.x)); p.t.push(p.x); if (p.t.length > 40) p.t.shift()
      g.strokeStyle = 'rgba(139,107,255,.5)'; g.beginPath(); p.t.forEach((x, k) => { if (k) g.lineTo(x, p.y + 30); else g.moveTo(x, p.y + 30) }); g.stroke()
      g.fillStyle = '#2a3350'; g.beginPath(); g.arc(p.x, p.y - 14, 7, 0, 7); g.fill(); g.fillRect(p.x - 8, p.y - 6, 16, 36)
      g.strokeStyle = '#4cc9ff'; g.lineWidth = 1.5; g.strokeRect(p.x - 18, p.y - 26, 36, 66); g.fillStyle = '#4cc9ff'
      g.fillText(`PERSON 0${i + 1} · ZONE ${p.x < W / 2 ? 'A' : 'B'} · ${p.m}`, Math.max(4, Math.min(p.x - 18, W - 210)), p.y - 32)
    })
    g.fillStyle = '#4ade80'; g.fillText('● TRACKING  YOLO · OPENCV · MEDIAPIPE (simulated)', 10, H - 8)
  })
  return <div><p className="mono">SIMULATED COMPUTER VISION VISUALIZATION</p><canvas ref={canvas} className="lab" role="img" aria-label="Simulated people tracking" />
    <p className="mono" style={{ color: 'var(--mut)' }}>Illustrative only — no camera or live YOLO model is running.</p></div>
}
