import { supabase } from "@/lib/supabase";
import WelcomeModal from "@/components/WelcomeModal";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import FloatingCart from "@/components/FloatingCart";

export const revalidate = 0;

export default async function Home() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    return <div className="text-center p-10 text-red-500">Error cargando el menú.</div>;
  }

  return (
    <main className="min-h-screen bg-neutral-100 pt-12 pb-28 px-5">
      <WelcomeModal /> 

      <Header />

      <FloatingCart />
      
      <ProductList products={products} />

      <BottomNav />
    </main>
  );
}