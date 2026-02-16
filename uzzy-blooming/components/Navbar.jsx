"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const { totalItems, openSidebar } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-cocoa/10 bg-white/90 backdrop-blur">
      <nav className="container-padded flex h-16 items-center justify-between">
        <Link href="/" className="font-[var(--font-heading)] text-xl text-primary">
          UZZYBLOOMING HOMES
        </Link>

        <button
          className="rounded-md p-2 text-primary lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-5 bg-cocoa" />
          <span className="mt-1 block h-0.5 w-5 bg-cocoa" />
          <span className="mt-1 block h-0.5 w-5 bg-cocoa" />
        </button>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-semibold transition ${active ? 'text-rose' : 'text-cocoa hover:text-rose'
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

      {open ? (
        <div className="border-t border-cocoa/10 bg-white lg:hidden">
          <ul className="container-padded flex flex-col py-3">
            {links.map((link) => (
              <li key={link.href}>
                {link.href === '/cart' ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      openSidebar();
                    }}
                    className="block py-2 text-sm font-semibold text-primary w-full text-left"
                  >
                    {link.label} ({totalItems})
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-2 text-sm font-semibold text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
