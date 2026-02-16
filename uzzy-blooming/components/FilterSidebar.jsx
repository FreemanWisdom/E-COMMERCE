"use client";

import { useMemo } from 'react';

export default function FilterSidebar({
  categories,
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  products
}) {
  const maxPrice = useMemo(
    () => Math.max(...products.map((item) => item.price), 10000),
    [products]
  );

  return (
    <aside className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-5">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-primary">Category</h3>
        <div className="mt-3 space-y-2">
          <button
            className={`block text-sm ${activeCategory === 'all' ? 'font-bold text-accent' : 'text-primary/80'}`}
            onClick={() => onCategoryChange('all')}
          >
            All ({products.length})
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`block text-sm ${activeCategory === category.id ? 'font-bold text-accent' : 'text-primary/80'
                }`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-primary">Price</h3>
        <div className="mt-3 space-y-3">
          <input
            type="range"
            min="1000"
            max={maxPrice}
            value={priceRange}
            onChange={(event) => onPriceRangeChange(Number(event.target.value))}
            className="w-full"
          />
          <p className="text-sm text-primary/80">Up to NGN {priceRange.toLocaleString('en-NG')}</p>
        </div>
      </div>
    </aside>
  );
}
