"use client";

import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '../lib/currency';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <article className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr_auto_auto_auto] gap-6 items-center p-6 bg-white rounded-[2rem] shadow-sm border border-gray-50 hover:shadow-xl transition-all group">
      {/* Product Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-50 shadow-inner">
        <Link href={`/product/${item.id}`}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="120px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-center space-y-1">
        <h3 className="font-[var(--font-heading)] text-lg font-black tracking-tight text-primary transition-colors hover:text-accent">
          <Link href={`/product/${item.id}`}>{item.name}</Link>
        </h3>
        <p className="text-[10px] uppercase font-black tracking-widest text-muted/60">
          {item.size || "Standard"}
        </p>
        <button 
          onClick={() => onRemove(item.id, item.size)}
          className="md:hidden text-[10px] uppercase font-black tracking-widest text-rose hover:text-rose-600 mt-2 text-left"
        >
          Remove Item
        </button>
      </div>

      {/* Price (Desktop only) */}
      <div className="hidden md:flex w-24 justify-center items-center">
         <span className="text-sm font-light text-muted">{formatCurrency(item.price)}</span>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center gap-4 w-32 justify-center">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.size)}
          disabled={item.quantity <= 1}
          className="h-8 w-8 rounded-full border border-gray-100 flex items-center justify-center text-primary disabled:opacity-20 hover:bg-gray-50 transition-all font-bold"
        >
          -
        </button>
        <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.size)}
          className="h-8 w-8 rounded-full border border-gray-100 flex items-center justify-center text-primary hover:bg-gray-50 transition-all font-bold"
        >
          +
        </button>
      </div>

      {/* Total Price & Remove Button */}
      <div className="flex flex-col items-end gap-2 w-24">
         <span className="text-lg font-black tracking-tighter text-primary">
            {formatCurrency(item.price * item.quantity)}
         </span>
         <button 
           onClick={() => onRemove(item.id, item.size)}
           className="hidden md:block text-[9px] uppercase font-black tracking-[0.2em] text-muted/40 hover:text-rose transition-colors"
         >
           Remove
         </button>
      </div>
    </article>
  );
}
