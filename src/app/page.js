import Categories from '@/components/Categories'
import Featured from '@/components/Featured'
import FlashSales from '@/components/FlashSales'
import Hero from '@/components/Hero'
import Head from 'next/head'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FlashSales />
      <Categories />
      <Featured />
    </div>
  )
}

export default HomePage