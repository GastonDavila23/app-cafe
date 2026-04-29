"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ChevronDown, ChevronUp, Trash2, Send, Plus, Minus } from "lucide-react";

export default function FloatingCart() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  if (totalItems === 0) return null;

  const handleOrder = () => {
    const savedName = localStorage.getItem("userName");
    const phoneNumber = "5492616948318";
    const intro = savedName ? `¡Hola! Soy *${savedName}*.\n` : "¡Hola! ";
    let message = `${intro}Quiero hacer este pedido:\n\n`;
    
    cart.forEach(item => {
      message += `▪ *${item.quantity}x ${item.name}*`;
      if (item.selectedOption) message += ` (${item.selectedOption})`;
      message += ` - $${item.price * item.quantity}\n`;
    });
    
    message += `\n*Total: $${totalPrice}*\n\n¿Para cuándo lo tendrías?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="fixed top-4 left-4 right-4 md:max-w-md md:mx-auto z-50 animate-fade-in-down">
      
      {/* Contenedor principal con sombra premium */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all duration-300">
        
        {/* Barra superior visible siempre (El gatillo) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-neutral-900 text-white px-5 py-4 flex items-center justify-between hover:bg-black transition-colors"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-white/80" />
            <div className="text-left">
              <span className="block text-xs uppercase tracking-widest font-bold text-white/60 mb-0.5">Tu Pedido</span>
              <span className="block font-semibold text-sm leading-none">{totalItems} items</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">${totalPrice}</span>
            {isOpen ? <ChevronUp className="w-5 h-5 text-white/50" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
          </div>
        </button>

        {/* El Acordeón (Se despliega hacia abajo) */}
        {isOpen && (
          <div className="bg-white max-h-[70vh] overflow-y-auto flex flex-col">
            
            {/* Lista de items */}
            <div className="p-5 flex flex-col gap-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedOption}`} className="flex justify-between items-start gap-3 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                  
                  {/* Info del producto */}
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 text-sm leading-tight">{item.name}</p>
                    {item.selectedOption && (
                      <p className="text-xs text-neutral-500 mt-1 font-medium">{item.selectedOption}</p>
                    )}
                    <p className="text-sm font-semibold text-neutral-900 mt-2">${item.price * item.quantity}</p>
                  </div>

                  {/* Controles del producto */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center bg-neutral-50 rounded-md border border-neutral-200">
                      <button onClick={() => updateQuantity(item.id, item.selectedOption, -1)} className="p-1.5 text-neutral-500 hover:text-black">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedOption, 1)} className="p-1.5 text-neutral-500 hover:text-black">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.selectedOption)} className="text-xs text-red-500 hover:underline flex items-center gap-1 font-medium mt-1">
                      <Trash2 className="w-3.5 h-3.5" /> Quitar
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Footer con el botón de WhatsApp */}
            <div className="p-5 bg-neutral-50 border-t border-neutral-100">
              <button 
                onClick={handleOrder}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5C] text-white font-bold py-3.5 rounded-lg flex justify-center items-center gap-2 transition-colors shadow-sm text-sm"
              >
                <Send className="w-4 h-4" />
                Pedir por WhatsApp
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}