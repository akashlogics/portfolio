import ParticleName from '../components/ParticleName'
export default function Hero({ onProjects, onAcu }: { onProjects: () => void; onAcu: () => void }) {
  return <section id="hero"><div className="hero-t"><p className="mono"><span className="on-dot" />Akash // Intelligence Lab · AI system online</p></div>
    <ParticleName />
    <div className="hero-t"><h1>AI / ML ENGINEER</h1><p>Building intelligent systems from data, algorithms and code.</p><p className="mono">Python • Machine Learning • Computer Vision • Data Science</p>
      <button className="btn" onClick={onProjects}>EXPLORE WORK</button><button className="btn g" onClick={onAcu}>TALK TO ACU</button></div></section>
}
