import React from 'react'

const Services = () => {
    return (
        <div className='container mx-auto px-4 lg:px-0 mb-16 md:mb-24 lg:mb-36'>
            <div className='flex flex-col sm:flex-row gap-8 md:gap-12 lg:gap-[88px] justify-center items-center'>
                <div className='flex flex-col justify-center items-center text-center max-w-[250px]'>
                    <img src="./delivery.svg" alt="Delivery icon" className='w-16 md:w-auto' />
                    <h1 className='mt-4 md:mt-6 mb-2 font-semibold text-lg md:text-xl'>FREE AND FAST DELIVERY</h1>
                    <p className='font-normal text-sm'>Free delivery for all orders over $140</p>
                </div>
                <div className='flex flex-col justify-center items-center text-center max-w-[250px]'>
                    <img src="./support.svg" alt="Support icon" className='w-16 md:w-auto' />
                    <h1 className='mt-4 md:mt-6 mb-2 font-semibold text-lg md:text-xl'>24/7 CUSTOMER SERVICE</h1>
                    <p className='font-normal text-sm'>Friendly 24/7 customer support</p>
                </div>
                <div className='flex flex-col justify-center items-center text-center max-w-[250px]'>
                    <img src="./guarantee.svg" alt="Guarantee icon" className='w-16 md:w-auto' />
                    <h1 className='mt-4 md:mt-6 mb-2 font-semibold text-lg md:text-xl'>MONEY BACK GUARANTEE</h1>
                    <p className='font-normal text-sm'>We reurn money within 30 days</p>
                </div>
            </div>
        </div>
    )
}

export default Services