"use client";
import React, { useState, useEffect } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import Link from "next/link";
import { useGetProductsQuery } from "@/features/products/productsApi";

const OurProducts = () => {
    const [visibleIndex, setVisibleIndex] = useState(0);
    const { data: products, isLoading, error } = useGetProductsQuery();
    const handleNext = () => {
        setVisibleIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const handlePrev = () => {
        setVisibleIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    // Calculate number of items to display based on screen size
    const getVisibleCount = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 1;
            if (window.innerWidth < 768) return 2;
            if (window.innerWidth < 1024) return 4;
            if (window.innerWidth < 1280) return 6;
            return 8;
        }
        return 8; // Default for SSR
    };

    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getVisibleCount());
        };

        // Set initial count
        setVisibleCount(getVisibleCount());

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="container mx-auto px-4 mt-10 sm:mt-16 md:mt-20">
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                <div>
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-8 bg-[#DB4444] rounded"></div>
                        <h1 className="font-semibold text-base text-[#DB4444]">Our Products</h1>
                    </div>
                    <h1 className="mt-3 sm:mt-6 text-black text-2xl sm:text-3xl md:text-4xl font-semibold">Explore Our Products</h1>
                </div>
                <div className="flex gap-2 items-center sm:items-end">
                    <button
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 items-center flex justify-center"
                        onClick={handlePrev}
                    >
                        <img src="./arrow-left.svg" alt="Previous" className="w-4 h-4 sm:w-auto sm:h-auto" />
                    </button>
                    <button
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 items-center flex justify-center"
                        onClick={handleNext}
                    >
                        <img src="./arrow-right.svg" alt="Next" className="w-4 h-4 sm:w-auto sm:h-auto" />
                    </button>
                </div>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products?.slice(visibleIndex, visibleIndex + visibleCount).map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id} className="p-3 sm:p-4 rounded-lg mx-auto w-full max-w-sm">
                        <div className="flex h-[200px] sm:h-[250px] w-full bg-[#F5F5F5] justify-center items-center rounded-lg overflow-hidden">
                            <img
                                src={`http://localhost:3003${product.pictures[0]}`}
                                alt={product.product_name}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <div className="mt-3 sm:mt-4">
                            <h2 className="font-medium text-sm sm:text-base truncate">{product.product_name}</h2>
                            <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">{product.product_name}</p>
                            <div className="mt-1 sm:mt-2">
                                <span className="text-[#DB4444] font-medium text-sm sm:text-base">${product.price}</span>
                                <span className="line-through text-gray-500 font-medium text-xs sm:text-base ml-2">${Math.round(product.price * 1.2)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center my-8 sm:my-12 md:my-16">
                <Link
                    href={"/products"}
                    className="bg-[#DB4444] items-center flex justify-center rounded-[4px] w-full max-w-[234px] h-[44px] sm:h-[56px] capitalize text-[#FAFAFA] font-medium text-sm sm:text-base"
                >
                    View all products
                </Link>
            </div>

            <hr className="bg-gray-300 h-[2px]" />
        </div>
    );
};

export default OurProducts;