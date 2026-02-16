import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-neutral-light">
      <div className="container-padded py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">UZZYBLOOMING HOMES</h3>
            <p className="text-sm leading-6 text-primary/70">
              Thoughtful fashion and lifestyle picks for women and kids. Curated with care for your everyday comfort.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/shop" className="text-sm text-primary/70 hover:text-accent">New Arrivals</Link></li>
              <li><Link to="/shop" className="text-sm text-primary/70 hover:text-accent">Women's Fashion</Link></li>
              <li><Link to="/shop" className="text-sm text-primary/70 hover:text-accent">Kids' Collections</Link></li>
              <li><Link to="/shop" className="text-sm text-primary/70 hover:text-accent">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/customer-care" className="text-sm text-primary/70 hover:text-accent">Customer Care</Link></li>
              <li><Link to="/delivery-information" className="text-sm text-primary/70 hover:text-accent">Delivery Info</Link></li>
              <li><Link to="/returns-policy" className="text-sm text-primary/70 hover:text-accent">Returns Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-sm text-primary/70 hover:text-accent">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Contact</h3>
            <p className="text-sm text-primary/70">Phone: +234 812 345 6789</p>
            <p className="text-sm text-primary/70">Email: hello@uzzyblooming.com</p>
          </div>
        </div>

        <div className="mt-12 border-t border-primary/5 pt-8 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-primary/50">
            &copy; {new Date().getFullYear()} UZZYBLOOMING HOMES. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6 sm:mt-0">
            <a href="#" className="text-primary/40 hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="text-primary/40 hover:text-primary transition-colors">Facebook</a>
            <a href="#" className="text-primary/40 hover:text-primary transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
