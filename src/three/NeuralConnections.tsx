import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, BufferAttribute, BufferGeometry, type LineBasicMaterial } from 'three'
import { hue, type Net, type SceneInput } from './network'
export default function NeuralConnections({ net, input }: { net: Net; input: MutableRefObject<SceneInput> }) {
  const mat = useRef<LineBasicMaterial>(null)
  const { geo, arr } = useMemo(() => { const arr = new Float32Array(net.edges.length * 6), geo = new BufferGeometry(); geo.setAttribute('position', new BufferAttribute(arr, 3)); return { geo, arr } }, [net])
  useEffect(() => () => geo.dispose(), [geo])
  useFrame(() => {
    const i = input.current, p = net.pos
    net.edges.forEach(([a, b], k) => { const o = k * 6; arr[o] = p[a * 3]; arr[o + 1] = p[a * 3 + 1]; arr[o + 2] = p[a * 3 + 2]; arr[o + 3] = p[b * 3]; arr[o + 4] = p[b * 3 + 1]; arr[o + 5] = p[b * 3 + 2] })
    geo.attributes.position.needsUpdate = true
    if (mat.current) { mat.current.color.setHSL(hue(i), 0.9, 0.65); mat.current.opacity = (0.15 + 0.25 * (1 - i.sc * 0.6)) * (i.dev ? 1.8 : 1) }
  })
  return <lineSegments geometry={geo}><lineBasicMaterial ref={mat} transparent opacity={0.3} blending={AdditiveBlending} /></lineSegments>
}
