import { projects } from '../data/projects'
import { skillsText } from '../data/acuKnowledge'
import { profile, links } from '../data/portfolio'
import { experience } from '../data/experience'
export const COMMAND_NAMES = ['help', 'about', 'experience', 'projects', 'skills', 'github', 'linkedin', 'contact', 'acu', 'play', 'clear'] as const
export type CommandAction = 'acu' | 'play' | 'clear' | null
export function runCommand(raw: string): { output: string; action: CommandAction } {
  const c = raw.trim().toLowerCase(), e = experience[0]
  const out = (output: string, action: CommandAction = null) => ({ output, action })
  switch (c) {
    case 'help': return out('available commands:\n' + COMMAND_NAMES.join(' '))
    case 'about': return out(profile.summary)
    case 'experience': return out(`${e.role} — ${e.company} (${e.period}, ${e.location})`)
    case 'projects': return out(projects.map((p, i) => `${i + 1}. ${p.title}`).join('\n'))
    case 'skills': return out(skillsText)
    case 'github': return out(links.github)
    case 'linkedin': return out(links.linkedin)
    case 'contact': return out(`Email: ${links.email}\nLinkedIn: ${links.linkedin}\nGitHub: ${links.github}\nLeetCode: ${links.leetcode}`)
    case 'acu': return out('opening ACU…', 'acu')
    case 'play': return out('opening playground…', 'play')
    case 'clear': return out('', 'clear')
    case '': return out('')
    default: return out(`command not found: ${c}. Try "help".`)
  }
}
