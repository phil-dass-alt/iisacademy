import type { NudgeConfig, NudgeMessage } from './types';

const ENCOURAGEMENT_MESSAGES: NudgeMessage[] = [
  { type: 'encouragement', message: "You're doing great! Keep going!", emoji: '🌟' },
  { type: 'encouragement', message: "Every question you answer makes you smarter!", emoji: '🧠' },
  { type: 'encouragement', message: "Intelligence grows with every attempt. Don't stop!", emoji: '🚀' },
  { type: 'streak', message: "You're on a roll! Amazing streak!", emoji: '🔥' },
  { type: 'reminder', message: "Time to learn something new today!", emoji: '📚' },
  { type: 'hint', message: "Try reading the chapter summary before the quiz for better results.", emoji: '💡' },
];

const REMINDER_MESSAGES: NudgeMessage[] = [
  { type: 'reminder', message: "You've been away for a while. Ready to continue?", emoji: '⏰' },
  { type: 'reminder', message: "Your learning streak is waiting for you!", emoji: '📅' },
  { type: 'encouragement', message: "Just 10 minutes of study can make a big difference!", emoji: '⚡' },
];

export class NudgeAgent {
  private config: NudgeConfig;
  private nudgeCount = 0;
  private nudgeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(config: Partial<NudgeConfig> = {}) {
    this.config = {
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now(),
      nudgeThresholdMs: 5 * 60 * 1000, // 5 minutes
      maxNudgesPerSession: 3,
      ...config,
    };
  }

  updateActivity(): void {
    this.config.lastActivityTime = Date.now();
    if (this.nudgeTimer) {
      clearTimeout(this.nudgeTimer);
      this.nudgeTimer = null;
    }
  }

  getRandomEncouragement(): NudgeMessage {
    return ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
  }

  getInactivityNudge(): NudgeMessage {
    return REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];
  }

  shouldNudge(): boolean {
    if (this.nudgeCount >= this.config.maxNudgesPerSession) return false;
    const inactiveMs = Date.now() - this.config.lastActivityTime;
    return inactiveMs >= this.config.nudgeThresholdMs;
  }

  recordNudge(): void {
    this.nudgeCount++;
  }

  getStreakMessage(streak: number): NudgeMessage {
    if (streak >= 7) return { type: 'streak', message: `Incredible! ${streak}-day learning streak!`, emoji: '🏆' };
    if (streak >= 3) return { type: 'streak', message: `${streak}-day streak! You're building a great habit!`, emoji: '🔥' };
    return { type: 'streak', message: `Day ${streak}! Keep it up!`, emoji: '⭐' };
  }
}
