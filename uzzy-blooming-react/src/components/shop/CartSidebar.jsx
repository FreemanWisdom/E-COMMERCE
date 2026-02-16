

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../CartItem';
import Button from '../ui/Button';
import { formatCurrency } from '../../lib/products';

export default function CartSidebar() {
    const {
        isSidebarOpen,
        closeSidebar,
        items,
        removeFromCart,
        updateQuantity,
        subtotal
    } = useCart();

    const sidebarRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen, closeSidebar]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSidebarOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-neutral-100 p-5">
                        <h2 className="text-xl font-[var(--font-heading)] text-primary">Shopping Cart ({items.length})</h2>
                        <button
                            onClick={closeSidebar}
                            className="rounded-full p-2 text-primary/60 hover:bg-neutral-50 hover:text-primary transition-colors"
                            aria-label="Close cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-5">
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <div className="mb-4 rounded-full bg-neutral-50 p-6 text-primary/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-primary">Your cart is empty</h3>
                                <p className="mt-1 text-sm text-primary/60">Looks like you haven't added anything yet.</p>
                                <div className="mt-6">
                                    <Button onClick={closeSidebar}>Start Shopping</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <CartItem
                                        key={`${item.id}-${item.size || 'std'}`}
                                        item={item}
                                        onRemove={removeFromCart}
                                        onUpdateQuantity={updateQuantity}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-neutral-100 bg-neutral-50 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-base text-primary/80">Subtotal</span>
                                <span className="text-xl font-bold text-primary">{formatCurrency(subtotal)}</span>
                            </div>
                            <p className="mb-4 text-xs text-primary/50 text-center">Shipping and taxes calculated at checkout.</p>
                            <Link to="/checkout" onClick={closeSidebar} className="block w-full">
                                <Button className="w-full justify-center">Proceed to Checkout</Button>
                            </Link>
                            <div className="mt-3 text-center">
                                <Link to="/cart" onClick={closeSidebar} className="text-sm font-semibold text-primary/70 hover:text-primary underline decoration-transparent hover:decoration-current transition-all">
                                    View Datails
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
