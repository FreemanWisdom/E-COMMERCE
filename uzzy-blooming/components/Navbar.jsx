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
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-primary/5 text-primary transition-colors hover:bg-primary/10 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <div className="relative h-4 w-5">
            <span className={`absolute left-0 block h-0.5 w-18 bg-current transition-all duration-300 ${open ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-2 block h-0.5 w-18 bg-current transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 block h-0.5 w-18 bg-current transition-all duration-300 ${open ? 'top-2 -rotate-45' : 'top-4'}`} />
          </div>
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
            <span className="font-[var(--font-heading)] text-lg font-bold text-primary">MENU</span>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-primary/60 hover:bg-primary/5 transition-colors"
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
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-primary hover:bg-primary/5 transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="rounded-full bg-rose/10 px-2 py-0.5 text-xs text-rose">
                      {totalItems}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-primary hover:bg-primary/5 transition-colors"
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
