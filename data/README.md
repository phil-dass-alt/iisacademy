# IIS Academy Data

Centralized data store for syllabi, board-chapter mappings, quiz banks, and enhancement layers.

## Structure

- `syllabi/` — Official chapter lists by board, class, and subject
- `quizzes/` — Adaptive quiz banks in JSON
- `enhancements/` — Enhancement layer content (lessons, add-ons)
  - `junior/` — Enhancement modules for Classes 8–10
  - `senior/` — Competitive Plugin modules for Classes 11–12 (JEE/NEET/CA/Foundation)

## Junior Wing Coverage (Classes 8–10)

All data is organized by board → class → subject following the pattern:
`{type}/{board}/class{N}/{subject}.json`

### Boards Covered

| Board | Classes | Subjects |
|-------|---------|---------|
| `cbse` | 8, 9, 10 | Mathematics, Science |
| `icse` | 8, 9, 10 | Mathematics, Science |
| `karnataka` | 8, 9, 10 | Mathematics, Science |
| `tamil-nadu` | 8, 9, 10 | Mathematics, Science |
| `kerala` | 8, 9, 10 | Mathematics, Science |
| `andhra-pradesh` | 8, 9, 10 | Mathematics, Science |

---

## Senior Wing Coverage (Classes 11–12)

### Syllabi Structure

`syllabi/{board}/class{11|12}/{subject}.json`

Each syllabus file includes:
- `chapters[]` — Chapter list with `id`, `number`, `name`, `topics[]`, `enhancement`
- `competitivePlugin` — `{ jee: boolean, neet: boolean }` per chapter (Class 12)
- `stream` — Science / Commerce / Arts
- `wing` — `"senior"`

### Boards and Subjects Covered (Senior Wing)

| Board | Class 11 | Class 12 |
|-------|---------|---------|
| `cbse` | Physics, Mathematics, Chemistry, Biology | Physics, Mathematics, Chemistry, Biology, Economics, Accountancy, Business Studies |
| `icse` | Physics, Mathematics | Physics, Mathematics |
| `karnataka` | Physics, Mathematics | Physics, Mathematics |
| `tamil-nadu` | Physics | Physics |
| `kerala` | Physics | Physics |
| `andhra-pradesh` | Physics | Physics |

### Senior Wing Lesson Content

Standalone lesson files with dual-track architecture:
`{board}/class-{11|12}/{subject}/{chapter-slug}.json`

Each lesson file includes:
- `dualTrack` — Three-track lesson structure:
  - `boardLevel` — Board-exam focused theory and exam tips
  - `bridge` — Advanced/competitive reasoning (JEE/NEET level)
  - `intelligenceAge` — Real-world applications and career connections
- `competitivePlugin` — JEE/NEET edge modules, calculation hacks, mnemonic agents, voice flashcards
- `quiz.stages[]` — 3-stage quiz: Board → Competitive → Intelligence Age

### Competitive Plugin Modules

`enhancements/senior/` contains competitive exam preparation modules:
- `jee-physics-competitive-plugin.json` — JEE Physics edge content
- `neet-biology-competitive-plugin.json` — NEET Biology edge content
- `ca-foundation-competitive-plugin.json` — CA Foundation / Commerce competitive content

### Senior Wing Quizzes

`quizzes/{board}/class{11|12}/` — Competitive quiz banks with 3-stage structure:
- `physics-competitive.json` — Board + Competitive + Intelligence Age questions
- `math-competitive.json` — Board + Competitive + Intelligence Age questions

Each quiz uses the `SeniorQuizEngine` from `packages/quiz-engine` for 3-stage progression.

---

### Enhancement Tags

Each chapter maps to one of these enhancement layers:

| Tag | Subject Bridge | Junior Wing Lesson |
|-----|----------|------|
| `Financial Literacy` | Mathematics | `enhancements/junior/financial-literacy-class{8,9,10}.json` |
| `AI Technology` | Science (Physics/Forces/Electronics) | `enhancements/junior/ai-technology-class{8,9}.json` |
| `Climate Technology` | Science (Environment/Energy) | `enhancements/junior/climate-technology-class10.json` |
| `BioTech` | Science (Biology) | `enhancements/senior/neet-biology-competitive-plugin.json` |
| `AI Circuits & Electronics` | Physics (Class 12) | `enhancements/senior/jee-physics-competitive-plugin.json` |

### Quizzes

Adaptive quiz banks follow the same board/class structure under `quizzes/`:
- `math-financial-literacy.json` — Mathematics + Financial Literacy (Junior Wing)
- `science-ai-technology.json` — Science + AI Technology (Junior Wing)
- `science-climate-technology.json` — Science + Climate Technology (Junior Wing)
- `physics-competitive.json` — Physics 3-stage competitive quiz (Senior Wing)
- `math-competitive.json` — Mathematics 3-stage competitive quiz (Senior Wing)

Each quiz includes questions at three difficulty levels (`easy`, `medium`, `hard`) for the `AdaptiveQuizEngine` and three stages for the `SeniorQuizEngine` in `packages/quiz-engine`.

## Copyright Disclaimer

All lesson content uses this standard disclaimer:

> © Textbook content belongs exclusively to its respective authors and authorities. IIS Academy content offers enhancement, supplemental insights, and technology-powered add-ons. Use strictly for educational purposes.

