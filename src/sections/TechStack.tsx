import { skills } from '../data/skills'
export default function TechStack() {
  return <section id="stack"><p className="mono">Module 05 // Technology constellation</p><h2>Stack</h2>
    {Object.entries(skills).map(([c, a]) => <div key={c}><div className="cat mono">{c}</div><div className="chips">{a.map(s => <span className="chip" tabIndex={0} key={s.name}>{s.name}<small>{s.desc}</small></span>)}</div></div>)}</section>
}
