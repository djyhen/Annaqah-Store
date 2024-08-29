import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Order = () => {
   const navigate = useNavigate()
  const {getTotalCartAmount,token,all_products,cartItems,url} = useContext(ShopContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  };

  {/**
  useEffect(()=>{
    console.log(data)
  },[data])
  
 */}

 const placeOrder = async (e) => {
  e.preventDefault();

  let orderItems = [];
  all_products.forEach((item) => {
    if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
    }
  });

  let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 7,
  };

  try {
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

      console.log('Order placement response:', response.data);

      if (response.data.success) {
          const { payment_link } = response.data;
          console.log('Redirecting to:', payment_link);
          window.location.replace(payment_link);  // Correctly redirect to the payment link
      } else {
          alert("Error occurred while processing the payment.");
      }
  } catch (error) {
      console.error("Order placement failed: ", error);
      alert("An error occurred while placing the order. Please try again.");
  }
};

useEffect(()=>{
  if(!token){
    navigate("/cart")
  }else if( getTotalCartAmount()===0 ){
    navigate("/cart")
  }
},[token])

  return (
    <section className='max-padd-container py-28 xl:py-32'>
      <form onSubmit={placeOrder}>
        {/* Delivery Information */}
        <div className='bg-secondary p-6 rounded-md shadow-md'>
          <h3 className='text-lg font-bold text-gray-800 mb-6'>Delivery Information</h3>
          <div className='flex gap-4 mb-4'>
            <input 
              onChange={onChangeHandler}
              value={data.firstName}
              type="text" 
              name='firstName' 
              placeholder='First Name' 
              required 
              className='ring-1 ring-slate-900/15 p-3 rounded-sm outline-none w-1/2' 
            />
            <input
              onChange={onChangeHandler}
              value={data.lastName} 
              type="text" 
              name='lastName' 
              placeholder='Last Name' 
              required 
              className='ring-1 ring-slate-900/15 p-3 rounded-sm outline-none w-1/2' 
            />
          </div>
          <input 
            onChange={onChangeHandler}
            value={data.email}
            type="email" 
            name='email' 
            placeholder='Email' 
            required 
            className='ring-1 ring-slate-900/15 p-3 rounded-sm outline-none mb-4 w-full' 
          />
          <input 
            onChange={onChangeHandler}
            value={data.phone}
            type="text" 
            name='phone' 
            required 
            placeholder='Phone Number' 
            className='ring-1 ring-slate-900/15 p-3 rounded-sm outline-none mb-4 w-full' 
          />
          <input 
            onChange={onChangeHandler}
            value={data.street}
            type="text" 
            name='street' 
            required 
            placeholder='Street' 
            className='ring-1 ring-slate-900/15 p-3 rounded-sm outline-none mb-4 w-full' 
          />
          <div className='flex gap-4 mb-4'>
            <input 
              onChange={onChangeHandler}
              value={data.city}
              type="text" 
              name='city' 
              required 
              placeholder='City' 
              className='ring-1 ring-slate-900/15 p-3 rounded-sm outline-none w-1/2' 
            />
            <input 
              onChange={onChangeHandler}
              value={data.state}
              type="text" 
              name='state' 
              required 
              placeholder='State' 
              className='ring-1 ring-slate-900/15 p-3 rounded-sm outline-none w-1/2' 
            />
          </div>
          <div className='flex gap-4'>
            <input 
             onChange={onChangeHandler}
             value={data.zipcode}
              type="text" 
              name='zipcode' 
              required 
              placeholder='Zip Code' 
              className='ring-1 ring-slate-900/15 p-3 rounded-sm outline-none w-1/2' 
            />
            <input 
              onChange={onChangeHandler}
              value={data.country}
              type="text" 
              name='country' 
              required 
              placeholder='Country' 
              className='ring-1 ring-slate-900/15 p-3 rounded-sm outline-none w-1/2' 
            />
          </div>    
        </div>
         {/* ++++++++++++++++++++ */}
      <div className="flex flex-col xl:flex-row gap-20 mt-20">
          <div className="flex flex-1 gap-2 flex-col">
            <h4 className="bold-22">Summary</h4>
            <div>
              <div className="flexBetween py-3">
                <h4 className="medium-16">SubTotal:</h4>
                <h4 className="text-gray-30 font-semibold">{getTotalCartAmount()} DT</h4>
              </div>

              <hr className='border-t border-slate-900/15' />
              <div className="flex justify-between py-2">
                <h4 className="text-sm font-medium">Shipping Fee:</h4>
                <h4 className="text-gray-30 font-semibold">{getTotalCartAmount() === 0 ? 0 : 7} DT</h4>
              </div>

              <hr className='border-t border-slate-900/15' />
              <div className="flexBetween py-3">
                <h4 className="bold-22">Total:</h4>
                <h4 className="text-lg font-bold">{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()+ 7} DT</h4>
              </div>
            </div>
            <button type='submit' className="btn-secondary rounded-md py-2">Proceed To Payment</button>
          </div>
        </div>
      </form>
     
    </section>
  );
}

export default Order;
