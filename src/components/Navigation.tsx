import { useEffect, useState } from 'react'
const LINKS = ['about', 'experience', 'projects', 'stack', 'playground', 'contact']
export default function Navigation({ active, onAcu, onTerminal }: { active: string; onAcu: () => void; onTerminal: () => void }) {
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40), k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('scroll', s, { passive: true }); window.addEventListener('keydown', k)
    return () => { window.removeEventListener('scroll', s); window.removeEventListener('keydown', k) }
  }, [])
  return (
    <>
      <nav className={scrolled ? 's' : ''}><b>AKASH R</b>
        <div className="l">{LINKS.map(l => <a key={l} href={`#${l}`} className={active === l ? 'on' : ''}>{l}</a>)}<a href="#acu" onClick={e => { e.preventDefault(); onAcu() }}>ACU</a><a href="#terminal" onClick={e => { e.preventDefault(); onTerminal() }}>TERMINAL</a></div>
        <span className="mono on-dot">System online</span><button className="btn" id="bm" onClick={() => setOpen(true)} aria-label="Open menu">MENU</button></nav>
      <div id="mm" className={open ? 'o' : ''} role="dialog" aria-label="Menu" aria-hidden={!open}>
        <button className="btn g" style={{ position: 'absolute', top: 18, right: '5vw' }} onClick={() => setOpen(false)} aria-label="Close menu">CLOSE</button>
        {LINKS.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{l.toUpperCase()}</a>)}
        <button className="x" onClick={() => { setOpen(false); onAcu() }} tabIndex={open ? 0 : -1}>ACU</button>
      </div>
    </>
  )
}
