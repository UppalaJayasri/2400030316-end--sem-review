import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
function CustomSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option"
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "block text-sm font-semibold text-slate-200", children: [
    label,
    /* @__PURE__ */ jsxs("div", { className: "relative mt-2", ref, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen((p) => !p),
          className: "flex w-full items-center justify-between rounded-xl border border-amber-400 bg-slate-900 px-3 py-2.5 text-left text-sm text-white outline-none ring-amber-300 transition focus:ring",
          children: [
            /* @__PURE__ */ jsx("span", { className: value ? "text-white" : "text-slate-400", children: selectedLabel }),
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: `h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`,
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
      open && /* @__PURE__ */ jsx("ul", { className: "absolute z-50 mt-1 w-full overflow-hidden rounded-xl border-2 border-amber-400 bg-slate-900 shadow-2xl shadow-black/50", children: options.map((option) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            onChange(option.value);
            setOpen(false);
          },
          className: `flex w-full items-center px-3 py-2.5 text-left text-sm transition hover:bg-amber-400/10 ${option.value === value ? "bg-amber-400/15 font-bold text-amber-300" : "text-slate-200"}`,
          children: [
            option.value === value && /* @__PURE__ */ jsx("span", { className: "mr-2 text-amber-400", children: "\u2713" }),
            option.label
          ]
        }
      ) }, option.value)) })
    ] })
  ] });
}
export {
  CustomSelect
};
