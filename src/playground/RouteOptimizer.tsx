import { useEffect, useRef, useState } from 'react'
import { useCanvas } from '../hooks/useCanvas'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { initialPopulation, nextGeneration, NODES, routeLength, type Route } from '../utils/geneticAlgorithm'
const STAGES = ['POPULATION', 'SELECTION', 'CROSSOVER', 'MUTATION', 'NEW GENERATION']
const MAX_GEN = 30
export default function RouteOptimizer({ id = 'route', bare = false }: { id?: string; bare?: boolean }) {
  const rm = useReducedMotion()
  const pop = useRef<Route[]>(initialPopulation()), done = useRef(false), iv = useRef(0), g1 = useRef(0)
  const [stage, setStage] = useState(-1), [text, setText] = useState('Press generate to evolve routes')
  useEffect(() => () => window.clearInterval(iv.current), [])
  const canvas = useCanvas((g, W, H) => {
    const p = (i: number): [number, number] => [NODES[i][0] * (W - 60) + 30, NODES[i][1] * (H - 60) + 30]
    const rt = (r: Route, c: string, w: number) => { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); r.forEach((v, i) => { const q = p(v); if (i) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]) }); const q = p(r[0]); g.lineTo(q[0], q[1]); g.stroke() }
    pop.current.slice(1, 7).forEach(r => rt(r, 'rgba(139,107,255,.25)', 1)); rt(pop.current[0], done.current ? '#4ade80' : '#4cc9ff', 2.5)
    NODES.forEach((_, i) => { const q = p(i); g.fillStyle = '#fff'; g.beginPath(); g.arc(q[0], q[1], 6, 0, 7); g.fill(); g.fillStyle = '#8a94ab'; g.fillText('ABCDEFGH'[i], q[0] + 9, q[1] - 9) })
  })
  const run = () => {
    window.clearInterval(iv.current); pop.current = initialPopulation(); g1.current = routeLength(pop.current[0]); done.current = false
    let gen = 1, tick = 0
    iv.current = window.setInterval(() => {
      const s = tick++ % 5; setStage(s)
      if (s === 4) { pop.current = nextGeneration(pop.current); gen++ }
      const d = routeLength(pop.current[0]), end = gen >= MAX_GEN; done.current = end
      setText(`${end ? 'OPTIMAL ROUTE FOUND — ' : ''}Generation ${String(gen).padStart(2, '0')} · Distance ${d.toFixed(1)} · Cost ${(d * 1.8).toFixed(0)} · ${((1 - d / g1.current) * 100).toFixed(0)}% shorter than gen 1 (LIVE SIMULATION, simulated units)`)
      if (end) { window.clearInterval(iv.current); setStage(-1) }
    }, rm ? 30 : 90)
  }
  const reset = () => { window.clearInterval(iv.current); pop.current = initialPopulation(); done.current = false; setStage(-1); setText('Press generate to evolve routes') }
  const body = (<>
    <p className="mono">Route optimizer · LIVE SIMULATION</p>
    <canvas ref={canvas} className="lab" role="img" aria-label="Genetic algorithm route simulation" />
    <div className="pipe" id="rp">{STAGES.map((s, i) => <span key={s} style={stage === i ? { borderColor: 'var(--ac)' } : undefined}>{s}</span>)}</div>
    <p className="mono" aria-live="polite">{text}</p>
    <button className="btn" onClick={run}>GENERATE ROUTES</button><button className="btn g" onClick={reset}>RESET</button>
    <p style={{ color: 'var(--mut)', fontSize: '.85rem' }}>Illustrative genetic algorithm on 8 nodes with simulated values. Akash’s real Vehicle Routing project (Python, DEAP): 75 simulations, 150 generations, 18% distance reduction, 25% cost reduction.</p></>)
  return bare ? <div>{body}</div> : <div className="card" id={id} style={{ marginTop: 16 }}>{body}</div>
}
