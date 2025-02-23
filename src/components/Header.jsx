"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useLogoutMutation } from "@/features/auth/authApi"
import { initializeAuth } from "@/features/auth/authSlice"
import { Heart, Search, ShoppingCart, User2, X } from "lucide-react"
import { useGetCategoriesQuery } from "@/features/products/productsApi"

const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logout] = useLogoutMutation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState("")
  const mobileMenuRef = useRef(null)

  const { data: categories } = useGetCategoriesQuery()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/products?search=${searchTerm}`)
    }
  }

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      dispatch({ type: "auth/logout" })
      setIsOpen(false)
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="">
      <div className="container mx-auto px-4 mt-6 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex justify-between items-center">
            <Link
              href={"/"}
              className="selection:bg-transparent h-8 md:h-auto font-bold font-serif text-3xl text-orange-600"
            >
              Phoenix<span className="text-orange-900">Shop</span>
            </Link>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <ul className="hidden md:flex md:flex-row md:gap-6">
            <Link href={"/"}>Home</Link>
            <Link href={"/contact"}>Contact</Link>
            <Link href={"/about"}>About</Link>
          </ul>

          <div className="hidden md:flex flex-col md:flex-row items-center gap-5 mt-4 md:mt-0">
            <div className="flex gap-5 mt-4 md:mt-0">
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-2">
                  <form
                    onSubmit={handleSearch}
                    className="md:flex hidden w-full mt-4 h-10 items-center bg-[#F5F5F5] justify-between rounded-md"
                  >
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent outline-none ml-5 w-full placeholder:text-xs placeholder:font-normal"
                      placeholder="What are you looking for?"
                    />
                    <button type="submit">
                      <Search className="mr-3" />
                    </button>
                  </form>
                  <Link href={"/wishlist"}>
                    <Heart />
                  </Link>
                  <Link href={"/cart"}>
                    <ShoppingCart />{" "}
                  </Link>
                  <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                      <User2 />
                    </button>

                    {isOpen && (
                      <div className="absolute text-sm z-10 bg-gradient-to-br from-purple-300 to-gray-600 right-0 mt-2 w-56 text-white rounded-lg shadow-lg py-2">
                        <Link href="/account" className="flex items-center gap-2 px-4 py-2 hover:bg-purple-600">
                          <img src="./user-white.svg" alt="User" width={24} />
                          Manage My Account
                        </Link>
                        <hr className="my-2" />
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-purple-600">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex md:flex-col lg:flex-row gap-4">
                  <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
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
        <form
          onSubmit={handleSearch}
          className="flex md:hidden w-full mt-4 h-10 items-center bg-[#F5F5F5] justify-between rounded-md"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none ml-5 w-full placeholder:text-xs placeholder:font-normal"
            placeholder="What are you looking for?"
          />
          <button type="submit">
            <Search className="mr-3" />
          </button>
        </form>
      </div>

      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 flex flex-col h-full">
          <button onClick={() => setMobileMenuOpen(false)} className="mb-4 self-end">
            <X />
          </button>
          <ul className="space-y-4 flex-grow">
            <li>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
            </li>
            <li className="font-bold mt-4">Categories</li>
            {categories &&
              categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.category_name.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.category_name}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="mt-auto space-y-4">
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <Heart size={20} />
              <span>Favorites</span>
            </Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
            {isAuthenticated ? (
              <div>
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <User2 size={20} />
                  <span>My Account</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="mt-2 flex items-center gap-2 text-red-600"
                >
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-black w-full mt-4"></div>
    </div>
  )
}

export default Header

