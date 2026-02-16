import ShopPageClient from '../../components/shop/ShopPageClient';
import { getCategories, getProducts } from '../../lib/products';

export const metadata = {
  title: 'Shop',
  description: 'Browse all products at UZZYBLOOMING HOMES.'
};

export default function ShopPage() {
  const products = getProducts();
  const categories = getCategories();

  return <ShopPageClient products={products} categories={categories} />;
}
