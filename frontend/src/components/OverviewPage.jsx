import { jsx, jsxs } from "react/jsx-runtime";
function OverviewPage({ user }) {
  const roleDisplay = user.role === "CULTURAL_ENTHUSIAST" ? "Cultural Enthusiast" : user.role === "EXPLORER" ? "Explorer" : "Explorer";
  return /* @__PURE__ */ jsx("main", { className: "px-5 py-10 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-[min(900px,100%)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-3xl border-2 border-amber-400 bg-white/5 py-4 px-8 text-center shadow-2xl backdrop-blur", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-xl font-bold text-slate-900 shadow-lg shadow-amber-500/40", children: "\u{1F3DB}\uFE0F" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold text-white", children: [
        "Welcome, ",
        user.name,
        "!"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-200", children: "Explore 15 magnificent heritage sites across India" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 grid grid-cols-3 divide-x-2 divide-amber-400 rounded-3xl border-2 border-amber-400 bg-white/5 p-6 shadow-xl backdrop-blur", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-white", children: "15" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold text-slate-300", children: "Gallery Items" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-white", children: "8" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold text-slate-300", children: "UNESCO Sites" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-white", children: "12" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold text-slate-300", children: "States Covered" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-400 bg-slate-900/50 p-8 text-center shadow-lg transition hover:bg-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 text-2xl", children: "\u{1F54C}" }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white", children: "Historic Monuments" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-relaxed text-slate-200", children: "Explore magnificent forts, palaces, and temples from ancient India" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-400 bg-slate-900/50 p-8 text-center shadow-lg transition hover:bg-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 text-2xl", children: "\u{1F5FA}\uFE0F" }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white", children: "Interactive Map" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-relaxed text-slate-200", children: "Navigate through India's heritage sites on our interactive map" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-400 bg-slate-900/50 p-8 text-center shadow-lg transition hover:bg-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 text-2xl", children: "\u{1F4DA}" }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white", children: "Rich History" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-relaxed text-slate-200", children: "Learn fascinating stories and historical facts about each site" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-500 bg-amber-500/15 p-7 text-center shadow-xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold tracking-widest text-amber-300 uppercase", children: "Featured Heritage Sites" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-6 text-xs font-bold text-white", children: [
        /* @__PURE__ */ jsx("span", { children: "\u{1F3DB}\uFE0F Taj Mahal" }),
        /* @__PURE__ */ jsx("span", { children: "\u{1F54C} Red Fort" }),
        /* @__PURE__ */ jsx("span", { children: "\u26E9\uFE0F Golden Temple" }),
        /* @__PURE__ */ jsx("span", { children: "\u{1F3DB}\uFE0F Mysore Palace" })
      ] })
    ] })
  ] }) });
}
export {
  OverviewPage
};
