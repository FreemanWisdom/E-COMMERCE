
import { getCategories, getProducts } from '../lib/products';
import ShopPageClient from '../components/shop/ShopPageClient';

export default function Shop() {
    const products = getProducts();
    const categories = getCategories();

    return <ShopPageClient products={products} categories={categories} />;
}
