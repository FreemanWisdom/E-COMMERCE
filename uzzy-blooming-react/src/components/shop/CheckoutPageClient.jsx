

import { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../lib/products';

import BackButton from '../ui/BackButton';

export default function CheckoutPageClient() {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); const location = useLocation();

  const shipping = useMemo(() => (items.length ? 2500 : 0), [items.length]);
  const total = subtotal + shipping;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      clearCart();
      navigate('/checkout/success');
    }, 900);
  };

  return (
    <section className="container-padded section-space">
      <BackButton className="mb-6" />
      <h1 className="font-[var(--font-heading)] text-4xl text-primary">Checkout</h1>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5 rounded-2xl border border-neutral-100 bg-white p-5">
          <h2 className="text-lg font-bold text-primary">Customer Info</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First Name" required />
            <Input label="Last Name" required />
          </div>
          <Input type="email" label="Email Address" required />
          <Input label="Phone Number" required />

          <h2 className="pt-2 text-lg font-bold text-primary">Shipping Address</h2>
          <Input label="Street Address" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="City" required />
            <Input label="State" required />
          </div>

          <h2 className="pt-2 text-lg font-bold text-primary">Payment Method</h2>
          <div className="space-y-2 text-sm text-primary/80">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" defaultChecked />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" />
              Bank Transfer (Coming Soon)
            </label>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-neutral-100 bg-white p-5">
          <h2 className="text-lg font-bold text-primary">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm text-primary/80">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-100 pt-3 font-bold text-primary">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <Button type="submit" className="mt-5 w-full" disabled={!items.length || loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </aside>
      </form>
    </section>
  );
}

