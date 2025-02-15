import Link from 'next/link'
import React from 'react'

const Featured = () => {
    return (
        <div className='container mx-auto my-16 md:my-24 lg:my-32 px-4 lg:px-0'>
            <div>
                <div className="flex items-center gap-4">
                    <div className="w-5 h-8 bg-[#DB4444] rounded"></div>
                    <h1 className="font-semibold text-base text-[#DB4444]">Featured</h1>
                </div>
                <h1 className="mt-6 text-black text-3xl md:text-4xl font-semibold">New Arrival</h1>
            </div>
            <div className='flex flex-col lg:flex-row mt-8 md:mt-10 lg:mt-14 gap-4 md:gap-6 lg:gap-[30px]'>
                {/* PS5 Section */}
                <div className="relative bg-black w-full lg:w-[570px] h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                    <img
                        src="./ps-5.png"
                        alt="PS5"
                        className="absolute top-[70px] left-0 w-full"
                    />
                    <div className="absolute bottom-8 left-8 max-w-60 text-white">
                        <h1 className="text-white font-semibold text-xl md:text-2xl">Play Station 5</h1>
                        <p className='text-sm font-normal py-3 md:py-4'>Black and White version of the PS5 coming out on sale.</p>
                        <Link href={"/shop"} className="border-b-[1px] text-base font-medium">Shop Now</Link>
                    </div>
                </div>

                {/* Right Column */}
                <div className='w-full lg:w-[570px]'>
                    {/* Women's Collections */}
                    <div className='relative bg-black w-full h-[284px] overflow-hidden'>
                        <img 
                            src="./attractive-woman.png" 
                            alt="woman" 
                            className='absolute left-1/2 transform -translate-x-1/2 lg:left-[138px] lg:transform-none'
                        />
                        <div className="absolute bottom-6 left-6 max-w-64 text-white">
                            <h1 className="text-white font-semibold text-lg md:text-xl">Women's Collections</h1>
                            <p className='text-sm font-normal py-3 md:py-4'>Featured woman collections that give you another vibe.</p>
                            <Link href={"/shop"} className="border-b-[1px] text-base font-medium">Shop Now</Link>
                        </div>
                    </div>

                    {/* Bottom Cards */}
                    <div className='mt-4 md:mt-6 lg:mt-8 flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-[30px]'>
                        {/* Speakers Card */}
                        <div className='relative bg-black flex items-center justify-center w-full sm:w-1/2 lg:w-[270px] h-[284px] overflow-hidden'>
                            <img src="./speakers.png" alt="speakers" className='max-w-full h-auto' />
                            <div className="absolute bottom-8 left-8 max-w-64 text-white">
                                <h1 className="text-white font-semibold text-xl md:text-2xl">Speakers</h1>
                                <p className='text-sm font-normal py-2'>Amazon wireless speakers</p>
                                <Link href={"/shop"} className="border-b-[1px] text-base font-medium">Shop Now</Link>
                            </div>
                        </div>

                        {/* Perfume Card */}
                        <div className='relative bg-black flex items-center justify-center w-full sm:w-1/2 lg:w-[270px] h-[284px] overflow-hidden'>
                            <img src="./gucci-perfume.png" alt="speakers" className='max-w-full h-auto' />
                            <div className="absolute bottom-6 left-6 max-w-64 text-white">
                                <h1 className="text-white font-semibold text-xl md:text-2xl">Perfume</h1>
                                <p className='text-sm font-normal py-2'>GUCCI INTENSE OUD EDP</p>
                                <Link href={"/shop"} className="border-b-[1px] text-base font-medium">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured