"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import Link from "next/link";

const OurProducts = () => {
    const [products, setProducts] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products");
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        fetchProducts();
    }, []);

    const handleNext = () => {
        setVisibleIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const handlePrev = () => {
        setVisibleIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    const handleRating = (productId, newRating) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? { ...product, userRating: newRating } : product
            )
        );
    };
    return (
        <div className="container mx-auto mt-20">
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-8 bg-[#DB4444] rounded"></div>
                        <h1 className="font-semibold text-base text-[#DB4444]">Our Products</h1>
                    </div>
                    <h1 className="mt-6 text-black text-4xl font-semibold">Explore Our Products</h1>
                </div>
                <div className="flex gap-2 items-end">
                    <button
                        className="w-12 h-12 rounded-full bg-gray-200 items-center flex justify-center"
                        onClick={handlePrev}
                    >
                        <img src="./arrow-left.svg" alt="" />
                    </button>
                    <button
                        className="w-12 h-12 rounded-full bg-gray-200 items-center flex justify-center"
                        onClick={handleNext}
                    >
                        <img src="./arrow-right.svg" alt="" />
                    </button>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(visibleIndex, visibleIndex + 8).map((product) => (
                    <div key={product.id} className="p-4 rounded-lg">
                        <div className="flex h-[250px] w-[270px] bg-[#F5F5F5] justify-center">
                            <img src={product.thumbnail} alt={product.title} className="object-cover" />
                        </div>
                        <div className="mt-4">
                            <h2 className="font-medium text-base">{product.title}</h2>
                            <p className="text-gray-500">{product.description.slice(0, 50)}...</p>
                            <div className="mt-2">
                                <span className="text-[#DB4444] font-medium text-base">${product.price}</span>
                                <span className="line-through text-gray-500 font-medium text-base ml-2">${Math.round(product.price * 1.2)}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => handleRating(product.id, star)}
                                        className="text-yellow-400"
                                    >
                                        {star <= product.userRating ? <Star /> : <StarBorder />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-16">
                <Link href={"/products"} className="bg-[#DB4444] items-center flex justify-center rounded-[4px] w-[234px] h-[56px] capitalize text-[#FAFAFA] font-medium text-base">View all products</Link>
            </div>
            <hr className="bg-gray-300 h-[2px]" />
        </div>
    );
};

export default OurProducts;
