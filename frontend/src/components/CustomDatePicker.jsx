import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function CustomDatePicker({ value, onChange, min, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();
  today.setHours(0,0,0,0);

  const minDate = min ? new Date(min) : null;
  if (minDate) minDate.setHours(0,0,0,0);

  const days = [];
  const startDay = firstDayOfMonth(year, month);
  const totalDays = daysInMonth(year, month);

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  const handleDateSelect = (day) => {
    const selected = new Date(year, month, day);
    const dateStr = selected.toISOString().split("T")[0];
    onChange(dateStr);
    setIsOpen(false);
  };

  const changeMonth = (offset) => {
    setViewDate(new Date(year, month + offset, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div>
      {label && <label className="block text-sm font-semibold text-slate-200 mb-2">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border-2 border-amber-400 bg-slate-900/60 px-4 py-2.5 text-left text-sm text-white outline-none ring-amber-300 transition focus:ring"
      >
        <span>{value || "Select Date"}</span>
        <span className="text-amber-400 text-lg">📅</span>
      </button>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 px-4 overflow-hidden">
          {/* Click overlay to close */}
          <div 
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-[400px] rounded-3xl border-2 border-amber-400 bg-slate-900 p-8 shadow-2xl text-center">
            <div className="flex items-center justify-between mb-8 bg-white/5 p-4 rounded-[32px] border border-white/5">
              <button type="button" onClick={() => changeMonth(-1)} className="p-2 text-amber-400 hover:bg-amber-400/10 rounded-xl transition-colors font-bold text-xl">←</button>
              <div>
                <div className="text-[10px] font-black text-amber-400/40 uppercase tracking-widest mb-0.5">{year}</div>
                <div className="font-black text-white text-lg">{monthNames[month]}</div>
              </div>
              <button type="button" onClick={() => changeMonth(1)} className="p-2 text-amber-400 hover:bg-amber-400/10 rounded-xl transition-colors font-bold text-xl">→</button>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-black text-amber-400/40 uppercase mb-4">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d}>{d}</div>)}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, i) => {
                if (day === null) return <div key={i} />;
                const current = new Date(year, month, day);
                const isPast = minDate && current < minDate;
                const isToday = today.getTime() === current.getTime();
                const isSelected = value === current.toISOString().split("T")[0];
                
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleDateSelect(day)}
                    className={`h-10 w-full rounded-xl text-sm transition-all duration-200 ${
                      isSelected ? "bg-amber-400 text-slate-900 font-black scale-110 shadow-lg shadow-amber-400/40" :
                      isPast ? "text-slate-700 cursor-not-allowed opacity-30" :
                      isToday ? "text-amber-400 border-2 border-amber-400/30 font-bold hover:bg-amber-400/10" :
                      "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-full border-2 border-amber-400 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-full bg-amber-400 py-2.5 text-xs font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-300 active:scale-95"
              >
                Set Date
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
