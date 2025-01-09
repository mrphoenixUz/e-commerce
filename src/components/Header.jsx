import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
      <div className='flex justify-between container mx-auto mt-10 mb-4'>
        <img src="./Logo.svg" alt="" />
        <ul className='flex gap-12'>
          <Link href={"/"}>Home</Link>
          <Link href={"/contact"}>Contact</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/signup"}>Sign Up</Link>
        </ul>
        <div className='flex gap-5'>
          <div className='flex w-64 h-10 items-center bg-[#F5F5F5] justify-between'>
            <input type="text" className='bg-transparent outline-none ml-5 placeholder:text-xs placeholder:font-normal' placeholder='What are you looking for?' />
            <button><img width={24} height={24} src="./search.svg" alt="search svg" className='mr-3' /></button>
          </div>
          <img width={32} height={32} src="./Wishlist.svg" alt="" />
          <img width={32} height={32} src="./cart.svg" alt="" />
        </div>
      </div>
      <div className='border-b border-black w-full'></div>
    </div>
  )
}

export default Header