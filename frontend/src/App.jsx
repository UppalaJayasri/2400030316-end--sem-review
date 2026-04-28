import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { apiClient } from "./api/client";
import { AboutPage } from "./components/AboutPage";
import { DashboardPage } from "./components/DashboardPage";
import { ExplorePage } from "./components/ExplorePage";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { Navbar } from "./components/Navbar";
import { ProfilePage } from "./components/ProfilePage";
import { QuizPage } from "./components/QuizPage";
import { SignupPage } from "./components/SignupPage";
import { ToastProvider } from "./components/Toast";
import { ScrollToTop } from "./components/ScrollToTop";
import { ContributePage } from "./components/ContributePage";
import { OverviewPage } from "./components/OverviewPage";
import { AdminPlacesPage } from "./components/AdminPlacesPage";
import { AdminArticlesPage } from "./components/AdminArticlesPage";
import { AdminUsersPage } from "./components/AdminUsersPage";
import { QuizManagement } from "./components/QuizManagement";
import { ExplorerArticlesPage } from "./components/ExplorerArticlesPage";
const AUTH_STORAGE_KEY = "indian-heritage-auth";
function readStoredAuth() {
  const rawValue = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }
  try {
    return JSON.parse(rawValue);
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}
function App() {
  const [auth, setAuth] = useState(() => readStoredAuth());
  const [places, setPlaces] = useState([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(true);
  const [adminPlaces, setAdminPlaces] = useState([]);
  const [isLoadingAdminPlaces, setIsLoadingAdminPlaces] = useState(false);
  const isAdmin = auth?.user.role === "ADMIN";
  const isHeritageExplorer = auth?.user.role === "CULTURAL_ENTHUSIAST";
  const isExplorer = auth?.user.role === "EXPLORER";
  const loadPlaces = async () => {
    setIsLoadingPlaces(true);
    try {
      const response = await apiClient.getPlaces();
      setPlaces(response);
    } catch {
      setPlaces([]);
    } finally {
      setIsLoadingPlaces(false);
    }
  };
  const loadAdminPlaces = async () => {
    if (!auth?.token || !isAdmin) {
      setAdminPlaces([]);
      return;
    }
    setIsLoadingAdminPlaces(true);
    try {
      const response = await apiClient.getAdminPlaces(auth.token);
      setAdminPlaces(response);
    } catch {
      setAdminPlaces([]);
    } finally {
      setIsLoadingAdminPlaces(false);
    }
  };
  useEffect(() => {
    void loadPlaces();
  }, []);
  useEffect(() => {
    void loadAdminPlaces();
  }, [auth?.token, isAdmin]);
  const handleAuthSuccess = (response) => {
    const nextAuth = {
      token: response.token,
      user: {
        name: response.name,
        email: response.email,
        role: response.role
      }
    };
    setAuth(nextAuth);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
  };
  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.location.href = "/";
  };
  const handleProfileNameUpdate = (newName) => {
    if (auth) {
      const updated = { ...auth, user: { ...auth.user, name: newName } };
      setAuth(updated);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    }
  };
  return /* @__PURE__ */ jsxs(BrowserRouter, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen pt-20", children: [
      /* @__PURE__ */ jsx(Navbar, { user: auth?.user ?? null, onLogout: handleLogout }),
      /* @__PURE__ */ jsxs(Routes, { children: [
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/",
            element: auth && !isAdmin ? /* @__PURE__ */ jsx(Navigate, { to: "/overview", replace: true }) : isAdmin ? /* @__PURE__ */ jsx(Navigate, { to: "/dashboard", replace: true }) : /* @__PURE__ */ jsx(HomePage, { places, isLoggedIn: !!auth })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/overview",
            element: auth && !isAdmin ? /* @__PURE__ */ jsx(OverviewPage, { user: auth.user }) : isAdmin ? /* @__PURE__ */ jsx(Navigate, { to: "/dashboard", replace: true }) : /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/about",
            element: auth && !isAdmin ? /* @__PURE__ */ jsx(Navigate, { to: "/overview", replace: true }) : isAdmin ? /* @__PURE__ */ jsx(Navigate, { to: "/dashboard", replace: true }) : /* @__PURE__ */ jsx(AboutPage, { isLoggedIn: !!auth })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/places",
            element: /* @__PURE__ */ jsx(
              ExplorePage,
              {
                places,
                token: auth?.token ?? null,
                isLoading: isLoadingPlaces,
                isAdmin
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/quiz",
            element: /* @__PURE__ */ jsx(QuizPage, { token: auth?.token ?? null })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/articles",
            element: auth && (isExplorer || isHeritageExplorer) ? /* @__PURE__ */ jsx(ExplorerArticlesPage, { token: auth.token }) : /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/dashboard",
            element: isAdmin ? /* @__PURE__ */ jsx(
              DashboardPage,
              {
                user: auth.user,
                token: auth.token
              }
            ) : /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/admin-places",
            element: isAdmin ? /* @__PURE__ */ jsx(
              AdminPlacesPage,
              {
                user: auth.user,
                token: auth.token,
                adminPlaces,
                isLoadingAdminPlaces,
                onReloadAdminPlaces: loadAdminPlaces
              }
            ) : /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/admin-quiz",
            element: isAdmin ? /* @__PURE__ */ jsx("main", { className: "px-5 py-10 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto w-[min(1300px,100%)]", children: /* @__PURE__ */ jsx(QuizManagement, { token: auth.token }) }) }) : /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/admin-articles",
            element: isAdmin ? /* @__PURE__ */ jsx(AdminArticlesPage, { user: auth.user, token: auth.token }) : /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/admin-users",
            element: isAdmin ? /* @__PURE__ */ jsx(AdminUsersPage, { user: auth.user, token: auth.token }) : /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/login",
            element: auth ? /* @__PURE__ */ jsx(Navigate, { to: isAdmin ? "/dashboard" : "/overview", replace: true }) : /* @__PURE__ */ jsx(LoginPage, { onLoginSuccess: handleAuthSuccess })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/signup",
            element: auth ? /* @__PURE__ */ jsx(Navigate, { to: isAdmin ? "/dashboard" : "/overview", replace: true }) : /* @__PURE__ */ jsx(SignupPage, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/profile",
            element: /* @__PURE__ */ jsx(
              ProfilePage,
              {
                token: auth?.token ?? null,
                onProfileUpdate: handleProfileNameUpdate
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/contribute",
            element: auth && auth.user.role === "CULTURAL_ENTHUSIAST" ? /* @__PURE__ */ jsx(ContributePage, { token: auth.token }) : /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true })
          }
        ),
        /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }) })
      ] })
    ] }) })
  ] });
}
export {
  App as default
};
