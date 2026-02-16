"use client";

import { useMemo, useState } from 'react';
import ProductCard from '../ProductCard';
import CategoryCard from '../CategoryCard';
import FilterSidebar from '../FilterSidebar';
import Button from '../ui/Button';

const PAGE_SIZE = 12;

export default function ShopPageClient({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(30000);
  const [page, setPage] = useState(1);

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
        <h1 className="font-[var(--font-heading)] text-4xl text-primary">Shop Collection</h1>
        <p className="mt-2 text-sm text-primary/80">Browse all styles and essentials.</p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 font-[var(--font-heading)] text-2xl text-primary">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
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
