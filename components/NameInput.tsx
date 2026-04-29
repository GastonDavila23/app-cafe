"use client";

import { User } from "lucide-react";

interface NameInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function NameInput({ value, onChange }: NameInputProps) {
  return (
    <div className="w-full mt-4 animate-fade-in-up">
      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 text-left px-1">
        ¿Cómo te llamas? (Opcional)
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <User className="h-5 w-5 text-neutral-400 group-focus-within:text-[#009EE3] transition-colors" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ej: Gastón"
          className="block w-full pl-11 pr-4 py-3 bg-neutral-50 border-2 border-neutral-100 rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#009EE3] focus:bg-white transition-all text-base font-medium"
        />
      </div>
      <p className="text-[10px] text-neutral-400 mt-2 px-1 text-left italic">
        Para saludarte y agilizar tu pedido ☕
      </p>
    </div>
  );
}