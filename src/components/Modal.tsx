import { useEffect, useRef, type ReactNode } from 'react'
export default function Modal({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const d = ref.current!; if (open && !d.open) d.showModal(); if (!open && d.open) d.close() }, [open])
  return <dialog ref={ref} aria-label={label} onClose={onClose}>{open && children}<p style={{ marginTop: 16 }}><button className="btn" onClick={onClose} aria-label={`Close ${label}`}>CLOSE</button></p></dialog>
}
