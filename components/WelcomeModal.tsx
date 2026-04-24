"use client";

import { useState, useEffect } from "react";
import { useShopStatus } from "@/hooks/useShopStatus";
import { dailyMessages } from "@/lib/messages"; 

export default function WelcomeModal() {
  const { isShopOpen, timeString } = useShopStatus();
  const [showModal, setShowModal] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");

  useEffect(() => {
    // Verificamos si es la primera visita de la sesión
    const hasVisited = sessionStorage.getItem("hasVisitedCafe");
    
    if (!hasVisited) {
      setShowModal(true);

      if (isShopOpen) {
        // 1. Obtenemos el número del día (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
        const dayOfWeek = new Date().getDay();
        
        // 2. Traemos el array de mensajes de ese día (o el del lunes por defecto si hay un error)
        const messagesForDay = dailyMessages[dayOfWeek] || dailyMessages[1];
        
        // 3. Elegimos un mensaje al azar del array (ideal para cuando agregues más)
        const randomIndex = Math.floor(Math.random() * messagesForDay.length);
        const randomMessage = messagesForDay[randomIndex];
        
        // 4. Reemplazamos la etiqueta {hora} por la hora real (ej: "8:30 AM")
        const finalMessage = randomMessage.replace("{hora}", timeString);
        
        setGreetingMessage(finalMessage);
      }
    }
  }, [isShopOpen, timeString]);

  const closeModal = () => {
    sessionStorage.setItem("hasVisitedCafe", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-5 pt-safe transition-opacity">
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-neutral-100 max-w-sm w-full relative flex flex-col items-center text-center animate-fade-in-up">
        
        {/* LOGO DE LA WEB */}
        <div className="mb-6 flex items-center justify-center">
          <img 
            src="/logo-uno.png" 
            alt="Logo El Puestito" 
            className="w-32 h-32 object-contain" 
          />
        </div>

        {/* RENDERIZADO CONDICIONAL: ABIERTO vs CERRADO */}
        {isShopOpen ? (
          
          /* =========================================
             VISTA: LOCAL ABIERTO
             ========================================= */
          <>
            <h2 className="text-2xl font-extrabold text-neutral-800 mb-3 leading-tight tracking-tighter">
              ¡Bienvenido a <br/><span className="text-[#009EE3]">El Puestito</span>!
            </h2>

            <div className="text-neutral-600 text-sm space-y-4 mb-8 leading-relaxed max-w-[280px]">
              {/* Mostramos el mensaje dinámico de tu messages.ts */}
              <p className="text-base font-medium">
                {greetingMessage}
              </p>
            </div>

            <button
              onClick={closeModal}
              className="w-full bg-[#009EE3] hover:bg-[#008AC7] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
            >
              ¡Quiero mi café!
            </button>
          </>

        ) : (

          /* =========================================
             VISTA: LOCAL CERRADO
             ========================================= */
          <>
            <h2 className="text-2xl font-extrabold text-neutral-800 mb-3 leading-tight tracking-tighter">
              ¡El Puestito <span className="text-neutral-500">descansa</span>!
            </h2>

            <div className="text-neutral-600 text-sm space-y-4 mb-10 leading-relaxed max-w-[280px]">
              <p>
                ¡Hola! Son las <span className="font-semibold text-neutral-800">{timeString}</span> y en este momento ya cerramos por hoy.
              </p>
              
              <div className="bg-neutral-100 px-4 py-2.5 rounded-full inline-block font-semibold text-neutral-700 shadow-sm">
                Trabajamos de 7 AM a 12 PM ☕
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
          </>

        )}

      </div>
    </div>
  );
}