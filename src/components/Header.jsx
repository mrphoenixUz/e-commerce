"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '@/features/auth/authApi';
import { initializeAuth } from '@/features/auth/authSlice';
import { Heart, Search, ShoppingCart, User2 } from 'lucide-react';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${searchTerm}`);
    }
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'auth/logout' });
      setIsOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <div className=''>
      <div className='container mx-auto px-4 mt-6 mb-4'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          {/* Logo and mobile menu button */}
          <div className='flex justify-between items-center'>
            <Link href={'/'} className='selection:bg-transparent h-8 md:h-auto font-bold font-serif text-3xl text-orange-600'>Phoenix<span className='text-orange-900'>Shop</span></Link>
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
          <ul className={`${mobileMenuOpen ? 'flex' : 'hidden'} px-3 flex-col items-center justify-between gap-4 mt-4 md:mt-0 md:flex md:flex-row md:gap-6`}>
            <Link href={"/"}>Home</Link>
            <Link href={"/contact"}>Contact</Link>
            <Link href={"/about"}>About</Link>
          </ul>

          {/* Search and icons - shown below nav on mobile */}
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-5 mt-4 md:mt-0`}>
            <div className='flex gap-5 mt-4 md:mt-0'>
              {isAuthenticated ? (
                // Authenticated user icons
                <div className='flex items-center justify-between gap-2'>
                  <form onSubmit={handleSearch} className="md:flex hidden w-full mt-4 h-10 items-center bg-[#F5F5F5] justify-between rounded-md">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent outline-none ml-5 w-full placeholder:text-xs placeholder:font-normal"
                      placeholder="What are you looking for?"
                    />
                    <button type="submit">
                      <Search className='mr-3' />
                    </button>
                  </form>
                  <Link href={"/wishlist"}><Heart /></Link>
                  <Link href={"/cart"}><ShoppingCart /> </Link>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="focus:outline-none"
                    >
                      <User2 />
                    </button>

                    {isOpen && (
                      <div className="absolute text-sm z-10 bg-gradient-to-br from-purple-300 to-gray-600 right-0 mt-2 w-56 text-white rounded-lg shadow-lg py-2">
                        <Link href="/account" className="flex items-center gap-2 px-4 py-2 hover:bg-purple-600">
                          <img src="./user-white.svg" alt="User" width={24} />
                          Manage My Account
                        </Link>
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-purple-600"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Non-authenticated user buttons
                <div className="flex md:flex-col lg:flex-row gap-4">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={handleSearch} className="flex md:hidden w-full mt-4 h-10 items-center bg-[#F5F5F5] justify-between rounded-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none ml-5 w-full placeholder:text-xs placeholder:font-normal"
            placeholder="What are you looking for?"
          />
          <button type="submit">
            <Search className='mr-3' />
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className='border-b border-black w-full mt-4'></div>
    </div>
  )
}

export default Header