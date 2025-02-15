"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SpecialOffer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 23,
        minutes: 59,
        seconds: 35,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;
                seconds--;

                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }
                if (hours < 0) {
                    hours = 23;
                    days--;
                }
                if (days < 0) {
                    clearInterval(timer);
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="container mx-auto px-4 mt-16 sm:mt-24 md:mt-36">
            <div className="flex flex-col lg:flex-row justify-between items-center bg-black py-8 sm:py-10 px-4 sm:px-8 lg:px-14 relative rounded-lg">
                <div className="text-center my-8 sm:my-12 lg:my-16 lg:text-left lg:mr-10 lg:max-w-md">
                    <h1 className="text-[#00FF66] text-base sm:text-lg font-bold uppercase mb-4 sm:mb-8">Categories</h1>
                    <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6 sm:mb-8">
                        Enhance Your <br className="hidden sm:block" /> Music Experience
                    </h2>
                    <div className="flex justify-center lg:justify-start space-x-2 sm:space-x-3 mb-8 sm:mb-10">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="text-center bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex flex-col justify-center items-center">
                                <p className="text-black text-sm sm:text-base font-semibold">{value.toString().padStart(2, '0')}</p>
                                <p className="text-black text-[10px] sm:text-xs font-normal capitalize">{unit}</p>
                            </div>
                        ))}
                    </div>
                    <button className="bg-[#00FF66] text-white font-medium text-sm sm:text-base px-8 sm:px-12 py-3 sm:py-4 rounded hover:bg-green-400 transition">
                        Buy Now!
                    </button>
                </div>

                <div className="relative mt-8 lg:mt-0 w-full lg:w-auto flex justify-center lg:block">
                    <div className="absolute inset-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#D9D9D9] blur-[150px] sm:blur-[200px] lg:blur-[250px] rounded-full z-0 mx-auto"></div>
                    <div className="relative z-10 w-full max-w-[300px] sm:max-w-[400px] lg:max-w-none">
                        <Image
                            src="/speaker-big.png"
                            alt="Speaker"
                            width={568}
                            height={330}
                            priority
                            className="w-full h-auto lg:w-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffer;