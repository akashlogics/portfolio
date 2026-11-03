import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferAttribute, BufferGeometry, type Points } from 'three'
import type { SceneInput } from './network'
export default function ParticleField({ input, mobile }: { input: MutableRefObject<SceneInput>; mobile: boolean }) {
  const ref = useRef<Points>(null)
  const geo = useMemo(() => { const g = new BufferGeometry(), a = new Float32Array((mobile ? 150 : 400) * 3).map(() => (Math.random() - 0.5) * 26); g.setAttribute('position', new BufferAttribute(a, 3)); return g }, [mobile])
  useEffect(() => () => geo.dispose(), [geo])
  useFrame(({ clock }) => { const i = input.current; if (ref.current) ref.current.rotation.y = (i.rm ? 0 : clock.elapsedTime * 0.6) * 0.05 * (1 + i.sc * 3) })
  return <points ref={ref} geometry={geo}><pointsMaterial color={0x8a94ab} size={0.03} /></points>
}
