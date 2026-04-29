"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return <div className="h-[73px] bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-700 rounded-b-3xl"></div>;
  }

  return (
    <div className="p-4 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-700 rounded-b-3xl">
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)} 
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 disabled:opacity-50 dark:text-white text-sm font-bold shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors disabled:hover:bg-white dark:disabled:hover:bg-neutral-800"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>
      
      <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400">
        <span className="text-neutral-900 dark:text-white">{currentPage}</span> / {totalPages}
      </span>
      
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)} 
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 disabled:opacity-50 dark:text-white text-sm font-bold shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors disabled:hover:bg-white dark:disabled:hover:bg-neutral-800"
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}