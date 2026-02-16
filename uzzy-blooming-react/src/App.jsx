import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { CartProvider } from './context/CartContext';

// Lazy load components for performance
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CustomerCare = lazy(() => import('./pages/CustomerCare'));
const DeliveryInformation = lazy(() => import('./pages/DeliveryInformation'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ReturnsPolicy = lazy(() => import('./pages/ReturnsPolicy'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={
            <div className="flex h-[60vh] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/customer-care" element={<CustomerCare />} />
              <Route path="/delivery-information" element={<DeliveryInformation />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/returns-policy" element={<ReturnsPolicy />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
