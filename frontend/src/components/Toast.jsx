import { jsx, jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useState } from "react";
const ToastContext = createContext(null);
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
let nextId = 1;
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type) => {
    const id = nextId++;
    setToasts([{ id, message, type, phase: "enter" }]);
    setTimeout(() => {
      setToasts(
        (prev) => prev.map((t) => t.id === id ? { ...t, phase: "visible" } : t)
      );
    }, 30);
    setTimeout(() => {
      setToasts(
        (prev) => prev.map((t) => t.id === id ? { ...t, phase: "exit" } : t)
      );
    }, 2e3);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2300);
  }, []);
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { showToast }, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed left-0 right-0 top-0 z-[9999] flex justify-center px-4 pt-5", children: toasts.map((toast) => /* @__PURE__ */ jsx(ToastItem, { toast }, toast.id)) })
  ] });
}
function ToastItem({ toast }) {
  const isSuccess = toast.type === "success";
  const phaseStyle = toast.phase === "enter" ? { transform: "translateY(-100%)", opacity: 0 } : toast.phase === "visible" ? { transform: "translateY(0)", opacity: 1 } : { transform: "translateY(-100%)", opacity: 0 };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `pointer-events-auto flex max-w-sm items-center gap-3 rounded-xl px-5 py-3 text-sm font-bold shadow-2xl ${isSuccess ? "bg-emerald-500 text-white shadow-emerald-500/40" : "bg-red-500 text-white shadow-red-500/40"}`,
      style: {
        ...phaseStyle,
        transition: "transform 0.25s ease, opacity 0.25s ease"
      },
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-base", children: isSuccess ? "\u2705" : "\u274C" }),
        /* @__PURE__ */ jsx("span", { children: toast.message })
      ]
    }
  );
}
export {
  ToastProvider,
  useToast
};
