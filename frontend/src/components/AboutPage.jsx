import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
function AboutPage({ isLoggedIn }) {
  return /* @__PURE__ */ jsx("main", { className: "px-5 py-12 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-[min(1100px,100%)] space-y-10", children: [
    /* @__PURE__ */ jsxs("section", { className: "rounded-3xl border-2 border-amber-400 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.18em] text-amber-300", children: "About" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 text-3xl font-bold text-white sm:text-4xl", children: "About Indian Heritage Explorer" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-base leading-relaxed text-slate-200 sm:text-lg", children: "Indian Heritage Explorer is a production-ready learning platform that introduces users to India's famous monuments, historical places, and cultural legacy." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-relaxed text-slate-200 sm:text-lg", children: "The website combines rich visuals, role-based authentication, and structured place information so learners can understand history, plan visits, and explore heritage with confidence." })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-6 text-2xl font-bold text-white", children: "Platform Features" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: [
        {
          icon: "\u{1F3DB}\uFE0F",
          title: "Heritage Database",
          desc: "Curated collection of India's most significant monuments with verified details, photos, and historical context."
        },
        {
          icon: "\u{1F510}",
          title: "Role-Based Access",
          desc: "Secure JWT authentication with personalized roles \u2014 Explorer for discovery and Culture Expert for deeper insights."
        },
        {
          icon: "\u{1F5FA}\uFE0F",
          title: "Live Map Integration",
          desc: "View each place on Google Maps with exact location, directions, and nearby transport options."
        },
        {
          icon: "\u{1F9E0}",
          title: "Interactive Quizzes",
          desc: "Weekly quizzes with scoring, leaderboards, and 7-day expiry cycle managed by admins."
        }
      ].map((feature) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-2xl border-2 border-amber-400 bg-white/5 p-5 shadow-lg transition hover:border-amber-400 hover:bg-amber-400/5",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl", children: feature.icon }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 text-base font-bold text-white", children: feature.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-slate-300", children: feature.desc })
          ]
        },
        feature.title
      )) })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-6 text-2xl font-bold text-white", children: "How It Works" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [
        {
          step: "01",
          title: "Create an Account",
          desc: "Sign up with your name, email, and password. Choose your role to personalize your experience."
        },
        {
          step: "02",
          title: "Explore Heritage Places",
          desc: "Browse India's monuments with images, locations, timings, entry fees, and interactive maps."
        },
        {
          step: "03",
          title: "Take Quizzes & Learn",
          desc: "Participate in weekly heritage quizzes, earn scores, and climb the leaderboard."
        }
      ].map((item) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-2xl border-2 border-amber-400 bg-white/5 p-5 shadow-lg",
          children: [
            /* @__PURE__ */ jsx("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/15 text-sm font-bold text-amber-300", children: item.step }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 text-lg font-bold text-white", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-slate-300", children: item.desc })
          ]
        },
        item.step
      )) })
    ] }),
    !isLoggedIn && /* @__PURE__ */ jsxs("section", { className: "rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-amber-400/10 to-orange-500/5 p-8 text-center shadow-2xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Start Your Heritage Journey" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-300", children: "Join thousands of learners exploring India's cultural legacy." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-3", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/signup",
            className: "rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300",
            children: "Sign Up Free"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/explore",
            className: "rounded-full border-2 border-amber-400 bg-white/10 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/20",
            children: "Explore Now"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  AboutPage
};
