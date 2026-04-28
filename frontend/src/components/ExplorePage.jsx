import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";
import { useToast } from "./Toast";
function ExplorePage({ places, token, isLoading, isAdmin }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const overlayRef = useRef(null);
  const openPlaceDetails = async (placeId) => {
    if (!token) {
      navigate("/login", { replace: false, state: { from: "/explore" } });
      return;
    }
    setActiveId(placeId);
    try {
      const details = await apiClient.getPlaceDetails(placeId, token);
      setSelectedPlace(details);
    } catch (requestError) {
      showToast(
        requestError instanceof Error ? requestError.message : "Unable to load place details",
        "error"
      );
    } finally {
      setActiveId(null);
    }
  };
  const mapsUrl = selectedPlace ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${selectedPlace.name}, ${selectedPlace.city}, ${selectedPlace.state}, India`
  )}` : "";
  return /* @__PURE__ */ jsxs("main", { className: "px-5 py-10 sm:px-8 lg:px-12 pb-20", children: [
    /* @__PURE__ */ jsxs("section", { className: "mx-auto w-[min(1200px,100%)] pb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-7 flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-amber-300", children: "Discover India" }),
          /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-bold text-white sm:text-4xl", children: "Indian Heritage Gallery" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-xs leading-relaxed text-slate-300", children: "Journey through the architectural wonders and historical treasures that define the rich legacy of Indian civilization." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute inset-y-0 left-4 flex items-center text-amber-500/70", children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search places...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full min-w-[200px] rounded-full border border-amber-400 bg-slate-900 py-2.5 pl-11 pr-4 text-sm text-white outline-none ring-amber-300 transition focus:border-amber-400 focus:ring sm:w-64"
              }
            )
          ] }),
          isAdmin && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => navigate("/dashboard"),
              className: "rounded-full border-2 border-amber-400 bg-amber-400/20 px-5 py-2 text-sm font-bold text-amber-200 transition hover:bg-amber-400/30",
              children: "Admin Panel"
            }
          )
        ] })
      ] }),
      !token && /* @__PURE__ */ jsx("div", { className: "mb-5 rounded-2xl border-2 border-amber-400 bg-amber-400/10 px-4 py-3 text-sm text-amber-100", children: "Sign in to view full details including location, timings, and entry fee." }),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-72 animate-pulse rounded-3xl border-2 border-amber-400 bg-white/5"
        },
        index
      )) }) : /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3", children: places.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.state.toLowerCase().includes(searchQuery.toLowerCase())).map((place) => /* @__PURE__ */ jsxs(
        "article",
        {
          className: `flex cursor-pointer flex-col overflow-hidden rounded-3xl border-2 shadow-xl shadow-slate-950/50 transition ${selectedPlace?.id === place.id ? "border-amber-400 bg-amber-400/15 ring-2 ring-amber-400/40" : "border-amber-400 bg-slate-900/50"}`,
          onClick: () => openPlaceDetails(place.id),
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: place.imageUrl,
                alt: place.name,
                className: "h-52 w-full object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-between p-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white leading-tight", children: place.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-amber-200 uppercase tracking-wide", children: [
                    place.city,
                    ", ",
                    place.state
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm text-slate-300 leading-relaxed", children: place.description })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
                "button",
                {
                  disabled: activeId === place.id,
                  className: "w-full rounded-full bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70",
                  children: token ? activeId === place.id ? "Loading..." : "View Full Details" : "Sign In to View Details"
                }
              ) })
            ] })
          ]
        },
        place.id
      )) })
    ] }),
    selectedPlace && /* @__PURE__ */ jsx(
      "div",
      {
        ref: overlayRef,
        className: "fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 px-4 py-6",
        onClick: (e) => {
          if (e.target === overlayRef.current) setSelectedPlace(null);
        },
        children: /* @__PURE__ */ jsxs("div", { className: "relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border-2 border-amber-400 bg-slate-900 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-10 flex items-center justify-between border-b border-amber-400 bg-slate-900/95 px-6 py-4 backdrop-blur", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: selectedPlace.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-amber-200 uppercase tracking-wide", children: [
                selectedPlace.city,
                ", ",
                selectedPlace.state
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedPlace(null),
                className: "rounded-full border-2 border-amber-400 px-5 py-2 text-xs font-bold text-white transition hover:bg-white/10",
                children: "\u2715 Close"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-0 lg:grid-cols-[1fr_1fr]", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: selectedPlace.imageUrl,
                  alt: selectedPlace.name,
                  className: "mb-6 h-64 w-full rounded-2xl object-cover shadow-xl border-2 border-amber-400"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-400 bg-white/5 p-4 shadow-lg", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-amber-300", children: "\u{1F4CD} Location" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-relaxed font-medium text-slate-100", children: selectedPlace.location })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-400 bg-white/5 p-4 shadow-lg", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-amber-300", children: "\u{1F550} Timings" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-relaxed font-medium text-slate-100", children: selectedPlace.timings })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-amber-400 bg-white/5 p-4 shadow-lg", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-amber-300", children: "\u{1F3AB} Entry Fee" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-relaxed font-medium text-slate-100", children: selectedPlace.entryFee })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl border-2 border-amber-400 bg-white/5 p-5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-amber-200 mb-2 uppercase tracking-widest", children: "Historical Background" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-slate-200", children: selectedPlace.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-t border-amber-400 lg:border-l lg:border-t-0", children: [
              /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b border-amber-400", children: /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-amber-200 uppercase tracking-widest", children: "\u{1F4CC} Location on Map" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col items-center justify-center p-6 pt-0", children: [
                /* @__PURE__ */ jsx("div", { className: "w-full mt-6 overflow-hidden rounded-2xl border-2 border-amber-400 shadow-2xl", children: /* @__PURE__ */ jsx(
                  "iframe",
                  {
                    title: `Map of ${selectedPlace.name}`,
                    src: `https://maps.google.com/maps?q=${encodeURIComponent(`${selectedPlace.name}, ${selectedPlace.city}, India`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
                    className: "h-80 w-full border-0",
                    loading: "lazy",
                    referrerPolicy: "no-referrer-when-downgrade"
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: mapsUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "mt-4 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-amber-300",
                    children: "\u{1F5FA}\uFE0F Open in Google Maps"
                  }
                )
              ] })
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  ExplorePage
};
