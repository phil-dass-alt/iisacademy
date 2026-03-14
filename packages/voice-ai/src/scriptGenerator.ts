import type { LessonScript } from "./types";

interface ScriptGeneratorInput {
  subject: string;
  chapter: string;
  enhancementTopic?: string;
}

export function generateLessonScript(
  input: ScriptGeneratorInput
): LessonScript {
  const { subject, chapter, enhancementTopic } = input;
  const topicLabel = enhancementTopic ?? chapter;

  return {
    id: `${subject}-${chapter}-script`.toLowerCase().replace(/\s+/g, "-"),
    title: enhancementTopic
      ? `${chapter} + ${enhancementTopic}`
      : chapter,
    segments: [
      {
        type: "explain",
        text: `Welcome to today's lesson on ${chapter} in ${subject}. ${
          enhancementTopic
            ? `We'll also explore how this connects to ${enhancementTopic} in the real world.`
            : ""
        }`,
        pauseAfter: 1,
      },
      {
        type: "explain",
        text: `Let's start with the core concepts of ${chapter} that you need to know for your board exams.`,
        pauseAfter: 1,
      },
      {
        type: "example",
        text: `Here's a real-world example: How does ${chapter} appear in everyday life and in ${topicLabel}?`,
        pauseAfter: 2,
      },
      {
        type: "question",
        text: `Quick check: Can you think of one way ${chapter} connects to ${topicLabel}? Pause and think for a moment.`,
        pauseAfter: 5,
      },
      {
        type: "summary",
        text: `Great! Today we covered ${chapter} from ${subject}, and explored its connection to ${topicLabel}. Well done!`,
        pauseAfter: 1,
      },
    ],
  };
}
