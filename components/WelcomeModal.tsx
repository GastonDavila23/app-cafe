// components/WelcomeModal.tsx
"use client";

import { useState, useEffect } from "react";
import { dailyMessages } from "@/lib/messages";
import { useShopStatus } from "@/hooks/useShopStatus";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  // Extraemos toda la información del tiempo desde nuestro Hook
  const { isShopOpen, timeString, today } = useShopStatus();

  useEffect(() => {
    // Si isShopOpen es null, significa que el hook todavía está calculando la hora. Esperamos.
    if (isShopOpen === null) return;

    let finalMessage = "";

    // Usamos la variable isShopOpen que viene del hook
    if (isShopOpen) {
      const messagesForToday = dailyMessages[today] || ["¡Bienvenido a El Puestito Café!"];
      const randomIndex = Math.floor(Math.random() * messagesForToday.length);
      finalMessage = messagesForToday[randomIndex].replace('{hora}', timeString);
    } else {
      finalMessage = `¡Hola! Son las ${timeString} y en este momento El Puestito está descansando 😴. Trabajo de 7 AM a 11 AM. Puedes ver el menú, ¡pero te espero mañana tempranito para tu café!`;
    }

    setMessage(finalMessage);

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [isShopOpen, timeString, today]); // El useEffect reacciona si estas variables cambian

  // Si no está abierto o aún está calculando la hora, no renderizamos nada
  if (!isOpen || isShopOpen === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl transform transition-all">
        <h2 className="text-2xl font-black text-neutral-800 mb-2">
          {isShopOpen ? "☕ ¡Hola!" : "🌙 ¡Puestito Cerrado!"}
        </h2>
        <p className="text-neutral-600 text-lg mb-6">
          {message}
        </p>
        <button 
          onClick={() => setIsOpen(false)}
          className={`w-full font-bold py-3 px-4 rounded-xl transition-colors text-white ${
            isShopOpen 
              ? "bg-emerald-500 hover:bg-emerald-600" 
              : "bg-neutral-800 hover:bg-neutral-900"
          }`}
        >
          {isShopOpen ? "¡Quiero mi café!" : "Ver el menú igual"}
        </button>
      </div>
    </div>
  );
}