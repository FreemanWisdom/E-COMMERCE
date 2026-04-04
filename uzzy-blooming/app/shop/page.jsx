import ShopPageClient from '../../components/shop/ShopPageClient';
import { products } from '../../lib/mockData/products';

export const metadata = {
  title: 'Shop | Uzzyblooming Homes',
  description: 'Browse all products at UZZYBLOOMING HOMES.'
};

export default function ShopPage() {
  const categories = [...new Set(products.map(p => p.category))];
  
  return <ShopPageClient products={products} categories={categories} />;
}
