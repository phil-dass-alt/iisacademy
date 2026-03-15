import type { Chapter, EnhancedContent } from './types';

export function enhanceChapterTitle(title: string): string {
  const enhancements: Record<string, string> = {
    'Crop Production and Management': 'Smart Farming: AI-Powered Crop Production & Management',
    'Microorganisms: Friend and Foe': 'Microbes in the Intelligence Age: Allies, Threats & Biotech',
    'Synthetic Fibres and Plastics': 'Materials Revolution: Smart Fibres & Sustainable Plastics',
    'Materials: Metals and Non-Metals': 'Advanced Materials: Metals, Non-Metals & Nanotechnology',
    'Coal and Petroleum': 'Fossil Fuels to Clean Energy: Understanding Our Energy Transition',
    'Combustion and Flame': 'Fire Science: Combustion, Flame & Clean Energy Chemistry',
    'Conservation of Plants and Animals': 'Biodiversity in the Climate Crisis: Conservation & Ecology',
    'Cell: Structure and Functions': 'The Cell as a Nanomachine: Structure, Function & Biotechnology',
    'Reproduction in Animals': 'Life Continuity: Reproduction, Genetics & Reproductive Technology',
    'Reaching the Age of Adolescence': 'Adolescence in the Digital Age: Hormones, Health & Wellbeing',
    'Force and Pressure': 'Forces That Move the World: Physics of Motion & Engineering',
    Friction: 'Friction, Lubrication & the Science of Surface Engineering',
    Sound: 'Acoustics & Waves: From Music to Sonar to Ultrasound',
    'Chemical Effects of Electric Current': 'Electrochemistry: From Batteries to Electric Vehicles',
    'Some Natural Phenomena': 'Extreme Earth Events: Earthquakes, Lightning & Disaster Science',
    Light: 'Optics & Photonics: From Lenses to Lasers & Fibre Optics',
  };
  return enhancements[title] ?? `${title}: Enhanced for the Intelligence Age`;
}

export function getCareerConnections(chapterTitle: string): string[] {
  const connections: Record<string, string[]> = {
    'Crop Production and Management': ['Agricultural Scientist', 'AgTech Engineer', 'Food Scientist', 'Environmental Consultant'],
    'Microorganisms: Friend and Foe': ['Microbiologist', 'Biotechnologist', 'Medical Researcher', 'Pharmaceutical Scientist'],
    'Force and Pressure': ['Mechanical Engineer', 'Aerospace Engineer', 'Civil Engineer', 'Robotics Engineer'],
    Friction: ['Materials Engineer', 'Automotive Engineer', 'Mechanical Engineer', 'Tribologist'],
    Sound: ['Acoustical Engineer', 'Music Technologist', 'Medical Sonographer', 'Audio Engineer'],
    Light: ['Optical Engineer', 'Photonics Researcher', 'Ophthalmologist', 'Laser Technician'],
  };
  return connections[chapterTitle] ?? ['Scientist', 'Engineer', 'Researcher', 'Educator'];
}

export function generateEnhancedContent(chapter: Chapter): EnhancedContent {
  return {
    originalTitle: chapter.title,
    enhancedTitle: enhanceChapterTitle(chapter.title),
    aiInsights: [
      `AI applications in ${chapter.title.toLowerCase()} are transforming the field.`,
      `Machine learning models can now predict outcomes related to ${chapter.title.toLowerCase()}.`,
      `Data-driven approaches are making ${chapter.title.toLowerCase()} more efficient and precise.`,
    ],
    realWorldApplications: [chapter.aiEnhancementLesson.practicalAddOn],
    careerConnections: getCareerConnections(chapter.title),
  };
}

export function getSubjectSlug(subject: string): string {
  return subject.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getBoardSlug(board: string): string {
  return board.toLowerCase().replace(/\s+/g, '-');
}
