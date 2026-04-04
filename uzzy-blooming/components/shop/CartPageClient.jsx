"use client";

import Link from 'next/link';
import Image from 'next/image';
import CartItem from '../CartItem';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../lib/currency';
import BackButton from '../ui/BackButton';

export default function CartPageClient() {
  const { items, subtotal, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <section className="container-padded min-h-[70vh] flex flex-col items-center justify-center text-center animate-fadeIn pt-40">
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full"></div>
          <div className="relative h-40 w-40 rounded-full border border-gray-100 bg-white flex items-center justify-center shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted/40"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </div>
        </div>
        <h1 className="font-[var(--font-heading)] text-5xl font-black tracking-tight text-primary">Your cart is empty</h1>
        <p className="mt-4 max-w-sm text-lg text-muted/70 font-light leading-relaxed">
          Looks like you haven&apos;t added anything to your collection yet.
        </p>
        <Link href="/shop" className="mt-10 group relative overflow-hidden rounded-full bg-primary px-12 py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-105 active:scale-95">
           <span className="relative z-10 transition-colors group-hover:text-primary">Find Your Style</span>
           <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
        </Link>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32">
      <section className="container-padded py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
           <div className="space-y-4">
              <BackButton className="mb-4" />
              <h1 className="font-[var(--font-heading)] text-5xl font-black tracking-tight text-primary">Shopping Cart</h1>
           </div>
           <p className="text-sm font-bold uppercase tracking-widest text-muted">{items.length} {items.length === 1 ? 'Item' : 'Items'} selected</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <div className="grid grid-cols-[1fr_repeat(3,auto)] gap-8 px-8 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100 hidden md:grid">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted/60">Product Details</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-muted/60 w-24 text-center">Price</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-muted/60 w-32 text-center">Quantity</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-muted/60 w-24 text-right">Total</span>
            </div>
            
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.size || 'std'}`} className="animate-floatIn" style={{ animationDelay: `${index * 50}ms` }}>
                  <CartItem
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                </div>
              ))}
            </div>
            
            <Link href="/shop" className="inline-flex items-center gap-2 group text-sm font-bold text-primary hover:text-accent transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6"/></svg>
               Continue Shopping
            </Link>
          </div>

          <aside className="sticky top-24 h-fit">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-10 shadow-3xl border border-gray-100 backdrop-blur-md">
              <h2 className="font-[var(--font-heading)] text-2xl font-black tracking-tight text-primary mb-8 border-b border-gray-50 pb-6">Order Summary</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted/80">Subtotal</span>
                  <span className="font-bold text-primary">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted/80">Shipping</span>
                  <span className="font-bold text-emerald-500 uppercase tracking-widest text-[10px]">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted/80">Taxes</span>
                  <span className="font-bold text-primary">$0.00</span>
                </div>
                
                <div className="h-px bg-gray-100 my-2"></div>
                
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-primary">Total</span>
                  <div className="text-right">
                     <span className="text-3xl font-black text-primary tracking-tighter">{formatCurrency(subtotal)}</span>
                     <p className="text-[10px] uppercase font-bold text-muted/60 tracking-widest mt-1">USD (Inc. Tax)</p>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="mt-10 block group">
                <button 
                  className="w-full h-16 rounded-full bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:-translate-y-1 active:translate-y-0"
                >
                  Proceed to Checkout
                </button>
              </Link>
              
              <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale pointer-events-none">
                 <div className="h-5 w-8 bg-gray-200 rounded"></div>
                 <div className="h-5 w-8 bg-gray-300 rounded"></div>
                 <div className="h-5 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            <p className="mt-6 text-[10px] text-center text-muted/60 uppercase tracking-widest font-bold">
               Secure Checkout Guaranteed
            </p>
          </aside>
        </div>
      </section>
      
      {/* Demo Banner */}
      <div className="bg-primary text-white py-4 text-center text-xs font-bold uppercase tracking-[0.2em] mt-24">
        This is a demo store built by CodeCrafting
      </div>
    </div>
  );
}
