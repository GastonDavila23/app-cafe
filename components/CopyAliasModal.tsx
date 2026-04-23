"use client";

import { useEffect } from "react";

interface CopyAliasModalProps {
  isOpen: boolean;
  onClose: () => void;
  alias: string;
}

export default function CopyAliasModal({ isOpen, onClose, alias }: CopyAliasModalProps) {
  useEffect(() => {
    // Si el modal está abierto, arrancamos el cronómetro de 5 segundos (5000 ms)
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      // Limpiamos el cronómetro si el usuario lo cierra manualmente antes
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-5 pt-safe transition-opacity">
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-neutral-100 max-w-sm w-full text-center animate-fade-in-up">
        
        {/* Ícono de éxito con el color de Mercado Pago */}
        <div className="mx-auto w-16 h-16 bg-[#009EE3]/10 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">💳</span>
        </div>

        <h2 className="text-2xl font-extrabold text-neutral-800 mb-2 tracking-tight">
          ¡Alias Copiado!
        </h2>
        
        <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
          Ya podés ir a tu app de Mercado Pago y pegar el alias para realizar la transferencia.
        </p>

        {/* Mostramos el alias para dar seguridad de qué se copió */}
        <div className="bg-neutral-100 p-3 rounded-xl mb-6">
          <span className="font-mono font-bold text-neutral-800 tracking-wider">
            {alias}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#009EE3] hover:bg-[#008AC7] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
        >
          ¡Entendido!
        </button>

      </div>
    </div>
  );
}
