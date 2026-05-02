export interface Profile {
  id: string;
  full_name: string | null;
  current_phase: number;
  study_streak: number;
  last_study_date: string | null;
  created_at: string;
}

export interface AssignmentCompletion {
  id: string;
  user_id: string;
  assignment_type: "grammar" | "writing" | "speaking" | "listening";
  week_number: number;
  phase: number;
  completed_at: string;
  score: number | null;
  notes: string | null;
}

export interface WritingEntry {
  id: string;
  user_id: string;
  title: string;
  prompt: string;
  content: string;
  word_count: number;
  self_score: number | null;
  phase: number;
  week_number: number;
  writing_type: "complaint" | "enquiry" | "opinion" | "informal" | "free";
  created_at: string;
  updated_at: string;
}

export interface DailySession {
  id: string;
  user_id: string;
  study_date: string;
  minutes_studied: number;
  created_at: string;
}

export interface GrammarQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "fill_blank" | "error_correction";
  options?: string[];
  correct_answer: string;
  explanation: string;
  week: number;
  topic: string;
}

export interface CurriculumPhase {
  id: number;
  title: string;
  subtitle: string;
  months: string;
  level: string;
  goal: string;
  grammarTopics: string[];
  vocabThemes: string[];
  resources: string[];
  color: string;
}

export interface Resource {
  name: string;
  description: string;
  url: string;
  type: "course" | "listening" | "vocabulary" | "grammar" | "speaking" | "writing" | "exam";
  phases: number[];
  stars: number;
  free: boolean;
}
