import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useToast } from "./Toast";

const REVIEW_CACHE_PREFIX = "quiz_review_";

export function QuizPage({ token }) {
  const { showToast } = useToast();
  const [view, setView] = useState("loading");
  const [activeQuizzes, setActiveQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCachedReview = (quizId) => {
    try {
      const raw = localStorage.getItem(`${REVIEW_CACHE_PREFIX}${quizId}`);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (
        typeof parsed?.score === "number" &&
        typeof parsed?.totalQuestions === "number" &&
        Array.isArray(parsed?.details)
      ) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  };

  const cacheReview = (quizId, review) => {
    try {
      localStorage.setItem(`${REVIEW_CACHE_PREFIX}${quizId}`, JSON.stringify(review));
    } catch {
      // Ignore
    }
  };

  const loadQuizzes = useCallback(async () => {
    if (!token) {
      setView("not-logged-in");
      return;
    }

    try {
      const list = await apiClient.getActiveQuizzes(token);
      setActiveQuizzes(list);
      
      if (list.length === 0) {
        setView("no-quiz");
      } else {
        setView("list");
      }
    } catch (err) {
      console.error("Failed to load quizzes:", err);
      showToast(err instanceof Error ? err.message : "Failed to load quiz data", "error");
      setView("no-quiz");
    }
  }, [token, showToast]);

  useEffect(() => {
    void loadQuizzes();
  }, [loadQuizzes]);

  const selectQuiz = async (quiz) => {
    setSelectedQuiz(quiz);
    if (quiz.alreadyAttempted) {
      setView("loading");
      try {
        const lbPromise = apiClient.getLeaderboard(quiz.id, token);
        const reviewPromise = apiClient.getQuizReview(quiz.id, token).catch(() => null);

        const [lb, reviewFromApi] = await Promise.all([lbPromise, reviewPromise]);
        setLeaderboard(lb);

        const review = reviewFromApi ?? getCachedReview(quiz.id);
        if (review) {
          setResult(review);
          setView("result");
        } else {
          setView("already-done");
        }
      } catch (err) {
        showToast("Failed to load results", "error");
        setView("list");
      }
    } else {
      setView("info");
    }
  };

  const startQuiz = async () => {
    if (!token || !selectedQuiz) return;

    try {
      const qs = await apiClient.getQuizQuestions(selectedQuiz.id, token);
      setQuestions(qs);
      setSelectedAnswers(new Array(qs.length).fill(-1));
      setCurrentIndex(0);
      setView("playing");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load questions", "error");
    }
  };

  const selectAnswer = (optionIndex) => {
    setSelectedAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = optionIndex;
      return copy;
    });
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((p) => p - 1);
    }
  };

  const submitQuiz = async () => {
    if (!token || !selectedQuiz) return;

    setIsSubmitting(true);
    try {
      const res = await apiClient.submitQuiz(selectedQuiz.id, selectedAnswers, token);
      setResult(res);
      cacheReview(selectedQuiz.id, res);

      const lb = await apiClient.getLeaderboard(selectedQuiz.id, token);
      setLeaderboard(lb);
      setView("result");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Submission failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const allAnswered = selectedAnswers.every((a) => a >= 0);

  if (view === "loading") {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-amber-400 border-t-amber-400" />
          <p className="text-sm text-slate-300">Loading...</p>
        </div>
      </main>
    );
  }

  if (view === "not-logged-in") {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10">
        <section className="w-full max-w-lg rounded-3xl border-2 border-amber-400 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Sign in Required</h1>
          <p className="mt-3 text-sm text-slate-300">
            Please log in to participate in Heritage Knowledge Quizzes.
          </p>
        </section>
      </main>
    );
  }

  if (view === "no-quiz") {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10">
        <section className="w-full max-w-lg rounded-3xl border-2 border-amber-400 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800">
            <span className="text-3xl">📝</span>
          </div>
          <h1 className="text-2xl font-bold text-white">No Quizzes Available</h1>
          <p className="mt-3 text-sm text-slate-300">
            There are no active quizzes right now. Check back later!
          </p>
        </section>
      </main>
    );
  }

  if (view === "list") {
    return (
      <main className="px-5 py-10 sm:px-8 lg:px-12">
        <section className="mx-auto w-[min(900px,100%)] space-y-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Knowledge Hub</p>
            <h1 className="mt-2 text-4xl font-bold text-white">Heritage Quizzes</h1>
            <p className="mt-3 text-slate-400">Select a quiz to test your knowledge</p>
          </div>

          <div className="flex flex-col gap-4">
            {activeQuizzes.map((q) => (
              <QuizCardUser key={q.id} quiz={q} onSelect={selectQuiz} />
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (view === "info" && selectedQuiz) {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10">
        <section className="w-full max-w-lg rounded-3xl border-2 border-amber-400 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
          <button onClick={() => setView("list")} className="absolute left-6 top-6 text-slate-400 hover:text-white transition">
            ← Back to list
          </button>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600">
            <span className="text-3xl">🧠</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Ready to play?</p>
          <h1 className="mt-3 text-3xl font-bold text-white">{selectedQuiz.title}</h1>
          <p className="mt-3 text-sm text-slate-300">
            {selectedQuiz.questionCount} questions about Indian heritage. One attempt only!
          </p>
          <button
            onClick={startQuiz}
            className="mt-8 w-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition hover:shadow-amber-500/50"
          >
            🎮 Start Quiz
          </button>
        </section>
      </main>
    );
  }

  if (view === "playing" && questions.length > 0) {
    const q = questions[currentIndex];
    const options = [q.optionA, q.optionB, q.optionC, q.optionD];
    const isLast = currentIndex === questions.length - 1;

    return (
      <main className="px-5 py-10 sm:px-8 lg:px-12">
        <section className="mx-auto w-[min(700px,100%)] space-y-5">
          <div className="flex items-center justify-between">
            <span className="rounded-full border-2 border-amber-400 bg-white/5 px-4 py-1.5 text-xs font-bold text-slate-200">
              {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-xs font-semibold text-amber-200">
              {selectedAnswers.filter((a) => a >= 0).length} answered
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="rounded-3xl border-2 border-amber-400 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-8">
            <h2 className="text-xl font-bold text-white md:text-2xl">{q.questionText}</h2>
            <div className="mt-6 space-y-3">
              {options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentIndex] === idx;
                const labels = ["A", "B", "C", "D"];
                return (
                  <button
                    key={idx}
                    onClick={() => selectAnswer(idx)}
                    className={`flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left text-sm font-medium transition ${
                      isSelected
                        ? "border-amber-400 bg-amber-400/15 text-white"
                        : "border-amber-400 bg-white/5 text-slate-200 hover:border-amber-400 hover:bg-white/10"
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${isSelected ? "bg-amber-400 text-slate-900" : "bg-white/10 text-slate-300"}`}>
                      {labels[idx]}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={goPrev} disabled={currentIndex === 0} className="rounded-full border-2 border-amber-400 px-6 py-2.5 text-sm font-bold text-white disabled:opacity-40">
              ← Previous
            </button>
            {isLast ? (
              <button onClick={submitQuiz} disabled={!allAnswered || isSubmitting} className="rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-2.5 text-sm font-bold text-slate-900 shadow-lg">
                {isSubmitting ? "Submitting..." : "🏆 Submit Quiz"}
              </button>
            ) : (
              <button onClick={goNext} disabled={selectedAnswers[currentIndex] < 0} className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-900">
                Next →
              </button>
            )}
          </div>
        </section>
      </main>
    );
  }

  if (view === "result" && result) {
    const pct = Math.round((result.score / result.totalQuestions) * 100);
    return (
      <main className="px-5 py-10 sm:px-8 lg:px-12">
        <section className="mx-auto w-[min(1300px,100%)] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border-2 border-amber-400 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-3xl">
                {pct >= 80 ? "🏆" : pct >= 60 ? "🌟" : "💡"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Quiz Completed!</h1>
                <button onClick={() => setView("list")} className="text-xs font-bold text-amber-300 hover:underline">
                  ← Back to Quiz List
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-amber-300/30 bg-amber-400/10 px-8 py-3">
              <span className="text-3xl font-bold text-amber-300">{result.score}/{result.totalQuestions}</span>
              <span className="text-xs font-semibold text-amber-200">{pct}% Score</span>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="flex h-[450px] flex-col rounded-3xl border-2 border-amber-400 bg-white/5 p-6 shadow-xl backdrop-blur">
              <h2 className="mb-4 text-lg font-bold text-white">Review Answers</h2>
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {result.details.map((d, i) => (
                  <div key={i} className={`rounded-2xl border p-4 ${d.correct ? "border-emerald-400/30 bg-emerald-500/10" : "border-red-400/30 bg-red-500/10"}`}>
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${d.correct ? "bg-emerald-400 text-slate-900" : "bg-red-400 text-white"}`}>
                        {d.correct ? "✓" : "✗"}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{i + 1}. {d.questionText}</p>
                        <p className="mt-1 text-xs text-slate-300">
                          Your answer: <span className={d.correct ? "text-emerald-300" : "text-red-300"}>{[d.optionA, d.optionB, d.optionC, d.optionD][d.userAnswer]}</span>
                        </p>
                        {!d.correct && <p className="text-xs text-emerald-300">Correct: {[d.optionA, d.optionB, d.optionC, d.optionD][d.correctOption]}</p>}
                        {d.explanation && <p className="mt-1 text-xs italic text-slate-400">{d.explanation}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[450px]">
              <LeaderboardTable entries={leaderboard} />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (view === "already-done" && selectedQuiz) {
    const pct = selectedQuiz.userScore !== null && selectedQuiz.totalQuestions ? Math.round((selectedQuiz.userScore / selectedQuiz.totalQuestions) * 100) : 0;
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10">
        <section className="w-full max-w-lg rounded-3xl border-2 border-amber-400 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
          <button onClick={() => setView("list")} className="absolute left-6 top-6 text-slate-400 hover:text-white transition">
            ← Back
          </button>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-3xl">✅</div>
          <h1 className="text-2xl font-bold text-white">Already Completed</h1>
          <p className="mt-2 text-sm text-slate-300">You&apos;ve already taken <strong>{selectedQuiz.title}</strong>.</p>
          <div className="mt-6 inline-flex flex-col items-center rounded-2xl border border-amber-300/30 bg-amber-400/10 px-8 py-4">
            <span className="text-4xl font-bold text-amber-300">{selectedQuiz.userScore}/{selectedQuiz.totalQuestions}</span>
            <span className="text-xs font-semibold text-amber-200">{pct}% Score</span>
          </div>
          <p className="mt-6 text-xs text-slate-500">Wait for the next quiz or explore other topics!</p>
        </section>
      </main>
    );
  }

  return null;
}

function LeaderboardTable({ entries }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border-2 border-amber-400 bg-white/5 p-6 shadow-xl backdrop-blur">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
        <span>🏅</span> Leaderboard
      </h2>
      <div className="flex-1 overflow-y-auto pr-1">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-slate-900/90">
            <tr className="border-b border-amber-400 text-xs font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3 pr-3">#</th>
              <th className="py-3 pr-3">Player</th>
              <th className="py-3 pr-3">Score</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i} className="border-b border-amber-400/30">
                <td className="py-3 pr-3">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}</td>
                <td className="py-3 pr-3 font-semibold text-white">{e.userName}</td>
                <td className="py-3 pr-3">
                  <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-200">
                    {e.score}/{e.totalQuestions}
                  </span>
                </td>
                <td className="py-3 text-xs text-slate-400">{new Date(e.completedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuizCardUser({ quiz: q, onSelect }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const startsAt = new Date(q.startsAt);
    if (startsAt > now && !q.alreadyAttempted) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [q.startsAt, now, q.alreadyAttempted]);

  const startsAt = new Date(q.startsAt);
  const isFuture = startsAt > now;

  // Formatting remaining time if within 24 hours
  let timeStr = "";
  if (isFuture) {
    const diffMs = startsAt - now;
    if (diffMs > 0 && diffMs < 24 * 60 * 60 * 1000) {
      const hrs = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
      timeStr = `Opens in ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else if (diffMs > 0) {
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      timeStr = `Opens in ${days} day${days > 1 ? 's' : ''}`;
    }
  }

  return (
    <button
      onClick={() => !isFuture && onSelect(q)}
      disabled={isFuture && !q.alreadyAttempted}
      className={`group relative flex w-full items-center justify-between rounded-xl border-2 border-amber-400 bg-slate-900 p-5 text-left transition-colors ${isFuture && !q.alreadyAttempted ? 'opacity-80 cursor-not-allowed' : 'hover:bg-slate-900'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-xl ${isFuture && !q.alreadyAttempted ? 'from-slate-500 to-slate-700' : 'from-amber-400 to-orange-600'}`}>
          {q.alreadyAttempted ? "✅" : isFuture ? "🕒" : "🧠"}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300">{q.title}</h3>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1"><span className="text-amber-400 text-sm">❓</span> Questions : {q.questionCount}</span>
            <span className="flex items-center gap-1">
              <span className="text-amber-400 text-sm">📅</span> 
              {isFuture ? (
                <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-md">{timeStr}</span>
              ) : (
                `Expires: ${new Date(q.expiresAt).toLocaleDateString()}`
              )}
            </span>
          </div>
        </div>
      </div>
      <span className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-widest ${
        q.alreadyAttempted 
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
          : isFuture 
            ? 'bg-slate-800 text-amber-500 border-amber-500/50' 
            : 'bg-amber-400/20 text-amber-400 border-amber-400/30 hover:bg-amber-400/30'
      }`}>
        {q.alreadyAttempted ? 'View Result →' : isFuture ? 'Locked 🔒' : 'Start Quiz →'}
      </span>
    </button>
  );
}
