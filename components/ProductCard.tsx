// components/ProductCard.tsx
"use client";

import { useShopStatus } from "@/hooks/useShopStatus";

// Exportamos la interfaz para usarla en page.tsx
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function ProductCard({ product }: { product: Product }) {
  // Llamamos a nuestro hook atómico
  const { isShopOpen } = useShopStatus();
  
  // Tu número de WhatsApp (Recuerda cambiar las X por tu número real)
  const whatsappNumber = "549XXXXXXXXXX"; 

  const createWhatsAppLink = () => {
    const message = `¡Hola! Vengo desde el QR. Quiero pedir un ${product.name}.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // Mientras Next.js calcula la hora, no mostramos el botón para evitar parpadeos raros
  if (isShopOpen === null) return null; 

  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      {/* Imagen */}
      <div className="relative h-48 w-full bg-neutral-200">
        <img 
          src={product.image_url} 
          alt={`Imagen de ${product.name}`} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-neutral-800">{product.name}</h2>
          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            ${product.price}
          </span>
        </div>
        <p className="text-neutral-600 flex-grow mb-4">
          {product.description}
        </p>

        {/* Lógica Pro: Botón Activo vs Botón Deshabilitado */}
        {isShopOpen ? (
          <a 
            href={createWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl text-center transition-colors shadow-sm"
          >
            Pedir por WhatsApp
          </a>
        ) : (
          <button 
            disabled 
            className="w-full bg-neutral-300 text-neutral-500 font-semibold py-3 px-4 rounded-xl cursor-not-allowed"
          >
            Cerrado por hoy
          </button>
        )}
      </div>
    </article>
  );
}