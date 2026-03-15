interface SkillMetric {
  userId: string;
  subject: string;
  chapter: string;
  quizScore: number;
  completedAt: string;
  badge?: string;
}

function generateSkillReport(metrics: SkillMetric[]): void {
  const bySubject: Record<string, SkillMetric[]> = {};

  for (const m of metrics) {
    if (!bySubject[m.subject]) bySubject[m.subject] = [];
    bySubject[m.subject]!.push(m);
  }

  console.log("=== IIS Academy Skill Report ===\n");

  for (const [subject, items] of Object.entries(bySubject)) {
    const avgScore =
      items.reduce((sum, i) => sum + i.quizScore, 0) / items.length;
    console.log(`${subject}: ${items.length} completions, avg score: ${avgScore.toFixed(1)}%`);
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
  },
  {
    userId: "u2",
    subject: "Physics",
    chapter: "Current Electricity",
    quizScore: 90,
    completedAt: "2024-01-16",
    badge: "Circuit Wizard",
  },
];

generateSkillReport(sampleMetrics);
