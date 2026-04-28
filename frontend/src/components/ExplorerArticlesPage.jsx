import { useEffect, useMemo, useState } from "react";
import { apiClient } from "../api/client";
import { useToast } from "./Toast";

export function ExplorerArticlesPage({ token }) {
  const { showToast } = useToast();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadApprovedArticles = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.getApprovedArticles(token);
      setArticles(data);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load articles", "error");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadApprovedArticles();
  }, [token]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return articles;
    }

    return articles.filter((article) => {
      const authorName = article.authorName?.trim() || "Unknown Author";
      return (
        article.title.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        authorName.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      );
    });
  }, [articles, searchQuery]);

  return (
    <main className="px-5 py-10 sm:px-8 lg:px-12 pb-20">
      <div className="mx-auto w-[min(1200px,100%)]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Explorer Hub</p>
            <h1 className="mt-1 text-3xl font-bold text-white">Articles</h1>
            <p className="mt-2 text-sm text-slate-300">
              Read contributions from Culture Experts.
            </p>
          </div>
          <div className="flex flex-1 justify-center max-w-md mx-auto">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-4 flex items-center text-amber-500/70">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
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
            onClick={() => void loadApprovedArticles()}
            className="rounded-full border-2 border-amber-400 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
          >
            Refresh List
          </button>
        </div>

        <section className="rounded-3xl py-5 shadow-xl">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-32 animate-pulse rounded-2xl border-2 border-amber-400 bg-white/5" />
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="w-full rounded-3xl border-2 border-amber-400 bg-slate-900/40 py-6 px-12 backdrop-blur-sm shadow-2xl">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-400/10 text-6xl shadow-inner shadow-amber-400/20">
                  📰
                </div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">No Articles Yet</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 font-medium">
                  Contributions from Culture Experts will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-xl border-2 border-amber-400 bg-slate-900 p-5 shadow-lg transition-all"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{article.title}</h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-amber-200">
                        {article.category}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        By {article.authorName?.trim() || "Unknown Author"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-200">{article.content}</p>
                  <p className="mt-4 border-t border-amber-400 pt-3 text-xs font-medium text-slate-500">
                    Published on: {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
