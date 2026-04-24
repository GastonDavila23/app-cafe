"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ProductTable from "@/components/admin/ProductTable";
import AdminNav from "@/components/admin/AdminNav";
import ShareTab from "@/components/admin/ShareTab";
// 🚨 ACÁ ESTABA EL ERROR: Faltaba agregar Clock a la lista de importaciones
import { Sun, Moon, Plus, PenSquare, LogOut, MenuSquare, Clock } from "lucide-react";

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
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // 🌙 LA MAGIA DEL DARK MODE DEFINITIVO
  // Esto le inyecta la clase "dark" directo al HTML de la página, sin fallas.
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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
      await supabase.from('products').update({ name, description, price: parseInt(price) }).eq('id', editingId);
    } else {
      await supabase.from('products').insert([{ name, description, price: parseInt(price), image_url: "", in_stock: true }]);
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
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleStock = async (id: number, currentStock: boolean) => {
    await supabase.from('products').update({ in_stock: !currentStock }).eq('id', id);
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que quieres borrar este café?")) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
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
          <input type="password" placeholder="Ingresa tu PIN" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full border-2 border-neutral-200 p-4 rounded-xl mb-6 text-center text-2xl tracking-widest text-black focus:outline-none focus:border-neutral-900 transition-colors" />
          <button type="submit" className="w-full bg-neutral-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-colors">Entrar al Panel</button>
        </form>
      </div>
    );
  }

  // Ya no hace falta el <div className={isDarkMode ? "dark" : ""}> envolviendo todo
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300">
      <div className="p-4 pb-28 md:p-8">
        <div className="max-w-5xl mx-auto">
          
          <header className="flex justify-between items-center mb-8 bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700">
            <h1 className="text-2xl font-black text-neutral-800 dark:text-white">Panel Admin</h1>
            <div className="flex gap-2">
              {/* BOTÓN DARK MODE */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                title="Cambiar tema"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-red-500 font-bold bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors px-4 py-2 rounded-lg">
                <LogOut className="w-4 h-4" /> Salir
              </button>
            </div>
          </header>

          {/* TAB: PRODUCTOS */}
          {activeTab === "products" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <section className="bg-white dark:bg-neutral-800 p-6 rounded-3xl shadow-sm h-fit md:col-span-1 sticky top-4 border border-neutral-100 dark:border-neutral-700">
                <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white flex items-center gap-2">
                  {editingId ? <><PenSquare className="w-5 h-5 text-[#009EE3]" /> Modificar</> : <><Plus className="w-5 h-5 text-emerald-500" /> Nuevo Café</>}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input required type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-neutral-100 dark:border-neutral-700 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white focus:border-[#009EE3] focus:outline-none transition-colors" />
                  <textarea required placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-2 border-neutral-100 dark:border-neutral-700 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white resize-none h-24 focus:border-[#009EE3] focus:outline-none transition-colors" />
                  <input required type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border-2 border-neutral-100 dark:border-neutral-700 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white focus:border-[#009EE3] focus:outline-none transition-colors" />
                  <div className="flex gap-2 mt-2">
                    <button disabled={isLoading} type="submit" className="flex-1 bg-[#009EE3] hover:bg-[#008AC7] text-white font-bold py-3 rounded-xl transition-colors shadow-sm">{isLoading ? "..." : (editingId ? "Guardar Cambios" : "Crear Café")}</button>
                    {editingId && <button type="button" onClick={resetForm} className="bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white font-bold py-3 px-4 rounded-xl transition-colors">Cancelar</button>}
                  </div>
                </form>
              </section>

              <section className="md:col-span-2">
                <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white flex items-center gap-2">
                  <MenuSquare className="w-5 h-5 text-neutral-500" /> Menú ({products.length})
                </h2>
                <ProductTable products={products} onEdit={handleEdit} onToggleStock={handleToggleStock} onDelete={handleDelete} />
              </section>
            </div>
          )}

          {/* TAB: COMPARTIR */}
          {activeTab === "share" && <ShareTab />}

          {/* TAB: HORARIOS */}
          {activeTab === "schedule" && (
            <div className="flex flex-col items-center justify-center mt-10 bg-white dark:bg-neutral-800 p-12 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-700 text-center">
              <div className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-full mb-6">
                <Clock className="w-16 h-16 text-neutral-400 dark:text-neutral-500" />
              </div>
              <h2 className="text-2xl font-black mb-3 text-neutral-900 dark:text-white">Módulo Horarios</h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                Acá vamos a conectar la base de datos para abrir y cerrar el local manualmente, y configurar horarios automáticos.
              </p>
            </div>
          )}

        </div>
        
        {/* NAVEGACIÓN BOTTOM */}
        <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}