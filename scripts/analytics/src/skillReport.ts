type BoardCode =
  | "cbse"
  | "icse"
  | "karnataka"
  | "tamil-nadu"
  | "kerala"
  | "andhra-pradesh";

interface SkillMetric {
  userId: string;
  subject: string;
  chapter: string;
  quizScore: number;
  completedAt: string;
  badge?: string;
  board?: BoardCode;
  classLevel?: number;
  wing?: "junior" | "senior" | "university";
  enhancementTag?: string;
}

function generateSkillReport(metrics: SkillMetric[]): void {
  const bySubject: Record<string, SkillMetric[]> = {};
  const byBoard: Record<string, SkillMetric[]> = {};
  const byEnhancement: Record<string, SkillMetric[]> = {};

  for (const m of metrics) {
    if (!bySubject[m.subject]) bySubject[m.subject] = [];
    bySubject[m.subject]!.push(m);

    if (m.board) {
      if (!byBoard[m.board]) byBoard[m.board] = [];
      byBoard[m.board]!.push(m);
    }

    if (m.enhancementTag) {
      if (!byEnhancement[m.enhancementTag]) byEnhancement[m.enhancementTag] = [];
      byEnhancement[m.enhancementTag]!.push(m);
    }
  }

  console.log("=== IIS Academy Skill Report ===\n");

  console.log("Performance by subject:");
  for (const [subject, items] of Object.entries(bySubject)) {
    const avgScore =
      items.reduce((sum, i) => sum + i.quizScore, 0) / items.length;
    console.log(`  ${subject}: ${items.length} completions, avg score: ${avgScore.toFixed(1)}%`);
  }

  if (Object.keys(byBoard).length > 0) {
    console.log("\nPerformance by board:");
    for (const [board, items] of Object.entries(byBoard)) {
      const avgScore =
        items.reduce((sum, i) => sum + i.quizScore, 0) / items.length;
      console.log(`  ${board}: ${items.length} completions, avg score: ${avgScore.toFixed(1)}%`);
    }
  }

  if (Object.keys(byEnhancement).length > 0) {
    console.log("\nEngagement by enhancement layer:");
    for (const [tag, items] of Object.entries(byEnhancement)) {
      const avgScore =
        items.reduce((sum, i) => sum + i.quizScore, 0) / items.length;
      console.log(`  ${tag}: ${items.length} completions, avg score: ${avgScore.toFixed(1)}%`);
    }
  }
}

// Example usage
const sampleMetrics: SkillMetric[] = [
  {
    userId: "u1",
    subject: "Mathematics",
    chapter: "Simple Interest",
    quizScore: 80,
    completedAt: "2024-01-15",
    badge: "Finance Starter",
    board: "cbse",
    classLevel: 8,
    wing: "junior",
    enhancementTag: "Financial Literacy",
  },
  {
    userId: "u2",
    subject: "Science",
    chapter: "Force and Pressure",
    quizScore: 90,
    completedAt: "2024-01-16",
    badge: "Tech Explorer",
    board: "icse",
    classLevel: 8,
    wing: "junior",
    enhancementTag: "AI Technology",
  },
  {
    userId: "u3",
    subject: "Mathematics",
    chapter: "Statistics",
    quizScore: 85,
    completedAt: "2024-01-17",
    board: "karnataka",
    classLevel: 9,
    wing: "junior",
    enhancementTag: "Financial Literacy",
  },
];

generateSkillReport(sampleMetrics);
