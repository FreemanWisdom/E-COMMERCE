import { notFound } from 'next/navigation';
import ProductDetailClient from '../../../components/ProductDetailClient';
import { products } from '../../../lib/mockData/products';

export async function generateMetadata({ params }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return {
      title: 'Product Not Found'
    };
  }

  return {
    title: `${product.name} | Uzzyblooming Homes`,
    description: product.description
  };
}

export default function ProductPage({ params }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  // Get related products from the same category
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
