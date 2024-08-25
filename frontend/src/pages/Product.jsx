import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom'; 
import ProductHd from '../components/ProductHd';

import ProductDescription from '../components/ProductDescription';
import ProductMad from '../components/ProductMad';

const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_products.find((e) => e._id === productId);
 { /*if (!product) {
    return <div className='h1 pt-28'>Product not Found</div>;
  }*/}
  console.log({productId})

  return (
    <section className='max-padd-container py-20'>
      <div>
        <ProductHd product={product} />
        <ProductMad product={product} />
        <ProductDescription  /> 
      </div>
    </section>
  );
};

export default Product;
