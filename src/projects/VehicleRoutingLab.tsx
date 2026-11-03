import { useState } from 'react'
import RouteOptimizer from '../playground/RouteOptimizer'
import { projects } from '../data/projects'
const TABS = ['OVERVIEW', 'SIMULATION', 'ALGORITHM', 'RESULTS']
export default function VehicleRoutingLab() {
  const [tab, setTab] = useState(0), p = projects.find(x => x.id === 'routing')!
  return <div>
    <div className="pm" role="tablist">{TABS.map((t, i) => <button key={t} role="tab" aria-selected={tab === i} className="btn g" onClick={() => setTab(i)}>{t}</button>)}</div>
    <div className="tb">
      {tab === 0 && <p>{p.problem} {p.approach}</p>}
      {tab === 1 && <RouteOptimizer id="route-modal" bare />}
      {tab === 2 && <div className="pipe">{['POPULATION', 'SELECTION', 'CROSSOVER', 'MUTATION', 'NEW GENERATION'].map(s => <span key={s}>{s}</span>)}</div>}
      {tab === 3 && <><p className="mono">AKASH’S ACTUAL PROJECT RESULTS</p><h3>75 simulations · 150 generations</h3><h3>18% distance reduction · 25% cost reduction</h3></>}
    </div></div>
}
