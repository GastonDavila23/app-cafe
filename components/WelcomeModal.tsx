"use client";

import { useState, useEffect } from "react";
import { useShopStatus } from "@/hooks/useShopStatus";

export default function WelcomeModal() {
  const { isShopOpen, timeString } = useShopStatus();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedCafe");
    if (!hasVisited && !isShopOpen) {
      setShowModal(true);
    }
  }, [isShopOpen]);

  const closeModal = () => {
    sessionStorage.setItem("hasVisitedCafe", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-5 pt-safe">
      
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-neutral-100 max-w-sm w-full relative flex flex-col items-center text-center">
        
        <div className="relative mb-6 p-5 rounded-3xl bg-neutral-100 flex items-center justify-center group">
          <span className="text-8xl select-none opacity-80 group-hover:opacity-100 transition-opacity">
            😴
          </span>
          {/* El detalle Pro: un círculo del color de Mercado Pago con el emoji de café */}
          <div className="absolute -bottom-2 -right-2 bg-[#009EE3] p-3 rounded-full shadow-lg border-2 border-white">
            <span className="text-xl">☕</span>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-neutral-800 mb-3 leading-tight tracking-tighter">
          ¡El Puestito <span className="text-[#009EE3]">descansa</span>!
        </h2>

        <div className="text-neutral-600 text-sm space-y-4 mb-10 leading-relaxed max-w-[280px]">
          <p>
            ¡Hola! Son las <span className="font-semibold text-neutral-800">{timeString}</span> y en este momento ya cerramos por hoy.
          </p>
          
          <div className="bg-neutral-100 px-4 py-2.5 rounded-full inline-block font-semibold text-neutral-700">
            Trabajamos de 7 AM a 11 AM ☕
          </div>

          <p>
            Dale una mirada al menú igual, ¡te espero mañana tempranito!
          </p>
        </div>

        <button
          onClick={closeModal}
          className="w-full bg-neutral-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
        >
          Ver el menú igual
        </button>

      </div>
    </div>
  );
}