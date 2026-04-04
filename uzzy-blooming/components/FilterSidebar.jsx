"use client";

import { useMemo } from 'react';
import { formatCurrency } from '../lib/currency';

export default function FilterSidebar({
  categories,
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  products
}) {
  const maxPrice = useMemo(
    () => Math.max(...products.map((item) => item.price), 2000),
    [products]
  );
  
  const counts = useMemo(() => {
    return products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
  }, [products]);

  return (
    <div className="space-y-12">
      {/* Category Filter */}
      <div className="space-y-6">
        <h3 className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 border-b border-gray-100 pb-4">
           Collections.
        </h3>
        <div className="space-y-3">
          <button
            className={`group flex items-center justify-between w-full text-sm transition-all ${
              activeCategory === 'all' 
              ? 'font-black text-primary translate-x-2' 
              : 'text-muted-foreground/60 hover:text-primary hover:translate-x-1'
            }`}
            onClick={() => onCategoryChange('all')}
          >
            <span className="flex items-center gap-3">
               <span className={`h-1 w-1 rounded-full bg-accent transition-opacity ${activeCategory === 'all' ? 'opacity-100' : 'opacity-0'}`}></span>
               All Items
            </span>
            <span className="text-[10px] font-bold opacity-40 group-hover:opacity-100 transition-opacity">({products.length})</span>
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              className={`group flex items-center justify-between w-full text-sm transition-all ${
                activeCategory === category 
                ? 'font-black text-primary translate-x-2' 
                : 'text-muted-foreground/60 hover:text-primary hover:translate-x-1'
              }`}
              onClick={() => onCategoryChange(category)}
            >
              <span className="flex items-center gap-3">
                 <span className={`h-1 w-1 rounded-full bg-accent transition-opacity ${activeCategory === category ? 'opacity-100' : 'opacity-0'}`}></span>
                 {category}
              </span>
              <span className="text-[10px] font-bold opacity-40 group-hover:opacity-100 transition-opacity">({counts[category] || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-6">
        <h3 className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 border-b border-gray-100 pb-4">
           Price Range.
        </h3>
        <div className="space-y-6 px-1">
          <input
            type="range"
            min="0"
            max={maxPrice}
            step="50"
            value={priceRange}
            onChange={(event) => onPriceRangeChange(Number(event.target.value))}
            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex items-center justify-between">
             <span className="text-[10px] font-black tracking-widest text-muted/40 uppercase">Max. Budget</span>
             <span className="text-sm font-black text-primary bg-primary/5 px-4 py-1 rounded-full">
               {formatCurrency(priceRange)}
             </span>
          </div>
        </div>
      </div>
      
      {/* Featured Banner Placeholder (Subtle) */}
      <div className="pt-8 overflow-hidden">
         <div className="rounded-3xl bg-secondary p-8 space-y-4 border border-secondary transition-all hover:bg-white hover:border-gray-100 hover:shadow-2xl group cursor-default">
            <h4 className="font-black text-xs uppercase tracking-widest text-primary mb-2">Curators Note.</h4>
            <p className="text-xs font-light leading-relaxed text-muted/80">
               Each piece in our collection is hand-selected by our design collective for its unique artisan quality.
            </p>
         </div>
      </div>
    </div>
  );
}
