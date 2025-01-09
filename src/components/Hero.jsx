"use client";

import { ArrowRightAlt } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination  } from "swiper/modules";
import Link from "next/link";
import React from "react";

const Hero = () => {
    const slides = Array(5).fill(null);

    return (
        <div className="container mx-auto flex">
            <div className="flex mt-10 flex-col gap-4 w-56 h-80">
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

            <div className="border-l ml-4 border-black h-[360px]"></div>

            <div className="w-[892px] h-80 bg-black mt-10 ml-11 relative overflow-hidden">
                <Swiper
                    modules={[Pagination ]}
                    pagination={{ clickable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                >
                    {slides.map((_, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex h-full items-center">
                                <div className="ml-16 mt-14 flex flex-col justify-center">
                                    <div className="flex gap-4 items-center">
                                        <img src="./apple.png" alt="Apple Logo" />
                                        <p className="text-white font-normal text-base">
                                            iPhone 14 Series
                                        </p>
                                    </div>
                                    <p className="text-white font-semibold text-5xl mt-5 font-inter w-[294px]">
                                        Up to 10% off Voucher
                                    </p>
                                    <div className="flex gap-2 mt-4">
                                        <p className="text-white border-b border-white">Shop Now</p>
                                        <ArrowRightAlt className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-grow flex justify-end mt-4 items-center pr-10">
                                    <img
                                        src="./iphone.png"
                                        alt="iPhone"
                                        className="h-full max-h-64 object-contain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Hero;    
