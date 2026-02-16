
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/cart', label: 'Cart' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const { totalItems, openSidebar } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/90 backdrop-blur">
      <nav className="container-padded flex h-16 items-center justify-between">
        <Link to="/" className="font-heading text-xl font-bold text-primary">
          UZZYBLOOMING HOMES
        </Link>

        <button
          className="rounded-md p-2 text-primary lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-5 bg-primary" />
          <span className="mt-1 block h-0.5 w-5 bg-primary" />
          <span className="mt-1 block h-0.5 w-5 bg-primary" />
        </button>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`text-sm font-semibold transition ${active ? 'text-accent' : 'text-primary hover:text-accent'
                    }`}
                >
                  {link.label}
                  {link.href === '/cart' ? ` (${totalItems})` : ''}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-primary/10 p-5">
            <span className="font-heading text-lg font-bold text-primary">MENU</span>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-primary/60 hover:bg-neutral-light transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto p-5 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                {link.href === '/cart' ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      openSidebar();
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-primary hover:bg-neutral-light transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                      {totalItems}
                    </span>
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-primary hover:bg-neutral-light transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

