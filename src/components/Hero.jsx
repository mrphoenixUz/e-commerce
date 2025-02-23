"use client";
import { ArrowRightAlt } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "@/features/products/productsApi";

const Hero = () => {
    const { data: categories } = useGetCategoriesQuery();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    const slides = Array(3).fill(null)

    if (!mounted) return null

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
                <div className={`hidden md:flex flex-col gap-4 md:mt-10 w-full md:w-56 border md:border-0 border-gray-200 p-4 md:p-0 rounded md:rounded-none mb-4 md:mb-0`}>
                    {categories && categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`category/${category.category_name.toLowerCase()}`}
                            className="block"
                        >
                            {category.category_name}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:block border-l ml-4 border-black h-[360px]"></div>

                <div className="w-full md:w-[892px] h-64 sm:h-72 md:h-80 bg-black mt-4 md:mt-10 md:ml-11 relative overflow-hidden rounded-lg md:rounded-none">
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={50}
                        slidesPerView={1}
                        loop={true}
                        className="h-full"
                    >
                        {slides.map((_, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col h-full items-center justify-center pb-12 relative overflow-hidden">
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-orange-600 text-center mb-4 animate-pulse">
                                        Coming Soon
                                    </h1>
                                    <p className="text-xl sm:text-2xl text-orange-600 text-center opacity-75 animate-bounce">
                                        Something amazing is on its way!
                                    </p>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-30 animate-gradient-x"></div>
                                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                                    <div className="absolute -top-12 -left-12 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                                    <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Hero;