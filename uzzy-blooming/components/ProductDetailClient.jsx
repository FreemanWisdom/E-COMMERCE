"use client";

import { useState } from 'react';
import Image from 'next/image';
import ProductCard from './ProductCard';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { useCart } from '../context/CartContext';
import BackButton from './ui/BackButton';

export default function ProductDetailClient({ product, relatedProducts }) {
  const { addToCart, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  
  // Mock sizes for demo purposes
  const sizes = ["Standard", "Large", "Custom"];

  const handleAddToCart = () => {
    addToCart(product, selectedSize || "Standard");
    if (openCart) openCart();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32">
      <section className="container-padded py-12">
        <BackButton className="mb-8" />
        
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-8 lg:pl-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/5 text-primary border-none py-1 px-4 text-xs font-bold tracking-widest uppercase">
                  {product.category}
                </Badge>
                <div className="h-px flex-1 bg-gray-100"></div>
              </div>
              <h1 className="font-[var(--font-heading)] text-5xl font-black tracking-tight text-primary lg:text-6xl">
                {product.name}
              </h1>
              <p className="text-3xl font-light tracking-tight text-accent">
                ${product.price ? product.price.toLocaleString() : '0.00'}
              </p>
            </div>

            <div className="space-y-6 border-y border-gray-100 py-8">
              <p className="text-lg leading-relaxed text-muted/90">
                {product.description}
              </p>

              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-primary">Option</p>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`h-12 min-w-[100px] rounded-full border-2 px-6 text-sm font-bold transition-all ${
                        (selectedSize === size || (!selectedSize && size === "Standard"))
                        ? 'border-primary bg-primary text-white shadow-lg'
                        : 'border-gray-200 text-muted hover:border-primary hover:text-primary bg-white'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className="group relative flex h-16 flex-1 items-center justify-center overflow-hidden rounded-full bg-primary text-white transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                <span className="relative z-10 font-bold tracking-widest uppercase">Add to Cart</span>
                <div className="absolute inset-0 z-0 bg-accent translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white"></div>
              </button>
              
              <button className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-primary transition-all hover:border-rose hover:text-rose">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5L12 21z"/></svg>
              </button>
            </div>
            
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                In Stock
              </div>
              <div className="flex items-center gap-2 underline underline-offset-4 decoration-accent/30 cursor-help">
                Shipping Info
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="font-[var(--font-heading)] text-3xl font-black tracking-tight text-primary">Related Treasures</h2>
              <div className="h-px flex-1 mx-12 bg-gray-100 hidden md:block"></div>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item, index) => (
                <div key={item.id} className="animate-floatIn" style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
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
