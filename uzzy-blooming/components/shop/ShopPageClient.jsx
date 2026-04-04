"use client";

import { useMemo, useState } from 'react';
import ProductCard from '../ProductCard';
import FilterSidebar from '../FilterSidebar';
import Button from '../ui/Button';

const PAGE_SIZE = 12;

export default function ShopPageClient({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(2000);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const categoryOk = activeCategory === 'all' || product.category === activeCategory;
      const priceOk = product.price <= priceRange;
      return categoryOk && priceOk;
    });
  }, [activeCategory, priceRange, products]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const goToPage = (nextPage) => {
    const safe = Math.max(1, Math.min(nextPage, pageCount));
    setPage(safe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32">
      <section className="container-padded py-12">
        {/* Page Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-[var(--font-heading)] text-5xl font-black tracking-tight text-primary">
              Our Collection
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted/80 leading-relaxed">
              Curated essentials for modern living. Explore our hand-picked selection of premium home goods.
            </p>
          </div>
          <div className="text-sm font-medium text-muted">
            Showing {visible.length} of {filtered.length} products
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Filters */}
          <aside className="sticky top-24 self-start">
            <FilterSidebar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(value) => {
                setActiveCategory(value);
                setPage(1);
              }}
              priceRange={priceRange}
              onPriceRangeChange={(value) => {
                setPriceRange(value);
                setPage(1);
              }}
              products={products}
            />
          </aside>

          {/* Product Grid */}
          <div className="space-y-12">
            {visible.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white p-12 text-center animate-fadeIn">
                <div className="mb-6 rounded-full bg-gray-50 p-6 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <h3 className="text-xl font-bold text-primary">No products found</h3>
                <p className="mt-2 text-muted">Try adjusting your filters to find what you&apos;re looking for.</p>
                <button 
                  onClick={() => { setActiveCategory('all'); setPriceRange(2000); }} 
                  className="mt-6 font-bold text-primary underline underline-offset-4 hover:text-accent transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-floatIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex items-center justify-center gap-4 py-8 border-t border-gray-100 mt-16">
                <Button 
                  variant="secondary" 
                  onClick={() => goToPage(page - 1)} 
                  disabled={page === 1}
                  className="!px-6 !py-3 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {[...Array(pageCount)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`h-10 w-10 rounded-full text-sm font-bold transition-all ${
                        page === i + 1 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-white text-primary hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === pageCount}
                  className="!px-6 !py-3 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Demo Banner */}
      <div className="bg-primary text-white py-4 text-center text-xs font-bold uppercase tracking-[0.2em]">
        This is a demo store built by CodeCrafting
      </div>
    </div>
  );
}
