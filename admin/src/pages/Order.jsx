import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBox } from 'react-icons/fa';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler = async (event,orderId)=>{
    //console.log(event,orderId)
    const response = await axios.post(url+'/api/order/status',{orderId,status:event.target.value})
    if(response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <section className="max-w-6xl mx-auto pt-16 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h4 className="text-2xl font-semibold mb-6 text-gray-800">Order Page</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-secondary text-gblack uppercase text-sm tracking-wider">
                <th className="p-4 hidden sm:table-cell">Package</th>
                <th className="p-4">Order</th>
                <th className="p-4">Items</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-gray-200 cursor-pointer transition duration-150">
                  <td className="p-4 hidden sm:table-cell">
                    <FaBox className="text-2xl text-primary" />
                  </td>
                  <td className="p-4 flex items-center">
                    <div className="space-y-2 ">
                      <p>
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.name} x{item.quantity}
                            {idx !== order.items.length - 1 && ', '}
                          </span>
                        ))}
                      </p>
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-800">{`${order.address.firstName} ${order.address.lastName}`}</h5>
                        <div className="text-sm text-gray-600">
                          <p>{order.address.street},</p>
                          <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                          <p>{order.address.phone}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{order.items.length}</td>
                  <td className="p-4">{order.amount} DT</td>
                  <td className="p-4">
                    <select 
                      onChange={(event)=>statusHandler(event,order._id)}
                      value={order.status}
                      name="" 
                      className=' cursor-pointer bg-secondary text-black   text-sm py-1 px-2 rounded-md focus:outline-none' >
                      <option value="pending" >Pending</option>
                      <option value="out for delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Order;
