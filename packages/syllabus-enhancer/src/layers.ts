import type { EnhancementLayer, Wing } from "./types";

const ENHANCEMENT_LAYERS: EnhancementLayer[] = [
  {
    id: "financial-literacy",
    name: "Financial Literacy",
    description: "Real-world personal finance concepts bridged from Math",
    subjectMapping: { Mathematics: "Financial Literacy" },
    tags: ["money", "sip", "budgeting", "stocks"],
  },
  {
    id: "ai-technology",
    name: "AI Technology",
    description: "Sensors, robotics, IoT and AI hardware from junior Science",
    subjectMapping: { Science: "AI Technology" },
    tags: ["arduino", "iot", "robotics", "sensors", "drones"],
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
    subjectMapping: {
      Biology: "BioTech & Genomics",
      Science: "BioTech",
    },
    tags: ["crispr", "dna", "bioinformatics"],
  },
  {
    id: "green-materials",
    name: "Green Chemistry & Materials",
    description: "Sustainable materials science and green chemistry",
    subjectMapping: {
      Chemistry: "Green Chemistry & Materials",
      Science: "Green Materials",
    },
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
    description:
      "Environmental technology and sustainable development — solar, EVs, carbon footprint",
    subjectMapping: {
      Geography: "Climate Tech & Sustainability",
      Science: "Climate Technology",
    },
    tags: ["solar", "water-ai", "smart-cities", "ev", "carbon-footprint"],
  },
];

/** Wings for which each layer is most relevant */
const LAYER_WING_MAP: Record<string, Wing[]> = {
  "financial-literacy": ["junior", "senior"],
  "ai-technology": ["junior"],
  "ai-circuits": ["senior", "university"],
  "biotech-genomics": ["junior", "senior"],
  "green-materials": ["junior", "senior"],
  "ai-ml": ["senior", "university"],
  "climate-tech": ["junior", "senior"],
};

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

export function getLayersForWing(wing: Wing): EnhancementLayer[] {
  return ENHANCEMENT_LAYERS.filter((l) =>
    (LAYER_WING_MAP[l.id] ?? []).includes(wing)
  );
}

