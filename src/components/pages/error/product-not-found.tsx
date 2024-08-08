import Footer from '@/components/partials/footer'
import Navbar from '@/components/partials/navbar'
import NavbarMobile from '@/components/partials/navbar-mobile'
import ScrollToTop from '@/components/partials/scroll-to-top'
import Image from 'next/image'
import React from 'react'

const PageNotFound = () => {
  return <>
        <div className="min-h-[100vh] h-fit pb-20">
          <Navbar />
          <div className='flex h-[50vh] md:h-[90vh] justify-center items-center'> 
              <Image 
              src="/images/404.png"
              width={500}
              height={500}
              alt="Product not found"
              draggable="false"
              className='select-none'
              />
          </div>
        </div>
        
        {/* Some utils */}
        <ScrollToTop/>
        <NavbarMobile />
        <Footer />
  </>
  }

export default PageNotFound