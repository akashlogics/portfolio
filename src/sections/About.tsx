import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { projects } from '../data/projects'
import { useReducedMotion } from '../hooks/useReducedMotion'
function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null), rm = useReducedMotion(), [v, setV] = useState(0)
  useEffect(() => {
    if (rm) { setV(to); return }
    let id = 0
    const io = new IntersectionObserver(es => {
      if (!es[0].isIntersecting) return
      io.disconnect(); const t0 = performance.now()
      const f = (t: number) => { const k = Math.min(1, (t - t0) / 1200); setV(Math.round(to * k)); if (k < 1) id = requestAnimationFrame(f) }
      id = requestAnimationFrame(f)
    })
    io.observe(ref.current!)
    return () => { io.disconnect(); cancelAnimationFrame(id) }
  }, [to, rm])
  return <b ref={ref}>{v}{suffix}</b>
}
export default function About() {
  return <section id="about"><p className="mono">Module 01 // Identity</p><h2>The engineer behind the system</h2>
    <p style={{ maxWidth: 680, color: 'var(--mut)' }}>{profile.summary.replace('Akash R is', 'Akash is')}</p>
    <div className="grid" style={{ marginTop: 24 }}>
      <div className="card stat"><Count to={20} suffix="+" /><span>Open source repositories</span></div>
      <div className="card stat"><Count to={projects.length} /><span>Featured AI / data projects</span></div>
      <div className="card stat"><b>{profile.education.cgpa}</b><span>CGPA</span></div>
      <div className="card stat"><b>AI + DS</b><span>Specialization</span></div></div></section>
}
