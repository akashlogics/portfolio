import { architecture, experience } from '../data/experience'
import { links } from '../data/portfolio'
export default function Experience() {
  const ex = experience[0]
  return <>
    <section id="experience"><p className="mono">Module 02 // Experience</p><h2>Career timeline</h2>
      <div className="card"><p className="mono">{ex.period} · {ex.location}</p><h3 style={{ margin: '.2em 0' }}>{ex.role} — {ex.company}</h3>
        <p style={{ color: 'var(--mut)' }}>{ex.stack.join(' · ')}. {ex.summary}</p>
        <p className="mono" style={{ marginTop: 16 }}>Architecture · hover a node</p>
        <div className="chips" id="arch">{architecture.map(([n, d], i) => <span key={n} style={{ display: 'contents' }}>{i > 0 && <i style={{ color: 'var(--mut)', fontStyle: 'normal' }}>→</i>}
          <span className="chip" tabIndex={0} style={{ animationDelay: `${i * .65}s` }}>{n}<small>{d}</small></span></span>)}</div></div></section>
    <section id="opensource"><p className="mono">Module 03 // Open source</p><h2>Open source // activity</h2>
      <p style={{ color: 'var(--mut)' }}>20+ repositories.</p>
      <div className="pipe">{['ISSUE', 'CODE', 'PULL REQUEST', 'REVIEW', 'MERGE'].map((s, i) => <span key={s} style={{ display: 'contents' }}>{i > 0 && <i>→</i>}<span>{s}</span></span>)}</div>
      <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer">OPEN GITHUB</a></section></>
}
