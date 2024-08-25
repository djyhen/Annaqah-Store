import React from 'react'
import logo from '../assets/logo.jpg'
import profile from '../assets/profile.jpg'
const Navbar = () => {
  return (
    <div className='max-padd-container flexBetween py-2'>
      <img src={logo} alt="logoImg" width={75} height={75} className='w-14 h-14 rounded-full border-1    border-primary object-cover hover:opacity-90 transition-opacity duration-200 cursor-pointer'/>
      <div className="text-lg font-semibold text-black bg-secondary px-4 py-1 rounded-full tracking-wider shadow-sm">
        Admin Panel
      </div>
      <div className="flex items-center">
        <img 
          src={profile} 
          alt="profile" 
          className="w-14 h-14 rounded-full border-1 border-secondary object-cover hover:opacity-90 transition-opacity duration-200"
        />
      </div>
    </div>
  )
}

export default Navbar
