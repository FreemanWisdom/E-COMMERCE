import Link from 'next/link';
import Button from '../../../components/ui/Button';

export const metadata = {
  title: 'Order Confirmed',
  description: 'Your order has been placed successfully.'
};

export default function CheckoutSuccessPage() {
  return (
    <section className="container-padded section-space">
      <div className="mx-auto max-w-xl rounded-3xl border border-neutral-100 bg-white p-8 text-center shadow-soft">
        <h1 className="font-[var(--font-heading)] text-4xl text-primary">Order Confirmed</h1>
        <p className="mt-3 text-sm leading-7 text-primary/80">
          Thank you for shopping with UZZYBLOOMING HOMES. We have received your order and will contact you with
          delivery details.
        </p>
        <Link href="/shop" className="mt-5 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </section>
  );
}
