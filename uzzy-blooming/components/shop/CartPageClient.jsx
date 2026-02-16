"use client";

import Link from 'next/link';
import CartItem from '../CartItem';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../lib/currency';

import BackButton from '../ui/BackButton';

export default function CartPageClient() {
  const { items, subtotal, removeFromCart, updateQuantity } = useCart();

  return (
    <section className="container-padded section-space">
      <BackButton className="mb-6" />
      <h1 className="font-[var(--font-heading)] text-4xl text-primary">Your Cart</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.length ? (
            items.map((item) => (
              <CartItem
                key={`${item.id}-${item.size || 'std'}`}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))
          ) : (
            <p className="rounded-2xl bg-neutral-50 p-6 text-sm text-primary/80">Your cart is empty.</p>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-neutral-100 bg-white p-5">
          <h2 className="text-lg font-bold text-primary">Summary</h2>
          <div className="mt-4 flex items-center justify-between text-sm text-primary/80">
            <span>Subtotal</span>
            <span className="font-bold text-primary">{formatCurrency(subtotal)}</span>
          </div>
          <Link href="/checkout" className="mt-5 block">
            <Button className="w-full" disabled={!items.length}>
              Proceed to Checkout
            </Button>
          </Link>
        </aside>
      </div>
    </section>
  );
}

