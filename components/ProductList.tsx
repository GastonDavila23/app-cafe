import ProductCard, { Product } from "./ProductCard";

interface ProductListProps {
  products: Product[] | null;
}

export default function ProductList({ products }: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className="px-5 max-w-md mx-auto text-center py-20">
        <p className="text-neutral-400 italic">
          No se encontraron productos en el menú...
        </p>
      </div>
    );
  }

  return (
    <section className="px-5 max-w-md mx-auto grid grid-cols-1 gap-8 md:max-w-4xl md:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}