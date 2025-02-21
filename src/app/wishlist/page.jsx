"use client"
import React, { useEffect } from 'react';
import { useGetUserQuery, userApi } from "@/features/user/userApi";
import { useAddToCartMutation, useGetProductQuery, useRemoveFromFavouritesMutation } from "@/features/products/productsApi";
import { Trash2 } from "lucide-react";
import noo from "@/images/noo.jpeg";
import { useDispatch } from 'react-redux';

const WishlistItem = ({ productId, onRemove, onAddToCart }) => {
    const { data: product } = useGetProductQuery(productId);

    if (!product) return null;

    return (
        <div className="relative group">
            <div className="border rounded-lg p-4 h-full flex flex-col">
                <img
                    src={product.pictures[0] ? `https://phoenix-shop-backend.onrender.com${product.pictures[0]}` : noo.src}
                    alt={product.product_name}
                    className="w-full h-48 object-cover mb-4 rounded"
                />
                <div className='flex items-center justify-between'>
                    <h3 className="font-medium text-gray-800 mb-2">{product.product_name}</h3>
                    <button
                        onClick={() => onRemove(productId)}
                        className="text-red-500 hover:text-red-800"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-red-500 font-semibold">${product.price}</span>
                    </div>
                    <button
                        onClick={() => onAddToCart(productId)}
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

const WishlistPage = () => {
    const { data: user, refetch } = useGetUserQuery();
    const [removeFromWishlist] = useRemoveFromFavouritesMutation();
    const [addToCart] = useAddToCartMutation();
    const dispatch = useDispatch();
    const handleRemoveFromWishlist = async (productId) => {
        try {
            await removeFromWishlist(productId).unwrap();
            refetch();
        } catch (error) {
            console.error("Failed to remove from wishlist:", error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await addToCart({ productId, quantity: 1 });
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    const handleMoveAllToBag = async () => {
        try {
            for (const productId of user?.favourites || []) {
                await addToCart({ productId, quantity: 1 });
                // dispatch(removeFromWishlist(productId));
                await removeFromWishlist(productId);
            }
            dispatch(userApi.util.resetApiState());
        } catch (error) {
            console.error("Failed to move items to bag:", error);
        }
    };

    if (!user?.favourites?.length) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-600">Add items to your wishlist to save them for later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">
                    Wishlist ({user?.favourites?.length || 0})
                </h1>
                <button
                    onClick={handleMoveAllToBag}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                    Move All To Bag
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {user?.favourites?.map((productId) => (
                    <WishlistItem
                        key={productId}
                        productId={productId}
                        onRemove={handleRemoveFromWishlist}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;