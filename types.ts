export interface PracticeQuestion {
  question: string;
  answer: string;
  hint: string;
}

export interface AnalysisResult {
  subject: string;
  topic: string;
  emoji: string;
  steps: string[];
  explanation: string;
  practiceQuestions: PracticeQuestion[];
}

export enum AppState {
  HOME = 'HOME',
  PREVIEW = 'PREVIEW',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}