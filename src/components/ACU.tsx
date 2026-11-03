import { useEffect, useRef, useState } from 'react'
import { answer, GREETING, QUICK_PROMPTS, UNKNOWN } from '../data/acuKnowledge'
import { links, profile } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Msg { id: number; role: 'u' | 'a'; text: string; time: string }
type Status = '' | 'th' | 'rs' | 'er'
const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function Streamed({ text, instant, onTick }: { text: string; instant: boolean; onTick: () => void }) {
  const [n, setN] = useState(instant ? text.length : 0)
  useEffect(() => {
    if (instant) return
    const iv = window.setInterval(() => setN(v => { if (v + 2 >= text.length) { window.clearInterval(iv); return text.length } return v + 2 }), 14)
    return () => window.clearInterval(iv)
  }, [text, instant])
  useEffect(onTick, [n])
  return <>{text.slice(0, n)}</>
}

export default function ACU({ open, onClose, onNavigate }: { open: boolean; onClose: () => void; onNavigate: (id: string) => void }) {
  const reduced = useReducedMotion()
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, role: 'a', text: GREETING, time: now() }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [status, setStatus] = useState<Status>('')
  const log = useRef<HTMLDivElement>(null), inp = useRef<HTMLInputElement>(null), timers = useRef<number[]>([]), nid = useRef(1)
  const scroll = () => { if (log.current) log.current.scrollTop = log.current.scrollHeight }
  useEffect(() => { if (open) inp.current?.focus() }, [open])
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const ask = (q: string) => {
    const text = q.trim(); if (!text) return
    setInput(''); setMsgs(m => [...m, { id: nid.current++, role: 'u', text, time: now() }]); setTyping(true); setStatus('th')
    timers.current.push(window.setTimeout(() => {
      const a = answer(text)
      setTyping(false); setStatus(a === UNKNOWN ? 'er' : 'rs')
      setMsgs(m => [...m, { id: nid.current++, role: 'a', text: a, time: now() }])
      timers.current.push(window.setTimeout(() => setStatus(''), a.length * 7 + 600))
      if (text.toLowerCase() === '/play') timers.current.push(window.setTimeout(() => onNavigate('ttt'), 700))
    }, reduced ? 0 : 500))
  }
  return (
    <div id="acu" className={`${open ? 'open' : ''} ${status}`} role="dialog" aria-modal="true" aria-label="ACU assistant" hidden={!open}>
      <div className="win">
        <header>
          <div><i className="orb" /><b>ACU // AKASH INTELLIGENCE SYSTEM</b><div className="mono on-dot">Online</div></div>
          <span><button className="btn g" onClick={() => setMsgs([])} aria-label="Clear conversation">CLEAR</button><button className="btn g" onClick={onClose} aria-label="Close ACU">CLOSE</button></span>
        </header>
        <div id="log" ref={log} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={m.id} className={`m ${m.role}`}>
              {m.role === 'a' && i === msgs.length - 1 && i > 0 ? <Streamed text={m.text} instant={reduced} onTick={scroll} /> : m.text}
              <small style={{ display: 'block', color: 'var(--mut)', fontSize: '.65rem' }}>{m.time}</small>
            </div>
          ))}
          {typing && <div className="m a">ACU is typing…</div>}
        </div>
        <div className="qp">{QUICK_PROMPTS.map(q => <button key={q} onClick={() => ask(q)}>{q}</button>)}</div>
        <div className="in"><input ref={inp} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') ask(input) }} placeholder="Ask about Akash…" aria-label="Question for ACU" /><button className="btn" onClick={() => ask(input)}>SEND</button></div>
      </div>
      <aside><details open={!window.matchMedia('(max-width:820px)').matches}>
        <summary className="mono" style={{ cursor: 'pointer' }}>AKASH PROFILE</summary>
        <h3 style={{ margin: '.5em 0 0' }}>{profile.name.toUpperCase()}</h3><p className="mono" style={{ margin: 0 }}>{profile.title}</p>
        <p className="mono" style={{ color: 'var(--mut)' }}>Focus</p><p style={{ margin: 0 }}>{profile.focus.join(' · ')}</p>
        <p className="mono" style={{ color: 'var(--mut)' }}>Experience</p><p style={{ margin: 0 }}>Aerele Technologies</p>
        <p className="mono" style={{ color: 'var(--mut)' }}>Open source</p><p style={{ margin: 0 }}>{profile.openSource}</p>
        <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
          <button className="btn g" onClick={() => onNavigate('projects')}>VIEW PROJECTS</button>
          <button className="btn g" onClick={() => onNavigate('experience')}>VIEW EXPERIENCE</button>
          <button className="btn g" onClick={() => onNavigate('ttt')}>PLAY TIC TAC TOE</button>
          <a className="btn g" href={links.github} target="_blank" rel="noopener noreferrer">OPEN GITHUB</a>
        </div></details></aside>
    </div>
  )
}
