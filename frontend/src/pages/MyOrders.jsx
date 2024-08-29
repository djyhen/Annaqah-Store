import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { FaBox } from 'react-icons/fa';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { url, token } = useContext(ShopContext);


   

   
        const fetchOrders = async () => {
            try {
                const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
                setOrders(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
            useEffect(()=>{
                if (token) {
                    fetchOrders();
                }
            },[token])
      

    return (
        <section className="max-padd-container pt-20">
            <div className="py-10">
                <h4 className="bold-24 mb-6">My Orders</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-500">
                                <th className="p-4 hidden sm:table-cell">Package</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Quantity</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Track</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} className="border-b border-slate-200">
                                    <td className="p-4 hidden sm:table-cell">
                                        <FaBox className="text-2xl text-primary" />
                                    </td>
                                    <td className="p-1">
                                        <p className="text-gray-700">
                                            {order.items.map((item, idx) => (
                                                <span key={idx}>
                                                    {item.name} x{item.quantity}
                                                    {idx !== order.items.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </p>
                                    </td>
                                    <td className="p-1 text-gray-700">{order.amount} DT</td>
                                    <td className="p-1 text-gray-700">{order.items.length}</td>
                                    <td className="p-4">
                                        <p className="flex items-center">
                                            <span className="text-green-500 mr-2">&#x25cf;</span>
                                            <b className="text-gray-800">{order.status}</b>
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <button className="bold-15 text-green-500 hover:underline" onClick={fetchOrders}>
                                            Track
                                        </button>
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

export default MyOrders;
