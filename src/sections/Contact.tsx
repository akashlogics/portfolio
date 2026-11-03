import { links, profile } from '../data/portfolio'
export default function Contact() {
  return <><section id="achievements"><p className="mono">Module 07 // Record</p><h2>Achievements, education, certifications</h2>
    <div className="grid"><div className="card"><h3 style={{ color: 'var(--ac)', margin: 0 }}>2ND PLACE</h3><p>Byte Works 2.0 Hackathon</p><p style={{ color: 'var(--mut)', fontSize: '.85rem' }}>Also: {profile.achievements.slice(1).join(' · ')}</p></div>
      <div className="card"><h3 style={{ margin: 0 }}>B.Tech — AI &amp; Data Science</h3><p>{profile.education.school}</p><p className="mono">{profile.education.period} · CGPA {profile.education.cgpa}</p></div>
      <div className="card">{profile.certifications.map(c => <p key={c} style={{ margin: '.2em 0' }}>{c}</p>)}</div></div></section>
    <section id="contact"><p className="mono">Module 08 // Contact</p><h2>Connect to the system</h2>
      <p style={{ maxWidth: 600, color: 'var(--mut)' }}>Have an interesting AI, ML, data, or software engineering problem? Let’s build something useful.</p>
      <a className="btn" href={`mailto:${links.email}`}>EMAIL AKASH</a><a className="btn g" href={links.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a><a className="btn g" href={links.github} target="_blank" rel="noopener noreferrer">GITHUB</a><a className="btn g" href={links.leetcode} target="_blank" rel="noopener noreferrer">LEETCODE</a></section></>
}
export function Footer() {
  return <footer><h2 style={{ margin: 0 }}>AKASH R</h2><p className="mono">AI / ML Engineer</p><p className="mono" style={{ color: 'var(--mut)' }}>Building intelligence, one system at a time.</p>
    <p><a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={links.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a><a href={`mailto:${links.email}`}>Email</a></p><p>© 2026 AKASH R · Tip: type “acu” anywhere</p></footer>
}
