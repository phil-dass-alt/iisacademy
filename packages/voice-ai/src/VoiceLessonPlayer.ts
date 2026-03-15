import type { VoiceLesson } from "./types";

export class VoiceLessonPlayer {
  private lesson: VoiceLesson;
  private currentSegment: number = 0;
  private isPlaying: boolean = false;

  constructor(lesson: VoiceLesson) {
    this.lesson = lesson;
  }

  play(): void {
    this.isPlaying = true;
    this.currentSegment = 0;
  }

  pause(): void {
    this.isPlaying = false;
  }

  resume(): void {
    this.isPlaying = true;
  }

  next(): boolean {
    const segments = this.lesson.script.segments;
    if (this.currentSegment < segments.length - 1) {
      this.currentSegment++;
      return true;
    }
    this.isPlaying = false;
    return false;
  }

  getCurrentSegment() {
    return this.lesson.script.segments[this.currentSegment];
  }

  getProgress(): number {
    const total = this.lesson.script.segments.length;
    return total > 0 ? Math.round((this.currentSegment / total) * 100) : 0;
  }

  getLesson(): VoiceLesson {
    return this.lesson;
  }

  isActive(): boolean {
    return this.isPlaying;
  }
}
