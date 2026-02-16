import { notFound } from 'next/navigation';
import ProductDetailClient from '../../../components/ProductDetailClient';
import { getProductBySlug, getProductsByCategory } from '../../../lib/products';

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found'
    };
  }

  return {
    title: product.name,
    description: product.description
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category.id)
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
