
import { Link } from 'react-router-dom';

export default function CheckoutSuccess() {
    return (
        <section className="container-padded section-space">
            <div className="mx-auto max-w-xl rounded-3xl border border-neutral-100 bg-white p-8 text-center shadow-soft">
                <h1 className="text-4xl text-primary lg:text-5xl">Order Successful!</h1>
                <p className="mt-3 text-sm leading-7 text-primary/80">
                    Thank you for shopping with UZZYBLOOMING HOMES. We have received your order and will contact you with
                    delivery details.
                </p>
                <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90">
                    Continue Shopping
                </Link>
            </div>
        </section>
    );
}
