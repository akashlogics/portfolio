import { useEffect, useState } from 'react'
export const SECTION_IDS = ['hero', 'about', 'experience', 'opensource', 'projects', 'stack', 'playground', 'achievements', 'contact']
export const HUD: Record<string, string> = { hero: 'SYSTEM ONLINE', about: 'PROFILE LOADED', experience: 'EXPERIENCE DATA', opensource: 'DATA STREAM ACTIVE', projects: 'PROJECT NODES ACTIVE', stack: 'DATA STREAM ACTIVE', playground: 'EXPERIMENT MODE', achievements: 'RECORDS INDEXED', contact: 'CONNECTION READY' }
export function useActiveSection(): string {
  const [a, setA] = useState('hero')
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setA(e.target.id) }), { rootMargin: '-45% 0px -50% 0px' })
    SECTION_IDS.forEach(i => { const el = document.getElementById(i); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return a
}
