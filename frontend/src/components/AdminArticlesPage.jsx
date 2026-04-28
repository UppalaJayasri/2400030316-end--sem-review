import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useToast } from "./Toast";

export function AdminArticlesPage({ user, token }) {
  const { showToast } = useToast();
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmArticle, setDeleteConfirmArticle] = useState(null);

  const loadArticles = async () => {
    setIsLoadingArticles(true);
    try {
      const data = await apiClient.getAllArticles(token);
      setArticles(data);
    } catch {
      setArticles([]);
    } finally {
      setIsLoadingArticles(false);
    }
  };

  useEffect(() => {
    if (deleteConfirmArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deleteConfirmArticle]);

  useEffect(() => {
    void loadArticles();
  }, [token]);

  if (user.role !== "ADMIN") {
    return (
      <main className="px-5 py-10 sm:px-8 lg:px-12">
        <section className="mx-auto w-[min(900px,100%)] rounded-3xl border-2 border-red-400/30 bg-red-500/10 p-8 text-red-100">
          <h1 className="text-2xl font-bold">Access Restricted</h1>
          <p className="mt-3 text-sm leading-relaxed">This page is only for admin users.</p>
        </section>
      </main>
    );
  }

  const handleArticleStatus = async (articleId, status) => {
    try {
      await apiClient.updateArticleStatus(articleId, status, token);
      showToast(`Article ${status.toLowerCase()} successfully!`, "success");
      await loadArticles();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update status", "error");
    }
  };

  const handleDeleteArticle = async () => {
    if (!deleteConfirmArticle) return;
    try {
      await apiClient.deleteArticle(deleteConfirmArticle.id, token);
      showToast(`Article "${deleteConfirmArticle.title}" deleted successfully`, "success");
      setDeleteConfirmArticle(null);
      await loadArticles();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete article", "error");
    }
  };

  return (
    <main className="px-5 py-10 sm:px-8 lg:px-12 pb-20 relative">
      <div className="mx-auto w-[min(1300px,100%)]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Admin Panel</p>
            <h1 className="mt-1 text-3xl font-bold text-white">Articles Review</h1>
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-amber-400 bg-slate-900 py-2 pl-11 text-sm text-white outline-none ring-amber-300 transition focus:border-amber-400 focus:ring"
              />
            </div>
          </div>
          <button
            onClick={() => void loadArticles()}
            className="rounded-full border-2 border-amber-400 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
          >
            Refresh List
          </button>
        </div>

        <section className="rounded-3xl py-5 shadow-xl">
          {isLoadingArticles ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-32 animate-pulse rounded-2xl border-2 border-amber-400 bg-white/5" />
              ))}
            </div>
          ) : articles.length === 0 ? (
          <div className="w-full rounded-3xl border-2 border-amber-400 bg-slate-900/40 py-6 px-12 backdrop-blur-sm shadow-2xl">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-400/10 text-6xl shadow-inner shadow-amber-400/20">
                📰
              </div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">No Articles to Review</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 font-medium">
                Everything is up to date! There are no articles waiting for your approval at the moment.
              </p>
            </div>
          </div>
          ) : (
            <div className="flex flex-col gap-3">
              {articles
                .filter((a) => {
                  const authorName = a.authorName?.trim() || "Unknown Author";
                  return (
                    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    authorName.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                })
                .map((article) => (
                  <article
                    key={article.id}
                    className="rounded-xl border-2 border-amber-400 bg-slate-900 p-5 shadow-lg transition-all"
                  >
                    <div className="mb-4">
                      <div className="mb-2 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{article.title}</h3>
                          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-amber-200">
                            By {article.authorName?.trim() || "Unknown Author"}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold tracking-widest uppercase ${
                            article.status === "APPROVED"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : article.status === "REJECTED"
                              ? "bg-red-500/20 text-red-300 border-red-500/30"
                              : "bg-amber-500/20 text-amber-300 border-amber-500"
                          }`}
                        >
                          {article.status}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-200">{article.content}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-amber-400 pt-3 mt-3">
                      <span className="text-sm font-medium italic text-slate-400">
                        Submitted on: {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        {article.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => void handleArticleStatus(article.id, "APPROVED")}
                              className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-bold text-slate-900 transition hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => void handleArticleStatus(article.id, "REJECTED")}
                              className="rounded-full border-2 border-red-500/50 px-6 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500/20 shadow-lg"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setDeleteConfirmArticle(article)}
                          className="rounded-full border-2 border-red-500/50 px-4 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
                          title="Delete article"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </section>
      </div>

      {deleteConfirmArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 px-4 overflow-hidden">
          <div className="w-full max-w-sm rounded-3xl border-2 border-amber-400 bg-slate-900 p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-3xl">
              🗑️
            </div>
            <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Are you sure you want to delete article <span className="font-bold text-white">"{deleteConfirmArticle.title}"</span>? 
              <br/>This action cannot be undone.
            </p>
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={() => setDeleteConfirmArticle(null)}
                className="flex-1 rounded-full border-2 border-amber-400 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteArticle}
                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
