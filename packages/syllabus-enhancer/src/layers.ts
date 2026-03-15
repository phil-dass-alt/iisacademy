import type { EnhancementLayer } from "./types";

const ENHANCEMENT_LAYERS: EnhancementLayer[] = [
  {
    id: "financial-literacy",
    name: "Financial Literacy",
    description: "Real-world personal finance concepts bridged from Math",
    subjectMapping: { Mathematics: "Financial Literacy" },
    tags: ["money", "sip", "budgeting", "stocks"],
  },
  {
    id: "ai-circuits",
    name: "AI Circuits & Electronics",
    description: "Modern electronics and AI hardware from Physics",
    subjectMapping: { Physics: "AI Circuits & Electronics" },
    tags: ["arduino", "iot", "neural-hardware"],
  },
  {
    id: "biotech-genomics",
    name: "BioTech & Genomics",
    description: "Cutting-edge biology: CRISPR, genomics, bioinformatics",
    subjectMapping: { Biology: "BioTech & Genomics" },
    tags: ["crispr", "dna", "bioinformatics"],
  },
  {
    id: "green-materials",
    name: "Green Chemistry & Materials",
    description: "Sustainable materials science and green chemistry",
    subjectMapping: { Chemistry: "Green Chemistry & Materials" },
    tags: ["nanomaterials", "biodegradable", "energy-storage"],
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description: "Applied AI and ML from Computer Science",
    subjectMapping: { "Computer Science": "AI & Machine Learning" },
    tags: ["ml", "neural-nets", "prompt-engineering"],
  },
  {
    id: "climate-tech",
    name: "Climate Tech & Sustainability",
    description: "Environmental technology and sustainable development",
    subjectMapping: { Geography: "Climate Tech & Sustainability" },
    tags: ["solar", "water-ai", "smart-cities"],
  },
];

export function getEnhancementLayer(
  layerId: string
): EnhancementLayer | undefined {
  return ENHANCEMENT_LAYERS.find((l) => l.id === layerId);
}

export function getLayersForSubject(subject: string): EnhancementLayer[] {
  return ENHANCEMENT_LAYERS.filter(
    (l) => l.subjectMapping[subject] !== undefined
  );
}
