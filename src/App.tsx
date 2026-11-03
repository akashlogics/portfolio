import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import ACU from './components/ACU'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import Terminal from './components/Terminal'
import WebGLFallback, { SceneBoundary, hasWebGL } from './three/WebGLFallback'
import CustomCursor from './components/CustomCursor'
import { useMicroInteractions } from './hooks/useMicroInteractions'
const NeuralScene = lazy(() => import('./three/NeuralScene'))
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import TechStack from './sections/TechStack'
import Playground from './sections/Playground'
import Contact, { Footer } from './sections/Contact'
import { HUD, useActiveSection } from './hooks/useActiveSection'

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']
export default function App() {
  const [acu, setAcu] = useState(false), [term, setTerm] = useState(false), [dev, setDev] = useState(false)
  const active = useActiveSection(), webgl = useMemo(hasWebGL, [])
  useMicroInteractions()
  const closeAcu = useCallback(() => setAcu(false), [])
  const go = useCallback((id: string) => { setAcu(false); setTerm(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }, [])
  useEffect(() => {
    let k = 0, buf = '', t = 0
    const f = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      k = key === KONAMI[k] ? k + 1 : key === KONAMI[0] ? 1 : 0
      if (k === KONAMI.length) { k = 0; setDev(true); setTerm(true); window.clearTimeout(t); t = window.setTimeout(() => setDev(false), 6000) }
      if (/INPUT|TEXTAREA|SELECT/.test((document.activeElement?.tagName) ?? '')) { buf = ''; return }
      buf = (buf + key).slice(-3); if (buf === 'acu') setAcu(true)
    }
    window.addEventListener('keydown', f); return () => { window.removeEventListener('keydown', f); window.clearTimeout(t) }
  }, [])
  return (
    <>
      <LoadingScreen />{webgl ? <SceneBoundary><Suspense fallback={null}><NeuralScene section={active} dev={dev} /></Suspense></SceneBoundary> : <WebGLFallback />}<CustomCursor />
      <Navigation active={active} onAcu={() => setAcu(true)} onTerminal={() => setTerm(true)} />
      <main>
        <Hero onProjects={() => go('projects')} onAcu={() => setAcu(true)} /><About /><Experience /><Projects /><TechStack /><Playground onTerminal={() => setTerm(true)} /><Contact />
      </main>
      <Footer />
      <div id="hud" className="mono">{dev ? 'DEVELOPER MODE UNLOCKED' : acu ? 'CONVERSATIONAL MODE' : HUD[active]}</div>
      <button className="btn" id="fab" onClick={() => setAcu(true)} aria-label="Ask ACU" style={{ background: '#0b1020' }}>ASK ACU</button>
      <ACU open={acu} onClose={closeAcu} onNavigate={go} />
      <Terminal open={term} onClose={() => setTerm(false)} onAction={a => { setTerm(false); if (a === 'acu') setAcu(true); else go('playground') }} />
    </>
  )
}
