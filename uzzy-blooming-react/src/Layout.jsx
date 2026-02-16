
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/shop/CartSidebar';

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Navbar />
            <CartSidebar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
