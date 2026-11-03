export type Route = number[]
export const NODES: [number, number][] = [[.1, .2], [.5, .1], [.9, .25], [.15, .75], [.5, .55], [.88, .8], [.3, .4], [.7, .45]]
export const dist = (a: number, b: number) => Math.hypot(NODES[a][0] - NODES[b][0], (NODES[a][1] - NODES[b][1]) * 0.6) * 300
export const routeLength = (r: Route) => r.reduce((s, v, i) => s + dist(v, r[(i + 1) % r.length]), 0)
export const sortPopulation = (p: Route[]) => [...p].sort((a, b) => routeLength(a) - routeLength(b))
const shuffle = (n: number): Route => [...Array(n).keys()].sort(() => Math.random() - 0.5)
export const initialPopulation = (size = 24): Route[] => sortPopulation(Array.from({ length: size }, () => shuffle(NODES.length)))
export function select(pop: Route[], k = 3): Route {
  let best: Route | null = null
  for (let i = 0; i < k; i++) { const c = pop[Math.floor(Math.random() * pop.length)]; if (!best || routeLength(c) < routeLength(best)) best = c }
  return best as Route
}
export function crossover(a: Route, b: Route): Route {
  const n = a.length, i = Math.floor(Math.random() * n), j = i + 1 + Math.floor(Math.random() * (n - i)), mid = a.slice(i, j), rest = b.filter(x => !mid.includes(x))
  return [...rest.slice(0, i), ...mid, ...rest.slice(i)]
}
export function mutate(r: Route, rate = 0.3): Route {
  const c = [...r]
  if (Math.random() < rate) { const i = Math.floor(Math.random() * c.length), j = Math.floor(Math.random() * c.length);[c[i], c[j]] = [c[j], c[i]] }
  return c
}
export function nextGeneration(pop: Route[], elite = 3): Route[] {
  const next = pop.slice(0, elite)
  while (next.length < pop.length) next.push(mutate(crossover(select(pop), select(pop))))
  return sortPopulation(next)
}
