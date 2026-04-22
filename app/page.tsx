import { supabase } from "@/lib/supabase";
import ProductCard, { Product } from "@/components/ProductCard";
import WelcomeModal from "@/components/WelcomeModal";

export const revalidate = 0; // Sin caché, siempre datos frescos

export default async function Home() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    return <div className="text-center p-10 text-red-500">Error cargando el menú.</div>;
  }

  return (
    <main className="min-h-screen bg-neutral-100 py-10 px-4">
      {/* El modal dinámico */}
      <WelcomeModal /> 
      
      <header className="max-w-md mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-neutral-800 mb-2">El Puestito Café</h1>
        <p className="text-neutral-600 text-lg">Escanea, pide y disfruta tu café al instante.</p>
      </header>

      <section className="max-w-md mx-auto grid grid-cols-1 gap-6 md:max-w-4xl md:grid-cols-2">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}