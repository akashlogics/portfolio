import TicTacToe from '../playground/TicTacToe'
import RouteOptimizer from '../playground/RouteOptimizer'
import NeuralNetworkLab from '../playground/NeuralNetworkLab'
export default function Playground({ onTerminal }: { onTerminal: () => void }) {
  return <section id="playground"><p className="mono">Module 06 // Playground</p><h2>Digital playground</h2><p style={{ color: 'var(--mut)' }}>Experiments in algorithms, intelligence and interaction.</p>
    <div className="pm" style={{ marginBottom: 16 }}><a className="btn g" href="#ttt">01 — TIC TAC TOE · GAME THEORY</a><a className="btn g" href="#route">02 — ROUTE OPTIMIZER · GENETIC ALGORITHMS</a><a className="btn g" href="#neural">03 — NEURAL NETWORK · FORWARD PASS</a><button className="btn g" onClick={onTerminal}>04 — TERMINAL · DEVELOPER INTERFACE</button></div>
    <TicTacToe /><RouteOptimizer /><NeuralNetworkLab /></section>
}
