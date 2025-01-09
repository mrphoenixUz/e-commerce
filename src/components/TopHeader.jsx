import Link from 'next/link'
import React from 'react'

const TopHeader = () => {
  return (
    <div className='bg-black h-12 flex justify-between text-white items-center'>
      <div></div>
      <div className=''>
        <p className='text-sm ml-[160px] font-normal'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <Link href={"/"} className='border-b border-white font-semibold text-sm'>ShopNow</Link></p>
      </div>
      <div className='mr-32'>
        <select className='text-white bg-transparent focus:outline-none'>
          <option className='text-white bg-black' defaultValue={"English"} value="en">English</option>
          <option className='text-white bg-black' value="ru">Русскый</option>
        </select>
      </div>
    </div>
  )
}

export default TopHeader