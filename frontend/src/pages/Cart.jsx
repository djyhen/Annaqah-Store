import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { TbTrash } from 'react-icons/tb';
import { useNavigate } from 'react-router';

const Cart = () => {
  const { getTotalCartAmount, all_products, cartItems, removeFromCart ,url} = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <section className='max-padd-container pt-20'>
      <div className='py-10'>
        <div className="overflow-x-auto">
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-900/20 text-gray-30 text-start py-12'>
                <th className='p-2 text-left'>Products</th>
                <th className='p-2 text-left'>Title</th>
                <th className='p-2 text-left'>Price</th>
                <th className='p-2 text-left'>Quantity</th>
                <th className='p-2 text-left'>Total</th>
                <th className='p-2 text-left'>Remove</th>
              </tr>
            </thead>
            <tbody>
              {all_products.map((product) => {
                if (cartItems[product._id] > 0) {
                  return (
                    <tr key={product._id} className='border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left'>
                      <td className='p-1'>
                        <img src={url+"/uploads/"+product.image} alt="productImg" height={43} width={43} className='rounded-lg ring-1 ring-slate-900/5' />
                      </td>
                      <td className='p-1'>
                        <div className='line-clamp-3'>{product.name}</div>
                      </td>
                      <td className='p-1'>{product.price} DT</td>
                      <td className='p-1'>{cartItems[product._id]}</td>
                      <td className='p-1'>{product.price * cartItems[product._id]}</td>
                      <td className='p-1'>
                        <div className='cursor-pointer hover:text-primary bold-22'>
                          <TbTrash onClick={() => removeFromCart(product._id)} />
                        </div>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>

        {/* Cart Details */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-20 mt-10 xl:mt-20">
          <div className="flex flex-1 gap-2 flex-col">
            <h4 className="bold-22">Summary</h4>
            <div>
              <div className="flex justify-between py-3">
                <h4 className="medium-16">SubTotal:</h4>
                <h4 className="text-gray-30 font-semibold">{getTotalCartAmount()} DT</h4>
              </div>

              <hr className='border-t border-slate-900/15' />
              <div className="flex justify-between py-2">
                <h4 className="text-sm font-medium">Shipping Fee:</h4>
                <h4 className="text-gray-30 font-semibold">{getTotalCartAmount() === 0 ? 0 : 7} DT</h4>
              </div>

              <hr className='border-t border-slate-900/15' />
              <div className="flex justify-between py-3">
                <h4 className="bold-22">Total:</h4>
                <h4 className="text-lg font-bold">{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 7} DT</h4>
              </div>
            </div>
            <button onClick={() => navigate("/order")} className="btn-secondary rounded-md py-2">Proceed To Checkout</button>
          </div>
          <div className="flex flex-col gap-6 flex-1">
            <h4 className="text-lg font-bold capitalize">Your Coupon Code:</h4>
            <div className="flex items-center bg-secondary ring-1 ring-slate-900/10 w-full max-w-full xl:max-w-[488px] rounded">
              <input
                type="text"
                placeholder="Your Coupon Code"
                className="pl-3 bg-transparent border-none outline-none flex-1 py-2"
              />
              <button className="btn-dark relative px-6 py-2">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
