import { useState, type ReactElement } from 'react'
import Modal from '../components/Modal'
import { projects } from '../data/projects'
import CropPredictionLab from '../projects/CropPredictionLab'
import PeopleTrackingLab from '../projects/PeopleTrackingLab'
import VehicleRoutingLab from '../projects/VehicleRoutingLab'
import NLPVisualization from '../projects/NLPVisualization'
import { links } from '../data/portfolio'
const LABS: Record<string, () => ReactElement> = { crop: CropPredictionLab, tracking: PeopleTrackingLab, routing: VehicleRoutingLab, nlp: NLPVisualization }
export default function Projects() {
  const [sel, setSel] = useState<number | null>(null), p = sel === null ? null : projects[sel], Lab = p ? LABS[p.id] : null
  return <section id="projects"><p className="mono">Module 04 // Project lab</p><h2>Experiments</h2>
    <div className="grid">{projects.map((x, i) => <button key={x.id} className="card proj" onClick={() => setSel(i)} aria-label={`Open case study: ${x.title}`}><span className="mono">{x.category}</span><h3>{x.title}</h3><p>{x.flow}</p></button>)}</div>
    <Modal open={p !== null} onClose={() => setSel(null)} label={p ? p.title : 'Project'}>{p && Lab && <>
      <span className="mono">{p.category}</span><h2 style={{ margin: '.2em 0' }}>{p.title}</h2><Lab />
      {([['Problem', p.problem], ['Approach', p.approach], ['Technology', p.stack.join(' · ')], ['Implementation', p.implementation], ['Result', p.result]] as const).map(([h, t]) => <div key={h}><h4>{h.toUpperCase()}</h4><p>{t}</p></div>)}
      <h4>LINKS</h4><p>Available on GitHub: <a style={{ color: 'var(--ac)' }} href={links.github} target="_blank" rel="noopener noreferrer">github.com/akashlogics</a></p></>}</Modal></section>
}
