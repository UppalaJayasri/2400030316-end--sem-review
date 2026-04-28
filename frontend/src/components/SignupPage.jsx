import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";
import { CustomSelect } from "./CustomSelect";
import { useToast } from "./Toast";
const roleOptions = [
  { label: "Cultural Enthusiast", value: "CULTURAL_ENTHUSIAST" },
  { label: "Explorer", value: "EXPLORER" }
];
function SignupPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!role) {
      showToast("Please select a role", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiClient.signup({ name, email, password, role });
      showToast("Account created successfully!", "success");
      navigate("/login", { replace: true });
    } catch (submitError) {
      const backendMessage = submitError instanceof Error ? submitError.message : "";
      const normalizedMessage = backendMessage.toLowerCase();
      if (normalizedMessage.includes("already") && (normalizedMessage.includes("registered") || normalizedMessage.includes("exist"))) {
        showToast("Account already exists. Please signin.", "error");
      } else {
        showToast(backendMessage || "Unable to create account right now", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("main", { className: "flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10", children: /* @__PURE__ */ jsxs("section", { className: "w-full max-w-lg rounded-3xl border-2 border-amber-400 bg-white/10 p-6 shadow-2xl backdrop-blur md:p-8", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-amber-300", children: "Signup" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-3 text-3xl font-bold text-white", children: "Create your account" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-200", children: "Join the platform to unlock monument details and role-specific access." }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
        "Username",
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
            minLength: 2,
            className: "mt-2 w-full rounded-xl border border-amber-400 bg-slate-900 px-3 py-2.5 text-white outline-none ring-amber-300 transition focus:ring",
            placeholder: "Enter your username"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
        "Email",
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            className: "mt-2 w-full rounded-xl border border-amber-400 bg-slate-900 px-3 py-2.5 text-white outline-none ring-amber-300 transition focus:ring",
            placeholder: "Enter your email"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
        "Password",
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            minLength: 6,
            className: "mt-2 w-full rounded-xl border border-amber-400 bg-slate-900 px-3 py-2.5 text-white outline-none ring-amber-300 transition focus:ring",
            placeholder: "Minimum 6 characters"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        CustomSelect,
        {
          label: "Role",
          value: role,
          options: roleOptions,
          onChange: setRole,
          placeholder: "Select Role"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: "w-full rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70",
          children: isSubmitting ? "Creating account..." : "Signup"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-5 text-sm text-slate-300", children: [
      "Already registered?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/login", className: "font-semibold text-amber-200 hover:text-amber-100", children: "Login" })
    ] })
  ] }) });
}
export {
  SignupPage
};
