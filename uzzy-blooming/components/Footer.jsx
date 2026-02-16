import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-50">
      <div className="container-padded section-space grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-[var(--font-heading)] text-lg text-primary">UZZYBLOOMING HOMES</h3>
          <p className="mt-2 text-sm text-primary/80">
            Female and kids fashion with practical lifestyle essentials.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary/80">
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary">Customer Care</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary/80">
            <li>
              <Link href="/delivery-information" className="hover:text-accent">Delivery Information</Link>
            </li>
            <li>
              <Link href="/returns-policy" className="hover:text-accent">Returns Policy</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-accent">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/customer-care" className="hover:text-accent">Help Center</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary/80">
            <li>support@uzzybloominghomes.com</li>
            <li>+234 800 000 0000</li>
            <li>Lagos, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-100 py-4 text-center text-xs text-primary/70">
        {new Date().getFullYear()} UZZYBLOOMING HOMES. All rights reserved.
      </div>
    </footer>
  );
}
