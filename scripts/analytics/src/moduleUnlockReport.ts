interface UnlockEvent {
  userId: string;
  moduleId: string;
  moduleTitle: string;
  unlockedAt: string;
  prerequisiteScore: number;
}

function generateUnlockReport(events: UnlockEvent[]): void {
  console.log("=== IIS Academy Module Unlock Report ===\n");
  console.log(`Total unlocks: ${events.length}`);

  const byModule: Record<string, number> = {};
  for (const e of events) {
    byModule[e.moduleTitle] = (byModule[e.moduleTitle] ?? 0) + 1;
  }

  console.log("\nTop unlocked modules:");
  Object.entries(byModule)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .forEach(([module, count]) => {
      console.log(`  ${module}: ${count} unlocks`);
    });
}

const sampleEvents: UnlockEvent[] = [
  {
    userId: "u1",
    moduleId: "fin-lit-01",
    moduleTitle: "Financial Literacy Basics",
    unlockedAt: "2024-01-15",
    prerequisiteScore: 75,
  },
  {
    userId: "u2",
    moduleId: "ai-circuits-01",
    moduleTitle: "AI Circuits & Electronics",
    unlockedAt: "2024-01-16",
    prerequisiteScore: 82,
  },
];

generateUnlockReport(sampleEvents);
