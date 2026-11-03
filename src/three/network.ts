import { Vector3 } from 'three'
export interface Net { base: Vector3[]; phase: number[]; pos: Float32Array; edges: [number, number][] }
export interface SceneInput { mx: number; my: number; sc: number; section: string; dev: boolean; rm: boolean }
export function makeNet(mobile: boolean): Net {
  const n = mobile ? 55 : 130, base: Vector3[] = [], phase: number[] = []
  for (let i = 0; i < n; i++) {
    const r = 2 + Math.random() * 2.6, a = Math.random() * 6.28, b = Math.acos(2 * Math.random() - 1)
    base.push(new Vector3(r * Math.sin(b) * Math.cos(a), r * Math.sin(b) * Math.sin(a), r * Math.cos(b))); phase.push(Math.random() * 6)
  }
  const edges: [number, number][] = [], max = mobile ? 90 : 260
  for (let i = 0; i < n && edges.length < max; i++) for (let j = i + 1; j < n && edges.length < max; j++) if (base[i].distanceTo(base[j]) < 1.5) edges.push([i, j])
  return { base, phase, pos: new Float32Array(n * 3), edges }
}
export const hue = (i: SceneInput) => 0.55 + i.sc * 0.25 + (i.dev ? 0.2 : 0)
