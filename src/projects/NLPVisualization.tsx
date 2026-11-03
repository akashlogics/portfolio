import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
const SENT = ['POSITIVE', 'NEGATIVE', 'POSITIVE', 'POSITIVE', 'NEGATIVE', 'POSITIVE']
const STEPS = ['WEB SOURCE', 'BEAUTIFULSOUP', 'ARTICLE TEXT', 'NLTK', 'SENTIMENT', 'INSIGHTS']
export default function NLPVisualization() {
  const rm = useReducedMotion(), [shown, setShown] = useState(0), [ready, setReady] = useState(0)
  useEffect(() => {
    const t: number[] = []
    SENT.forEach((_, i) => t.push(window.setTimeout(() => { setShown(i + 1); t.push(window.setTimeout(() => setReady(i + 1), rm ? 0 : 600)) }, rm ? 0 : i * 800)))
    return () => t.forEach(clearTimeout)
  }, [rm])
  const pos = SENT.slice(0, ready).filter(s => s === 'POSITIVE').length, neg = ready - pos
  return <div><p className="mono">INTERACTIVE VISUALIZATION · illustrative sample articles</p>
    <div className="pipe">{STEPS.map((s, i) => <span key={s}>{s}{i < 5 && ''}</span>)}</div>
    <div className="grid">{SENT.slice(0, shown).map((s, i) => <div className="card" key={i}><span className="mono">ARTICLE 0{i + 1}</span><p>{i < ready ? <b style={{ color: s === 'POSITIVE' ? '#4ade80' : '#d84fd0' }}>{s}</b> : 'SCRAPING…'}</p></div>)}</div>
    <div style={{ marginTop: 12 }}><p className="mono">Sentiment (sample) · positive {pos} · negative {neg}</p>
      <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', background: 'var(--ln)' }}><i style={{ width: `${pos * 100 / 6}%`, background: '#4ade80' }} /><i style={{ width: `${neg * 100 / 6}%`, background: '#d84fd0' }} /></div></div></div>
}
