import React, { useEffect, useState } from 'react';
import upload_area from '../assets/upload_area.svg';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = ({url}) => {
    
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"",
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

   /* useEffect(()=>{
        console.log(data)
    },[data])
    */

    const onSubmitHandler = async (event)=>{
        event.preventDefault()
        const formData = new FormData();
        formData.append("image",image)
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("price",Number(data.price))
        const response = await axios.post(`${url}/api/product/add`,formData);
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"",
            });
            setImage(false)
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }

    }
  return (
    <section className='p-4 sm:p-6 w-full bg-secondary/20'>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-y-4 max-w-lg mx-auto bg-white p-4 shadow-md rounded-lg'>
        <h4 className='text-xl font-bold text-gray-900 uppercase mb-2'>Products Upload</h4>
        
        <div className='flex flex-col gap-y-1'>
          <p className='text-gray-700 text-sm'>Upload image</p>
          <label htmlFor='image' className='flex items-center justify-center border border-gray-300 rounded-lg cursor-pointer p-2'>
            <img src={image?URL.createObjectURL(image):upload_area} alt='Upload Area' className='h-16'/>
            <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
          </label>
        </div>
        
        <div className='flex flex-col gap-y-1'>
          <p className='text-gray-700 text-sm'>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            name='name'
            type='text'
            required
            placeholder='Type here..'
            className='border border-gray-300 p-1 rounded-md outline-none focus:border-gray-500'
          />
        </div>
        
        <div className='flex flex-col gap-y-1'>
          <p className='text-gray-700 text-sm'>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            placeholder='Write content here..'
            rows={4}
            required
            className='border border-gray-300 p-1 rounded-md outline-none resize-none focus:border-gray-500'
          ></textarea>
        </div>
        
        <div className='flex flex-col gap-y-2'>
          <div className='flex flex-col gap-y-1'>
            <p className='text-gray-700 text-sm'>Product category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name='category'
              required
              className='border border-gray-300 p-1 rounded-md outline-none focus:border-gray-500'
            >
              <option value=''>Select category</option>
              <option value='abaya'>Abaya</option>
              <option value='khimar'>Khimar</option>
              <option value='set'>Set</option>
              <option value='burkini'>Burkini</option>
              <option value='accessorie'>Accessorie</option>
            </select>
          </div>
          
          <div className='flex flex-col gap-y-1'>
            <p className='text-gray-700 text-sm'>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              name='price'
              type='number'
              required
              placeholder='Type here..'
              className='border border-gray-300 p-1 rounded-md outline-none focus:border-gray-500'
            />
          </div>
        </div>
        
        <button
          type='submit'
          className='flex items-center justify-center gap-x-2 btn-secondary py-2 px-4 rounded-md'
        >
          <FaPlus />
          Add Product
        </button>
      </form>
    </section>
  );
}

export default AddProduct;
