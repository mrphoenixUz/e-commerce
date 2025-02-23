"use client"
import { useEffect, useState } from "react"
import { useGetUserQuery } from "@/features/user/userApi";
import { useGetProductQuery } from "@/features/products/productsApi";
import noo from "@/images/noo.jpeg";

const calculateSubtotal = (price, quantity) => {
    return (parseFloat(price) * quantity).toFixed(2);
};

const OrderItem = ({ item }) => {
    const { data: product } = useGetProductQuery(item.productId);

    if (!product) return null;

    return (
        <div key={product.id} className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center h-16 w-16 overflow-hidden rounded-lg border">
                <img
                    src={product.pictures[0] ? `http://localhost:3003${product.pictures[0]}` : noo.src}
                    alt={product.product_name}
                    className="object-cover"
                />
            </div>
            <div className="flex-1">
                <h3 className="font-medium">{product.product_name}</h3>
                <p className="text-sm text-gray-500">{product.category.category_name}</p>
            </div>
            <p className="font-medium">${product.price} <span className="text-red-600 text-xl">x{item.quantity}</span> <span>= {calculateSubtotal(product.price, item.quantity)}</span></p>
        </div>
    )
}

export default function CheckoutPage() {
    const { data: user } = useGetUserQuery();
    const [couponCode, setCouponCode] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("bank")
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        if (user?.cart) {
            setCartItems(user.cart);
        }
    })

    const shipping = 0
    let total = cartItems.reduce((acc, item) => {
        if (item.quantity && item.price) {
            return acc + (Number(item.price) * Number(item.quantity));
        }
        return acc;
    }, 0);
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name*
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                                    Street Address*
                                </label>
                                <input
                                    type="text"
                                    id="streetAddress"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                                    Apartment, floor, etc. (optional)
                                </label>
                                <input
                                    type="text"
                                    id="apartment"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="townCity" className="block text-sm font-medium text-gray-700 mb-1">
                                    Town/City*
                                </label>
                                <input
                                    type="text"
                                    id="townCity"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="saveInfo"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="saveInfo" className="text-sm text-gray-700">
                                    Save this information for faster check-out next time
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <OrderItem
                                    key={item.productId}
                                    item={item}
                                />
                            ))}

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping:</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="bank"
                                        name="paymentMethod"
                                        value="bank"
                                        checked={paymentMethod === "bank"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor="bank" className="text-sm text-gray-700">
                                        Bank
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="cash"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={paymentMethod === "cash"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor="cash" className="text-sm text-gray-700">
                                        Cash on delivery
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                >
                                    Apply Coupon
                                </button>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

