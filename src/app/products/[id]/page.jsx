import ProductDetailClient from '@/components/ProductDetails';

export default async function ProductDetail({ params }) {
    const { id } = await params
    const productId = parseInt(id, 10);
    return <ProductDetailClient productId={productId} />;
}