import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
const fallbackPlaces = [
  {
    id: 1,
    name: "Taj Mahal",
    city: "Agra",
    state: "Uttar Pradesh",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1800&q=80",
    description: "A symbol of eternal love, this ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra was commissioned in 1632 by the Mughal emperor Shah Jahan."
  },
  {
    id: 2,
    name: "Hawa Mahal",
    city: "Jaipur",
    state: "Rajasthan",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=80",
    description: "The 'Palace of Winds' is a palace in Jaipur, India. Built from red and pink sandstone, it is on the edge of the City Palace."
  },
  {
    id: 3,
    name: "Golden Temple",
    city: "Amritsar",
    state: "Punjab",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1800&q=80",
    description: "The preeminent spiritual site of Sikhism, located in the city of Amritsar, Punjab, India."
  },
  {
    id: 4,
    name: "Mysore Palace",
    city: "Mysuru",
    state: "Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=80",
    description: "A historical palace and a royal residence at Mysore in the Indian State of Karnataka. It is the official residence of the Wadiyar dynasty."
  },
  {
    id: 5,
    name: "Gateway of India",
    city: "Mumbai",
    state: "Maharashtra",
    imageUrl: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1800&q=80",
    description: "An arch-monument built during the 20th century in Bombay, India. The monument was erected to commemorate the landing of King George V and Queen Mary."
  }
];
const highlights = [
  {
    icon: "\u{1F3DB}\uFE0F",
    title: "Ancient Monuments",
    desc: "Explore UNESCO World Heritage Sites and centuries-old architectural marvels across India.",
    stat: "40+",
    statLabel: "Heritage Sites"
  },
  {
    icon: "\u{1F5FA}\uFE0F",
    title: "Interactive Maps",
    desc: "Find each destination on a real map with location, transport, and visiting details.",
    stat: "28",
    statLabel: "States Covered"
  },
  {
    icon: "\u{1F9E0}",
    title: "Heritage Quizzes",
    desc: "Test your knowledge with weekly quizzes and compete on the leaderboard.",
    stat: "10",
    statLabel: "Questions / Quiz"
  },
  {
    icon: "\u{1F510}",
    title: "Secure Access",
    desc: "Role-based authentication with JWT ensures safe and personalized user experiences.",
    stat: "4",
    statLabel: "User Roles"
  }
];
const showcasePlaces = [
  {
    name: "Red Fort",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
    era: "Mughal Era \xB7 1648"
  },
  {
    name: "Taj Mahal",
    location: "Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    era: "Mughal Era \xB7 1632"
  },
  {
    name: "Hawa Mahal",
    location: "Jaipur",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    era: "Rajput Era \xB7 1799"
  },
  {
    name: "Golden Temple",
    location: "Amritsar",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop",
    era: "Sikh Heritage \xB7 1604"
  }
];
function HomePage({ places, isLoggedIn }) {
  const gallery = useMemo(
    () => places.length > 0 ? places.slice(0, 15) : fallbackPlaces,
    [places]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % gallery.length);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [gallery.length]);
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[calc(100vh-5rem)] overflow-hidden", children: [
      gallery.map((place, index) => /* @__PURE__ */ jsx(
        "img",
        {
          src: place.imageUrl,
          alt: place.name,
          className: `absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`
        },
        place.id
      )),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-slate-950/65" }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 flex min-h-[calc(100vh-5rem)] items-center px-5 pb-14 pt-20 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl space-y-6", children: [
        /* @__PURE__ */ jsx("p", { className: "inline-flex rounded-full border border-amber-400 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-200", children: "Indian Heritage Explorer" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl", children: "Explore India's iconic monuments and timeless cultural heritage" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-base text-slate-200 sm:text-lg", children: "Discover India's most celebrated landmarks \u2014 from ancient temples to grand palaces. Immerse yourself in centuries of art, architecture, and culture." }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-amber-200 sm:text-base", children: [
          "Currently showing: ",
          gallery[activeIndex]?.name,
          " - ",
          gallery[activeIndex]?.city
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/places",
              className: "rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300",
              children: "Explore Gallery"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/about",
              className: "rounded-full border border-amber-400 bg-white/10 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/20",
              children: "About Website"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2 pt-2", children: gallery.map((place, index) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveIndex(index),
            "aria-label": `Show ${place.name}`,
            className: `h-2 rounded-full transition-all ${index === activeIndex ? "w-10 bg-amber-300" : "w-2 bg-white/60"}`
          },
          place.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "border-t border-amber-400 bg-slate-950 px-5 py-16 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-[min(1200px,100%)]", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-amber-300", children: "Why Choose Us" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 text-3xl font-bold text-white sm:text-4xl", children: "Everything You Need to Explore India" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-slate-300", children: "A comprehensive platform to discover, learn, and engage with India's incredible cultural heritage." }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: highlights.map((item) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "group rounded-3xl border-2 border-amber-400 bg-white/5 p-6 shadow-xl transition",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl", children: item.icon }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-bold text-white", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-slate-300", children: item.desc }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 border-t border-amber-400 pt-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-amber-300", children: item.stat }),
              /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs font-semibold text-slate-400", children: item.statLabel })
            ] })
          ]
        },
        item.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-t border-amber-400 bg-gradient-to-b from-slate-950 to-slate-900 px-5 py-16 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-[min(1200px,100%)]", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-amber-300", children: "Must Visit" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 text-3xl font-bold text-white sm:text-4xl", children: "Iconic Destinations of India" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-slate-300", children: "From the grandeur of Mughal architecture to the ancient Dravidian temples \u2014 each site tells a unique story." }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: showcasePlaces.map((place) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/places",
          className: "group relative overflow-hidden rounded-3xl border-2 border-amber-400 shadow-xl transition",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: place.image,
                alt: place.name,
                className: "h-64 w-full object-cover transition-transform duration-500",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-amber-300", children: place.era }),
              /* @__PURE__ */ jsx("h3", { className: "mt-1 text-lg font-bold text-white", children: place.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-300", children: place.location })
            ] })
          ]
        },
        place.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-t border-amber-400 bg-slate-950 px-5 py-12 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid w-[min(1200px,100%)] gap-6 sm:grid-cols-2 lg:grid-cols-4", children: [
      { value: "2000+", label: "Years of History", icon: "\u{1F4DC}" },
      { value: "36+", label: "UNESCO Sites in India", icon: "\u{1F30D}" },
      { value: "29", label: "States & 8 UTs", icon: "\u{1F5FA}\uFE0F" },
      { value: "\u221E", label: "Stories to Discover", icon: "\u2728" }
    ].map((stat) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center gap-4 rounded-2xl border-2 border-amber-400 bg-white/5 px-5 py-6 shadow-md transition",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-3xl", children: stat.icon }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-amber-300", children: stat.value }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-400", children: stat.label })
          ] })
        ]
      },
      stat.label
    )) }) }),
    !isLoggedIn && /* @__PURE__ */ jsx("section", { className: "border-t border-amber-400 bg-gradient-to-b from-slate-900 to-slate-950 px-5 py-20 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-[min(800px,100%)] text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white sm:text-4xl", children: "Ready to Explore India's Heritage?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-slate-300", children: "Sign up to unlock full details, participate in quizzes, and dive deep into India's incredible cultural legacy." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/signup",
            className: "rounded-full bg-amber-400 px-8 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300",
            children: "Create Free Account"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/places",
            className: "rounded-full border-2 border-amber-400 bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/20",
            children: "Browse Gallery"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  HomePage
};
