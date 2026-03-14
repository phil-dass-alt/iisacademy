import type { Chapter, EnhancedChapter } from "./types";
import { getLayersForSubject } from "./layers";

export function enhanceChapter(chapter: Chapter): EnhancedChapter {
  const layers = getLayersForSubject(chapter.subject);

  if (layers.length === 0) {
    return { ...chapter };
  }

  const layer = layers[0]!;
  const addonName = layer.subjectMapping[chapter.subject] ?? layer.name;

  return {
    ...chapter,
    enhancement: {
      layerId: layer.id,
      layerName: layer.name,
      bridgeTopics: layer.tags,
      addonTitle: addonName,
      addonDescription: layer.description,
    },
  };
}
