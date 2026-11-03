import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
const SEL = '.proj,#fab,#acu button,#board button,a,button,select'
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null), rm = useReducedMotion()
  useEffect(() => {
    if (rm || !matchMedia('(hover: hover) and (pointer: fine)').matches || innerWidth < 700) return
    const c = ref.current!; let x = 0, y = 0, tx = 0, ty = 0, id = 0
    document.body.classList.add('cc'); c.style.display = 'block'
    const mv = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY; const el = (e.target as Element).closest(SEL)
      c.classList.toggle('h', !!el)
      c.textContent = !el ? '' : el.closest('.proj') ? 'EXPLORE' : (el.id === 'fab' || el.closest('#acu')) ? 'CHAT' : el.closest('#board') ? 'PLAY' : /TERMINAL/.test(el.textContent ?? '') ? 'ACCESS' : 'OPEN'
    }
    const loop = () => { x += (tx - x) * 0.2; y += (ty - y) * 0.2; c.style.transform = `translate(${x}px,${y}px)`; id = requestAnimationFrame(loop) }
    addEventListener('pointermove', mv); id = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(id); removeEventListener('pointermove', mv); document.body.classList.remove('cc'); c.style.display = 'none' }
  }, [rm])
  return <div id="cur" ref={ref} aria-hidden="true" />
}
