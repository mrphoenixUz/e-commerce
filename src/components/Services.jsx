import React from 'react'

const Services = () => {
    return (
        <div className='container mx-auto mb-36 flex gap-[88px] justify-center'>
            <div className='flex flex-col justify-center items-center'>
                <img src="./delivery.svg" alt="" />
                <h1 className='mt-6 mb-2 font-semibold text-xl'>FREE AND FAST DELIVERY</h1>
                <p className='font-normal text-sm'>Free delivery for all orders over $140</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <img src="./support.svg" alt="" />
                <h1 className='mt-6 mb-2 font-semibold text-xl'>24/7 CUSTOMER SERVICE</h1>
                <p className='font-normal text-sm'>Friendly 24/7 customer support</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <img src="./guarantee.svg" alt="" />
                <h1 className='mt-6 mb-2 font-semibold text-xl'>MONEY BACK GUARANTEE</h1>
                <p className='font-normal text-sm'>We reurn money within 30 days</p>
            </div>
        </div>
    )
}

export default Services