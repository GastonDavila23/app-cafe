// hooks/useShopStatus.ts
"use client";
import { useState, useEffect } from 'react';

export function useShopStatus() {
  // Inicializamos en "null" para evitar errores de hidratación en Next.js
  const [isShopOpen, setIsShopOpen] = useState<boolean | null>(null);
  const [timeString, setTimeString] = useState("");
  const [today, setToday] = useState(0);

  useEffect(() => {
    const now = new Date();
    setToday(now.getDay());
    
    const rawHour = now.getHours();
    const ampm = rawHour >= 12 ? 'PM' : 'AM';
    let formattedHour = rawHour % 12;
    formattedHour = formattedHour ? formattedHour : 12; 
    setTimeString(`${formattedHour} ${ampm}`);

    // Horario: de 7 AM a 11 AM
    setIsShopOpen(rawHour >= 7 && rawHour < 11);
  }, []);

  return { isShopOpen, timeString, today };
}