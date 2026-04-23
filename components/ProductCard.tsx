"use client";

import { useShopStatus } from "@/hooks/useShopStatus";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const { isShopOpen } = useShopStatus(); 
  const whatsappNumber = "549XXXXXXXXXX"; // Tu número

  const handleOrder = () => {
    const text = `¡Hola! Quiero pedir un ${product.name} ($${product.price}).`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const isAvailable = isShopOpen && product.in_stock;
  
  let buttonText = "Pedir por WhatsApp";
  if (!isShopOpen) buttonText = "Cerrado por hoy";
  else if (!product.in_stock) buttonText = "Agotado temporalmente";

  return (
    <div className={`bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 flex flex-col justify-between transition-opacity ${!product.in_stock ? "opacity-75" : ""}`}>
      
      <div className="flex justify-between items-start gap-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-neutral-800 leading-tight">
            {product.name}
          </h3>
          <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1.5 rounded-lg shrink-0 text-sm">
          ${product.price}
        </div>
      </div>

      <button
        disabled={!isAvailable}
        onClick={handleOrder}
        className={`w-full font-bold py-3 px-4 rounded-xl transition-colors ${
          isAvailable 
            ? "bg-neutral-900 hover:bg-black text-white" 
            : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
        }`}
      >
        {buttonText}
      </button>
      
    </div>
  );
}