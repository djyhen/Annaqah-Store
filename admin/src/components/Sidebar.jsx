import React from 'react';
import { BsCardChecklist, BsCardList, BsPlusSquare } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='w-1/5 min-h-screen border-r border-r-sky-900/10'>
      <div className='flex flex-col gap-8 pt-4 sm:pt-10 pl-4'>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? 'active-link'
              : 'flex items-center gap-x-3 cursor-pointer h-12 max-w-[150px] border border-slate-900/15 bg-transparent px-3 py-2 rounded-md'
          }
        >
          <BsPlusSquare className='text-xl' />
          <p className='hidden lg:flex text-base'>Add Product</p>
        </NavLink>
       
        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive
              ? 'active-link'
              : 'flex items-center gap-x-3 cursor-pointer h-12 max-w-[150px] border border-slate-900/15 bg-transparent px-3 py-2 rounded-md'
          }
        >
          <BsCardList className='text-xl' />
          <p className='hidden lg:flex text-base'>List Products</p>
        </NavLink>
        
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? 'active-link'
              : 'flex items-center gap-x-3 cursor-pointer h-12 max-w-[150px] border border-slate-900/15 bg-transparent px-3 py-2 rounded-md'
          }
        >
          <BsCardChecklist className='text-xl' />
          <p className='hidden lg:flex text-base'>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
