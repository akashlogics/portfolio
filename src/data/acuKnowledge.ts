import { projects } from './projects'
import { skills } from './skills'
import { profile, links } from './portfolio'
import { experience } from './experience'
const byId = (id: string) => projects.find(p => p.id === id)!
const bullets = (a: string[]) => a.map(x => '• ' + x).join('\n')
const ex = experience[0]
interface Entry { id: string; keys: string[]; answer: string }
export const KB: Entry[] = [
  { id: 'who', keys: ['bio', 'summary', 'profile'], answer: `${profile.summary} (${profile.education.degree.replace('B.Tech — ', 'B.Tech, ')}, CGPA ${profile.education.cgpa}).` },
  { id: 'projects', keys: ['project', 'built'], answer: 'Featured projects:\n' + bullets(projects.map(p => `${p.title} (${p.category})`)) },
  { id: 'vision', keys: ['vision', 'opencv', 'yolo', 'tracking', 'mediapipe'], answer: `Akash built a people-tracking project using ${byId('tracking').stack.slice(0, 4).join(', ')}, with Pandas for logging movement by zone.` },
  { id: 'ml', keys: ['ml', 'machine', 'learning', 'crop', 'forest'], answer: 'His ML work includes Smart Crop Prediction: a Random Forest model built with Scikit-learn and served via Flask as a REST API.' },
  { id: 'tech', keys: ['tech', 'stack', 'skill', 'language', 'use'], answer: 'Akash works primarily with Python, SQL and JavaScript, with experience across Scikit-learn, Flask, FastAPI, OpenCV, Pandas and NumPy. Databases: MySQL and MongoDB.' },
  { id: 'experience', keys: ['intern', 'experience', 'aerele', 'technologies', 'job', 'frappe', 'erp'], answer: `${ex.role} at ${ex.company} (${ex.period}, ${ex.location}): ${ex.summary}` },
  { id: 'genetic', keys: ['genetic', 'routing', 'vehicle', 'deap'], answer: 'Vehicle Routing Optimization used DEAP genetic algorithms: 75 simulations, 150 generations, 18% distance reduction and 25% cost reduction.' },
  { id: 'sentiment', keys: ['sentiment', 'nlp', 'scrap'], answer: 'Web Scraping + Sentiment Analysis uses Python, BeautifulSoup, NLTK and Pandas to turn web text into sentiment insights.' },
  { id: 'education', keys: ['education', 'college', 'cgpa', 'degree'], answer: `${profile.education.degree}, ${profile.education.school}, ${profile.education.period}, CGPA ${profile.education.cgpa}.` },
  { id: 'achievements', keys: ['achievement', 'hackathon', 'award', 'won'], answer: '2nd place at Byte Works 2.0 Hackathon. Also participated in Pinnacle CIT Paper Presentation and SIH’23 Hackathon.' },
  { id: 'certifications', keys: ['certif'], answer: 'Certifications: ' + profile.certifications.join(', ') + '.' },
  { id: 'github', keys: ['github', 'git', 'open', 'source', 'repo'], answer: `GitHub: ${links.github} — ${profile.openSource}.` },
  { id: 'contact', keys: ['contact', 'email', 'linkedin', 'leetcode', 'phone', 'hire', 'reach'], answer: `Email: ${links.email}\nLinkedIn: ${links.linkedin}\nGitHub: ${links.github}\nLeetCode: ${links.leetcode}` },
  { id: 'build', keys: ['capab'], answer: 'Based on his portfolio: ML web apps (Random Forest + Flask), computer vision pipelines, genetic-algorithm optimisation, NLP/data-analysis scripts, and Frappe/ERPNext backend modules.' },
]
export const skillsText = Object.entries(skills).map(([c, a]) => `${c}: ${a.map(s => s.name).join(', ')}`).join('\n')
const entry = (id: string) => KB.find(e => e.id === id)!.answer
export const UNKNOWN = 'I don’t have that information in Akash’s portfolio. I can help with his experience, projects, skills, education and work.'
export const GREETING = 'ACU online. I’m Akash’s Conversational Unit — a rule-based assistant answering from his portfolio data. Ask me anything about his work.'
export const QUICK_PROMPTS = ['Who is Akash?', 'Show me his projects', 'What is his ML experience?', 'Tell me about his computer vision project', 'What technologies does he use?', 'Where can I find his GitHub?', 'Tell me about his open-source work', 'What did he do at Aerele Technologies?', 'What is his Vehicle Routing project?', 'What is his Smart Crop Prediction project?', 'What can Akash build?']
const SLASH: Record<string, string> = { '/projects': entry('projects'), '/skills': skillsText, '/experience': entry('experience'), '/education': entry('education'), '/github': entry('github'), '/contact': entry('contact'), '/play': 'Opening the Tic-Tac-Toe playground…', '/help': 'Commands: /projects /skills /experience /education /github /contact /play /help' }
const PHRASES: [RegExp, string][] = [[/\bwho (is|are) (akash|he|this)\b|\babout (akash|him)\b|\bintroduce\b/, 'who'], [/\bwhat (can|does) (akash|he) (build|do|make)\b|\bcan (akash|he) build\b/, 'build']]
export function answer(q: string): string {
  const c = q.trim().toLowerCase()
  if (SLASH[c]) return SLASH[c]
  for (const [re, id] of PHRASES) if (re.test(c)) return entry(id)
  const words = c.replace(/[^a-z0-9+ ]/g, ' ').split(/\s+/).filter(Boolean)
  let best = 0, res = UNKNOWN
  for (const e of KB) {
    const s = e.keys.filter(k => words.some(w => w.startsWith(k) || (w.length > 3 && k.startsWith(w)))).length
    if (s > best) { best = s; res = e.answer }
  }
  return res
}
