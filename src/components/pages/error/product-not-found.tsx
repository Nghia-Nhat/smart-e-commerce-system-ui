import Image from 'next/image'
import React from 'react'

const ProductNotFound = () => {
  return (
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
  )
}

export default ProductNotFound