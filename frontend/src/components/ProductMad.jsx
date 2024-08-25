import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router';

const ProductMad = (props) => {
  const { product } = props;
  const { addToCart, removeFromCart, cartItems ,url} = useContext(ShopContext);
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const cartItemCount = cartItems[product._id] || 0;

  return (
    <section className='flex flex-col lg:flex-row bg-white p-4 lg:p-8 rounded-lg shadow-lg'>
      {/* Left Side */}
      <div className='flex flex-col lg:flex-row lg:flex-1 gap-4 lg:gap-6'>
        {/* Smaller images */}
        <div className='flex flex-wrap gap-2 lg:flex-col'>
          <img 
            src={url+"/uploads/"+product.image}
            alt="productImg1" 
            className='h-24 w-auto rounded-lg bg-secondary object-cover' 
          />
          <img 
            src={url+"/uploads/"+product.image} 
            alt="productImg1" 
            className='h-24 w-auto rounded-lg bg-secondary object-cover' 
          />  
          <img 
            src={url+"/uploads/"+product.image} 
            alt="productImg2" 
            className='h-24 w-auto rounded-lg bg-secondary object-cover' 
          />
          <img 
            src={url+"/uploads/"+product.image}
            alt="productImg3" 
            className='h-24 w-auto rounded-lg bg-secondary object-cover' 
          />
        </div>
        {/* Larger image */}
        <div className='flex items-center justify-center flex-1'>
          <img 
            src={url+"/uploads/"+product.image}
            alt="productImg4" 
            className='max-h-96 max-w-full rounded-lg bg-secondary object-cover' 
          />
        </div>
      </div>

      {/* Product Info */}
      <div className='flex flex-col lg:flex-1 lg:ml-6'>
        <h1 className='text-xl lg:text-2xl font-bold mb-2'>{product.name}</h1>
        <div className='flex items-center mb-4'>
          <span className='text-lg lg:text-xl font-semibold text-primary mr-4'>{product.price.toFixed(2)} DT</span>
          <div className='flex items-center text-yellow-500'>
            <span className='mr-1'>★★★★★</span>
            <span className='text-gray-500 text-sm'>(223)</span>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-4 mb-4'>
          <div className='flex flex-col'>
            <label className='text-gray-600 mb-2'>Select Color:</label>
            <div className='flex gap-2 flex-wrap'>
              {['#536493', '#D4BDAC', '#FFF1DB', '#EF5A6F'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-600 mb-2'>Select Size:</label>
            <div className='flex gap-2 flex-wrap'>
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-lg ${selectedSize === size ? 'border-black bg-secondary' : 'border-black bg-white'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row items-center gap-4 mb-6'>
          <button
            onClick={() => addToCart(product._id)}
            className='btn-dark'
          >
            Add to cart {cartItemCount > 0 && `(${cartItemCount})`}
          </button>
          {cartItemCount > 0 && (
            <button
              onClick={() => removeFromCart(product._id)}
              className='btn-outline'
            >
              Remove
            </button>
          )}
        </div>

        <div className='text-sm text-gray-500'>
          <p>Category: <span className='font-semibold'>{product.category}</span></p>
          <p>Tags: <span className='font-semibold'>Modern, New Arrivals</span></p>
        </div>
      </div>
    </section>
  );
};

export default ProductMad;
