import ProductCard from '../../../components/ProductCard';
import BackButton from '../../../components/ui/BackButton';
import { products } from '../../../lib/mockData/products';

export async function generateMetadata({ params }) {
  const label = params.slug.replace(/-/g, ' ');
  return {
    title: `${label.charAt(0).toUpperCase() + label.slice(1)} | Uzzyblooming Homes`,
    description: `Shop our curated ${label} collection.`
  };
}

export default function CategoryPage({ params }) {
  const label = params.slug.replace(/-/g, ' ');
  
  // In our mock data, category is a simple string. 
  // We'll match case-insensitively or formatted.
  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === label.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32">
      <section className="container-padded py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
           <div className="space-y-4">
              <BackButton className="mb-4" />
              <h1 className="font-[var(--font-heading)] text-5xl font-black tracking-tight text-primary capitalize">{label}</h1>
           </div>
           <p className="text-sm font-bold uppercase tracking-widest text-muted">{filteredProducts.length} Artisan Pieces</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="animate-floatIn" style={{ animationDelay: `${index * 100}ms` }}>
                 <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-[3rem] bg-white border border-gray-100 shadow-3xl">
             <div className="mb-6 rounded-full bg-gray-50 p-8 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
             </div>
             <h2 className="text-2xl font-black text-primary">No pieces found in this category</h2>
             <p className="mt-2 text-muted max-w-sm">We are currently curating new items for this collection. Please check back soon.</p>
          </div>
        )}
      </section>
      
      {/* Demo Banner */}
      <div className="bg-primary text-white py-4 text-center text-xs font-bold uppercase tracking-[0.2em] mt-24">
        This is a demo store built by CodeCrafting
      </div>
    </div>
  );
}
