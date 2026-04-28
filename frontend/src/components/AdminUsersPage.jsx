import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useToast } from "./Toast";

export function AdminUsersPage({ user, token }) {
  const { showToast } = useToast();
  const [adminUsers, setAdminUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (deleteConfirmUser) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deleteConfirmUser]);

  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const data = await apiClient.getAdminUsers(token);
      setAdminUsers(data);
    } catch {
      setAdminUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, [token]);

  const handleDeleteUser = async () => {
    if (!deleteConfirmUser) return;
    try {
      await apiClient.deleteUser(deleteConfirmUser.id, token);
      showToast(`User "${deleteConfirmUser.name}" deleted successfully`, "success");
      setDeleteConfirmUser(null);
      await loadUsers();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete user", "error");
    }
  };

  if (user.role !== "ADMIN") {
    return (
      <main className="px-5 py-10 sm:px-8 lg:px-12">
        <section className="mx-auto w-[min(900px,100%)] rounded-3xl border-2 border-red-400/30 bg-red-500/10 p-8 text-red-100">
          <h1 className="text-2xl font-bold">Access Restricted</h1>
          <p className="mt-3 text-sm leading-relaxed">This page is only for admin users.</p>
        </section>
      </main>
    );
  }

  const getRoleDisplay = (role) => {
    if (role === "CULTURAL_ENTHUSIAST") return "Cultural Enthusiast";
    if (role === "EXPLORER") return "Explorer";
    return role.replace(/_/g, " ");
  };

  return (
    <main className="px-5 py-10 sm:px-8 lg:px-12 pb-20 relative">
      <div className="mx-auto w-[min(1300px,100%)]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Admin Panel</p>
            <h1 className="mt-1 text-3xl font-bold text-white">Registered Users</h1>
          </div>
          <div className="flex flex-1 justify-center max-w-md mx-auto">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-4 flex items-center text-amber-500/70">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-amber-400 bg-slate-900 py-2 pl-11 text-sm text-white outline-none ring-amber-300 transition focus:border-amber-400 focus:ring"
              />
            </div>
          </div>
          <button
            onClick={() => void loadUsers()}
            className="rounded-full border-2 border-amber-400 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
          >
            Refresh List
          </button>
        </div>

        <section className="rounded-3xl py-5 shadow-xl">
          {isLoadingUsers ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 animate-pulse rounded-2xl border-2 border-amber-400 bg-white/5" />
              ))}
            </div>
          ) : adminUsers.length === 0 ? (
          <div className="w-full rounded-3xl border-2 border-amber-400 bg-slate-900/40 py-6 px-12 backdrop-blur-sm shadow-2xl">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-400/10 text-6xl shadow-inner shadow-amber-400/20">
                👥
              </div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">No Users Found</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 font-medium">
                There are currently no other registered users in the system matching your criteria.
              </p>
            </div>
          </div>
          ) : (
            <div className="flex flex-col gap-3">
              {adminUsers
                .filter((u) => u.email !== user.email)
                .filter(
                  (u) =>
                    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between rounded-xl border-2 border-amber-400 bg-slate-900 px-8 py-4 shadow-lg"
                  >
                    <div className="w-[40%] min-w-0">
                      <h3 className="truncate text-lg font-bold text-white">{u.name}</h3>
                      <p className="truncate text-sm font-medium text-slate-300">{u.email}</p>
                      {u.mobileNumber && (
                        <p className="mt-0.5 text-xs font-bold text-amber-200">📱 {u.mobileNumber}</p>
                      )}
                    </div>

                    <div className="flex w-[20%] justify-center">
                      <span className="rounded-full border-2 border-blue-400 bg-blue-500/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-300">
                        {getRoleDisplay(u.role)}
                      </span>
                    </div>

                    <div className="flex w-[40%] justify-end">
                      <button
                        onClick={() => setDeleteConfirmUser(u)}
                        className="rounded-full border-2 border-red-500/50 px-5 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/20"
                        title="Delete user"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>

      {deleteConfirmUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 px-4">
          <div className="w-full max-w-sm rounded-3xl border-2 border-amber-400 bg-slate-900 p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-3xl">
              🗑️
            </div>
            <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Are you sure you want to delete user <span className="font-bold text-white">"{deleteConfirmUser.name}"</span>? 
              <br/>This action cannot be undone.
            </p>
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="flex-1 rounded-full border-2 border-amber-400 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
