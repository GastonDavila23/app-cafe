import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useShopStatus() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      const { data } = await supabase.from("settings").select("*");
      
      const now = new Date();
      const currentTS = now.toLocaleTimeString("es-AR", { 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: false 
      });
      
      const day = now.getDay(); // 0 es Domingo, 6 Sábado
      const isWeekend = day === 0 || day === 6;

      if (data) {
        const openTime = data.find(s => s.key === "opening_time")?.value || "07:00";
        const closeTime = data.find(s => s.key === "closing_time")?.value || "12:00";
        const isOpen = !isWeekend && currentTS >= openTime && currentTS <= closeTime;
        
        setIsShopOpen(isOpen);
      }

      setTimeString(now.toLocaleTimeString("es-AR", { 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: true 
      }));
      
      setIsLoading(false);
    }

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return { isShopOpen, timeString, isLoading };
}