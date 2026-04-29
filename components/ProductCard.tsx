"use client";

import { useState } from "react";
import { Plus, Minus, Send, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useShopStatus } from "@/hooks/useShopStatus";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  in_stock: boolean;
  options?: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isShopOpen } = useShopStatus(); 
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>(
    product.options && product.options.length > 0 ? product.options[0] : ""
  );

  const increaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity(q => q + 1);
  };
  
  const decreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isShopOpen) return;

    const savedName = localStorage.getItem("userName");
    const phoneNumber = "5492616948318"; 
    const intro = savedName ? `¡Hola! Soy *${savedName}*.\n` : "¡Hola! ";
    let message = `${intro}Quiero pedir rápido:\n\n*${quantity}x ${product.name}*`;
    if (selectedOption) message += ` (${selectedOption})`;
    message += `\nTotal: $${product.price * quantity}\n\n¿Para cuándo lo tendrías?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isShopOpen) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      selectedOption: selectedOption || undefined
    });
    setQuantity(1);
  };

  return (
    <div className={`bg-white rounded-xl p-5 border border-neutral-200 flex flex-col gap-4 transition-all hover:shadow-md ${!product.in_stock ? "opacity-50 grayscale" : ""}`}>
      
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-bold text-lg text-neutral-900 leading-tight mb-1 tracking-tight">
            {product.name}
          </h3>
          <p className="text-neutral-500 text-sm leading-snug">
            {product.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-semibold text-neutral-900 text-lg block">
            ${product.price}
          </span>
        </div>
      </div>

      {/* Opciones */}
      {product.in_stock && product.options && product.options.length > 0 && (
        <div className="mt-1">
          <div className="flex flex-wrap gap-2">
            {product.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                // Si está cerrado, deshabilitamos el clic en las opciones también
                disabled={!isShopOpen} 
                onClick={(e) => { e.preventDefault(); setSelectedOption(opt); }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                  selectedOption === opt 
                    ? "border-neutral-900 bg-neutral-900 text-white" 
                    : "border-neutral-200 bg-transparent text-neutral-600 hover:border-neutral-400"
                } ${!isShopOpen ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isShopOpen ? (
        // VISTA 1: LOCAL CERRADO
        <div className="mt-auto pt-2">
          <span className="bg-neutral-100 text-neutral-500 font-semibold text-xs px-3 py-2 rounded-lg inline-block border border-neutral-200">
            Cerrado por hoy
          </span>
        </div>
      ) : !product.in_stock ? (
        // VISTA 2: LOCAL ABIERTO, PERO SIN STOCK
        <div className="mt-auto pt-2">
          <span className="bg-red-50 text-red-500 font-semibold text-xs px-3 py-2 rounded-lg inline-block border border-red-100">
            Agotado por hoy
          </span>
        </div>
      ) : (
        // VISTA 3: LOCAL ABIERTO Y CON STOCK (Muestra botones)
        <div className="flex gap-2 mt-auto pt-2">
          
          <div className="flex items-center justify-between bg-neutral-50 rounded-lg px-1 w-24 border border-neutral-200 shrink-0">
            <button type="button" onClick={decreaseQuantity} className="p-2 text-neutral-500 hover:text-black transition-colors">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-semibold text-neutral-800 text-sm">{quantity}</span>
            <button type="button" onClick={increaseQuantity} className="p-2 text-neutral-500 hover:text-black transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button 
            type="button"
            onClick={handleQuickOrder}
            className="flex-1 bg-neutral-900 hover:bg-black text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Pedir
          </button>

          <button 
            type="button"
            onClick={handleAddToCart}
            title="Sumar a mi pedido"
            className="w-11 flex items-center justify-center bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 text-neutral-700 rounded-lg transition-colors shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

        </div>
      )}
    </div>
  );
}