import Link from 'next/link';

import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import { getCategories, getProducts } from '../lib/products';

export default function HomePage() {
  const categories = getCategories();
  const products = getProducts();
  const bestSellers = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <>
      <section className="container-padded section-space">
        <div
          className="relative grid min-h-[600px] items-center overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat p-8 sm:p-12"
          style={{ backgroundImage: 'url(/background-header.jpg)' }}
        >
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

          <div className="relative z-10 max-w-xl space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">Female & Kids Fashion</p>
            <h1 className="font-[var(--font-heading)] text-5xl font-black tracking-tighter text-white sm:text-6xl lg:text-7xl">
              Elevate Your <span className="text-rose underline decoration-rose/30 underline-offset-8">Style</span> with UZZYBLOOMING
            </h1>
            <p className="max-w-lg text-sm font-light leading-7 text-white/90 sm:text-lg">
              Discover thoughtful fashion and lifestyle picks for women and kids, designed for elegance and
              everyday confidence.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/shop">
                <Button className="px-10 py-6 text-base shadow-xl transition-all hover:scale-105 active:scale-95">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" className="border-white/20 bg-white/5 px-10 py-6 text-base text-white backdrop-blur-md hover:bg-white/10">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>



      <section className="container-padded section-space">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-[var(--font-heading)] text-3xl font-black tracking-tighter text-cocoa">Best Sellers</h2>
          <Link href="/shop" className="text-sm font-semibold text-rose">
            Shop collection
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-padded pb-8">
        <div className="rounded-3xl bg-cocoa px-6 py-10 text-white sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Limited Offer</p>
          <h3 className="mt-2 font-[var(--font-heading)] text-3xl font-black tracking-tighter">Fresh arrivals for school and travel</h3>
          <p className="mt-3 max-w-2xl text-sm font-light text-white/85">
            Enjoy up to 15% off selected categories this week. Build your wardrobe and utility collection in one
            place.
          </p>
          <Link href="/shop" className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-cocoa">
            Browse Deals
          </Link>
        </div>
      </section>

      <section className="container-padded section-space">
        <h2 className="font-[var(--font-heading)] text-3xl font-black tracking-tighter text-cocoa">Testimonials</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            'Quality and fit are always great. Delivery was smooth.',
            'I found school shoes and lunch bags for my kids in one order.',
            'The store has practical items that still look stylish.'
          ].map((quote) => (
            <blockquote key={quote} className="rounded-2xl border border-cocoa/10 bg-white p-5 text-sm font-light leading-7 text-cocoa/80 italic">
              "{quote}"
            </blockquote>
          ))}
        </div>
      </section>

      <section className="container-padded pb-16">
        <div className="rounded-3xl border border-cocoa/10 bg-white p-8 text-center">
          <h2 className="font-[var(--font-heading)] text-3xl font-black tracking-tighter text-cocoa">Join Our Newsletter</h2>
          <p className="mt-2 text-sm font-light text-cocoa/80">Get updates on new drops, offers, and curated picks.</p>
          <form className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-cocoa/20 px-4 py-2.5 text-sm outline-none focus:border-rose"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </>
  );
}
