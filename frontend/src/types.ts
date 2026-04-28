export type UserRole =
  | "ADMIN"
  | "CULTURAL_ENTHUSIAST"
  | "EXPLORER";

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: UserRole;
  message: string;
}

export interface PlaceSummary {
  id: number;
  name: string;
  city: string;
  state: string;
  imageUrl: string;
  description: string;
}

export interface PlaceDetail extends PlaceSummary {
  description: string;
  location: string;
  timings: string;
  entryFee: string;
}

export interface PlaceUpsertPayload {
  name: string;
  city: string;
  state: string;
  description: string;
  location: string;
  timings: string;
  entryFee: string;
  imageUrl: string;
}

// ─── Quiz Types ──────────────────────────────────────────────────

export interface QuizInfo {
  id: string;
  title: string;
  questionCount: number;
  startsAt: string;
  expiresAt: string;
  alreadyAttempted: boolean;
  userScore: number | null;
  totalQuestions: number | null;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

export interface QuizSubmitPayload {
  quizId: string;
  answers: number[];
}

export interface QuizAnswerDetail {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  userAnswer: number;
  correctOption: number;
  correct: boolean;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  details: QuizAnswerDetail[];
}

export interface LeaderboardEntry {
  userName: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface AdminQuiz {
  id: string;
  title: string;
  visible: boolean;
  questionCount: number;
  attemptCount: number;
  createdAt: string;
  startsAt: string;
  expiresAt: string;
  expired: boolean;
}

export interface AdminQuizQuestion {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: number;
  explanation: string;
}

export interface QuizCreatePayload {
  title: string;
  questionCount: number;
  startsAt: string;
  endsAt: string;
  visible: boolean;
  questions: {
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: number;
    explanation: string;
  }[];
}

// ─── Profile & Admin Types ───────────────────────────────────────

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  mobileNumber: string | null;
  gender: string | null;
  createdAt: string;
}

export interface ProfileUpdatePayload {
  name?: string;
  email?: string;
  mobileNumber?: string;
  gender?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalPlaces: number;
  totalQuizzes: number;
  totalArticles: number;
}

// ─── Article Types ───────────────────────────────────────────────

export type ArticleStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Article {
  id: number;
  title: string;
  category: string;
  content: string;
  status: ArticleStatus;
  authorName: string;
  createdAt: string;
}

export interface ArticleSubmitPayload {
  title: string;
  category: string;
  content: string;
}
