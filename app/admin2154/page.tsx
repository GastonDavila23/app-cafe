"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface AdminProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "2154") { 
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      alert("PIN incorrecto 🕵️‍♂️");
      setPin("");
    }
  };
  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
    if (!error && data) setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (editingId) {
      const { error } = await supabase.from('products')
        .update({ name, description, price: parseInt(price) })
        .eq('id', editingId);
      
      if (error) alert("Error al actualizar: " + error.message);
      else alert("¡Café actualizado! ☕");
    } else {
      const { error } = await supabase.from('products')
        .insert([{ name, description, price: parseInt(price), image_url: "", in_stock: true }]);
      
      if (error) alert("Error al guardar: " + error.message);
      else alert("¡Café agregado con éxito! ☕");
    }

    setIsLoading(false);
    resetForm();
    fetchProducts();
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleStock = async (id: number, currentStock: boolean) => {
    const { error } = await supabase.from('products').update({ in_stock: !currentStock }).eq('id', id);
    if (!error) fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que quieres borrar este café definitivamente?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
  };

  const resetForm = () => {
    setEditingId(null);
    setName(""); setDescription(""); setPrice("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center">
          <h1 className="text-2xl font-black mb-2 text-neutral-900">Acceso Restringido</h1>
          <p className="text-neutral-500 mb-6">Solo personal autorizado</p>
          <input 
            type="password" 
            placeholder="Ingresa tu PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border-2 border-neutral-200 p-4 rounded-xl mb-6 text-center text-2xl tracking-widest text-black placeholder:text-neutral-300 focus:border-neutral-900 focus:outline-none bg-white"
          />
          <button type="submit" className="w-full bg-neutral-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-colors">
            Entrar al Panel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 p-4 pb-20 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-black text-neutral-800">Panel El Puestito</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-red-500 font-bold bg-red-50 px-4 py-2 rounded-lg">
            Salir
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* FORMULARIO */}
          <section className="bg-white p-6 rounded-3xl shadow-sm h-fit md:col-span-2 sticky top-4 border border-neutral-100">
            <h2 className="text-xl font-bold mb-4 text-neutral-800">
              {editingId ? "✏️ Modificar Café" : "➕ Nuevo Café"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input required type="text" placeholder="Nombre (ej. Flat White)" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-neutral-100 p-3 rounded-xl bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none" />
              <textarea required placeholder="Descripción breve" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-2 border-neutral-100 p-3 rounded-xl bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none resize-none h-24" />
              <input required type="number" placeholder="Precio (ej. 2500)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border-2 border-neutral-100 p-3 rounded-xl bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none" />
              
              <div className="flex gap-2 mt-2">
                <button disabled={isLoading} type="submit" className="flex-1 bg-neutral-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-colors">
                  {isLoading ? "..." : (editingId ? "Actualizar" : "Guardar")}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="bg-neutral-200 text-neutral-700 font-bold py-3 px-4 rounded-xl">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* LISTA DE PRODUCTOS */}
          <section className="md:col-span-3">
            <h2 className="text-xl font-bold mb-4 text-neutral-800">📋 Menú ({products.length})</h2>
            <div className="flex flex-col gap-4">
              {products.map((p) => (
                <div key={p.id} className={`bg-white p-5 rounded-2xl shadow-sm border flex flex-col sm:flex-row sm:items-center gap-4 transition-all ${!p.in_stock ? "opacity-60 border-red-200" : "border-neutral-100"}`}>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-neutral-900">{p.name}</h3>
                      {!p.in_stock && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md">Sin Stock</span>}
                    </div>
                    <p className="text-emerald-600 font-bold">${p.price}</p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    {/* Botón Editar */}
                    <button onClick={() => handleEdit(p)} className="bg-blue-50 text-blue-600 p-3 rounded-xl font-semibold hover:bg-blue-100 transition-colors">
                      ✏️ Editar
                    </button>
                    {/* Botón Stock */}
                    <button onClick={() => handleToggleStock(p.id, p.in_stock)} className={`${p.in_stock ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"} p-3 rounded-xl font-semibold transition-colors`}>
                      {p.in_stock ? "🚫 Pausar" : "✅ Activar"}
                    </button>
                    {/* Botón Borrar */}
                    <button onClick={() => handleDelete(p.id)} className="bg-red-50 text-red-600 p-3 rounded-xl hover:bg-red-100 transition-colors">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && <p className="text-neutral-500 italic text-center py-10">No hay productos cargados.</p>}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}