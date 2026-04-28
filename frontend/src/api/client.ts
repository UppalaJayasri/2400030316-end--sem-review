import {
  AdminQuiz,
  AdminQuizQuestion,
  AdminStats,
  AuthResponse,
  LeaderboardEntry,
  PlaceDetail,
  PlaceSummary,
  PlaceUpsertPayload,
  ProfileUpdatePayload,
  QuizCreatePayload,
  QuizInfo,
  QuizQuestion,
  QuizResult,
  UserProfile,
  UserRole,
  Article,
  ArticleSubmitPayload,
  ArticleStatus,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let message = "Request failed";
    const rawBody = await response.text();

    if (rawBody) {
      try {
        const errorBody = JSON.parse(rawBody);
        message =
          errorBody?.error ||
          errorBody?.message ||
          Object.values(errorBody || {})[0] ||
          message;
      } catch {
        message = rawBody;
      }
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json();
  console.log(`API Response from ${path}:`, data);
  return data as T;
}

export const apiClient = {
  login(payload: LoginPayload): Promise<AuthResponse> {
    return request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  signup(payload: SignupPayload): Promise<AuthResponse> {
    return request<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body: payload,
    });
  },

  getPlaces(): Promise<PlaceSummary[]> {
    return request<PlaceSummary[]>("/api/places");
  },

  getPlaceDetails(placeId: number, token: string): Promise<PlaceDetail> {
    return request<PlaceDetail>(`/api/places/${placeId}/details`, {
      token,
    });
  },

  getAdminPlaces(token: string): Promise<PlaceDetail[]> {
    return request<PlaceDetail[]>("/api/admin/places", { token });
  },

  createAdminPlace(payload: PlaceUpsertPayload, token: string): Promise<PlaceDetail> {
    return request<PlaceDetail>("/api/admin/places", {
      method: "POST",
      body: payload,
      token,
    });
  },

  updateAdminPlace(
    placeId: number,
    payload: PlaceUpsertPayload,
    token: string
  ): Promise<PlaceDetail> {
    return request<PlaceDetail>(`/api/admin/places/${placeId}`, {
      method: "PUT",
      body: payload,
      token,
    });
  },

  // ─── Quiz (User) ──────────────────────────────────────────────

  getActiveQuizzes(token: string): Promise<QuizInfo[]> {
    return request<QuizInfo[]>("/api/quiz/active", { token });
  },

  getQuizQuestions(quizId: string, token: string): Promise<QuizQuestion[]> {
    return request<QuizQuestion[]>(`/api/quiz/${quizId}/questions`, { token });
  },

  submitQuiz(quizId: string, answers: number[], token: string): Promise<QuizResult> {
    return request<QuizResult>(`/api/quiz/${quizId}/submit`, {
      method: "POST",
      body: { quizId, answers },
      token,
    });
  },

  getLeaderboard(quizId: string, token: string): Promise<LeaderboardEntry[]> {
    return request<LeaderboardEntry[]>(`/api/quiz/${quizId}/leaderboard`, { token });
  },

  getQuizReview(quizId: string, token: string): Promise<QuizResult> {
    return request<QuizResult>(`/api/quiz/${quizId}/review`, { token });
  },

  // ─── Quiz (Admin) ─────────────────────────────────────────────

  getAdminQuizzes(token: string): Promise<AdminQuiz[]> {
    return request<AdminQuiz[]>("/api/admin/quiz", { token });
  },

  createQuiz(payload: QuizCreatePayload, token: string): Promise<AdminQuiz> {
    return request<AdminQuiz>("/api/admin/quiz", {
      method: "POST",
      body: payload,
      token,
    });
  },

  toggleQuizVisibility(quizId: string, token: string): Promise<AdminQuiz> {
    return request<AdminQuiz>(`/api/admin/quiz/${quizId}/toggle-visibility`, {
      method: "PUT",
      token,
    });
  },

  updateQuiz(quizId: string, payload: QuizCreatePayload, token: string): Promise<AdminQuiz> {
    return request<AdminQuiz>(`/api/admin/quiz/${quizId}`, {
      method: "PUT",
      body: payload,
      token,
    });
  },

  getAdminQuizQuestions(quizId: string, token: string): Promise<AdminQuizQuestion[]> {
    return request<AdminQuizQuestion[]>(`/api/admin/quiz/${quizId}/questions`, { token });
  },

  deleteQuiz(quizId: string, token: string): Promise<void> {
    return request<void>(`/api/admin/quiz/${quizId}`, {
      method: "DELETE",
      token,
    });
  },

  // ─── Profile ──────────────────────────────────────────────────

  getProfile(token: string): Promise<UserProfile> {
    return request<UserProfile>("/api/profile", { token });
  },

  updateProfile(payload: ProfileUpdatePayload, token: string): Promise<UserProfile> {
    return request<UserProfile>("/api/profile", {
      method: "PUT",
      body: payload,
      token,
    });
  },

  // ─── Admin Stats ──────────────────────────────────────────────

  getAdminStats(token: string): Promise<AdminStats> {
    return request<AdminStats>("/api/admin/stats", { token });
  },

  deletePlace(placeId: number, token: string): Promise<void> {
    return request<void>(`/api/admin/places/${placeId}`, {
      method: "DELETE",
      token,
    });
  },

  // ─── Users ───────────────────────────────────────────────────

  getAdminUsers(token: string): Promise<UserProfile[]> {
    return request<UserProfile[]>("/api/admin/users", { token });
  },

  // ─── Articles ─────────────────────────────────────────────────

  submitArticle(payload: ArticleSubmitPayload, token: string): Promise<Article> {
    return request<Article>("/api/articles", {
      method: "POST",
      body: payload,
      token,
    });
  },

  getMyArticles(token: string): Promise<Article[]> {
    return request<Article[]>("/api/articles/mine", { token });
  },

  getApprovedArticles(token: string): Promise<Article[]> {
    return request<Article[]>("/api/articles/approved", { token });
  },

  getAllArticles(token: string): Promise<Article[]> {
    return request<Article[]>("/api/admin/articles", { token });
  },

  updateArticleStatus(articleId: number, status: ArticleStatus, token: string): Promise<Article> {
    return request<Article>(`/api/admin/articles/${articleId}/status`, {
      method: "PUT",
      body: { status },
      token,
    });
  },

  deleteArticle(articleId: number, token: string): Promise<void> {
    return request<void>(`/api/admin/articles/${articleId}`, {
      method: "DELETE",
      token,
    });
  },

  deleteUser(userId: number, token: string): Promise<void> {
    return request<void>(`/api/admin/users/${userId}`, {
      method: "DELETE",
      token,
    });
  },
};
