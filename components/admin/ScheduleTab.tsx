"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Clock, Save, Loader2 } from "lucide-react";

export default function ScheduleTab() {
  const [opening, setOpening] = useState("");
  const [closing, setClosing] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("settings").select("*");
    if (data) {
      const open = data.find((s) => s.key === "opening_time")?.value || "07:00";
      const close = data.find((s) => s.key === "closing_time")?.value || "12:00";
      setOpening(open);
      setClosing(close);
    }
    setIsFetching(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await supabase.from("settings").update({ value: opening }).eq("key", "opening_time");
    await supabase.from("settings").update({ value: closing }).eq("key", "closing_time");
    setIsSaving(false);
    alert("¡Horarios actualizados! 🕒");
  };

  if (isFetching) return <div className="p-20 text-center dark:text-white">Cargando configuración...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 animate-fade-in-up">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#009EE3]/10 rounded-lg">
            <Clock className="w-6 h-6 text-[#009EE3]" />
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-white">Horarios de Atención</h2>
            <p className="text-xs text-neutral-500">Configurá cuándo está abierto el local</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Apertura */}
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Hora de Apertura</label>
            <input 
              type="time" 
              value={opening} 
              onChange={(e) => setOpening(e.target.value)}
              className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-700 rounded-xl font-bold text-xl focus:border-[#009EE3] outline-none transition-all dark:text-white"
            />
          </div>

          {/* Cierre */}
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Hora de Cierre</label>
            <input 
              type="time" 
              value={closing} 
              onChange={(e) => setClosing(e.target.value)}
              className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-700 rounded-xl font-bold text-xl focus:border-[#009EE3] outline-none transition-all dark:text-white"
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-[#009EE3] hover:bg-[#008AC7] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>

        <p className="text-[10px] text-neutral-400 mt-6 text-center italic">
          Tip: Si querés probar la página ahora, poné una hora de cierre que sea más tarde que la hora actual.
        </p>
      </div>
    </div>
  );
}