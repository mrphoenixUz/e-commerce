"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <div className='container mx-auto px-4 mt-6 md:mt-10 mb-4'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          {/* Logo and mobile menu button */}
          <div className='flex justify-between items-center'>
            <img src="./Logo.svg" alt="Logo" className='h-8 md:h-auto' />
            <button
              className='md:hidden'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Navigation - mobile dropdown, desktop horizontal */}
          <ul className={`${mobileMenuOpen ? 'flex' : 'hidden'} flex-col items-center gap-4 mt-4 md:mt-0 md:flex md:flex-row md:gap-12`}>
            <Link href={"/"}>Home</Link>
            <Link href={"/contact"}>Contact</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/signup"}>Sign Up</Link>
          </ul>

          {/* Search and icons - shown below nav on mobile */}
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-5 mt-4 md:mt-0`}>
            <div className='flex w-full md:w-64 h-10 items-center bg-[#F5F5F5] justify-between rounded-md'>
              <input
                type="text"
                className='bg-transparent outline-none ml-5 w-full placeholder:text-xs placeholder:font-normal'
                placeholder='What are you looking for?'
              />
              <button><img width={24} height={24} src="./search.svg" alt="search svg" className='mr-3' /></button>
            </div>
            <div className='flex gap-5 mt-4 md:mt-0'>
              <img width={32} height={32} src="./Wishlist.svg" alt="Wishlist" />
              <img width={32} height={32} src="./cart.svg" alt="Cart" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='border-b border-black w-full mt-4'></div>
    </div>
  )
}

export default Header