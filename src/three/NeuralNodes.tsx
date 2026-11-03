import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, BufferAttribute, BufferGeometry, type PointsMaterial } from 'three'
import { hue, type Net, type SceneInput } from './network'
export default function NeuralNodes({ net, input }: { net: Net; input: MutableRefObject<SceneInput> }) {
  const mat = useRef<PointsMaterial>(null)
  const geo = useMemo(() => { const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(net.pos, 3)); return g }, [net])
  useEffect(() => () => geo.dispose(), [geo])
  useFrame(({ clock }) => {
    const i = input.current, t = i.rm ? 0 : clock.elapsedTime * 0.6
    net.base.forEach((p, k) => { const o = Math.sin(t * 2 + net.phase[k]) * 0.12, f = net.phase[k] % 1; net.pos[k * 3] = p.x + o + i.mx * 0.3 * f; net.pos[k * 3 + 1] = p.y + o - i.my * 0.3 * f; net.pos[k * 3 + 2] = p.z + o })
    geo.attributes.position.needsUpdate = true; mat.current?.color.setHSL(hue(i), 0.9, 0.65)
  })
  return <points geometry={geo}><pointsMaterial ref={mat} size={0.09} transparent blending={AdditiveBlending} depthWrite={false} /></points>
}
