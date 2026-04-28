import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { CustomSelect } from "./CustomSelect";
import { CustomDatePicker } from "./CustomDatePicker";
import { CustomTimePicker } from "./CustomTimePicker";
import { useToast } from "./Toast";

const emptyQuestion = {
  questionText: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: 0,
  explanation: ""
};

function createEmptyQuestions(count) {
  return Array.from({ length: count }, () => ({ ...emptyQuestion }));
}

export function QuizManagement({ token }) {
  const { showToast } = useToast();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  
  // Step 1 fields
  const [title, setTitle] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Step 2 fields
  const [questions, setQuestions] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmQuiz, setDeleteConfirmQuiz] = useState(null);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [expandedQuizId, setExpandedQuizId] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const loadQuizzes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.getAdminQuizzes(token);
      setQuizzes(data);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load quizzes", "error");
      setQuizzes([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, showToast]);

  useEffect(() => {
    if (deleteConfirmQuiz) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deleteConfirmQuiz]);

  useEffect(() => {
    void loadQuizzes();
  }, [loadQuizzes]);

  const goToStep2 = () => {
    if (!title.trim()) {
      showToast("Please enter a quiz title", "error");
      return;
    }
    if (!startDate || !startTime || !endDate || !endTime) {
      showToast("Please select start and end dates and times", "error");
      return;
    }
    const startStr = `${startDate}T${startTime}`;
    const endStr = `${endDate}T${endTime}`;
    if (new Date(endStr) <= new Date(startStr)) {
      showToast("End date must be after start date", "error");
      return;
    }
    if (!editingQuizId) {
      setQuestions(createEmptyQuestions(questionCount));
    }
    setFormStep(2);
  };

  const updateQuestion = (index, field, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      title: title.trim(),
      questionCount,
      startsAt: `${startDate}T${startTime}:00`,
      endsAt: `${endDate}T${endTime}:00`,
      visible: isVisible,
      questions: questions.map((q) => ({
        questionText: q.questionText.trim(),
        optionA: q.optionA.trim(),
        optionB: q.optionB.trim(),
        optionC: q.optionC.trim(),
        optionD: q.optionD.trim(),
        correctOption: q.correctOption,
        explanation: q.explanation.trim()
      }))
    };
    
    try {
      if (editingQuizId) {
        await apiClient.updateQuiz(editingQuizId, payload, token);
        showToast("Quiz updated successfully!", "success");
      } else {
        await apiClient.createQuiz(payload, token);
        showToast("Quiz created successfully!", "success");
      }
      resetForm();
      setShowCreateForm(false);
      await loadQuizzes();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to save quiz", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setQuestionCount(5);
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setIsVisible(false);
    setQuestions([]);
    setFormStep(1);
    setEditingQuizId(null);
  };

  const openEditQuiz = async (quiz) => {
    try {
      const qs = await apiClient.getAdminQuizQuestions(quiz.id, token);
      setEditingQuizId(quiz.id);
      setTitle(quiz.title);
      setQuestionCount(qs.length);
      // Parse startsAt and expiresAt
      const sAt = quiz.startsAt ? quiz.startsAt.split("T") : ["", ""];
      const eAt = quiz.expiresAt ? quiz.expiresAt.split("T") : ["", ""];
      setStartDate(sAt[0] || "");
      setStartTime(sAt[1] ? sAt[1].substring(0, 5) : "");
      setEndDate(eAt[0] || "");
      setEndTime(eAt[1] ? eAt[1].substring(0, 5) : "");
      setIsVisible(quiz.visible);
      setQuestions(qs.map((q) => ({
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctOption: q.correctOption,
        explanation: q.explanation || ""
      })));
      setFormStep(1);
      setShowCreateForm(true);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load quiz", "error");
    }
  };

  const toggleExpandQuestions = async (quizId) => {
    if (expandedQuizId === quizId) {
      setExpandedQuizId(null);
      setExpandedQuestions([]);
      return;
    }
    setLoadingQuestions(true);
    try {
      const qs = await apiClient.getAdminQuizQuestions(quizId, token);
      setExpandedQuestions(qs);
      setExpandedQuizId(quizId);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load questions", "error");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleToggle = async (quizId) => {
    try {
      await apiClient.toggleQuizVisibility(quizId, token);
      await loadQuizzes();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Toggle failed", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmQuiz) return;
    try {
      await apiClient.deleteQuiz(deleteConfirmQuiz.id, token);
      showToast("Quiz deleted successfully!", "success");
      setDeleteConfirmQuiz(null);
      await loadQuizzes();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Delete failed", "error");
    }
  };

  const optionLabels = ["A", "B", "C", "D"];

  const filteredQuizzes = quizzes.filter(
    (q) => q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 pt-0 relative">
      <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Admin Panel</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Quiz Management</h1>
        </div>
        <div className="flex flex-1 justify-center max-w-md mx-auto">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-4 flex items-center text-amber-500/70">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-amber-400 bg-slate-900 py-2 pl-11 text-sm text-white outline-none ring-amber-300 transition focus:border-amber-400 focus:ring"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => void loadQuizzes()}
            className="rounded-full border-2 border-amber-400 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
          >
            Refresh
          </button>
          <button
            onClick={() => {
              if (showCreateForm) resetForm();
              setShowCreateForm((p) => !p);
            }}
            className="rounded-full border-4 border-amber-700/80 bg-slate-800 px-6 py-2.5 text-sm font-bold text-amber-300 transition hover:bg-slate-700"
          >
            {showCreateForm ? "Cancel" : "+ New Quiz"}
          </button>
        </div>
      </div>

      <section>
        {showCreateForm && (
          <div className="mb-12 space-y-4 rounded-[40px] border-2 border-amber-400 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-amber-200">
                {formStep === 1 ? `Step 1: ${editingQuizId ? "Edit" : "Quiz"} Details` : "Step 2: Enter Questions"}
              </h3>
              <div className="flex gap-2">
                <div className={`h-2 w-8 rounded-full ${formStep >= 1 ? 'bg-amber-400' : 'bg-slate-700'}`} />
                <div className={`h-2 w-8 rounded-full ${formStep >= 2 ? 'bg-amber-400' : 'bg-slate-700'}`} />
              </div>
            </div>

            {formStep === 1 ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    Quiz Title
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="mt-2 w-full rounded-xl border-2 border-amber-400 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none ring-amber-300 transition focus:ring"
                      placeholder="e.g. Indian Heritage Week 1 Quiz"
                    />
                  </label>
                </div>
                
                <div className="md:col-span-1">
                  <CustomSelect
                    label="Number of Questions"
                    value={questionCount}
                    onChange={setQuestionCount}
                    options={[
                      { label: "5 Questions", value: 5 },
                      { label: "10 Questions", value: 10 },
                      { label: "15 Questions", value: 15 },
                      { label: "20 Questions", value: 20 }
                    ]}
                  />
                </div>

                <div className="md:col-span-1">
                  <CustomSelect
                    label="Initial Visibility"
                    value={isVisible}
                    onChange={setIsVisible}
                    options={[
                      { label: "Hidden by Default", value: false },
                      { label: "Visible Immediately", value: true }
                    ]}
                  />
                </div>

                <div className="md:col-span-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <CustomDatePicker
                    label="Start Date"
                    value={startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={setStartDate}
                  />
                  <CustomTimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={setStartTime}
                  />
                  <CustomDatePicker
                    label="End Date"
                    value={endDate}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    onChange={setEndDate}
                  />
                  <CustomTimePicker
                    label="End Time"
                    value={endTime}
                    onChange={setEndTime}
                  />
                </div>

                <div className="md:col-span-2 pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={goToStep2}
                    className="rounded-full bg-amber-400 px-10 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
                  >
                    Next: Enter Questions →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="space-y-6">
                <div className="pr-2 space-y-6">
                  {questions.map((q, i) => (
                    <div key={i} className="rounded-xl border-2 border-amber-400/50 bg-white/5 p-5">
                      <p className="mb-4 text-sm font-bold text-amber-300 tracking-widest uppercase flex items-center justify-between">
                        <span>Question {i + 1}</span>
                        <span className="text-[10px] bg-amber-400/10 px-2 py-0.5 rounded text-amber-400">Required</span>
                      </p>
                      <input
                        type="text"
                        value={q.questionText}
                        onChange={(e) => updateQuestion(i, "questionText", e.target.value)}
                        required
                        className="mb-3 w-full rounded-lg border-2 border-amber-400/50 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none ring-amber-300 transition focus:ring"
                        placeholder="What is the historical significance of..."
                      />
                      <div className="grid gap-3 sm:grid-cols-2">
                        {["optionA", "optionB", "optionC", "optionD"].map((key, idx) => (
                          <input
                            key={key}
                            type="text"
                            value={q[key]}
                            onChange={(e) => updateQuestion(i, key, e.target.value)}
                            required
                            className="rounded-lg border-2 border-amber-400/50 bg-slate-900/60 px-4 py-2 text-sm text-white outline-none ring-amber-300 transition focus:ring"
                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                          />
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex-1 min-w-[200px]">
                          <CustomSelect
                            label="Correct Option"
                            value={q.correctOption}
                            onChange={(val) => updateQuestion(i, "correctOption", val)}
                            options={[
                              { label: "Option A", value: 0 },
                              { label: "Option B", value: 1 },
                              { label: "Option C", value: 2 },
                              { label: "Option D", value: 3 }
                            ]}
                          />
                        </div>
                        <div className="flex-[2] min-w-[200px]">
                          <label className="block text-sm font-semibold text-slate-200">
                            Explanation (Optional)
                            <input
                              type="text"
                              value={q.explanation}
                              onChange={(e) => updateQuestion(i, "explanation", e.target.value)}
                              className="mt-2 w-full rounded-xl border-2 border-amber-400/50 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none ring-amber-300 transition focus:ring"
                              placeholder="Why is this answer correct?"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-amber-400/30">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="rounded-full border-2 border-amber-400 px-8 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-12 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:from-amber-300 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Saving Quiz..." : editingQuizId ? "Update Quiz" : "Create Quiz"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-24 animate-pulse rounded-2xl border-2 border-amber-400 bg-white/5" />
            ))}
          </div>
        ) : showCreateForm ? null : filteredQuizzes.length === 0 ? (
          <div className="w-full rounded-3xl border-2 border-amber-400 bg-slate-900/40 py-6 px-12 backdrop-blur-sm shadow-2xl">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-400/10 text-6xl shadow-inner shadow-amber-400/20">
                📝
              </div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">No Quizzes Available</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 font-medium">
                Your quiz library is currently empty. Start by creating a new quiz to engage your cultural enthusiasts!
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="mt-8 rounded-full border-2 border-amber-400 bg-amber-400/5 px-8 py-3 text-sm font-bold text-amber-300 transition hover:bg-amber-400 hover:text-slate-900"
              >
                Create First Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex flex-col rounded-xl border-2 border-amber-400 bg-slate-900 p-5 shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{quiz.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><span className="text-amber-400">❓</span> {quiz.questionCount} Qs</span>
                      <span className="flex items-center gap-1"><span className="text-amber-400">👥</span> {quiz.attemptCount} Done</span>
                      <span className="flex items-center gap-1"><span className="text-amber-400">📅</span> {new Date(quiz.startsAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                      <span className="flex items-center gap-1"><span className="text-amber-400">⏳</span> {new Date(quiz.expiresAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      quiz.expired
                        ? "bg-red-500/20 text-red-300 border-red-500/30"
                        : quiz.visible
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                    }`}
                  >
                    {quiz.expired ? "Expired" : quiz.visible ? "Visible" : "Hidden"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between border-t border-amber-400/30 pt-3 mt-4">
                  <div className="flex w-1/3 justify-start">
                    <button
                      onClick={() => void openEditQuiz(quiz)}
                      className="rounded-full border-2 border-amber-400 px-5 py-1.5 text-xs font-bold text-amber-100 transition hover:bg-amber-400/20"
                    >
                      ✏️ Edit Quiz
                    </button>
                  </div>
                  
                  <div className="flex w-1/3 justify-center">
                    {!quiz.expired && (
                      <button
                        onClick={() => void handleToggle(quiz.id)}
                        className={`rounded-full border-2 px-5 py-1.5 text-xs font-bold transition ${
                          quiz.visible
                            ? "border-amber-300/50 text-amber-100 hover:bg-amber-300/20"
                            : "bg-emerald-500/40 text-emerald-100 border-emerald-500/50 hover:bg-emerald-500/60"
                        }`}
                      >
                        {quiz.visible ? "Hide from Users" : "Make Visible"}
                      </button>
                    )}
                  </div>

                  <div className="flex w-1/3 justify-end">
                    <button
                      onClick={() => setDeleteConfirmQuiz(quiz)}
                      className="rounded-full border-2 border-red-500/40 px-5 py-1.5 text-xs font-bold text-red-100 transition hover:bg-red-500/20"
                    >
                      Delete Quiz
                    </button>
                  </div>
                </div>

                {/* Questions dropdown toggle */}
                <button
                  type="button"
                  onClick={() => void toggleExpandQuestions(quiz.id)}
                  className="mt-3 flex items-center justify-between w-full rounded-xl border border-amber-400/20 bg-white/5 px-4 py-2.5 text-left transition hover:bg-white/10"
                >
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    {loadingQuestions && expandedQuizId !== quiz.id ? "Loading..." : `View Questions (${quiz.questionCount})`}
                  </span>
                  <svg
                    className={`h-4 w-4 text-amber-400 transition-transform duration-300 ${expandedQuizId === quiz.id ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded questions list */}
                {expandedQuizId === quiz.id && (
                  <div className="mt-2 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {expandedQuestions.map((q, idx) => (
                      <div key={q.id} className="rounded-xl border border-amber-400/20 bg-white/5 p-4">
                        <p className="text-sm font-bold text-white mb-2">
                          <span className="text-amber-400 mr-2">Q{idx + 1}.</span>
                          {q.questionText}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {["optionA", "optionB", "optionC", "optionD"].map((key, oi) => (
                            <div
                              key={key}
                              className={`rounded-lg px-3 py-1.5 text-xs ${
                                q.correctOption === oi
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                                  : "bg-white/5 text-slate-400 border border-white/10"
                              }`}
                            >
                              <span className="font-bold mr-1">{optionLabels[oi]}.</span> {q[key]}
                              {q.correctOption === oi && <span className="ml-1">✓</span>}
                            </div>
                          ))}
                        </div>
                        {q.explanation && (
                          <p className="mt-2 text-[11px] text-slate-500 italic">
                            💡 {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {deleteConfirmQuiz && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 px-4 overflow-hidden">
          <div className="w-full max-w-sm rounded-3xl border-2 border-amber-400 bg-slate-900 p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-3xl">
              🗑️
            </div>
            <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Are you sure you want to delete quiz <span className="font-bold text-white">"{deleteConfirmQuiz.title}"</span>? 
              <br/>All scores and attempts will be removed.
            </p>
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={() => setDeleteConfirmQuiz(null)}
                className="flex-1 rounded-full border-2 border-amber-400 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
