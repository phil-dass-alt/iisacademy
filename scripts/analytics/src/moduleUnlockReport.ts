type BoardCode =
  | "cbse"
  | "icse"
  | "karnataka"
  | "tamil-nadu"
  | "kerala"
  | "andhra-pradesh";
type WingCode = "junior" | "senior" | "university";

interface UnlockEvent {
  userId: string;
  moduleId: string;
  moduleTitle: string;
  unlockedAt: string;
  prerequisiteScore: number;
  board?: BoardCode;
  wing?: WingCode;
  classLevel?: number;
  enhancementTag?: string;
}

interface ModuleAccessEvent {
  userId: string;
  moduleId: string;
  accessedAt: string;
  durationSeconds: number;
  board?: BoardCode;
  wing?: WingCode;
  classLevel?: number;
  membershipTier?: string;
}

function generateUnlockReport(events: UnlockEvent[]): void {
  console.log("=== IIS Academy Module Unlock Report ===\n");
  console.log(`Total unlocks: ${events.length}`);

  const byModule: Record<string, number> = {};
  const byWing: Record<string, number> = {};
  const byBoard: Record<string, number> = {};
  const byClass: Record<string, number> = {};

  for (const e of events) {
    byModule[e.moduleTitle] = (byModule[e.moduleTitle] ?? 0) + 1;
    if (e.wing) byWing[e.wing] = (byWing[e.wing] ?? 0) + 1;
    if (e.board) byBoard[e.board] = (byBoard[e.board] ?? 0) + 1;
    if (e.classLevel) {
      const key = `Class ${e.classLevel}`;
      byClass[key] = (byClass[key] ?? 0) + 1;
    }
  }

  console.log("\nTop unlocked modules:");
  Object.entries(byModule)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .forEach(([module, count]) => {
      console.log(`  ${module}: ${count} unlocks`);
    });

  if (Object.keys(byWing).length > 0) {
    console.log("\nUnlocks by wing:");
    Object.entries(byWing)
      .sort(([, a], [, b]) => b - a)
      .forEach(([wing, count]) => {
        console.log(`  ${wing}: ${count}`);
      });
  }

  if (Object.keys(byBoard).length > 0) {
    console.log("\nUnlocks by board:");
    Object.entries(byBoard)
      .sort(([, a], [, b]) => b - a)
      .forEach(([board, count]) => {
        console.log(`  ${board}: ${count}`);
      });
  }

  if (Object.keys(byClass).length > 0) {
    console.log("\nUnlocks by class:");
    Object.entries(byClass)
      .sort()
      .forEach(([cls, count]) => {
        console.log(`  ${cls}: ${count}`);
      });
  }
}

function generateAccessReport(events: ModuleAccessEvent[]): void {
  console.log("=== IIS Academy Module Access Report ===\n");
  console.log(`Total access events: ${events.length}`);

  const byModule: Record<string, { count: number; totalSeconds: number }> = {};
  const byMembership: Record<string, number> = {};

  for (const e of events) {
    if (!byModule[e.moduleId]) byModule[e.moduleId] = { count: 0, totalSeconds: 0 };
    byModule[e.moduleId]!.count += 1;
    byModule[e.moduleId]!.totalSeconds += e.durationSeconds;
    if (e.membershipTier) {
      byMembership[e.membershipTier] = (byMembership[e.membershipTier] ?? 0) + 1;
    }
  }

  console.log("\nModule engagement (avg time spent):");
  Object.entries(byModule)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 10)
    .forEach(([moduleId, stats]) => {
      const avgMinutes = (stats.totalSeconds / stats.count / 60).toFixed(1);
      console.log(`  ${moduleId}: ${stats.count} sessions, avg ${avgMinutes} min`);
    });

  if (Object.keys(byMembership).length > 0) {
    console.log("\nAccess by membership tier:");
    Object.entries(byMembership)
      .sort(([, a], [, b]) => b - a)
      .forEach(([tier, count]) => {
        console.log(`  ${tier}: ${count} accesses`);
      });
  }
}

// Example usage
const sampleEvents: UnlockEvent[] = [
  {
    userId: "u1",
    moduleId: "fin-lit-01",
    moduleTitle: "Financial Literacy: Class 8",
    unlockedAt: "2024-01-15",
    prerequisiteScore: 75,
    board: "cbse",
    wing: "junior",
    classLevel: 8,
    enhancementTag: "Financial Literacy",
  },
  {
    userId: "u2",
    moduleId: "ai-tech-class8",
    moduleTitle: "AI Technology: Class 8",
    unlockedAt: "2024-01-16",
    prerequisiteScore: 82,
    board: "icse",
    wing: "junior",
    classLevel: 8,
    enhancementTag: "AI Technology",
  },
  {
    userId: "u3",
    moduleId: "fin-lit-class9",
    moduleTitle: "Financial Literacy: Class 9",
    unlockedAt: "2024-01-17",
    prerequisiteScore: 88,
    board: "karnataka",
    wing: "junior",
    classLevel: 9,
    enhancementTag: "Financial Literacy",
  },
];

generateUnlockReport(sampleEvents);

