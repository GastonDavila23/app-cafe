"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Sun, Moon, LogOut, MenuSquare } from "lucide-react";

// Componentes atómicos
import LoginForm from "@/components/admin/LoginForm";
import ProductForm, { ProductFormData } from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";
import AdminNav from "@/components/admin/AdminNav";
import ShareTab from "@/components/admin/ShareTab";
import ScheduleTab from "@/components/admin/ScheduleTab";

export interface AdminProduct extends ProductFormData {
  id: number;
  in_stock: boolean;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  const handleLogin = (pin: string) => {
    if (pin === "2154") { 
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      alert("PIN incorrecto 🕵️‍♂️");
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
    
    if (!error && data) {
      const formattedData = data.map((item) => ({
        ...item,
        options: item.options || []
      }));
      
      setProducts(formattedData as AdminProduct[]); 
    }
  };

  const handleSubmitProduct = async (formData: ProductFormData) => {
  setIsLoading(true);
  
  const { error } = editingProduct 
    ? await supabase.from('products').update(formData).eq('id', editingProduct.id)
    : await supabase.from('products').insert([{ ...formData, image_url: "", in_stock: true }]);
  
  if (error) {
    console.error("Error de Supabase:", error.message);
    alert("No se pudo guardar: " + error.message);
  } else {
    alert("¡Café guardado con éxito! ☕");
    setEditingProduct(null);
    fetchProducts();
  }
  
  setIsLoading(false);
};

  const handleEditClick = (product: AdminProduct) => {
    setEditingProduct(product);
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

  if (!isAuthenticated) return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300">
      <div className="p-4 pb-28 md:p-8">
        <div className="max-w-5xl mx-auto">
          
          {/* HEADER ADMIN */}
          <header className="flex justify-between items-center mb-8 bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700">
            <h1 className="text-2xl font-black text-neutral-800 dark:text-white">Panel Admin</h1>
            <div className="flex gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-lg transition-colors">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-red-500 font-bold bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" /> Salir
              </button>
            </div>
          </header>

          {/* CONTENIDO SEGÚN LA PESTAÑA */}
          {activeTab === "products" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Formulario Atómico */}
              <ProductForm 
                initialData={editingProduct} 
                onSubmit={handleSubmitProduct} 
                onCancel={() => setEditingProduct(null)} 
                isLoading={isLoading} 
              />

              <section className="md:col-span-2">
                <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white flex items-center gap-2">
                  <MenuSquare className="w-5 h-5 text-neutral-500" /> Menú ({products.length})
                </h2>
                <ProductTable 
                  products={products} 
                  onEdit={handleEditClick} 
                  onToggleStock={handleToggleStock} 
                  onDelete={handleDelete} 
                />
              </section>
            </div>
          )}

          {activeTab === "share" && <ShareTab />}
          {activeTab === "schedule" && <ScheduleTab />}

        </div>
        
        {/* NAVEGACIÓN BOTTOM */}
        <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}