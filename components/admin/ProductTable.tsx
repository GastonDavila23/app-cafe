"use client";

import { useState } from "react";
import { Edit2, Ban, CheckCircle2, Trash2 } from "lucide-react";
import Pagination from "./Pagination";
interface AdminProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
  options: string[];
}

interface ProductTableProps {
  products: AdminProduct[];
  onEdit: (product: AdminProduct) => void;
  onToggleStock: (id: number, currentStock: boolean) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onToggleStock, onDelete }: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Cantidad fija de filas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Los productos reales de esta página
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculamos cuántas filas vacías necesitamos para llegar a 5
  const emptyRowsCount = itemsPerPage - paginatedProducts.length;
  // Creamos un array con ese número para poder iterarlo (solo si hay productos cargados en general)
  const emptyRows = products.length > 0 ? Array.from({ length: emptyRowsCount }) : [];

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex flex-col h-full">
      <div className="overflow-x-auto flex-grow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-700">
              <th className="p-4 font-bold text-neutral-600 dark:text-neutral-300 w-1/2">Nombre</th>
              <th className="p-4 font-bold text-neutral-600 dark:text-neutral-300 w-1/4">Precio</th>
              <th className="p-4 font-bold text-neutral-600 dark:text-neutral-300 text-center w-1/4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            
            {/* 1. RENDERIZAMOS LOS PRODUCTOS REALES */}
            {paginatedProducts.map((p) => (
              <tr key={p.id} className={`border-b border-neutral-50 dark:border-neutral-700/50 transition-opacity h-[76px] ${!p.in_stock ? "opacity-50" : ""}`}>
                <td className="p-4">
                  <span className="font-bold text-neutral-900 dark:text-white block truncate">{p.name}</span>
                  {!p.in_stock && <span className="text-[10px] uppercase tracking-wider font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full inline-block mt-0.5">Sin Stock</span>}
                </td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                  ${p.price}
                </td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => onEdit(p)} className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors" title="Editar">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onToggleStock(p.id, p.in_stock)} className={`p-2.5 rounded-xl transition-colors ${p.in_stock ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/50" : "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"}`} title={p.in_stock ? "Pausar Stock" : "Activar Stock"}>
                    {p.in_stock ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => onDelete(p.id)} className="p-2.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors" title="Borrar">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {/* 2. RENDERIZAMOS LAS FILAS FANTASMA PARA MANTENER LA ALTURA */}
            {emptyRows.map((_, index) => (
              <tr key={`empty-${index}`} className="border-b border-neutral-50 dark:border-neutral-700/50 h-[76px]">
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
              </tr>
            ))}

            {/* 3. ESTADO VACÍO (Si la base de datos no tiene NADA) */}
            {products.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-neutral-500 dark:text-neutral-400 italic h-[380px] align-middle">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl mb-2">☕</span>
                    No hay productos cargados todavía.
                  </div>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* COMPONENTE DE PAGINACIÓN ATOMIZADO */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={Math.max(1, totalPages)} 
        onPageChange={setCurrentPage} 
      />
      
    </div>
  );
}