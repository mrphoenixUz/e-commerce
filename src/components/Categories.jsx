"use client"
import React, { useEffect, useState } from 'react'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/category-list');
                const data = await response.json();
                setCategories(data || [])
            }
            catch (error) {
                console.error("Error fetching categories: ", error);
            }
        }
        fetchCategories();
    }, [])

    const handleNext = () => {
        setVisibleIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }
    const handlePrev = () => {
        setVisibleIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    }

    // Calculate number of items to display based on screen size
    const getVisibleCount = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 1;
            if (window.innerWidth < 768) return 2;
            if (window.innerWidth < 1024) return 3;
            if (window.innerWidth < 1280) return 4;
            return 6;
        }
        return 6; // Default for SSR
    }

    const [visibleCount, setVisibleCount] = useState(6);

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
        <div className='container mx-auto px-4 mt-8 sm:mt-12 md:mt-16'>
            <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-0'>
                <div>
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-8 bg-[#DB4444] rounded"></div>
                        <h1 className="font-semibold text-base text-[#DB4444]">Categories</h1>
                    </div>
                    <h1 className="mt-3 sm:mt-6 text-black text-2xl sm:text-3xl md:text-4xl font-semibold">Browse By Category</h1>
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
            
            <div className='my-6 sm:my-10 md:my-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                {
                    categories.slice(visibleIndex, visibleIndex + visibleCount).map((category, index) => (
                        <div 
                            key={index} 
                            className='flex items-center justify-center flex-col h-28 sm:h-32 md:h-36 border border-black border-opacity-60 break-words capitalize rounded-[4px] mx-auto w-full max-w-xs sm:max-w-none'
                        >
                            <img width={56} height={56} src="./phone-category.svg" alt="" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-auto lg:h-auto" />
                            <p className='max-w-32 mx-auto text-center mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base'>{category}</p>
                        </div>
                    ))
                }
            </div>
            
            <hr className="bg-gray-300 h-[2px]" />
        </div>
    )
}

export default Categories