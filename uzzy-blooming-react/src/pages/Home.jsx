
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import { getCategories, getProducts } from '../lib/products';

export default function Home() {
    const categories = getCategories();
    const products = getProducts();
    const bestSellers = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

    return (
        <>
            <section className="container-padded pt-6 pb-12 sm:py-16">
                <div
                    className="grid min-h-[500px] items-center gap-8 rounded-3xl bg-cover bg-center bg-no-repeat p-6 sm:p-12 lg:grid-cols-2"
                    style={{ backgroundImage: 'url(/background-header.jpg)' }}
                >
                    <div className="max-w-xl space-y-6 rounded-2xl bg-white/95 p-6 backdrop-blur-sm sm:p-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60">Female & Kids Fashion</p>
                        <h1 className="text-primary font-black">
                            Elevate Your Style with <span className="text-accent">UzzyBlooming</span>
                        </h1>
                        <p className="text-sm font-light leading-relaxed text-primary/80 sm:text-base">
                            Discover thoughtful fashion and lifestyle picks for women and kids, designed for elegance and
                            everyday confidence.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link to="/shop">
                                <Button className="px-8">Shop Now</Button>
                            </Link>
                            <Link to="/about">
                                <Button variant="secondary" className="px-8">Our Story</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container-padded section-space">
                <div className="mb-8 flex items-end justify-between border-b border-primary/5 pb-4">
                    <h2 className="text-primary uppercase tracking-tighter">Best Sellers</h2>
                    <Link to="/shop" className="text-sm font-semibold text-accent">
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
                <div className="rounded-3xl bg-primary px-6 py-10 text-white sm:px-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Limited Offer</p>
                    <h3 className="mt-2 text-3xl font-black">Fresh arrivals for school and travel</h3>
                    <p className="mt-3 max-w-2xl text-sm font-light text-white/85">
                        Enjoy up to 15% off selected categories this week. Build your wardrobe and utility collection in one
                        place.
                    </p>
                    <Link to="/shop" className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-primary">
                        Browse Deals
                    </Link>
                </div>
            </section>

            <section className="container-padded section-space">
                <h2 className="mb-8 text-primary uppercase tracking-tighter font-black">Testimonials</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {[
                        'Quality and fit are always great. Delivery was smooth.',
                        'I found school shoes and lunch bags for my kids in one order.',
                        'The store has practical items that still look stylish.'
                    ].map((quote) => (
                        <blockquote key={quote} className="rounded-2xl border border-primary/10 bg-white p-5 text-sm font-light leading-7 text-primary/80 italic">
                            "{quote}"
                        </blockquote>
                    ))}
                </div>
            </section>

            <section className="container-padded pb-16">
                <div className="rounded-3xl border border-primary/10 bg-white p-8 text-center">
                    <h2 className="text-primary uppercase tracking-tighter font-black">Join Our Newsletter</h2>
                    <p className="mt-2 text-sm font-light text-primary/80">Get updates on new drops, offers, and curated picks.</p>
                    <form className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 rounded-full border border-primary/20 px-4 py-2.5 text-sm outline-none focus:border-accent"
                        />
                        <Button type="submit">Subscribe</Button>
                    </form>
                </div>
            </section>
        </>
    );
}
