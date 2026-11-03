import { useEffect } from 'react'
export function useMicroInteractions() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches || innerWidth < 700) return
    let last: HTMLElement | null = null
    const reset = () => { if (last) { last.style.transform = ''; last = null } }
    const mv = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('.btn, .proj')
      if (el !== last) reset(); if (!el) return
      last = el; const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = el.classList.contains('proj') ? `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)` : `translate(${x * r.width * 0.08}px,${y * r.height * 0.15}px)`
    }
    addEventListener('pointermove', mv); document.addEventListener('pointerleave', reset)
    return () => { removeEventListener('pointermove', mv); document.removeEventListener('pointerleave', reset); reset() }
  }, [])
}
