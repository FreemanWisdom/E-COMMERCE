"use client";

import Image from 'next/image';
import Link from 'next/link';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { formatCurrency } from '../lib/currency';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, openSidebar } = useCart();

  return (
    <article className="group rounded-2xl border border-neutral-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/product/${product.slug}`} className="block overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={600}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="mt-3 space-y-2">
        <Badge>{product.category.name}</Badge>
        <h3 className="line-clamp-1 text-sm font-black uppercase tracking-tight text-primary">{product.name}</h3>
        <p className="text-sm font-medium text-accent">{formatCurrency(product.price, product.currency)}</p>
        <div className="flex gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="flex-1 rounded-full border border-cocoa/20 px-4 py-2 text-center text-xs font-semibold text-primary transition hover:bg-sand"
          >
            View
          </Link>
          <Button
            className="flex-1 px-4 py-2 text-xs"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              openSidebar();
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}

