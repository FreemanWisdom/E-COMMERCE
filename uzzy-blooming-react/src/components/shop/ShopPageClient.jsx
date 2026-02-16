
import { useMemo, useState } from 'react';
import ProductCard from '../ProductCard';
import CategoryCard from '../CategoryCard';
import FilterSidebar from '../FilterSidebar';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../lib/products';

const PAGE_SIZE = 12;

export default function ShopPageClient({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(30000);
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);


  const filtered = useMemo(() => {
    return products.filter((product) => {
      const categoryOk = activeCategory === 'all' || product.category.id === activeCategory;
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
  };

  return (
    <section className="container-padded section-space">
      <div className="mb-8">
        <h1 className="text-4xl text-primary">Shop Collection</h1>
        <p className="mt-2 text-sm text-primary/80">Browse all styles and essentials.</p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl text-primary">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <Button variant="secondary" onClick={() => setShowMobileFilters(true)} className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-9.75 0h9.75" />
          </svg>
          Filters
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
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
        </div>

        {/* Mobile Filter Drawer Overlay */}
        <div
          className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setShowMobileFilters(false)}
        />

        {/* Mobile Filter Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 z-50 w-[300px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${showMobileFilters ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-primary/10 p-5">
              <h2 className="text-lg font-bold text-primary">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="rounded-full p-2 text-primary/60 hover:bg-neutral-light transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
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
              <Button
                className="mt-8 w-full"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="rounded-xl bg-sand p-6 text-sm text-primary/80">No products match this filter.</p>
          ) : null}

          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" onClick={() => goToPage(page - 1)} disabled={page === 1}>
              Prev
            </Button>
            <span className="text-sm text-primary/80">
              Page {page} of {pageCount}
            </span>
            <Button
              variant="secondary"
              onClick={() => goToPage(page + 1)}
              disabled={page === pageCount}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
