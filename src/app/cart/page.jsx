"use client";
import React, { useState, useEffect } from "react";
import {
    useGetProductQuery,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    productsApi,
} from "@/features/products/productsApi";
import { X } from "lucide-react";
import { useGetUserQuery, userApi } from "@/features/user/userApi";
import Link from "next/link";
import noo from "@/images/noo.jpeg";
import { useDispatch } from "react-redux";

const calculateSubtotal = (price, quantity) => {
    return (parseFloat(price) * quantity).toFixed(2);
};

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const { data: product } = useGetProductQuery(item.productId);

    if (!product) return null;

    return (
        <div className="flex items-center gap-4 border-b py-4">
            <div className="relative">
                <img
                    src={product.pictures[0] ? `http://localhost:3003${product.pictures[0]}` : noo.src}
                    alt={product.product_name}
                    className="w-24 h-24 object-cover"
                />
                <button
                    onClick={() => onRemove(item.productId)}
                    className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1"
                >
                    <X size={16} />
                </button>
            </div>

            <div className="flex-1">
                <Link href={`products/${product.id}`} className="font-semibold">{product.product_name}</Link>
                <p className="text-gray-600">${product.price}</p>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item.productId, e.target.value)}
                    className="border rounded w-20 px-2 py-1"
                />
                <span className="font-semibold">
                    ${calculateSubtotal(product.price, item.quantity)}
                </span>
            </div>
        </div>
    );
};

const ShoppingCart = () => {
    const { data: user } = useGetUserQuery();
    const [updateCart] = useUpdateCartItemMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.cart) {
            setCartItems(user.cart);
        }
    }, [user]);
    let totalPrice = cartItems.reduce((acc, item) => {
        if (item.quantity && item.price) {  // Ensure both quantity and price are valid
            return acc + (Number(item.price) * Number(item.quantity));
        }
        return acc;
    }, 0);


    const handleQuantityChange = async (productId, newQuantity) => {
        const updatedQuantity = parseInt(newQuantity);
        if (updatedQuantity < 1) return;

        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId ? { ...item, quantity: updatedQuantity } : item
            )
        );

        try {
            await updateCart({ productId, quantity: updatedQuantity });
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    };

    const handleRemoveItem = async (productId) => {
        // setCartItems((prevCart) => prevCart.filter((item) => item.productId !== productId));

        try {
            await removeFromCart(productId);
            dispatch(userApi.util.resetApiState());
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {cartItems.map((item) => (
                <CartItem
                    key={item.productId}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                />
            ))}

            <div className="flex justify-between mt-8">
                <Link href={"/products"} className="px-4 py-2 border rounded">Return To Shop</Link>
                <button className="px-4 py-2 border rounded">Update Cart</button>
            </div>

            <div className="flex justify-between mt-8">
                <div className="border rounded p-4 w-72">
                    <h2 className="text-xl font-bold mb-4">Cart Total</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <Link href={'/checkout'} className="w-full inline-block text-center bg-red-500 text-white py-2 rounded">
                        Proceed to checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
