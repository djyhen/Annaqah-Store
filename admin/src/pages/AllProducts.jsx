import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TbTrash, TbPencil } from 'react-icons/tb';
import UpdateProduct from './UpdateProduct';

const AllProducts = ({url}) => {
   
    const [list, setList] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/`);
            if (response.status === 200) {
                setList(response.data);
            } else {
                toast.error("Error fetching products");
            }
        } catch (error) {
            console.error("Error fetching product list:", error);
            toast.error("An error occurred while fetching products");
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`${url}/api/product/delete/${productId}`);
            if (response.status === 200) {
                toast.success("Product deleted successfully");
                setList(list.filter(product => product._id !== productId));
            } else {
                toast.error("Error deleting product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("An error occurred while deleting the product");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const handleEdit = (productId) => {
        setEditingProductId(productId);
    };

    const handleClose = () => {
        setEditingProductId(null);
    };

    return (
        <section className="p-6">
            <h4 className="text-2xl font-semibold mb-4">Product List</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className='p-3 text-left'>Image</th>
                            <th className='p-3 text-left'>Title</th>
                            <th className='p-3 text-left'>Price</th>
                            <th className='p-3 text-left'>Edit</th>
                            <th className='p-3 text-left'>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {list.map((product) => (
                            <tr key={product._id}>
                                <td className='p-3'>
                                    <img
                                        src={`${url}/uploads/${product.image}`}
                                        alt={product.name}
                                        className='h-16 w-16 object-cover rounded-lg border border-gray-300'
                                    />
                                </td>
                                <td className='p-3'>{product.name}</td>
                                <td className='p-3'>{product.price} DT</td>
                                <td className='p-3 text-blue-400 cursor-pointer'>
                                    <TbPencil onClick={() => handleEdit(product._id)} />
                                </td>
                                <td className='p-3 text-red-400 cursor-pointer'>
                                    <TbTrash onClick={() => deleteProduct(product._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingProductId && (
                <UpdateProduct
                    productId={editingProductId}
                    onClose={handleClose}
                />
            )}
        </section>
    );
};

export default AllProducts;
