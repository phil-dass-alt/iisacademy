export type Board =
  | "cbse"
  | "icse"
  | "karnataka"
  | "tamil-nadu"
  | "kerala"
  | "andhra-pradesh";
export type Wing = "junior" | "senior" | "university";
/** Junior Wing covers Classes 8–10 */
export const JUNIOR_WING_CLASSES = [8, 9, 10] as const;

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
