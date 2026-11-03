import { useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, type Mesh } from 'three'
import type { SceneInput } from './network'
const IDX = [0, 1, 2]
export default function NeuralCore({ input }: { input: MutableRefObject<SceneInput> }) {
  const core = useRef<Mesh>(null), rings = useRef<(Mesh | null)[]>([]), orbs = useRef<(Mesh | null)[]>([]), v = useMemo(() => new Vector3(), [])
  useFrame(({ clock }) => {
    const i = input.current, t = i.rm ? 0 : clock.elapsedTime * 0.6
    core.current?.scale.setScalar(1 + Math.sin(t * 3) * 0.05 + (i.section === 'playground' ? 0.25 : 0))
    IDX.forEach(k => {
      const r = rings.current[k], o = orbs.current[k]; if (!r || !o) return
      r.rotation.z = i.rm ? 0 : clock.elapsedTime * 0.24 * (k + 1)
      const rad = 1.5 + k * 0.5; o.position.copy(v.set(Math.cos(t * 2 + k) * rad, Math.sin(t * 2 + k) * rad, 0).applyEuler(r.rotation))
    })
  })
  return <>
    <mesh ref={core}><icosahedronGeometry args={[0.9, 1]} /><meshBasicMaterial color={0x8b6bff} wireframe transparent opacity={0.7} /></mesh>
    <mesh><sphereGeometry args={[0.3, 16, 16]} /><meshBasicMaterial color={0xffffff} /></mesh>
    {IDX.map(k => <mesh key={`r${k}`} ref={el => { rings.current[k] = el }} rotation={[k * 1.1, k * 0.7, 0]}><torusGeometry args={[1.5 + k * 0.5, 0.008, 6, 90]} /><meshBasicMaterial color={0x4cc9ff} transparent opacity={0.4} /></mesh>)}
    {IDX.map(k => <mesh key={`o${k}`} ref={el => { orbs.current[k] = el }}><sphereGeometry args={[0.06, 8, 8]} /><meshBasicMaterial color={0xd84fd0} /></mesh>)}
  </>
}
