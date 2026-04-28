import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
function AuthForm({ type, onSubmit, onToggle }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const isLogin = type === "login";
  return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md bg-white/98 shadow-xl border-0", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-1 text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: isLogin ? "Welcome back" : "Create account" }),
      /* @__PURE__ */ jsx(CardDescription, { children: isLogin ? "Sign in to your account to continue" : "Enter your details to create your account" })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        !isLogin && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              type: "text",
              placeholder: "Enter your full name",
              value: formData.name,
              onChange: (e) => handleChange("name", e.target.value),
              required: true,
              className: "h-11"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "Enter your email",
              value: formData.email,
              onChange: (e) => handleChange("email", e.target.value),
              required: true,
              className: "h-11"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              placeholder: "Enter your password",
              value: formData.password,
              onChange: (e) => handleChange("password", e.target.value),
              required: true,
              className: "h-11"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full h-11 bg-indigo-600 hover:bg-indigo-700",
            children: isLogin ? "Sign in" : "Register"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onToggle,
          className: "text-sm text-indigo-600 hover:text-indigo-800 hover:underline",
          children: isLogin ? "Don't have an account? Register" : "Already have an account? Sign in"
        }
      ) })
    ] })
  ] });
}
export {
  AuthForm
};
