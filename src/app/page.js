import FlashSales from '@/components/FlashSales'
import Hero from '@/components/Hero'
import Head from 'next/head'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FlashSales />
    </div>
  )
}

export default HomePage