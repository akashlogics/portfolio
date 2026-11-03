import { useEffect, useRef } from 'react'
export function useCanvas(draw: (g: CanvasRenderingContext2D, w: number, h: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null), fn = useRef(draw)
  fn.current = draw
  useEffect(() => {
    const c = ref.current!, g = c.getContext('2d')!
    let id = 0
    const loop = () => { c.width = c.clientWidth; c.height = 300; fn.current(g, c.width, 300); id = requestAnimationFrame(loop) }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])
  return ref
}
