'use client';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Minus, Plus, Heart, Truck, RotateCcw, Home } from 'lucide-react';
import { useGetProductQuery, useAddToCartMutation, useAddToFavouritesMutation, useRemoveFromFavouritesMutation } from '@/features/products/productsApi';
import Loading from './Loading';
import { useGetUserQuery, userApi } from '@/features/user/userApi';
import Link from 'next/link';
import { Favorite } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function ProductDetailClient({ productId }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { data: user } = useGetUserQuery();
    const isInCart = user?.cart.some(item => item.productId == productId)
    const isInFavourites = user?.favourites.some(item => Number(item) == Number(productId));
    const router = useRouter();
    const { data: product, isLoading, error } = useGetProductQuery(productId);
    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
    const [addToFavourites] = useAddToFavouritesMutation();
    const [removeFromFavorites] = useRemoveFromFavouritesMutation();
    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        if (!user) {
            router.push("/login");
            return;
        }
        try {
            await addToCart({
                productId,
                quantity: quantity
            }).unwrap();
            dispatch(userApi.util.resetApiState());
        } catch (error) {
            console.log(error);
            alert('Failed to add product to cart');
        }
    };

    const handleAddToFavourites = async () => {
        if (!user) {
            router.push("/login");
            return;
        }
        try {
            await addToFavourites({
                productId
            }).unwrap();
            dispatch(userApi.util.resetApiState());
        } catch (error) {
            console.log(error);
            alert('Failed to add product to favourites');
        }
    }

    const handleRemoveFromFavourites = async () => {
        try {
            await removeFromFavorites(productId).unwrap();
            dispatch(userApi.util.resetApiState());
        } catch (error) {
            alert('Failed to remove product from favourites');
        }
    }

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
                Error loading product: {error.message}
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Product not found
            </div>
        );
    }

    return (
        <div className="container mx-auto !py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="relative h-[400px] sm:h-[500px] w-full border rounded-lg overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-xl scale-90 opacity-50"
                            style={{
                                backgroundImage: `url(${product.pictures && product.pictures[selectedImageIndex]
                                    ? `http://localhost:3003${product.pictures[selectedImageIndex]}`
                                    : '/noo.jpeg'})`,
                            }}
                        />

                        <div className="relative h-full w-full flex items-center justify-center bg-transparent">
                            <img
                                src={product.pictures && product.pictures[selectedImageIndex]
                                    ? `http://localhost:3003${product.pictures[selectedImageIndex]}`
                                    : '/noo.jpeg'}
                                alt={product.product_name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {product.pictures.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImageIndex(idx)}
                                className={`relative flex items-center justify-center w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${selectedImageIndex === idx
                                    ? 'border-2 border-black'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center blur-md scale-110 opacity-50"
                                    style={{
                                        backgroundImage: `url(${img ? `http://localhost:3003${img}` : '/noo.jpeg'})`,
                                    }}
                                />

                                <div className="relative w-full h-full flex items-center justify-center bg-transparent">
                                    <img
                                        src={img ? `http://localhost:3003${img}` : '/noo.jpeg'}
                                        alt={`${product.product_name} view ${idx + 1}`}
                                        className="object-contain max-w-full max-h-full"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-4 space-y-6">
                    <h1 className="text-2xl font-bold">{product.product_name}</h1>

                    <div className="text-3xl font-bold">${Number(product.price).toFixed(2)}</div>
                    <p className="text-gray-600">{product.description || 'No description available.'}</p>

                    <div className="flex space-x-4">
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-2"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 border-x">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-2"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        {isInCart ? (
                            <Link
                                href="/cart"
                                className="inline-block px-8 py-2 bg-black text-white rounded-md text-center"
                            >
                                Go to Cart
                            </Link>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className="px-8 py-2 bg-red-500 text-white rounded-md disabled:bg-red-300"
                            >
                                {isAddingToCart ? 'Adding...' : 'Buy Now'}
                            </button>
                        )}
                        {isInFavourites ? (
                            <button
                                className="p-2 border rounded-md"
                                onClick={handleRemoveFromFavourites}
                            >
                                <Favorite sx={{ color: red[500] }} className="w-6 h-6" />
                            </button>
                        ) : (
                            <button onClick={handleAddToFavourites} className="p-2 border rounded-md">
                                <Heart className="w-6 h-6" />
                            </button>
                        )}
                    </div>

                    <div className="space-y-4 border rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                            <Truck className="w-6 h-6" />
                            <div>
                                <div className="font-medium">Free Delivery</div>
                                <button className="text-sm text-gray-500 underline">
                                    Enter your postal code for Delivery Availability
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 pt-4 border-t">
                            <RotateCcw className="w-6 h-6" />
                            <div>
                                <div className="font-medium">Return Delivery</div>
                                <div className="text-sm text-gray-500">
                                    Free 30 Days Delivery Returns. <button className="underline">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}