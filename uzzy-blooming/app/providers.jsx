"use client";

import { CartProvider } from '../context/CartContext';
import CartSidebar from '../components/shop/CartSidebar';

export default function Providers({ children }) {
  return (
    <CartProvider>
      {children}
      <CartSidebar />
    </CartProvider>
  );
}
