import React from 'react';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { MdCurrencyExchange } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';
import { TbPackageImport } from 'react-icons/tb';

const Features = () => {
  return (
    <section className='bg-secondary py-8 rounded-lg mt-16 xl:mt-18'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-8'>
          <div className='flex items-center gap-4 p-6 bg-white rounded-lg shadow-lg'>
            <LiaShippingFastSolid className='text-4xl text-primary' />
            <div>
              <h5 className='text-lg font-semibold'>Fast Delivery</h5>
              <p className='text-sm text-gray-600'>Within 2-5 business days</p>
            </div>
          </div>

          <div className='flex items-center gap-4 p-6 bg-white rounded-lg shadow-lg'>
            <MdCurrencyExchange className='text-4xl text-primary' />
            <div>
              <h5 className='text-lg font-semibold'>Easy Returns</h5>
              <p className='text-sm text-gray-600'>Within 30 days of purchase</p>
            </div>
          </div>

          <div className='flex items-center gap-4 p-6 bg-white rounded-lg shadow-lg'>
            <BiSupport className='text-4xl text-primary' />
            <div>
              <h5 className='text-lg font-semibold'>24/7 Support</h5>
              <p className='text-sm text-gray-600'>We're here to help anytime</p>
            </div>
          </div>

          <div className='flex items-center gap-4 p-6 bg-white rounded-lg shadow-lg'>
            <TbPackageImport className='text-4xl text-primary' />
            <div>
              <h5 className='text-lg font-semibold'>Free Shipping</h5>
              <p className='text-sm text-gray-600'>On orders above 100DT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
