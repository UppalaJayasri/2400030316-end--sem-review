import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "./ui/button";
function WelcomePage({ onContinue }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-40", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop&crop=center",
          alt: "Indian Heritage",
          className: "w-full h-full object-cover object-center"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-10 left-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 right-10 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "w-24 h-24 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8 shadow-2xl", children: /* @__PURE__ */ jsx("span", { className: "text-5xl", children: "\u{1F3DB}\uFE0F" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl", children: "Indian Heritage" }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl md:text-3xl text-white/90 mb-12 drop-shadow-lg font-medium", children: "Inspire awareness of Indian culture, heritage, and famous monuments" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onContinue,
          className: "bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 text-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300",
          children: "Explore Gallery"
        }
      )
    ] })
  ] });
}
export {
  WelcomePage
};
