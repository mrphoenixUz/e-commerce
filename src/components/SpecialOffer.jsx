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
        <div className="container mx-auto mt-36 flex flex-col justify-between lg:flex-row items-center bg-black py-10 px-5 lg:px-14 relative">
            <div className="text-center my-16 lg:text-left lg:mr-10">
                <h1 className="text-[#00FF66] text-lg font-bold uppercase mb-8">Categories</h1>
                <h2 className="text-white text-5xl font-semibold leading-tight mb-8">
                    Enhance Your <br /> Music Experience
                </h2>
                <div className="flex justify-center lg:justify-start space-x-3 mb-10">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="text-center bg-white rounded-full w-16 h-16 flex flex-col justify-center items-center">
                            <p className="text-black text-base font-semibold">{value.toString().padStart(2, '0')}</p>
                            <p className="text-black text-xs font-normal capitalize">{unit}</p>
                        </div>
                    ))}
                </div>
                <button className="bg-[#00FF66] text-white font-medium text-base px-12 py-4 rounded hover:bg-green-400 transition">
                    Buy Now!
                </button>
            </div>

            <div className="relative mt-10 lg:mt-0">
                <div className="absolute inset-0 w-[500px] h-[500px] bg-[#D9D9D9] blur-[250px] rounded-full z-0"></div>
                <div className="relative right-5 z-10">
                    <Image
                        src="/speaker-big.png"
                        alt="Speaker"
                        width={568}
                        height={330}
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default SpecialOffer;
