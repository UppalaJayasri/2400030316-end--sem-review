import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useToast } from "./Toast";
function ContributePage({ token }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("contribute");
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadMyArticles = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.getMyArticles(token);
      setArticles(data);
    } catch {
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (activeTab === "my-content" || activeTab === "achievements") {
      void loadMyArticles();
    }
  }, [activeTab, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiClient.submitArticle(form, token);
      showToast("Article submitted successfully for review!", "success");
      setForm({ title: "", category: "", content: "" });
      setActiveTab("my-content");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to submit article", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const approvedCount = articles.filter((a) => a.status === "APPROVED").length;
  return /* @__PURE__ */ jsx("main", { className: "px-5 py-10 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-[min(1100px,100%)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-5 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3 shadow-xl text-slate-900", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Explorer Portal" }),
      /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[10px] font-medium opacity-90 leading-tight", children: "Share your knowledge and passion for Indian heritage" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsx(TabButton, { active: activeTab === "contribute", onClick: () => setActiveTab("contribute"), icon: "\u270D\uFE0F", children: "Contribute" }),
      /* @__PURE__ */ jsx(TabButton, { active: activeTab === "my-content", onClick: () => setActiveTab("my-content"), icon: "\u{1F4DA}", children: "My Content" }),
      /* @__PURE__ */ jsx(TabButton, { active: activeTab === "achievements", onClick: () => setActiveTab("achievements"), icon: "\u{1F3C6}", children: "Achievements" })
    ] }),
    activeTab === "contribute" && /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("section", { className: "rounded-3xl border-2 border-amber-400 bg-white/5 p-6 shadow-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl font-bold text-white", children: "Submit an Article" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
            "Article Title",
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: form.title,
                onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
                className: "mt-2 w-full rounded-xl border-2 border-amber-400 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none ring-amber-300 transition focus:ring",
                placeholder: "Enter article title"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
            "Category",
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: form.category,
                onChange: (e) => setForm((p) => ({ ...p, category: e.target.value })),
                className: "mt-2 w-full rounded-xl border-2 border-amber-400 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none ring-amber-300 transition focus:ring",
                placeholder: "e.g., Architecture, History, Culture"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
            "Content",
            /* @__PURE__ */ jsx(
              "textarea",
              {
                required: true,
                rows: 6,
                value: form.content,
                onChange: (e) => setForm((p) => ({ ...p, content: e.target.value })),
                className: "mt-2 w-full rounded-xl border-2 border-amber-400 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none ring-amber-300 transition focus:ring",
                placeholder: "Write your article content here..."
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: isSubmitting,
              className: "w-full rounded-full bg-amber-400 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 disabled:opacity-70",
              children: isSubmitting ? "Submitting..." : "Submit Article"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "flex flex-col justify-between rounded-3xl border-2 border-amber-400 bg-amber-500/10 p-6 shadow-lg", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-bold text-amber-300", children: [
            /* @__PURE__ */ jsx("span", { children: "\u{1F4D6}" }),
            " Contribution Guidelines"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-amber-100/80", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "\u2713" }),
              "Ensure all information is accurate and well-researched"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "\u2713" }),
              "Include historical facts, architectural details, and cultural significance"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "\u2713" }),
              "Add personal insights and unique perspectives from your visits"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "\u2713" }),
              "Maintain respectful and educational tone throughout"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "\u2713" }),
              "All submissions are reviewed by admins before publication"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl bg-amber-500/20 p-4 border border-amber-400", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-amber-300 mb-1", children: "Quick Tip \u{1F4A1}" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-amber-100/80 leading-relaxed", children: "Articles with clear, descriptive titles and well-structured paragraphs are typically approved 3x faster by our editorial team. Focus on quality over quantity!" })
        ] })
      ] })
    ] }),
    activeTab === "my-content" && /* @__PURE__ */ jsxs("section", { className: "rounded-3xl border-2 border-amber-400 bg-white/5 p-6 shadow-xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-6 text-xl font-bold text-white", children: "My Submitted Articles" }),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: [1, 2].map((n) => /* @__PURE__ */ jsx("div", { className: "h-32 animate-pulse rounded-2xl border-2 border-amber-400 bg-white/5" }, n)) }) : articles.length === 0 ? (
        <div className="w-full rounded-3xl border-2 border-amber-400 bg-slate-900/40 py-6 px-12 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-400/10 text-6xl shadow-inner shadow-amber-400/20">
              ✍️
            </div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">No Submissions Yet</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400 font-medium">
              Your contribution history is empty. Share your first heritage story to start building your profile!
            </p>
            <button
              onClick={() => setActiveTab("contribute")}
              className="mt-6 rounded-full border-2 border-amber-400 bg-amber-400/5 px-8 py-2.5 text-sm font-bold text-amber-300 transition hover:bg-amber-400 hover:text-slate-900"
            >
              Start Contributing
            </button>
          </div>
        </div>
      ) : /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-5", children: articles.map((article) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border-2 border-amber-400 bg-slate-900/60 p-6 hover:border-amber-400 shadow-xl transition-all", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white", children: article.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold text-amber-200 uppercase tracking-widest", children: article.category })
          ] }),
          /* @__PURE__ */ jsx("span", { className: `rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${article.status === "APPROVED" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : article.status === "REJECTED" ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500"}`, children: article.status })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-slate-200", children: article.content }),
        /* @__PURE__ */ jsxs("p", { className: "mt-5 text-xs font-medium text-slate-500 border-t border-amber-400 pt-4", children: [
          "Submitted on: ",
          new Date(article.createdAt).toLocaleDateString()
        ] })
      ] }, article.id)) })
    ] }),
    activeTab === "achievements" && /* @__PURE__ */ jsxs("section", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-6 shadow-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-purple-300", children: "Rank" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-2xl font-bold text-white", children: approvedCount >= 5 ? "Gold Contributor" : approvedCount >= 2 ? "Silver Contributor" : "Bronze Contributor" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-6 shadow-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-blue-300", children: "Contributions" }),
        /* @__PURE__ */ jsxs("h3", { className: "mt-2 text-4xl font-bold text-white", children: [
          approvedCount,
          " ",
          /* @__PURE__ */ jsxs("span", { className: "text-lg text-slate-400", children: [
            "/ ",
            articles.length
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-6 shadow-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-emerald-300", children: "Status" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-2xl font-bold text-white", children: "Active Explorer" })
      ] })
    ] })
  ] }) });
}
function TabButton({ active, onClick, icon, children }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: `flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${active ? "bg-amber-400 text-slate-900" : "border-2 border-amber-400 text-slate-200 hover:border-amber-400 hover:bg-white/5"}`,
      children: [
        /* @__PURE__ */ jsx("span", { children: icon }),
        children
      ]
    }
  );
}
export {
  ContributePage
};
