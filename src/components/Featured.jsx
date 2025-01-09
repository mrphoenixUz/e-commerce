import Link from 'next/link'
import React from 'react'

const Featured = () => {
    return (
        <div className='container mx-auto my-32'>
            <div>
                <div className="flex items-center gap-4">
                    <div className="w-5 h-8 bg-[#DB4444] rounded"></div>
                    <h1 className="font-semibold text-base text-[#DB4444]">Featured</h1>
                </div>
                <h1 className="mt-6 text-black text-4xl font-semibold">New Arrival</h1>
            </div>
            <div className='flex mt-14 gap-[30px]'>
                <div className="relative bg-black w-[570px] overflow-hidden h-[600px]">
                    <img
                        src="./ps-5.png"
                        alt="PS5"
                        className="absolute top-[70px] left-0 w-full"
                    />
                    <div className="absolute bottom-8 left-8 max-w-60 text-white">
                        <h1 className="text-white font-semibold text-2xl">Play Station 5</h1>
                        <p className='text-sm font-normal py-4'>Black and White version of the PS5 coming out on sale.</p>
                        <Link href={"/shop"} className="border-b-[1px] text-base font-medium">Shop Now</Link>
                    </div>
                </div>

                <div className=''>
                    <div className='relative bg-black w-[570px] h-[284px] overflow-hidden'>
                        <img src="./attractive-woman.png" alt="woman" className='absolute left-[138px]' />
                        <div className="absolute bottom-6 left-6 max-w-64 text-white">
                            <h1 className="text-white font-semibold text-xl">Women's Collections</h1>
                            <p className='text-sm font-normal py-4'>Featured woman collections that give you another vibe.</p>
                            <Link href={"/shop"} className="border-b-[1px] text-base font-medium">Shop Now</Link>
                        </div>
                    </div>
                    <div className='mt-8 flex gap-[30px]'>
                        <div className='relative bg-black flex items-center justify-center w-[270px] h-[284px] overflow-hidden'>
                            <img src="./speakers.png" alt="speakers" className='' />
                            <div className="absolute bottom-8 left-8 max-w-64 text-white">
                                <h1 className="text-white font-semibold text-2xl">Speakers</h1>
                                <p className='text-sm font-normal py-2'>Amazon wireless speakers</p>
                                <Link href={"/shop"} className="border-b-[1px] text-base font-medium">Shop Now</Link>
                            </div>
                        </div>
                        <div className='relative bg-black flex items-center justify-center w-[270px] h-[284px] overflow-hidden'>
                            <img src="./gucci-perfume.png" alt="speakers" className='' />
                            <div className="absolute bottom-6 left-6 max-w-64 text-white">
                                <h1 className="text-white font-semibold text-2xl">Perfume</h1>
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