import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { CustomSelect } from "./CustomSelect";
import { useToast } from "./Toast";
const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
  { label: "Prefer not to say", value: "Prefer not to say" }
];
function roleLabel(role) {
  if (role === "CULTURAL_ENTHUSIAST") return "Cultural Enthusiast";
  if (role === "EXPLORER") return "Explorer";
  if (role === "ADMIN") return "Administrator";
  return role.replace(/_/g, " ");
}
function ProfilePage({ token, onProfileUpdate }) {
  const { showToast } = useToast();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMobile, setFormMobile] = useState("");
  const [formGender, setFormGender] = useState("");
  const isAdmin = profile?.role === "ADMIN";
  const loadProfile = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const p = await apiClient.getProfile(token);
      setProfile(p);
      setFormName(p.name);
      setFormEmail(p.email);
      setFormMobile(p.mobileNumber || "");
      setFormGender(p.gender || "");
    } catch {
      showToast("Failed to load profile", "error");
    } finally {
      setIsLoading(false);
    }
  }, [token, showToast]);
  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);
  const handleSave = async () => {
    if (!token) return;
    setIsSaving(true);
    const payload = {
      name: formName.trim(),
      mobileNumber: formMobile.trim(),
      gender: formGender
    };
    if (isAdmin) {
      payload.email = formEmail.trim();
    }
    try {
      const updated = await apiClient.updateProfile(payload, token);
      setProfile(updated);
      showToast("Profile updated successfully!", "success");
      setIsEditing(false);
      if (onProfileUpdate && updated.name !== profile?.name) {
        onProfileUpdate(updated.name);
      }
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to update profile",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };
  if (!token) {
    return /* @__PURE__ */ jsx("main", { className: "flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10", children: /* @__PURE__ */ jsxs("section", { className: "w-full max-w-lg rounded-3xl border-2 border-amber-400 bg-white/5 p-8 text-center shadow-2xl backdrop-blur", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600", children: /* @__PURE__ */ jsx("span", { className: "text-3xl", children: "\u{1F512}" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "Sign in Required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-slate-300", children: "Please log in to view your profile." })
    ] }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsx("main", { className: "flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto h-16 w-16 animate-spin rounded-full border-4 border-amber-400 border-t-amber-400" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-300", children: "Loading profile..." })
    ] }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsx("main", { className: "flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10", children: /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "Unable to load profile." }) });
  }
  const initials = profile.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  return /* @__PURE__ */ jsx("main", { className: "px-5 pt-10 pb-16 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("section", { className: "mx-auto w-[min(700px,100%)] space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border-2 border-amber-400 bg-white/5 p-8 text-center shadow-2xl backdrop-blur", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-3xl font-bold text-slate-900", children: initials }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: profile.name }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-slate-400", children: profile.email }),
      /* @__PURE__ */ jsx("span", { className: "mt-3 inline-block rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-300", children: roleLabel(profile.role) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-slate-500", children: [
        "Member since",
        " ",
        new Date(profile.createdAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border-2 border-amber-400 bg-white/5 p-6 shadow-xl backdrop-blur", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white", children: "Profile Details" }),
        !isEditing && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsEditing(true),
            className: "rounded-full bg-amber-400 px-5 py-2 text-xs font-bold text-slate-900 transition hover:bg-amber-300",
            children: "\u270F\uFE0F Edit"
          }
        )
      ] }),
      isEditing ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
          "Full Name",
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formName,
              onChange: (e) => setFormName(e.target.value),
              className: "mt-2 w-full rounded-xl border-2 border-amber-400 bg-slate-900/60 px-3 py-2.5 text-sm text-white outline-none ring-amber-300 transition focus:ring"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
          "Email",
          isAdmin ? /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: formEmail,
              onChange: (e) => setFormEmail(e.target.value),
              className: "mt-2 w-full rounded-xl border-2 border-amber-400 bg-slate-900/60 px-3 py-2.5 text-sm text-white outline-none ring-amber-300 transition focus:ring"
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: profile.email,
                disabled: true,
                className: "mt-2 w-full cursor-not-allowed rounded-xl border-2 border-amber-400 bg-slate-800/40 px-3 py-2.5 text-sm text-slate-400"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xs text-slate-500", children: "Email cannot be changed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-slate-200", children: [
          "Mobile Number",
          profile.mobileNumber && !isAdmin ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                value: profile.mobileNumber,
                disabled: true,
                className: "mt-2 w-full cursor-not-allowed rounded-xl border-2 border-amber-400 bg-slate-800/40 px-3 py-2.5 text-sm text-slate-400"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xs text-slate-500", children: "Mobile number cannot be changed once set" })
          ] }) : /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              value: formMobile,
              onChange: (e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormMobile(digits);
              },
              maxLength: 10,
              pattern: "[0-9]{10}",
              placeholder: "Enter 10-digit mobile number",
              className: "mt-2 w-full rounded-xl border-2 border-amber-400 bg-slate-900/60 px-3 py-2.5 text-sm text-white outline-none ring-amber-300 transition focus:ring"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          CustomSelect,
          {
            label: "Gender",
            value: formGender,
            options: genderOptions,
            onChange: setFormGender,
            placeholder: "Select Gender"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSave,
              disabled: isSaving,
              className: "rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70",
              children: isSaving ? "Saving..." : "Save Changes"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setIsEditing(false);
                setFormName(profile.name);
                setFormEmail(profile.email);
                setFormMobile(profile.mobileNumber || "");
                setFormGender(profile.gender || "");
              },
              className: "rounded-full border-2 border-amber-400 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/10",
              children: "Cancel"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(ProfileField, { label: "Full Name", value: profile.name }),
        /* @__PURE__ */ jsx(ProfileField, { label: "Email", value: profile.email }),
        /* @__PURE__ */ jsx(
          ProfileField,
          {
            label: "Mobile Number",
            value: profile.mobileNumber || "Not set",
            muted: !profile.mobileNumber
          }
        ),
        /* @__PURE__ */ jsx(
          ProfileField,
          {
            label: "Gender",
            value: profile.gender || "Not set",
            muted: !profile.gender
          }
        ),
        /* @__PURE__ */ jsx(ProfileField, { label: "Role", value: roleLabel(profile.role) })
      ] })
    ] })
  ] }) });
}
function ProfileField({
  label,
  value,
  muted
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-amber-400 py-3 last:border-0", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-400", children: label }),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `text-sm font-medium ${muted ? "italic text-slate-500" : "text-white"}`,
        children: value
      }
    )
  ] });
}
export {
  ProfilePage
};
