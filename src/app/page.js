import Categories from '@/components/Categories'
import Featured from '@/components/Featured'
import FlashSales from '@/components/FlashSales'
import Hero from '@/components/Hero'
import OurProducts from '@/components/OurProducts'
import Services from '@/components/Services'
import SpecialOffer from '@/components/SpecialOffer'
import ThisMonth from '@/components/ThisMonth'
import Head from 'next/head'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FlashSales />
      <Categories />
      <ThisMonth />
      <SpecialOffer />
      <OurProducts />
      <Featured />
      <Services />
    </div>
  )
}

export default HomePage