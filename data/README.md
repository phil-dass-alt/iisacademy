# IIS Academy Data

Centralized data store for syllabi, board-chapter mappings, quiz banks, and enhancement layers.

## Structure

- `syllabi/` — Official chapter lists by board, class, and subject
- `quizzes/` — Adaptive quiz banks in JSON
- `enhancements/` — Enhancement layer content (lessons, add-ons)

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

### Enhancement Tags

Each chapter maps to one of these enhancement layers:

| Tag | Subject Bridge | Junior Wing Lesson |
|-----|----------|------|
| `Financial Literacy` | Mathematics | `enhancements/junior/financial-literacy-class{8,9,10}.json` |
| `AI Technology` | Science (Physics/Forces/Electronics) | `enhancements/junior/ai-technology-class{8,9}.json` |
| `Climate Technology` | Science (Environment/Energy) | `enhancements/junior/climate-technology-class10.json` |
| `BioTech` | Science (Biology) | (senior wing) |
| `Green Materials` | Science (Chemistry) | (senior wing) |

### Quizzes

Adaptive quiz banks follow the same board/class structure under `quizzes/`:
- `math-financial-literacy.json` — Mathematics + Financial Literacy
- `science-ai-technology.json` — Science + AI Technology
- `science-climate-technology.json` — Science + Climate Technology

Each quiz includes questions at three difficulty levels (`easy`, `medium`, `hard`) for the `AdaptiveQuizEngine` in `packages/quiz-engine`.

