export type Board = "cbse" | "icse" | "state";
export type Wing = "junior" | "senior" | "university";

export interface Chapter {
  id: string;
  name: string;
  subject: string;
  class: number;
  board: Board;
  topics: string[];
}

export interface EnhancementLayer {
  id: string;
  name: string;
  description: string;
  subjectMapping: Record<string, string>;
  tags: string[];
}

export interface EnhancedChapter extends Chapter {
  enhancement?: {
    layerId: string;
    layerName: string;
    bridgeTopics: string[];
    addonTitle: string;
    addonDescription: string;
  };
}

export interface BoardMapping {
  board: Board;
  class: number;
  subject: string;
  chapters: Chapter[];
}
