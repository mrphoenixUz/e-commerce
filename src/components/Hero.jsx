"use client";
import { ArrowRightAlt } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import React, { useState } from "react";

const Hero = () => {
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
    const slides = Array(5).fill(null);

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
                <div className={`${mobileCategoriesOpen ? 'flex' : 'hidden'} md:flex md:mt-10 flex-col gap-4 w-full md:w-56 md:h-80 border md:border-0 border-gray-200 p-4 md:p-0 rounded md:rounded-none mb-4 md:mb-0`}>
                    <Link href={"/womansfashion"} className="flex justify-between">
                        <p>Woman's Fashion</p>
                        <img src="./DropDown.svg" alt="Dropdown" />
                    </Link>
                    <Link href={"/mensfashion"} className="flex justify-between">
                        <p>Men's Fashion</p>
                        <img src="./DropDown.svg" alt="Dropdown" />
                    </Link>
                    <Link href={"/electronics"}>Electronics</Link>
                    <Link href={"/homeandfashion"}>Home & Lifestyle</Link>
                    <Link href={"/medicine"}>Medicine</Link>
                    <Link href={"/sportsandoutdoor"}>Sports & Outdoor</Link>
                    <Link href={"/groceriesandpets"}>Groceries & Pets</Link>
                    <Link href={"/healthandbeauty"}>Health & Beauty</Link>
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
                                <div className="flex h-full items-center pb-12">
                                    <div className="ml-6 sm:ml-10 md:ml-16 mt-8 md:mt-14 flex flex-col justify-center">
                                        <div className="flex gap-2 sm:gap-4 items-center">
                                            <img src="./apple.png" alt="Apple Logo" className="w-6 md:w-auto" />
                                            <p className="text-white font-normal text-sm md:text-base">
                                                iPhone 14 Series
                                            </p>
                                        </div>
                                        <p className="text-white font-semibold text-xl sm:text-3xl md:text-5xl mt-2 md:mt-5 font-inter w-full sm:w-[240px] md:w-[294px]">
                                            Up to 10% off Voucher
                                        </p>
                                        <Link href={"/shop"} className="flex gap-2 mt-2 md:mt-4 items-center">
                                            <p className="text-white border-b border-white text-sm md:text-base">Shop Now</p>
                                            <ArrowRightAlt className="text-white text-base md:text-2xl" />
                                        </Link>
                                    </div>
                                    <div className="flex-grow flex justify-end items-center pr-4 sm:pr-6 md:pr-10">
                                        <img
                                            src="./iphone.png"
                                            alt="iPhone"
                                            className="h-full max-h-40 sm:max-h-52 md:max-h-64 object-contain"
                                        />
                                    </div>
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