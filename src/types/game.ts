export type SubjectType = 'lengua' | 'mates' | 'ingles';

export type QuestionType = 
  | 'multiple_choice' 
  | 'syllable_claps' 
  | 'drag_classify' 
  | 'pairs_of_ten' 
  | 'math_blocks'
  | 'object_select';

export interface QuestionOption {
  id: string;
  label: string;
  subLabel?: string;
  icon?: string;
  isCorrect: boolean;
}

export interface CurricularQuestion {
  id: string;
  subject: SubjectType;
  competence: string;
  level: number; // 1, 2, 3, 4
  title: string;
  prompt: string;
  explanation: string;
  hint: string;
  type: QuestionType;
  options: QuestionOption[];
  visualData?: {
    word?: string;
    syllables?: string[];
    tens?: number;
    units?: number;
    targetSum?: number;
    multiplicationGroup?: { count: number; itemsPerGroup: number; itemIcon: string };
    englishWord?: string;
    spanishTranslation?: string;
  };
  treatmentStep: {
    toolName: string;
    toolIcon: string;
    actionDesc: string;
  };
}

export interface AnimalPatient {
  id: string;
  name: string;
  species: string;
  gender: 'el' | 'la';
  symptomTitle: string;
  symptomDescription: string;
  favoriteFood: string;
  foodIcon: string;
  funFact: string;
  avatarColor: string;
  levelRequirement: number;
  initialHealth: number;
}

export interface AvatarConfig {
  name: string;
  hairStyle: 'pigtails' | 'braids' | 'straight' | 'curly';
  hairColor: string; // hex
  skinTone: string; // hex
  coatColor: string; // hex
  scrubsColor: string; // hex
  accessory: 'none' | 'stethoscope' | 'badge' | 'hairband';
  glasses: 'none' | 'round' | 'star';
}

export interface LevelInfo {
  id: number;
  title: string;
  subtitle: string;
  patientId: string;
  locationTheme: 'clinic' | 'park' | 'farm' | 'forest';
  requiredStars: number;
  unlocked: boolean;
  starsEarned: number;
  bestScore: number;
}

export interface SanctuaryToy {
  id: string;
  name: string;
  icon: string;
  price: number;
  description: string;
  bought: boolean;
}

export interface HiddenItem {
  id: string;
  name: string;
  icon: string;
  category: 'herb' | 'water' | 'tool' | 'fruit';
  description: string;
  position: { x: number; y: number }; // percentage inside the 2D forest canvas
  clue: string;
  curricularChallenge: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    englishWord?: string;
  };
  found: boolean;
}

export interface ExplorationMission {
  id: string;
  title: string;
  patientTarget: string; // e.g. 'pipo' or 'toby'
  patientName: string;
  purposeDesc: string;
  remedyResult: string;
  remedyIcon: string;
  items: HiddenItem[];
}

export interface GameSaveState {
  avatar: AvatarConfig;
  currentLevelId: number;
  levels: LevelInfo[];
  huellitas: number;
  dailyStreak: number;
  lastLoginDate: string;
  curedAnimals: string[]; // patient IDs
  toys: SanctuaryToy[];
  animalHappiness: Record<string, number>; // patientId -> happiness 0-100
  soundEnabled: boolean;
  voiceReadEnabled: boolean;
}

