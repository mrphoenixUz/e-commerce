import Link from 'next/link'
import React from 'react'

const TopHeader = () => {
  return (
    <div className='bg-black py-3 text-white'>
      <div className='flex-1 container mx-auto flex justify-center text-center items-center'>
        <p className='text-sm font-normal'>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
          <Link href={"/"} className='border-b border-white font-semibold text-sm'>
            ShopNow
          </Link>
        </p>
      </div>
    </div>
  )
}

export default TopHeader