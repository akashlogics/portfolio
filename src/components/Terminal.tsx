import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { COMMAND_NAMES, runCommand } from '../utils/commands'
export default function Terminal({ open, onClose, onAction }: { open: boolean; onClose: () => void; onAction: (a: 'acu' | 'play') => void }) {
  const dlg = useRef<HTMLDialogElement>(null), inp = useRef<HTMLInputElement>(null), box = useRef<HTMLDivElement>(null)
  const hist = useRef<string[]>([]), hi = useRef(0)
  const [lines, setLines] = useState<string[]>(['type "help" for commands']), [val, setVal] = useState('')
  useEffect(() => { const d = dlg.current!; if (open && !d.open) { d.showModal(); inp.current?.focus() } if (!open && d.open) d.close() }, [open])
  useEffect(() => { box.current?.scrollTo(0, 1e5) }, [lines])
  const run = (raw: string) => {
    const { output, action } = runCommand(raw)
    if (raw.trim()) { hist.current.push(raw.trim()); hi.current = hist.current.length }
    if (action === 'clear') { setLines([]); return }
    setLines(l => [...l, 'AKASH@AI-LAB:~$ ' + raw, ...(output ? [output] : [])])
    if (action === 'acu' || action === 'play') onAction(action)
  }
  const key = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); hi.current = Math.max(0, Math.min(hist.current.length, hi.current + (e.key === 'ArrowUp' ? -1 : 1))); setVal(hist.current[hi.current] ?? '') }
    if (e.key === 'Tab') { e.preventDefault(); const m = COMMAND_NAMES.filter(c => c.startsWith(val.toLowerCase())); if (m.length === 1) setVal(m[0]) }
    if (e.key === 'Enter') { run(val); setVal('') }
  }
  return (
    <dialog ref={dlg} id="tdlg" aria-label="Terminal" onClose={onClose}>
      <div id="term" role="log" ref={box}>{lines.join('\n')}</div>
      <div className="row"><span className="mono">AKASH@AI-LAB:~$</span><input id="ti" ref={inp} list="cl" value={val} onChange={e => setVal(e.target.value)} onKeyDown={key} aria-label="Terminal input" autoComplete="off" style={{ flex: 1, background: 'none', border: 0, color: 'var(--tx)', font: 'inherit' }} /></div>
      <p className="mono" style={{ color: 'var(--mut)' }}>Tab autocompletes · ↑ history · Esc closes</p>
      <datalist id="cl">{COMMAND_NAMES.map(c => <option key={c} value={c} />)}</datalist>
      <button className="btn g" onClick={onClose} aria-label="Close terminal">CLOSE</button>
    </dialog>
  )
}
