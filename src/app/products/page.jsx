"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShoppingCart, Eye, Star } from "lucide-react";
import {
    useAddToCartMutation,
    useGetProductsQuery,
    useSearchProductQuery,
} from "@/features/products/productsApi";
import Loading from "@/components/Loading";
import { useGetUserQuery, userApi } from "@/features/user/userApi";
import { useDispatch } from "react-redux";
import noo from "@/images/noo.jpeg";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("search");

    const { data: products, isLoading, error } = useGetProductsQuery();
    const { data: filteredProducts } = useSearchProductQuery(searchTerm, {
        skip: !searchTerm,
    });

    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
    const { data: user } = useGetUserQuery();
    const dispatch = useDispatch();

    const handleAddToCart = async (productId) => {
        try {
            await addToCart({ productId, quantity: 1 }).unwrap();
            alert("Product added to cart successfully!");
            dispatch(userApi.util.resetApiState());
        } catch (error) {
            alert("Failed to add product to cart");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                Error loading products: {error.message}
            </div>
        );
    }

    const displayedProducts = searchTerm ? filteredProducts : products;

    return (
        <div className="container mx-auto px-12 my-12">
            {/* Title */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <div className="w-1 h-6 bg-red-500 mr-2"></div>
                    <h2 className="text-xl font-semibold">
                        {searchTerm ? `Search results for "${searchTerm}"` : "Just For You"}
                    </h2>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedProducts?.map((product) => {
                    const isInCart = user?.cart.some((item) => item.productId == product.id);
                    return (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                            {/* Product Image */}
                            <div className="relative aspect-square">
                                <img
                                    src={product.pictures[0] ? `https://phoenix-shop-backend.onrender.com${product.pictures[0]}` : noo.src}
                                    alt={product.product_name}
                                    // fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <Link
                                    href={`/products/${product.id}`}
                                    className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <Eye className="w-5 h-5 text-gray-600" />
                                </Link>
                            </div>

                            {/* Product Details */}
                            <div className="p-4">
                                <Link href={`/products/${product.id}`} className="block">
                                    <h3 className="text-lg font-medium mb-2 hover:text-red-500 transition-colors">
                                        {product.product_name}
                                    </h3>
                                </Link>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-red-500 font-semibold">${Number(product.price).toFixed(2)}</div>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                        <span className="text-xs text-gray-500 ml-1">(65)</span>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                {isInCart ? (
                                    <Link
                                        href="/cart"
                                        className="w-full bg-black text-white py-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Go to Cart
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => handleAddToCart(product.id)}
                                        disabled={isAddingToCart}
                                        className="w-full bg-black text-white py-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        {isAddingToCart ? "Adding..." : "Add To Cart"}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
