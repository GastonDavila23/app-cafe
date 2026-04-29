"use client";

import { useState, useEffect } from "react";
import { Plus, PenSquare, X } from "lucide-react";

// Puedes importar esta interfaz desde un archivo types.ts idealmente, pero la definimos acá por ahora.
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  options: string[];
}

interface ProductFormProps {
  initialData?: ProductFormData | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function ProductForm({ initialData, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [currentOption, setCurrentOption] = useState("");

  // Si nos pasan initialData (es decir, le dimos a Editar), llenamos los campos
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price.toString());
      setOptions(initialData.options || []);
    } else {
      setName(""); setDescription(""); setPrice(""); setOptions([]);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, price: parseInt(price), options });
  };

  const handleAddOption = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const trimmed = currentOption.trim();
    if (trimmed && !options.includes(trimmed)) {
      setOptions([...options, trimmed]);
      setCurrentOption("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOption();
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    setOptions(options.filter(opt => opt !== optionToRemove));
  };

  return (
    <section className="bg-white dark:bg-neutral-800 p-6 rounded-3xl shadow-sm h-fit md:col-span-1 sticky top-4 border border-neutral-100 dark:border-neutral-700">
      <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white flex items-center gap-2">
        {initialData ? <><PenSquare className="w-5 h-5 text-[#009EE3]" /> Modificar</> : <><Plus className="w-5 h-5 text-emerald-500" /> Nuevo Café</>}
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input required type="text" placeholder="Nombre (ej: Combo Full)" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-neutral-100 dark:border-neutral-700 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white focus:border-[#009EE3] focus:outline-none transition-colors" />
        <textarea required placeholder="Descripción breve" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-2 border-neutral-100 dark:border-neutral-700 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white resize-none h-24 focus:border-[#009EE3] focus:outline-none transition-colors" />
        <input required type="number" placeholder="Precio ($)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border-2 border-neutral-100 dark:border-neutral-700 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white focus:border-[#009EE3] focus:outline-none transition-colors" />
        
        {/* SECCIÓN DE OPCIONES */}
        <div className="flex flex-col gap-2 mt-2 p-3 bg-neutral-50 dark:bg-neutral-900/30 rounded-xl border border-neutral-100 dark:border-neutral-700/50">
          <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Opciones a elegir</label>
          <div className="flex gap-2">
            <input 
              type="text" placeholder="Ej: Torita" value={currentOption} onChange={(e) => setCurrentOption(e.target.value)} onKeyDown={handleKeyDown} 
              className="flex-1 border-2 border-neutral-200 dark:border-neutral-600 p-2 rounded-lg bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:border-[#009EE3] focus:outline-none transition-colors" 
            />
            <button type="button" onClick={handleAddOption} className="bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white px-4 rounded-lg font-bold hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {options.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {options.map((opt, idx) => (
                <span key={idx} className="bg-[#009EE3]/10 text-[#009EE3] px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-1.5">
                  {opt}
                  <button type="button" onClick={() => handleRemoveOption(opt)} className="hover:text-red-500 hover:bg-red-100 rounded-full p-0.5"><X className="w-3.5 h-3.5" /></button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button disabled={isLoading} type="submit" className="flex-1 bg-[#009EE3] hover:bg-[#008AC7] text-white font-bold py-3 rounded-xl transition-colors shadow-sm">
            {isLoading ? "..." : (initialData ? "Guardar" : "Crear")}
          </button>
          {initialData && <button type="button" onClick={onCancel} className="bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white font-bold py-3 px-4 rounded-xl transition-colors">Cancelar</button>}
        </div>
      </form>
    </section>
  );
}