import { jsx, jsxs } from "react/jsx-runtime";
function InputField({ label, value, onChange, placeholder }) {
  return /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
    label,
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value,
        onChange: (e) => onChange(e.target.value),
        required: true,
        className: "mt-2 w-full rounded-xl border-2 border-amber-400 bg-slate-900/60 px-3 py-2.5 text-sm text-white outline-none ring-amber-300 transition focus:ring",
        placeholder
      }
    )
  ] });
}
export {
  InputField
};
