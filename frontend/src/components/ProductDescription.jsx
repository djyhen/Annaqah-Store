import React, { useState } from 'react';

const ProductDescription = () => {
  // State to track which section is selected
  const [activeSection, setActiveSection] = useState('description');

  // Function to handle button clicks
  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className='max-padd-container mt-20'>
      <div className='flex gap-3 mb-4'>
        <button
          className={`btn-dark rounded-sm !text-xs !py-[6px] w-36 ${activeSection === 'description' ? 'bg-dark text-black' : 'bg-transparent text-dark'}`}
          onClick={() => handleButtonClick('description')}
        >
          Description
        </button>
        <button
          className={`btn-outline rounded-sm !text-xs !py-[6px] w-36 ${activeSection === 'careGuide' ? 'bg-dark text-black' : 'bg-transparent text-dark'}`}
          onClick={() => handleButtonClick('careGuide')}
        >
          Care Guide
        </button>
        <button
          className={`btn-outline rounded-sm !text-xs !py-[6px] w-36 ${activeSection === 'sizeGuide' ? 'bg-dark text-black' : 'bg-transparent text-dark'}`}
          onClick={() => handleButtonClick('sizeGuide')}
        >
          Size Guide
        </button>
      </div>
      <div className='flex flex-col pb-16'>
        {activeSection === 'description' && (
          <>
            <p className='text-sm'>
            Here is some description guide information. Follow the instructions to maintain your product in good condition.
            </p>
            <p className='text-sm'>
            Here is some description guide information. Follow the instructions to maintain your product in good condition.
            </p>
          </>
        )}
        {activeSection === 'careGuide' && (
          <p className='text-sm'>
            Here is some care guide information. Follow the instructions to maintain your product in good condition.
          </p>
        )}
        {activeSection === 'sizeGuide' && (
          <p className='text-sm'>
            Size guide information goes here. Choose the appropriate size based on your measurements.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
