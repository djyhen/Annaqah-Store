import React from 'react';
import { TbArrowRight } from 'react-icons/tb';

const ProductHd = ({ product }) => {
  return (
    <div className='max-padd-container flex items-center flex-wrap gap-2 py-4 bg-secondary text-black capitalize px-4 md:px-8 lg:px-12'>
      <span id='home' className='text-sm md:text-base lg:text-lg cursor-pointer rounded-tl-xl rounded-tr-xl' >Home</span>
      <TbArrowRight className='text-sm md:text-base lg:text-lg' />
      <span className='text-sm md:text-base lg:text-lg cursor-pointer'>{product.category}</span>
      <TbArrowRight className='text-sm md:text-base lg:text-lg' />
      <span className='text-sm md:text-base lg:text-lg cursor-pointer'>{product.name}</span>
    </div>
  );
};

export default ProductHd;
