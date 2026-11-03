export type Mark = 'X' | 'O' | ''
export type Board = Mark[]
export type Difficulty = 'EASY' | 'MEDIUM' | 'IMPOSSIBLE'
const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
export const emptyBoard = (): Board => Array<Mark>(9).fill('')
export const winLine = (b: Board): number[] | null => { for (const l of LINES) if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return l; return null }
export const isFull = (b: Board) => b.every(Boolean)
export function minimax(b: Board, turn: 'X' | 'O', depth: number): number {
  const w = winLine(b)
  if (w) return b[w[0]] === 'O' ? 10 - depth : depth - 10
  if (isFull(b)) return 0
  let best = turn === 'O' ? -99 : 99
  for (let i = 0; i < 9; i++) if (!b[i]) { b[i] = turn; const v = minimax(b, turn === 'O' ? 'X' : 'O', depth + 1); b[i] = ''; best = turn === 'O' ? Math.max(best, v) : Math.min(best, v) }
  return best
}
export function aiMove(board: Board, d: Difficulty, rand: () => number = Math.random): number {
  const b = [...board], empty = b.flatMap((v, i) => (v ? [] : [i]))
  if (d === 'EASY' || (d === 'MEDIUM' && rand() < 0.5)) return empty[Math.floor(rand() * empty.length)]
  let bv = -99, bm = empty[0]
  for (const i of empty) { b[i] = 'O'; const v = minimax(b, 'X', 1); b[i] = ''; if (v > bv) { bv = v; bm = i } }
  return bm
}
