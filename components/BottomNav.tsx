"use client";

import { useState } from "react";
import CopyAliasModal from "./CopyAliasModal";

export default function BottomNav() {
  const whatsappNumber = "5492616948318";
  const aliasMP = "mpgaston18";
  
  // Estado para controlar nuestro nuevo modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopyAlias = async () => {
    try {
      await navigator.clipboard.writeText(aliasMP);
      // En vez del alert, abrimos el modal
      setIsModalOpen(true);
    } catch (err) {
      alert(`Mi alias de Mercado Pago es: ${aliasMP}`);
    }
  };

  return (
    <>
      {/* Nuestro Modal atómico. Lo ponemos fuera del div fixed para que no haya conflictos de Z-index */}
      <CopyAliasModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        alias={aliasMP} 
      />

      <div className="fixed bottom-6 left-0 w-full px-4 z-40 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-2 bg-neutral-400/30 backdrop-blur-md p-2 rounded-full shadow-2xl border border-white/40 w-full max-w-[340px]">
          
          <a 
            href={`https://wa.me/${whatsappNumber}?text=¡Hola! Tengo una consulta sobre El Puestito.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3 px-2 rounded-full transition-colors text-sm tracking-wide shadow-sm"
          >
            WhatsApp
          </a>

          <button 
            onClick={handleCopyAlias}
            className="flex-1 text-center bg-[#009EE3] hover:bg-[#008AC7] text-white font-bold py-3 px-2 rounded-full transition-colors text-sm tracking-wide shadow-sm"
          >
            Mercado Pago
          </button>

        </nav>
      </div>
    </>
  );
}
