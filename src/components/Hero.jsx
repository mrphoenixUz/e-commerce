"use client";
import { ArrowRightAlt } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import React, { useState } from "react";
import { useGetCategoriesQuery } from "@/features/products/productsApi";

const Hero = () => {
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
    const slides = Array(2).fill(null);
    const { data: categories } = useGetCategoriesQuery();
    console.log(categories)

    return (
        <div className="container mx-auto px-4">
            {/* Mobile categories toggle */}
            <button
                className="md:hidden w-full py-2 bg-gray-100 flex justify-between items-center px-4 mt-4 rounded"
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
            >
                <span>Categories</span>
                <img
                    src="./DropDown.svg"
                    alt="Toggle categories"
                    className={`transform transition-transform ${mobileCategoriesOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div className="flex flex-col md:flex-row">
                {/* Categories sidebar - hidden by default on mobile */}
                <div className={`flex-col gap-4 ${mobileCategoriesOpen ? 'flex' : 'hidden'} md:flex md:mt-10 w-full md:w-56 border md:border-0 border-gray-200 p-4 md:p-0 rounded md:rounded-none mb-4 md:mb-0`}>
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

                {/* Divider - hidden on mobile */}
                <div className="hidden md:block border-l ml-4 border-black h-[360px]"></div>

                {/* Slider section */}
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
                                <div className="flex h-full items-center justify-center pb-12">
                                    <h1 className="text-7xl text-white">Reklama uchun joy</h1>
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