import { useRef, useState } from 'react'
import { useCanvas } from '../hooks/useCanvas'
import { useReducedMotion } from '../hooks/useReducedMotion'
export default function NeuralNetworkLab() {
  const rm = useReducedMotion(), [inp, setInp] = useState(3), [hid, setHid] = useState(5), [spd, setSpd] = useState(2)
  const t0 = useRef(0), f = useRef(-1)
  const canvas = useCanvas((g, W, H) => {
    if (t0.current) { f.current = Math.min(3.3, (performance.now() - t0.current) / (3200 / spd) * 3.3); if (f.current >= 3.3) { f.current = -1; t0.current = 0 } }
    const L = [inp, hid, hid, 2], xy = (l: number, i: number): [number, number] => [50 + l * (W - 100) / 3, H * (i + 1) / (L[l] + 1)], F = f.current
    for (let l = 0; l < 3; l++) for (let i = 0; i < L[l]; i++) for (let j = 0; j < L[l + 1]; j++) { const a = xy(l, i), b = xy(l + 1, j), e = F < 0 ? 0 : Math.max(0, 1 - Math.abs(F - (l + .5)) * 2); g.strokeStyle = `rgba(76,201,255,${.1 + e * .6})`; g.lineWidth = 1; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke() }
    L.forEach((n, l) => { for (let i = 0; i < n; i++) { const q = xy(l, i), a = F < 0 ? 0 : Math.max(0, 1 - Math.abs(F - l)); g.fillStyle = `rgba(${76 + a * 179 | 0},${201 + a * 54 | 0},255,${.5 + a * .5})`; g.shadowBlur = a * 18; g.shadowColor = '#4cc9ff'; g.beginPath(); g.arc(q[0], q[1], 6 + a * 3, 0, 7); g.fill() } })
    g.shadowBlur = 0; g.fillStyle = '#8a94ab'; ['INPUT', 'HIDDEN', 'HIDDEN', 'OUTPUT'].forEach((s, l) => g.fillText(s, xy(l, 0)[0] - 16, 14))
  })
  const run = () => { if (rm) { f.current = 3; t0.current = 0 } else t0.current = performance.now() }
  const reset = () => { f.current = -1; t0.current = 0; setInp(3); setHid(5); setSpd(2) }
  return (
    <div className="card" id="neural" style={{ marginTop: 16 }}>
      <p className="mono">Neural network lab · VISUAL SIMULATION</p>
      <canvas ref={canvas} className="lab" role="img" aria-label="Neural network visualizer" />
      <div className="row" style={{ marginTop: 10 }}>
        <label>Inputs <input type="range" min={2} max={6} value={inp} onChange={e => setInp(+e.target.value)} /></label>
        <label>Hidden <input type="range" min={2} max={8} value={hid} onChange={e => setHid(+e.target.value)} /></label>
        <label>Speed <input type="range" min={1} max={3} value={spd} onChange={e => setSpd(+e.target.value)} /></label>
        <button className="btn" onClick={run}>RUN FORWARD PASS</button><button className="btn g" onClick={reset}>RESET</button>
      </div>
      <p style={{ color: 'var(--mut)', fontSize: '.85rem' }}>Visual simulation only — no trained network is running.</p>
    </div>
  )
}
