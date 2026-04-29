"use client";

import { useState, useEffect } from "react";
import { useShopStatus } from "@/hooks/useShopStatus";
import { dailyMessages } from "@/lib/messages";
import NameInput from "./NameInput";

export default function WelcomeModal() {
  const { isShopOpen, timeString } = useShopStatus();
  const [showModal, setShowModal] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedCafe");
    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);

    if (!hasVisited) {
      setShowModal(true);
      if (isShopOpen) {
        const dayOfWeek = new Date().getDay();
        const messagesForDay = dailyMessages[dayOfWeek] || dailyMessages[1];
        const randomIndex = Math.floor(Math.random() * messagesForDay.length);
        const randomMessage = messagesForDay[randomIndex];
        
        const greeting = savedName ? `¡Hola ${savedName}! ` : "";
        const finalMessage = greeting + randomMessage.replace("{hora}", timeString);
        
        setGreetingMessage(finalMessage);
      }
    }
  }, [isShopOpen, timeString]);

  const closeModal = () => {
    sessionStorage.setItem("hasVisitedCafe", "true");
    if (userName.trim()) {
      localStorage.setItem("userName", userName.trim());
    }
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-5 pt-safe transition-opacity">
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-neutral-100 max-w-sm w-full relative flex flex-col items-center text-center animate-fade-in-up">
        
        <div className="mb-6 flex items-center justify-center">
          <img src="/logo-uno.png" alt="Logo El Puestito" className="w-32 h-32 object-contain" />
        </div>

        {isShopOpen ? (
          <>
            <h2 className="text-2xl font-extrabold text-neutral-800 mb-3 leading-tight tracking-tighter">
              ¡Bienvenido a <br/><span className="text-[#009EE3]">Punto Café Gastón</span>!
            </h2>

            <div className="text-neutral-600 text-sm space-y-4 mb-4 leading-relaxed max-w-[280px]">
              <p className="text-base font-medium">{greetingMessage}</p>
            </div>

            <NameInput value={userName} onChange={setUserName} />

            <button
              onClick={closeModal}
              className="w-full bg-[#009EE3] hover:bg-[#008AC7] text-white font-bold py-4 rounded-xl transition-colors shadow-md mt-6"
            >
              ¡Take me coffee!
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold text-neutral-800 mb-3 leading-tight tracking-tighter">
              ¡El Puestito <span className="text-neutral-500">descansa</span>!
            </h2>
            <div className="text-neutral-600 text-sm space-y-4 mb-10 leading-relaxed max-w-[280px]">
              <p>Son las <span className="font-semibold text-neutral-800">{timeString}</span> y ya cerramos.</p>
              <div className="bg-neutral-100 px-4 py-2.5 rounded-full inline-block font-semibold text-neutral-700">7 AM a 12 PM ☕</div>
              <p>Dale una mirada al menú igual.</p>
            </div>
            <button onClick={closeModal} className="w-full bg-neutral-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-colors shadow-md">
              Ver el menú igual
            </button>
          </>
        )}
      </div>
    </div>
  );
}