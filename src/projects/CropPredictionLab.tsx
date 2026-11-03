import { useRef } from 'react'
import { useCanvas } from '../hooks/useCanvas'
import { useReducedMotion } from '../hooks/useReducedMotion'
const S = ['WEATHER', 'DATA', 'RANDOM FOREST', 'PREDICTION', 'CROP']
export default function CropPredictionLab() {
  const rm = useReducedMotion(), ls = useRef(0), running = useRef(true)
  const drops = useRef(Array.from({ length: 40 }, () => [Math.random(), Math.random(), 1 + Math.random() * 2]))
  const canvas = useCanvas((g, W, H) => {
    g.fillStyle = 'rgba(76,201,255,.5)'; drops.current.forEach(d => { if (!rm) d[1] = (d[1] + d[2] / H) % 1; g.fillRect(d[0] * W, d[1] * H, 1, 6) })
    g.fillStyle = 'rgba(74,222,128,.25)'; for (let x = 10; x < W; x += 22) for (let y = H - 60; y < H; y += 14) g.fillRect(x, y, 10, 6)
    g.font = '10px monospace'; g.textAlign = 'center'
    S.forEach((s, i) => { const x = W * (i + .5) / 5, on = ls.current >= i / 4 - .01; g.strokeStyle = on ? '#4cc9ff' : '#1a2238'; g.lineWidth = 2
      if (i) { g.beginPath(); g.moveTo(W * (i - .5) / 5 + 16, H / 2 - 30); g.lineTo(x - 16, H / 2 - 30); g.stroke() }
      g.beginPath(); g.arc(x, H / 2 - 30, 16, 0, 7); g.stroke(); g.fillStyle = on ? '#4cc9ff' : '#8a94ab'; g.fillText(s, x, H / 2 + 5) })
    if (ls.current > 0 && ls.current < 1) { g.fillStyle = '#fff'; g.beginPath(); g.arc(W * (.1 + .8 * ls.current), H / 2 - 30, 5, 0, 7); g.fill() }
    if (ls.current >= 1) { g.fillStyle = '#4ade80'; g.font = '13px monospace'; g.fillText('PREDICTION READY', W / 2, H / 2 + 40) }
    if (running.current) { ls.current = Math.min(1, ls.current + (rm ? 1 : .005)); if (ls.current >= 1) running.current = false }
  })
  return <div><p className="mono">INTERACTIVE VISUAL SIMULATION</p><canvas ref={canvas} className="lab" role="img" aria-label="Crop prediction pipeline simulation" />
    <p><button className="btn" onClick={() => { ls.current = 0; running.current = true }}>RUN PREDICTION</button></p>
    <p className="mono" style={{ color: 'var(--mut)' }}>Visual simulation — not Akash’s original model running in the browser.</p></div>
}
