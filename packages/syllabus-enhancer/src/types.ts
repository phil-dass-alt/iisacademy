export type BoardName = 'CBSE' | 'ICSE' | 'Karnataka' | 'Tamil Nadu' | 'Kerala' | 'Andhra Pradesh';
export type ClassNumber = 8 | 9 | 10 | 11 | 12;
export type SubjectName = 'Science' | 'Mathematics' | 'Social Science' | 'English' | 'History' | 'Geography' | 'Physics' | 'Chemistry' | 'Biology';

export interface AIEnhancementLesson {
  title: string;
  content: string;
  practicalAddOn: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  feedback: {
    correct: string;
    incorrect: string;
    intelligenceAgeHint: string;
  };
}

export interface Chapter {
  id: number;
  title: string;
  summary: string;
  aiEnhancementLesson: AIEnhancementLesson;
  quiz: QuizQuestion[];
}

export interface SubjectSyllabus {
  board: BoardName;
  class: ClassNumber;
  subject: SubjectName;
  chapters: Chapter[];
}

export interface EnhancedContent {
  originalTitle: string;
  enhancedTitle: string;
  aiInsights: string[];
  realWorldApplications: string[];
  careerConnections: string[];
}
