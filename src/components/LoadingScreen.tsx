import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
export default function LoadingScreen() {
  const rm = useReducedMotion(), [done, setDone] = useState(false)
  useEffect(() => { const t = window.setTimeout(() => setDone(true), rm ? 0 : 1000); return () => window.clearTimeout(t) }, [rm])
  return <div id="ld" className={`mono${done ? ' x' : ''}`} role="status">{'AKASH // AI INTELLIGENCE LAB\n\nINITIALIZING...\nNEURAL CORE ........ OK\nPROJECT SYSTEM ..... OK\nACU ............... ONLINE\nPLAYGROUND ......... READY\n\nSYSTEM ONLINE'}</div>
}
