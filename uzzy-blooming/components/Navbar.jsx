"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const links = [
  { href: '/', label: 'HOME.' },
  { href: '/shop', label: 'SHOP ALL.' },
  { href: '/about', label: 'THE STORY.' },
  { href: '/contact', label: 'CONNECT.' }
];

const Logo = ({ scrolled, isHome }) => (
  <Link 
    href="/" 
    className="group flex items-center gap-2 outline-none"
  >
    <div className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 ${
      scrolled || !isHome ? 'bg-primary text-white' : 'bg-white/20 text-white backdrop-blur-md group-hover:bg-white group-hover:text-primary'
    }`}>
      <span className="font-[var(--font-heading)] text-xl font-black">U</span>
      <div className={`absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white transition-colors ${
        scrolled || !isHome ? 'bg-accent' : 'bg-white'
      }`}></div>
    </div>
    <div className="flex flex-col">
      <span className={`font-[var(--font-heading)] text-lg font-black tracking-tighter leading-none transition-colors duration-500 ${
        scrolled || !isHome ? 'text-primary' : 'text-white'
      }`}>
        UZZYBLOOMING
      </span>
      <span className={`text-[8px] font-black uppercase tracking-[0.3em] leading-none mt-1 transition-colors duration-500 ${
        scrolled || !isHome ? 'text-accent' : 'text-white/60'
      }`}>
        Homes & Lifestyle
      </span>
    </div>
  </Link>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { user, signOut } = useAuth();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        scrolled 
        ? 'bg-white/80 backdrop-blur-2xl border-b border-gray-100 py-3 shadow-sm' 
        : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <nav className="container-padded flex items-center justify-between">
        {/* LOGO */}
        <Logo scrolled={scrolled} isHome={isHome} />

        {/* WEB MENU */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex items-center gap-10">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 py-1 ${
                      active 
                      ? 'text-accent' 
                      : `${scrolled || !isHome ? 'text-primary' : 'text-white/80'} hover:text-accent`
                    }`}
                  >
                    {link.label}
                    {active && (
                       <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={`h-6 w-px ${scrolled || !isHome ? 'bg-gray-200' : 'bg-white/20'}`}></div>

          <div className="flex items-center gap-6">
            {/* CART TOGGLE */}
            <Link 
              href="/cart"
              className={`relative group p-2 transition-colors duration-300 ${
                scrolled || !isHome ? 'text-primary' : 'text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-black text-white ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* AUTH */}
            {user ? (
               <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 px-5 py-2 rounded-full border ${
                    scrolled || !isHome 
                    ? 'border-gray-100 text-primary hover:bg-rose hover:text-white hover:border-rose' 
                    : 'border-white/20 text-white hover:bg-white hover:text-primary'
                  }`}
                >
                  {loggingOut ? 'EXITING...' : 'DISCONNECT.'}
                </button>
            ) : (
              <Link 
                href="/auth/login" 
                className={`flex items-center justify-center rounded-full px-6 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 ${
                  scrolled || !isHome 
                  ? 'bg-primary text-white hover:bg-accent' 
                  : 'bg-white text-primary hover:bg-accent hover:text-white'
                }`}
              >
                ACCOUNT.
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE TRIGGER */}
        <button
          className={`lg:hidden relative z-50 flex h-11 w-11 flex-col items-center justify-center rounded-2xl transition-all duration-500 overflow-hidden ${
            scrolled || !isHome ? 'bg-primary text-white' : 'bg-white/20 text-white backdrop-blur-md'
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5 items-center">
             <div className={`h-0.5 w-5 rounded-full bg-current transition-all duration-500 ${open ? 'rotate-45 translate-y-2' : ''}`}></div>
             <div className={`h-0.5 w-3 rounded-full bg-current transition-all duration-500 ${open ? 'opacity-0' : 'translate-x-1'}`}></div>
             <div className={`h-0.5 w-5 rounded-full bg-current transition-all duration-500 ${open ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div 
        className={`fixed inset-0 z-40 bg-white transform transition-all duration-700 ease-in-out lg:hidden ${
          open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="relative h-full w-full flex flex-col p-12 pt-32 gap-12 overflow-y-auto">
          {/* Abstract BG element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
          
          <ul className="space-y-6">
             {links.map((link, i) => (
               <li key={link.href} className={`transition-all duration-700 delay-[${i * 100}ms] ${open ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                  <Link 
                    href={link.href} 
                    onClick={() => setOpen(false)}
                    className="group flex items-end gap-4"
                  >
                    <span className="text-sm font-black text-accent/30 group-hover:text-accent transition-colors">0{i+1}</span>
                    <span className="text-5xl font-[var(--font-heading)] font-black tracking-tighter text-primary group-hover:translate-x-2 transition-transform duration-500 lowercase">
                      {link.label.replace('.', '')}
                    </span>
                  </Link>
               </li>
             ))}
          </ul>
          
          <div className={`h-px w-full bg-gray-100 transition-all duration-700 delay-[400ms] ${open ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></div>
          
          <div className={`flex flex-col gap-8 transition-all duration-700 delay-[500ms] ${open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <Link 
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 group hover:bg-primary transition-colors duration-500"
              >
                 <span className="text-lg font-black text-primary group-hover:text-white transition-colors">MY COLLECTION.</span>
                 <div className="h-12 w-12 rounded-full bg-white text-primary flex items-center justify-center text-sm font-black shadow-lg">
                    {totalItems}
                 </div>
              </Link>
              
              {user ? (
                 <button 
                   onClick={() => { setOpen(false); handleLogout(); }}
                   className="h-20 w-full rounded-full border-2 border-rose/10 text-rose font-black uppercase tracking-[0.4em] text-xs hover:bg-rose hover:text-white hover:border-rose transition-all duration-500"
                 >
                    DISCONNECT.
                 </button>
              ) : (
                <Link 
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="h-20 w-full rounded-full bg-primary text-white flex items-center justify-center font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-accent transition-colors duration-500"
                >
                   ACCOUNT ACCESS.
                </Link>
              )}
          </div>
          
          <div className="mt-auto pt-12 flex justify-between items-end">
             <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted/40">Inquiries</p>
                <p className="text-sm font-bold text-primary">hello@uzzyblooming.co</p>
             </div>
             <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted/20">
                Crafted © 2024
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
