import { useMemo, useState, useEffect } from "react";
import { apiClient } from "../api/client";
import { useToast } from "./Toast";
import { InputField } from "./InputField";

const emptyForm = {
  name: "",
  city: "",
  state: "",
  description: "",
  location: "",
  timings: "",
  entryFee: "",
  imageUrl: ""
};

export function AdminPlacesPage({
  user,
  token,
  adminPlaces,
  isLoadingAdminPlaces,
  onReloadAdminPlaces
}) {
  const { showToast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces = useMemo(() => {
    return adminPlaces.filter(
      (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             p.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
             p.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [adminPlaces, searchQuery]);

  const titleText = editingPlaceId ? "Update Place" : "Add New Place";

  // Prevent background scrolling when any modal is open
  useEffect(() => {
    if (showPlaceModal || deleteConfirmId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPlaceModal, deleteConfirmId]);

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

  const openAddModal = () => {
    setEditingPlaceId(null);
    setForm(emptyForm);
    setShowPlaceModal(true);
  };

  const openEditModal = (place) => {
    setEditingPlaceId(place.id);
    setForm({
      name: place.name,
      city: place.city,
      state: place.state,
      description: place.description,
      location: place.location,
      timings: place.timings,
      entryFee: place.entryFee,
      imageUrl: place.imageUrl
    });
    setShowPlaceModal(true);
  };

  const closePlaceModal = () => {
    setShowPlaceModal(false);
    setEditingPlaceId(null);
    setForm(emptyForm);
  };

  const closeDeleteModal = () => {
    setDeleteConfirmId(null);
  };

  const openDeleteModal = (id) => {
    setDeleteConfirmId(id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingPlaceId) {
        await apiClient.updateAdminPlace(editingPlaceId, form, token);
        showToast("Place updated successfully!", "success");
      } else {
        await apiClient.createAdminPlace(form, token);
        showToast("Place created successfully!", "success");
      }
      closePlaceModal();
      await onReloadAdminPlaces();
    } catch (submitError) {
      showToast(
        submitError instanceof Error ? submitError.message : "Unable to save place right now",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePlace = async (placeId) => {
    try {
      await apiClient.deletePlace(placeId, token);
      showToast("Place deleted successfully!", "success");
      closeDeleteModal();
      await onReloadAdminPlaces();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Delete failed", "error");
      closeDeleteModal();
    }
  };

  return (
    <main className="px-5 py-10 sm:px-8 lg:px-12 pb-20">
      <div className="mx-auto w-[min(1300px,100%)]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Admin Panel</p>
            <h1 className="mt-1 text-3xl font-bold text-white">Gallery Management</h1>
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
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-amber-400 bg-slate-900 py-2 pl-11 text-sm text-white outline-none ring-amber-300 transition focus:border-amber-400 focus:ring"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => void onReloadAdminPlaces()}
              className="rounded-full border-2 border-amber-400 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
            >
              Refresh
            </button>
            <button
              onClick={openAddModal}
              className="rounded-full border-4 border-amber-700/80 bg-slate-800 px-6 py-2.5 text-sm font-bold text-amber-300 transition hover:bg-slate-700"
            >
              + Add Landmark
            </button>
          </div>
        </div>

        <section className="pb-20">
          {filteredPlaces.length === 0 ? (
          <div className="w-full rounded-3xl border-2 border-amber-400 bg-slate-900/40 py-6 px-12 backdrop-blur-sm shadow-2xl">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-400/10 text-6xl shadow-inner shadow-amber-400/20">
                🏛️
              </div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">Gallery is Empty</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 font-medium">
                You haven't added any landmarks yet. Start building your heritage gallery by adding your first iconic site!
              </p>
              <button
                onClick={openAddModal}
                className="mt-8 rounded-full border-2 border-amber-400 bg-amber-400/5 px-8 py-3 text-sm font-bold text-amber-300 transition hover:bg-amber-400 hover:text-slate-900"
              >
                Add Your First Landmark
              </button>
            </div>
          </div>
          ) : isLoadingAdminPlaces ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-64 animate-pulse rounded-2xl border-2 border-amber-400 bg-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPlaces.map((place) => (
                <article 
                  key={place.id}
                  className="flex flex-col overflow-hidden rounded-2xl border-2 border-amber-400 bg-slate-900/50 shadow-xl"
                >
                  <img src={place.imageUrl} alt={place.name} className="h-44 w-full object-cover" />
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">{place.name}</h3>
                      <p className="text-xs font-bold text-amber-200 uppercase tracking-wide">
                        {place.city}, {place.state}
                      </p>
                      <p className="line-clamp-3 text-sm text-slate-300 leading-relaxed">{place.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-auto">
                      <button
                        onClick={() => openEditModal(place)}
                        className="rounded-full border-2 border-amber-400 px-5 py-2 text-xs font-bold text-amber-100 transition hover:bg-amber-400/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(place.id)}
                        className="rounded-full border-2 border-red-500/40 px-5 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {showPlaceModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 px-4 overflow-hidden">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border-2 border-amber-400 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{titleText}</h2>
              <button
                onClick={closePlaceModal}
                className="rounded-full border-2 border-amber-400 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                ✕ Close
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField label="Place Name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} placeholder="Example: Brihadeeswarar Temple" />
              <InputField label="City" value={form.city} onChange={(v) => setForm((p) => ({ ...p, city: v }))} placeholder="Example: Thanjavur" />
              <InputField label="State" value={form.state} onChange={(v) => setForm((p) => ({ ...p, state: v }))} placeholder="Example: Tamil Nadu" />
              <InputField label="Location" value={form.location} onChange={(v) => setForm((p) => ({ ...p, location: v }))} placeholder="Exact address or locality" />
              <InputField label="Timings" value={form.timings} onChange={(v) => setForm((p) => ({ ...p, timings: v }))} placeholder="Example: 8:00 AM - 6:00 PM" />
              <InputField label="Entry Fee" value={form.entryFee} onChange={(v) => setForm((p) => ({ ...p, entryFee: v }))} placeholder="Example: INR 40" />
              <InputField label="Image URL" value={form.imageUrl} onChange={(v) => setForm((p) => ({ ...p, imageUrl: v }))} placeholder="https://..." />
              <label className="block text-sm font-semibold text-slate-200">
                Description
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  required
                  rows={4}
                  className="mt-2 w-full rounded-xl border-2 border-amber-400 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none ring-amber-300 transition focus:ring"
                  placeholder="Brief cultural and historical description"
                />
              </label>
              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={closePlaceModal}
                  className="rounded-full border-2 border-amber-400 px-8 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-amber-400 px-8 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : editingPlaceId ? "Update Place" : "Create Place"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 px-4 overflow-hidden">
          <div className="w-full max-w-sm rounded-3xl border-2 border-amber-400 bg-slate-900 p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-3xl">
              🗑️
            </div>
            <h3 className="text-xl font-bold text-white">Confirm Delete</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">Are you sure you want to delete this place? This action cannot be undone.</p>
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={closeDeleteModal}
                className="rounded-full border-2 border-amber-400 px-8 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => void handleDeletePlace(deleteConfirmId)}
                className="rounded-full bg-red-500 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400"
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
