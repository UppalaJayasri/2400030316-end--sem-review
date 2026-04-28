import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
function LoginForm({ role, onLogin, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const roleInfo = {
    admin: { title: "Admin Login", emoji: "\u{1F451}", gradient: "from-orange-500 to-red-600" },
    "cultural-enthusiast": { title: "Culture Expert Login", emoji: "\u{1F3AD}", gradient: "from-purple-500 to-pink-600" },
    user: { title: "Explorer Login", emoji: "\u{1F5FA}\uFE0F", gradient: "from-blue-500 to-cyan-600" }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name, email, password });
  };
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
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 w-80 h-80 mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "bg-white/95 backdrop-blur-sm border-amber-400 hover:shadow-2xl w-full h-full flex flex-col", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          onClick: onBack,
          className: "absolute left-2 top-2 p-1 h-6 w-6 z-10",
          children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-center p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mb-2 shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-xl", children: roleInfo[role].emoji }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: roleInfo[role].title })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              placeholder: "Name",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              className: "h-9 text-sm rounded-lg"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "email",
              placeholder: "Email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              className: "h-9 text-sm rounded-lg"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "password",
              placeholder: "Password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              className: "h-9 text-sm rounded-lg"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              className: `w-full h-9 bg-gradient-to-r ${roleInfo[role].gradient} text-white text-sm font-medium hover:shadow-lg rounded-lg`,
              children: "Login"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  LoginForm
};
