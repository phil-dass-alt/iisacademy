import type { SupportedLanguage } from './types';

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  kn: 'ಕನ್ನಡ (Kannada)',
  ta: 'தமிழ் (Tamil)',
  te: 'తెలుగు (Telugu)',
  ml: 'മലയാളം (Malayalam)',
  hi: 'हिन्दी (Hindi)',
};

export const BOARD_LANGUAGES: Record<string, SupportedLanguage[]> = {
  CBSE: ['en', 'hi'],
  ICSE: ['en'],
  Karnataka: ['en', 'kn'],
  'Tamil Nadu': ['en', 'ta'],
  Kerala: ['en', 'ml'],
  'Andhra Pradesh': ['en', 'te'],
};

const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    startQuiz: 'Start Quiz',
    nextQuestion: 'Next Question',
    submitAnswer: 'Submit Answer',
    score: 'Score',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    tryAgain: 'Try Again',
    viewLesson: 'View Lesson',
    readAloud: 'Read Aloud',
  },
  kn: {
    startQuiz: 'ಪ್ರಶ್ನೋತ್ತರ ಪ್ರಾರಂಭಿಸಿ',
    nextQuestion: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ',
    submitAnswer: 'ಉತ್ತರ ಸಲ್ಲಿಸಿ',
    score: 'ಅಂಕ',
    correct: 'ಸರಿಯಾಗಿದೆ!',
    incorrect: 'ತಪ್ಪು',
    tryAgain: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    viewLesson: 'ಪಾಠ ನೋಡಿ',
    readAloud: 'ಓದಿ ಹೇಳಿ',
  },
  ta: {
    startQuiz: 'வினாடி வினா தொடங்கு',
    nextQuestion: 'அடுத்த கேள்வி',
    submitAnswer: 'பதில் சமர்பிக்கவும்',
    score: 'மதிப்பெண்',
    correct: 'சரி!',
    incorrect: 'தவறு',
    tryAgain: 'மீண்டும் முயற்சி',
    viewLesson: 'பாடம் பார்க்கவும்',
    readAloud: 'சத்தமாக படி',
  },
  te: {
    startQuiz: 'క్విజ్ ప్రారంభించండి',
    nextQuestion: 'తదుపరి ప్రశ్న',
    submitAnswer: 'సమాధానం సమర్పించండి',
    score: 'స్కోరు',
    correct: 'సరైనది!',
    incorrect: 'తప్పు',
    tryAgain: 'మళ్ళీ ప్రయత్నించండి',
    viewLesson: 'పాఠం చూడండి',
    readAloud: 'బిగ్గరగా చదవండి',
  },
  ml: {
    startQuiz: 'ക്വിസ് ആരംഭിക്കുക',
    nextQuestion: 'അടുത്ത ചോദ്യം',
    submitAnswer: 'ഉത്തരം സമർപ്പിക്കുക',
    score: 'സ്കോർ',
    correct: 'ശരി!',
    incorrect: 'തെറ്റ്',
    tryAgain: 'വീണ്ടും ശ്രമിക്കുക',
    viewLesson: 'പാഠം കാണുക',
    readAloud: 'ഉറക്കെ വായിക്കുക',
  },
  hi: {
    startQuiz: 'क्विज़ शुरू करें',
    nextQuestion: 'अगला प्रश्न',
    submitAnswer: 'उत्तर दर्ज करें',
    score: 'अंक',
    correct: 'सही!',
    incorrect: 'गलत',
    tryAgain: 'फिर कोशिश करें',
    viewLesson: 'पाठ देखें',
    readAloud: 'जोर से पढ़ें',
  },
};

export function translate(key: string, language: SupportedLanguage): string {
  return UI_TRANSLATIONS[language]?.[key] ?? UI_TRANSLATIONS['en'][key] ?? key;
}

export function getAvailableLanguages(board: string): SupportedLanguage[] {
  return BOARD_LANGUAGES[board] ?? ['en'];
}
