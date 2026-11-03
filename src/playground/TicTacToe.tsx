import { useEffect, useRef, useState } from 'react'
import { aiMove, emptyBoard, isFull, winLine, type Board, type Difficulty } from '../utils/gameLogic'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function TicTacToe() {
  const reduced = useReducedMotion()
  const [board, setBoard] = useState<Board>(emptyBoard)
  const [diff, setDiff] = useState<Difficulty>('IMPOSSIBLE')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('Your move — you are X')
  const [score, setScore] = useState({ w: 0, l: 0, d: 0 })
  const timer = useRef<number>()
  const line = winLine(board)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const finish = (b: Board): boolean => {
    const w = winLine(b)
    if (w) { const human = b[w[0]] === 'X'; setScore(s => (human ? { ...s, w: s.w + 1 } : { ...s, l: s.l + 1 })); setMsg(human ? 'HUMAN VICTORY' : 'ACU WINS'); return true }
    if (isFull(b)) { setScore(s => ({ ...s, d: s.d + 1 })); setMsg('SYSTEM DRAW'); return true }
    return false
  }
  const play = (i: number) => {
    if (busy || board[i] || line || isFull(board)) return
    const nb = [...board]; nb[i] = 'X'; setBoard(nb)
    if (finish(nb)) return
    setBusy(true); setMsg('ACU IS EVALUATING POSSIBLE MOVES…')
    timer.current = window.setTimeout(() => {
      const after = [...nb]; after[aiMove(nb, diff)] = 'O'; setBoard(after); setBusy(false)
      if (!finish(after)) setMsg('MOVE SELECTED — your move (X)')
    }, reduced ? 100 : 650)
  }
  const reset = () => { window.clearTimeout(timer.current); setBoard(emptyBoard()); setBusy(false); setMsg('Your move — you are X') }

  return (
    <div className="card" id="ttt">
      <p className="mono"><i className="orb" /> TIC // TAC // TOE · Human vs ACU</p>
      <div className="row">
        <label>Difficulty <select value={diff} onChange={e => setDiff(e.target.value as Difficulty)} aria-label="Difficulty">
          {(['EASY', 'MEDIUM', 'IMPOSSIBLE'] as Difficulty[]).map(d => <option key={d}>{d}</option>)}</select></label>
        <span className="mono" data-testid="score">Wins {score.w} · Losses {score.l} · Draws {score.d}</span>
      </div>
      <div id="board" role="grid" aria-label="Tic-tac-toe board">
        {board.map((v, i) => <button key={i} className={`${v === 'O' ? 'o ' : ''}${line?.includes(i) ? 'w' : ''}`} aria-label={`Cell ${i + 1}${v ? ' ' + v : ''}`} onClick={() => play(i)}>{v}</button>)}
      </div>
      <p className="mono" aria-live="polite" data-testid="status">{msg}</p>
      <button className="btn" onClick={reset}>PLAY AGAIN</button>
    </div>
  )
}
