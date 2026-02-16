import ProductCard from '../../../components/ProductCard';
import { getProductsByCategory } from '../../../lib/products';

export async function generateMetadata({ params }) {
  return {
    title: `Category: ${params.slug}`,
    description: `Shop ${params.slug} products at UZZYBLOOMING HOMES.`
  };
}

export default function CategoryPage({ params }) {
  const products = getProductsByCategory(params.slug);
  const label = params.slug.replace(/-/g, ' ');

  return (
    <section className="container-padded section-space">
      <div className="mb-8">
        <h1 className="font-[var(--font-heading)] text-4xl capitalize text-cocoa">{label}</h1>
        <p className="mt-2 text-sm text-cocoa/80">{products.length} products found.</p>
      </div>
      {products.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-sand p-6 text-sm text-cocoa/80">No products in this category yet.</p>
      )}
    </section>
  );
}
