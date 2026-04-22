// app/admin-puestito/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Usamos el alias @/ que ya te funciona perfecto
import { Product } from "@/components/ProductCard";

export default function AdminPanel() {
  // Estados de seguridad
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");

  // Estados del formulario y datos
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Campos del nuevo café
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 1. Lógica de "Login"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") { // <-- CAMBIA ESTE PIN POR EL TUYO
      setIsAuthenticated(true);
      fetchProducts(); // Cargamos los cafés al entrar
    } else {
      alert("PIN incorrecto 🕵️‍♂️");
      setPin("");
    }
  };

  // 2. Traer los productos actuales
  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
    if (!error && data) setProducts(data);
  };

  // 3. Agregar un nuevo producto
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.from('products').insert([
      { 
        name, 
        description, 
        price: parseInt(price), // Convertimos el texto a número
        image_url: imageUrl 
      }
    ]);

    setIsLoading(false);

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      alert("¡Café agregado con éxito! ☕");
      // Limpiamos el formulario
      setName(""); setDescription(""); setPrice(""); setImageUrl("");
      // Recargamos la lista
      fetchProducts();
    }
  };

  // 4. Borrar un producto
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("¿Seguro que quieres borrar este café?");
    if (!confirmDelete) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      fetchProducts();
    } else {
      alert("Error al borrar: " + error.message);
    }
  };

  // --- PANTALLA DE BLOQUEO ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
          <h1 className="text-2xl font-black mb-2">Acceso Restringido</h1>
          <p className="text-neutral-500 mb-6">Solo personal autorizado</p>
          <input 
            type="password" 
            placeholder="Ingresa tu PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border-2 border-neutral-200 p-3 rounded-xl mb-4 text-center text-xl tracking-widest focus:border-emerald-500 focus:outline-none"
          />
          <button type="submit" className="w-full bg-neutral-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-colors">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  // --- PANEL DE CONTROL (Solo visible si pasaste el PIN) ---
  return (
    <div className="min-h-screen bg-neutral-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-neutral-800">Panel El Puestito</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-red-500 font-bold hover:underline">
            Cerrar Sesión
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna Izquierda: Formulario para Agregar */}
          <section className="bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4">➕ Agregar Nuevo Café</h2>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <input required type="text" placeholder="Nombre (ej. Flat White)" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-3 rounded-xl bg-neutral-50" />
              <textarea required placeholder="Descripción breve" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-3 rounded-xl bg-neutral-50 resize-none h-24" />
              <input required type="number" placeholder="Precio (ej. 2500)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-3 rounded-xl bg-neutral-50" />
              <input required type="url" placeholder="URL de la imagen (ej. Unsplash)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border p-3 rounded-xl bg-neutral-50" />
              <button disabled={isLoading} type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors mt-2">
                {isLoading ? "Guardando..." : "Guardar Producto"}
              </button>
            </form>
          </section>

          {/* Columna Derecha: Lista de Productos Actuales */}
          <section>
            <h2 className="text-xl font-bold mb-4">📋 Menú Actual ({products.length})</h2>
            <div className="flex flex-col gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                  <img src={p.image_url} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-grow">
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-emerald-600 font-semibold">${p.price}</p>
                  </div>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-100 text-red-500 p-2 rounded-lg hover:bg-red-200 transition-colors">
                    🗑️
                  </button>
                </div>
              ))}
              {products.length === 0 && <p className="text-neutral-500">No hay productos cargados.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}