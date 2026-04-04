"use client";

import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import CartSidebar from '../components/shop/CartSidebar';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartSidebar />
      </CartProvider>
    </AuthProvider>
  );
}
