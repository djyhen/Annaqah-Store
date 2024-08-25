import React from 'react'
import { Link } from 'react-router-dom'
import { BsFire } from "react-icons/bs"
import { FaArrowRight } from "react-icons/fa"

const Hero = () => {
  return (
    <section id='home' className='max-padd-container bg-hero bg-center bg-cover bg-no-repeat h-[777px] w-full'>
      <div className='relative max-w-[666px] top-44 xs:top-72'>
        <h4 className='flex items-center gap-x-2 uppercase text-primary bold-18'>
          Where Modesty Meets Style <BsFire />
        </h4>
        <h2 className='h1 capitalize mt-4'>Grab Up to 20% Off On Selected Products</h2>
        <p className='border-l-4 border-primary pl-3 my-6'>
          Welcome to Annaqah Store, your ultimate destination for stylish and high-quality hijabs.
          Discover a diverse collection that combines elegance with comfort for every occasion.
        </p>

        {/* Buttons */}
        <div className='flex items-center gap-x-4 mt-7'>
          <Link to={""} className='btn-primary bold-15 rounded-full flex items-center gap-x-2'>
            Latest Products
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
