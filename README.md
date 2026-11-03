# AKASH R // AI Intelligence Lab

An interactive portfolio built as if it were an AI system: a 3D neural core, a conversational assistant that answers from structured portfolio data, playable algorithm demos, and a developer terminal. The visitor explores my work instead of just scrolling through it.

**[Live demo](#)** · **[GitHub](https://github.com/akashlogics)** · **[LinkedIn](https://linkedin.com/in/akashr39t)**

<!-- Add 2–3 screenshots or a short GIF here: hero, ACU, route optimizer -->

---

## About me

I'm Akash R, an AI / ML engineer (B.Tech in Artificial Intelligence and Data Science, Karpagam Institute of Technology). My work covers Python, machine learning, computer vision, NLP and backend development. This site is my portfolio and a showcase of how I build.

## Highlights

| Feature | What it is |
|---|---|
| **Neural core (WebGL)** | A Three.js / React Three Fiber scene with nodes, links, orbiting rings and particles. It reacts to the mouse and to scroll, and changes state per section. It falls back to a 2D canvas when WebGL is unavailable. |
| **Particle hero** | The name AKASH R forms from particles that scatter away from the cursor. |
| **ACU, my portfolio assistant** | A local, rule-based assistant with intent matching, slash commands (`/projects`, `/skills`, `/help`…), streamed replies, a profile panel and a clear "I don't have that information" response for out-of-scope questions. No external API. |
| **Tic-Tac-Toe vs ACU** | Minimax opponent with Easy, Medium and Impossible levels. Impossible never loses (verified by exhaustive play-through). |
| **Route Optimizer** | A live genetic-algorithm demo (population, selection, crossover, mutation, new generation) visualised on a node graph. |
| **Neural Network Lab** | Adjustable layers and speed with an animated forward-pass visualisation. |
| **Developer terminal** | Commands, history (↑), Tab autocomplete and suggestions. A Konami code unlocks it. |
| **Project labs** | Each project has its own interactive visualisation (crop prediction pipeline, simulated people tracking, genetic-algorithm results, NLP sentiment pipeline). |
| **Accessibility** | Keyboard-operable, `Esc` closes dialogs, ARIA labels, and full `prefers-reduced-motion` support (cursor, tilt, magnetic buttons and 3D motion are reduced or disabled). |

## Honesty note

All project visualisations are **illustrative simulations**, labelled as such in the UI. The browser is not running my original YOLO, Random Forest or DEAP code. The route optimizer shows simulated values, kept separate from the real project results (75 simulations, 150 generations, 18% distance reduction, 25% cost reduction).

## Tech stack

- **Frontend:** React 18, TypeScript (strict), Vite 5
- **3D:** Three.js, React Three Fiber (lazy-loaded)
- **Styling:** hand-written CSS design system (dark theme, no UI template)
- **Logic:** pure TypeScript modules for game AI, genetic algorithm, terminal commands and ACU intent matching

## Architecture

```
src/
├── components/   Navigation, ACU, Terminal, CustomCursor, LoadingScreen, Modal, ParticleName
├── sections/     Hero, About, Experience, Projects, TechStack, Playground, Contact
├── three/        NeuralScene, NeuralCore, NeuralNodes, NeuralConnections, ParticleField, WebGLFallback
├── playground/   TicTacToe, RouteOptimizer, NeuralNetworkLab
├── projects/     CropPredictionLab, PeopleTrackingLab, VehicleRoutingLab, NLPVisualization
├── data/         portfolio, projects, experience, skills, acuKnowledge   ← single source of truth
├── hooks/        useReducedMotion, useActiveSection, useCanvas, useMicroInteractions
└── utils/        gameLogic (minimax), geneticAlgorithm, commands
```

Design decisions:
- **Data separated from UI.** ACU, the terminal and the page all read the same data modules, so content is never duplicated.
- **Logic separated from rendering.** Minimax, the genetic algorithm and intent matching are plain TypeScript modules that can be tested without a browser.
- **Graceful degradation.** WebGL detection plus an error boundary means the page never breaks if 3D fails.
- **Performance.** Three.js is code-split, particle and link counts are reduced on mobile, Three.js geometries are disposed on unmount, and listeners and animation frames are cleaned up.

## Getting started

```bash
npm install
npm run dev       # development server
npm run build     # type-check + production build
npm run preview   # preview the production build
```

Requires Node 18+.

## Testing

Tested by scripted runs in headless Chromium against the production build:
- Widths 320, 375, 390, 430, 768, 1024 and 1440px with no horizontal overflow
- Navigation, mobile menu, all four project modals, ACU (including out-of-scope questions), terminal, Tic-Tac-Toe, route optimizer and neural lab
- WebGL on and off (fallback), and `prefers-reduced-motion`
- Exhaustive Tic-Tac-Toe check: against Impossible, every possible human line was played and the human never won

Not yet covered: Safari and Edge, real touch devices, GPU performance on real hardware, and automated tests in the repo.

## Roadmap

- 3D orbital technology constellation
- Automated unit tests for the game and ACU logic
- Playwright end-to-end suite in CI

## Contact

- Email: akashmtp2004@gmail.com
- GitHub: [akashlogics](https://github.com/akashlogics)
- LinkedIn: [akashr39t](https://linkedin.com/in/akashr39t)
- LeetCode: [akashlogics](https://leetcode.com/akashlogics)
