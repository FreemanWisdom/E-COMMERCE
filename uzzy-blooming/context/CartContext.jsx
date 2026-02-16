"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'uzzyblooming-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch (error) {
      console.error('Failed to load cart', error);
    } finally {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const addToCart = (product, size = null) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingIndex >= 0) {
        const clone = [...current];
        clone[existingIndex] = {
          ...clone[existingIndex],
          quantity: clone[existingIndex].quantity + 1
        };
        return clone;
      }

      return [
        ...current,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity: 1
        }
      ];
    });
  };

  const removeFromCart = (id, size = null) => {
    setItems((current) =>
      current.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id, quantity, size = null) => {
    setItems((current) =>
      current
        .map((item) => {
          if (item.id !== id || item.size !== size) return item;
          return { ...item, quantity: Math.max(1, quantity) };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, totalItems };
  }, [items]);

  const value = {
    items,
    mounted,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal: totals.subtotal,
    totalItems: totals.totalItems,
    isSidebarOpen,
    openSidebar,
    closeSidebar
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
