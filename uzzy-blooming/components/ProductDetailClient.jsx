"use client";

import { useState } from 'react';
import Image from 'next/image';
import ProductCard from './ProductCard';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/currency';
import BackButton from './ui/BackButton';

export default function ProductDetailClient({ product, relatedProducts }) {
  const { addToCart, openSidebar } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || null);

  return (
    <section className="container-padded section-space space-y-12">
      <BackButton className="-mt-4 mb-4" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-primary/20 bg-white">
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={1100}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <Badge>{product.category.name}</Badge>
          <h1 className="font-[var(--font-heading)] text-4xl text-primary">{product.name}</h1>
          <p className="text-2xl font-bold text-accent">{formatCurrency(product.price, product.currency)}</p>
          <p className="text-sm leading-7 text-primary/80">{product.description}</p>

          {product.sizes.length ? (
            <div>
              <p className="mb-2 text-sm font-bold text-primary">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`rounded-full border px-4 py-1.5 text-sm ${selectedSize === size
                      ? 'border-rose bg-blush text-primary'
                      : 'border-primary/20 text-primary/80'
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              addToCart(product, selectedSize);
              openSidebar();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <div>
        <h2 className="font-[var(--font-heading)] text-3xl text-cocoa">Related Products</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

