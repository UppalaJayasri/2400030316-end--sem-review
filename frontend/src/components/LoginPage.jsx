import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";
import { useToast } from "./Toast";
function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await apiClient.login({ email, password });
      showToast("Login successful! Welcome back.", "success");
      onLoginSuccess(response);
      if (state?.from) {
        navigate(state.from, { replace: true });
        return;
      }
      if (response.role === "ADMIN") {
        navigate("/dashboard", { replace: true });
        return;
      }
      navigate("/explore", { replace: true });
    } catch (submitError) {
      const backendMessage = submitError instanceof Error ? submitError.message : "";
      const normalizedMessage = backendMessage.toLowerCase();
      if (normalizedMessage.includes("does not exist") || normalizedMessage.includes("not found")) {
        showToast("Account does not exist. Please signup first.", "error");
      } else {
        showToast(backendMessage || "Unable to login right now", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("main", { className: "flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10", children: /* @__PURE__ */ jsxs("section", { className: "w-full max-w-md rounded-3xl border-2 border-amber-400 bg-white/10 p-6 shadow-2xl backdrop-blur md:p-8", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-amber-300", children: "Sign In" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-3 text-3xl font-bold text-white", children: "Welcome Back" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-200", children: "Login to access full place details and your role-specific dashboard." }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
        "Email",
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (event) => setEmail(event.target.value),
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
            onChange: (event) => setPassword(event.target.value),
            required: true,
            minLength: 6,
            className: "mt-2 w-full rounded-xl border border-amber-400 bg-slate-900 px-3 py-2.5 text-white outline-none ring-amber-300 transition focus:ring",
            placeholder: "Enter your password"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: "w-full rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70",
          children: isSubmitting ? "Signing in..." : "Login"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-5 text-sm text-slate-300", children: [
      "New user?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/signup", className: "font-semibold text-amber-200 hover:text-amber-100", children: "Create account" })
    ] })
  ] }) });
}
export {
  LoginPage
};
