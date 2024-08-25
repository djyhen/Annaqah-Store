import React, { useContext } from 'react';
import Item from '../components/Item';
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = ({ category }) => {
  const { all_products } = useContext(ShopContext);

  if (!all_products || all_products.length === 0) {
    return <div>No products available.</div>; // Handle case where data might be missing
  }

  // Filter products based on the selected category
  const filteredProducts = all_products.filter((product) => 
    category === 'All' || category === product.category
  );

  return (
    <section id='shop' className='max-padd-container py-16'>
      {/* title */}
      <div className="flex flex-col items-center pb-20 text-center">
        <h4 className="text-4xl font-extrabold leading-none font-ace">
          <span className="block text-lg">See</span>
          Products
        </h4>
      </div>
      <hr className="hr-custom" />

      {/* container */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
        {filteredProducts.map((product) => (
          <div key={product._id}>
            <Item product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductDisplay;
