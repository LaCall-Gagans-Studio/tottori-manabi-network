// library
import React from 'react'

// payload
// import config from '@/payload.config'

// components
import Header from '../components/header'
import Hero from '../components/section.root/hero'
import News from '../components/section.root/news'
import Gallery from '../components/section.root/gallery'
import About from '../components/section.root/about'
import Links from '../components/section.root/links'
import Footer from '../components/footer'

export default async function HomePage() {

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <News />
      <Gallery />
      <About />
      <Links />
      <Footer />
    </div>
  )
}
