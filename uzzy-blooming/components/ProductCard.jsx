"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/currency';

export default function ProductCard({ product }) {
  const { addToCart, openCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCart();
  };

  return (
    <Link href={`/product/${product.id}`} className="group relative flex flex-col gap-6 w-full">
      {/* Image Wrapper */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-gray-50 transition-all duration-700 hover:shadow-3xl border border-gray-100/50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-10 translate-y-12 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
           <button 
             onClick={handleAddToCart}
             className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-white font-black uppercase tracking-widest text-[10px] text-primary shadow-2xl transition-all hover:bg-accent hover:text-white"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14 m-7-7l7 7-7 7"/></svg>
             ADD TO COLLECTION.
           </button>
        </div>
        
        {/* Subtle Badge */}
        <div className="absolute left-6 top-6">
           <span className="rounded-full bg-white/20 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/30 backdrop-saturate-150">
             Artisan Series.
           </span>
        </div>
      </div>

      {/* Text Info */}
      <div className="flex flex-col items-center text-center space-y-2 px-2 transition-transform duration-500 group-hover:-translate-y-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">{product.category}</span>
        <h3 className="font-[var(--font-heading)] text-xl font-black text-primary transition-colors group-hover:text-accent sm:text-2xl">{product.name}</h3>
        <p className="text-sm font-black text-primary/80 bg-gray-50 px-4 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-all">{formatCurrency(product.price)}</p>
      </div>

      {/* Hover Background Accent */}
      <div className="absolute -inset-x-4 -inset-y-6 -z-10 rounded-[3rem] bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-2xl border border-gray-100"></div>
    </Link>
  );
}
