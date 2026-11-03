import { useEffect, useMemo, useRef, type MutableRefObject, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { Group } from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { makeNet, type SceneInput } from './network'
import NeuralNodes from './NeuralNodes'
import NeuralConnections from './NeuralConnections'
import NeuralCore from './NeuralCore'
import ParticleField from './ParticleField'
function Rig({ input, children }: { input: MutableRefObject<SceneInput>; children: ReactNode }) {
  const g = useRef<Group>(null)
  useFrame(({ camera, clock }) => {
    const i = input.current, t = i.rm ? 0 : clock.elapsedTime * 0.6
    if (g.current) { g.current.rotation.y = t * (0.3 + i.sc * 0.6 + (i.dev ? 1.5 : 0)) + i.mx * 0.3; g.current.rotation.x = i.my * 0.2 + i.sc * 0.4 }
    camera.position.set(i.mx * 0.8, -i.my * 0.5, 9 - i.sc * 3.5); camera.lookAt(0, 0, 0)
  })
  return <group ref={g}>{children}</group>
}
function Invalidate() {
  const inv = useThree(s => s.invalidate)
  useEffect(() => { const f = () => inv(); addEventListener('scroll', f, { passive: true }); addEventListener('pointermove', f); return () => { removeEventListener('scroll', f); removeEventListener('pointermove', f) } }, [inv])
  return null
}
export default function NeuralScene({ section, dev }: { section: string; dev: boolean }) {
  const rm = useReducedMotion(), mobile = innerWidth < 700, net = useMemo(() => makeNet(mobile), [mobile])
  const input = useRef<SceneInput>({ mx: 0, my: 0, sc: 0, section, dev, rm })
  input.current.section = section; input.current.dev = dev; input.current.rm = rm
  useEffect(() => {
    const mv = (e: PointerEvent) => { input.current.mx = e.clientX / innerWidth * 2 - 1; input.current.my = e.clientY / innerHeight * 2 - 1 }
    const sc = () => { input.current.sc = scrollY / Math.max(1, document.body.scrollHeight - innerHeight) }
    sc(); addEventListener('pointermove', mv); addEventListener('scroll', sc, { passive: true })
    return () => { removeEventListener('pointermove', mv); removeEventListener('scroll', sc) }
  }, [])
  return (
    <Canvas frameloop={rm ? 'demand' : 'always'} dpr={[1, mobile ? 1.5 : 2]} camera={{ position: [0, 0, 9], fov: 60 }} gl={{ alpha: true, antialias: !mobile }}
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} data-testid="three-canvas">
      <Rig input={input}><NeuralNodes net={net} input={input} /><NeuralConnections net={net} input={input} /><NeuralCore input={input} /></Rig>
      <ParticleField input={input} mobile={mobile} />
      {rm && <Invalidate />}
    </Canvas>
  )
}
