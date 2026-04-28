import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function CustomTimePicker({ value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));
  const periods = ["AM", "PM"];

  // Parse 24h value to 12h + Period
  let currentH24 = "00";
  let currentM = "00";
  if (value) [currentH24, currentM] = value.split(":");
  
  const h24 = parseInt(currentH24);
  const currentPeriod = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 || 12;
  const currentH12 = h12.toString().padStart(2, "0");

  const handleSelect = (h, m, p) => {
    let finalH = parseInt(h);
    if (p === "PM" && finalH < 12) finalH += 12;
    if (p === "AM" && finalH === 12) finalH = 0;
    
    const hStr = finalH.toString().padStart(2, "0");
    onChange(`${hStr}:${m}`);
  };

  return (
    <div>
      {label && <label className="block text-sm font-semibold text-slate-200 mb-2">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border-2 border-amber-400 bg-slate-900/60 px-4 py-2.5 text-left text-sm text-white outline-none ring-amber-300 transition focus:ring"
      >
        <span>{value ? `${currentH12}:${currentM} ${currentPeriod}` : "Select Time"}</span>
        <span className="text-amber-400 text-lg">🕒</span>
      </button>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 px-4 overflow-hidden">
          {/* Click overlay to close */}
          <div 
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-[420px] rounded-3xl border-2 border-amber-400 bg-slate-900 p-8 shadow-2xl text-center">
            <div className="bg-white/5 rounded-[32px] p-6 border border-white/5 mb-8">
              <div className="text-4xl font-black text-amber-400 tracking-tighter mb-8 flex justify-center items-baseline gap-2">
                {currentH12}:{currentM} <span className="text-sm text-slate-500 uppercase">{currentPeriod}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-6 h-[260px]">
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="text-[10px] font-black text-amber-400/40 uppercase mb-3 tracking-widest">HR</div>
                  <div className="flex-1 overflow-y-auto scrollbar-none space-y-1 pr-1">
                    {hours.map(h => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => handleSelect(h, currentM, currentPeriod)}
                        className={`w-full py-3 rounded-xl text-base transition-all duration-200 ${h === currentH12 ? "bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20" : "text-slate-400 hover:bg-white/5"}`}
                      >
                        {h}
                      </button>
                    ))}
                    <div className="h-10" /> {/* Bottom spacer */}
                  </div>
                </div>
                
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="text-[10px] font-black text-amber-400/40 uppercase mb-3 tracking-widest">MIN</div>
                  <div className="flex-1 overflow-y-auto scrollbar-none space-y-1 pr-1">
                    {minutes.map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => handleSelect(currentH12, m, currentPeriod)}
                        className={`w-full py-3 rounded-xl text-base transition-all duration-200 ${m === currentM ? "bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20" : "text-slate-400 hover:bg-white/5"}`}
                      >
                        {m}
                      </button>
                    ))}
                    <div className="h-10" /> {/* Bottom spacer */}
                  </div>
                </div>

                <div className="flex flex-col h-full overflow-hidden">
                  <div className="text-[10px] font-black text-amber-400/40 uppercase mb-3 tracking-widest">PERIOD</div>
                  <div className="flex-1 flex flex-col gap-3 py-1">
                    {periods.map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleSelect(currentH12, currentM, p)}
                        className={`flex-1 rounded-2xl text-xs font-black transition-all duration-200 ${p === currentPeriod ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20" : "bg-white/5 text-slate-500 hover:bg-white/10"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-full border-2 border-amber-400 py-3 text-xs font-bold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-full bg-amber-400 py-3 text-xs font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-300 active:scale-95"
              >
                Set Time
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
