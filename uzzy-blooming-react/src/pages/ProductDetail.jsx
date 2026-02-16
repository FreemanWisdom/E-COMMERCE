
import { useParams } from 'react-router-dom';
import { getProduct, getRelatedProducts } from '../lib/products';
import ProductDetailClient from '../components/ProductDetailClient';

export default function ProductDetail() {
    const { slug } = useParams();
    const product = getProduct(slug);

    if (!product) {
        return <div className="container-padded section-space text-center">Product not found</div>;
    }

    const relatedProducts = getRelatedProducts(product.category.id, product.id);

    return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
