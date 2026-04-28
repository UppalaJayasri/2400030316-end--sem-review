import { jsx, jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Shield, Crown, User } from "lucide-react";
function RoleSelection({ onSelectRole }) {
  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Manage heritage sites & users",
      icon: Shield,
      gradient: "from-orange-500 to-red-600",
      emoji: "\u{1F451}"
    },
    {
      id: "cultural-enthusiast",
      title: "Culture Expert",
      description: "Share knowledge & stories",
      icon: Crown,
      gradient: "from-purple-500 to-pink-600",
      emoji: "\u{1F3AD}"
    },
    {
      id: "user",
      title: "Explorer",
      description: "Discover Indian heritage",
      icon: User,
      gradient: "from-blue-500 to-cyan-600",
      emoji: "\u{1F5FA}\uFE0F"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 shadow-2xl", children: /* @__PURE__ */ jsx("span", { className: "text-4xl", children: "\u{1F3DB}\uFE0F" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl mb-2 text-white font-bold", children: "Indian Heritage" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-white/90", children: "Choose your role to continue" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: roles.map((role) => {
      const Icon = role.icon;
      return /* @__PURE__ */ jsxs(
        Card,
        {
          onClick: () => onSelectRole(role.id),
          className: "group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 bg-white/95 backdrop-blur-sm border-amber-400 hover:shadow-2xl",
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "text-center pb-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: role.emoji }) }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-xl mb-1", children: role.title }),
              /* @__PURE__ */ jsx(CardDescription, { className: "text-sm", children: role.description })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "text-center pb-4", children: /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${role.gradient} text-white text-sm font-medium hover:shadow-lg transition-all`, children: [
              "Login as ",
              role.title
            ] }) })
          ]
        },
        role.id
      );
    }) })
  ] });
}
export {
  RoleSelection
};
