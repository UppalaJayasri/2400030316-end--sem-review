import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
const navItemClass = ({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-amber-400 text-slate-900" : "text-slate-100/90 hover:bg-white/10 hover:text-white"}`;
function Navbar({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isAdmin = user?.role === "ADMIN";
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const initials = user?.name ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "";
  return /* @__PURE__ */ jsxs("header", { className: "fixed inset-x-0 top-0 z-50 border-b border-amber-400 bg-slate-950", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid h-20 w-[min(1200px,94vw)] grid-cols-2 items-center md:grid-cols-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-white", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-bold text-slate-950", children: "IH" }),
        /* @__PURE__ */ jsx("span", { className: "hidden text-sm font-semibold sm:block", children: "Indian Heritage" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden items-center justify-center gap-2 md:flex", "aria-label": "Main", children: [
        !user && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(NavLink, { to: "/", className: navItemClass, children: "Home" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/about", className: navItemClass, children: "About" })
        ] }),
        isAdmin ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(NavLink, { to: "/dashboard", className: navItemClass, children: "Dashboard" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/admin-places", className: navItemClass, children: "Gallery" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/admin-quiz", className: navItemClass, children: "Quiz" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/admin-articles", className: navItemClass, children: "Articles" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/admin-users", className: navItemClass, children: "Users" })
        ] }) : user ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(NavLink, { to: "/overview", className: navItemClass, children: "Overview" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/places", className: navItemClass, children: "Gallery" })
        ] }) : /* @__PURE__ */ jsx(NavLink, { to: "/places", className: navItemClass, children: "Gallery" }),
        user && !isAdmin && /* @__PURE__ */ jsx(NavLink, { to: "/quiz", className: navItemClass, children: "Quiz" }),
        user?.role === "EXPLORER" && /* @__PURE__ */ jsx(NavLink, { to: "/articles", className: navItemClass, children: "Articles" }),
        user?.role === "CULTURAL_ENTHUSIAST" && /* @__PURE__ */ jsx(NavLink, { to: "/contribute", className: navItemClass, children: "Articles" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden items-center justify-end gap-3 md:flex", children: [
        !user && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/login",
              className: "rounded-full border-2 border-amber-400 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/10",
              children: "Login"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/signup",
              className: "rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300",
              children: "Signup"
            }
          )
        ] }),
        user && /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setProfileOpen((p) => !p),
              className: "flex items-center gap-2.5 rounded-full border-2 border-amber-400 py-1.5 pl-1.5 pr-4 transition hover:bg-white/10",
              children: [
                /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-xs font-bold text-slate-900", children: initials }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-white", children: user.name.split(" ")[0] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: `h-4 w-4 text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`,
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" })
                  }
                )
              ]
            }
          ),
          profileOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border-2 border-amber-400 bg-slate-900 shadow-2xl shadow-black/50", children: [
            /* @__PURE__ */ jsxs("div", { className: "border-b border-amber-400 px-4 py-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-white", children: user.name }),
              /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-slate-400", children: user.email }),
              /* @__PURE__ */ jsx("span", { className: "mt-2 inline-block rounded-full bg-amber-400/15 px-2.5 py-0.5 text-xs font-bold text-amber-300", children: user.role === "CULTURAL_ENTHUSIAST" ? "Cultural Enthusiast" : user.role === "EXPLORER" ? "Explorer" : user.role.replace(/_/g, " ") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "py-1", children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/profile",
                onClick: () => setProfileOpen(false),
                className: "flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-200 transition hover:bg-white/5",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-base", children: "\u{1F464}" }),
                  " My Profile"
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-amber-400 py-1", children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  onLogout();
                  setProfileOpen(false);
                },
                className: "flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-300 transition hover:bg-red-500/10",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-base", children: "\u{1F6AA}" }),
                  " Logout"
                ]
              }
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end md:hidden", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setMobileOpen((previous) => !previous),
          className: "rounded-lg border-2 border-amber-400 px-3 py-2 text-sm font-semibold text-white",
          "aria-expanded": mobileOpen,
          "aria-label": "Toggle menu",
          children: mobileOpen ? "Close" : "Menu"
        }
      ) })
    ] }),
    mobileOpen && /* @__PURE__ */ jsxs("div", { className: "border-t border-amber-400 bg-slate-950/95 px-5 py-4 md:hidden", children: [
      user && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3 rounded-2xl border-2 border-amber-400 bg-white/5 p-3", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-bold text-slate-900", children: initials }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-white", children: user.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-2", children: [
        !user && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(NavLink, { to: "/", className: navItemClass, onClick: () => setMobileOpen(false), children: "Home" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/about", className: navItemClass, onClick: () => setMobileOpen(false), children: "About" })
        ] }),
        isAdmin ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(NavLink, { to: "/dashboard", className: navItemClass, onClick: () => setMobileOpen(false), children: "Dashboard" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/admin-places", className: navItemClass, onClick: () => setMobileOpen(false), children: "Gallery" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/admin-quiz", className: navItemClass, onClick: () => setMobileOpen(false), children: "Quiz" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/admin-articles", className: navItemClass, onClick: () => setMobileOpen(false), children: "Articles" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/admin-users", className: navItemClass, onClick: () => setMobileOpen(false), children: "Users" })
        ] }) : user ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(NavLink, { to: "/overview", className: navItemClass, onClick: () => setMobileOpen(false), children: "Overview" }),
          /* @__PURE__ */ jsx(NavLink, { to: "/places", className: navItemClass, onClick: () => setMobileOpen(false), children: "Gallery" })
        ] }) : /* @__PURE__ */ jsx(NavLink, { to: "/places", className: navItemClass, onClick: () => setMobileOpen(false), children: "Gallery" }),
        user && !isAdmin && /* @__PURE__ */ jsx(NavLink, { to: "/quiz", className: navItemClass, onClick: () => setMobileOpen(false), children: "Quiz" }),
        user?.role === "EXPLORER" && /* @__PURE__ */ jsx(NavLink, { to: "/articles", className: navItemClass, onClick: () => setMobileOpen(false), children: "Articles" }),
        user?.role === "CULTURAL_ENTHUSIAST" && /* @__PURE__ */ jsx(NavLink, { to: "/contribute", className: navItemClass, onClick: () => setMobileOpen(false), children: "Articles" }),
        user && /* @__PURE__ */ jsx(NavLink, { to: "/profile", className: navItemClass, onClick: () => setMobileOpen(false), children: "My Profile" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
        !user && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/signup",
              onClick: () => setMobileOpen(false),
              className: "inline-flex rounded-full border-2 border-amber-400 px-5 py-2 text-sm font-bold text-white",
              children: "Signup"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/login",
              onClick: () => setMobileOpen(false),
              className: "inline-flex rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-slate-900",
              children: "Login"
            }
          )
        ] }),
        user && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              onLogout();
              setMobileOpen(false);
            },
            className: "inline-flex rounded-full border border-red-400/40 px-5 py-2 text-sm font-bold text-red-300",
            children: "Logout"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Navbar
};
