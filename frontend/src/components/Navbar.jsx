import React, { useState } from 'react';

const Navbar = ({ containerstyles }) => {
  const [isActive, setIsActive] = useState(null);

  return (
    <nav className={`flex items-center ${containerstyles}`}>
      <a 
        href="#home" 
        onClick={() => setIsActive('home')} 
        className={`transition-colors duration-300 ${isActive === 'home' ? 'text-primary  border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
      >
        Home
      </a>
      <a 
        href="#categories" 
        onClick={() => setIsActive('categories')} 
        className={`transition-colors duration-300 ${isActive === 'categories' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
      >
        Categories
      </a>
      <a 
        href="#shop" 
        onClick={() => setIsActive('shop')} 
        className={`transition-colors duration-300 ${isActive === 'shop' ? 'text-primary  border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
      >
        Shop
      </a>
      <a 
        href="#contact" 
        onClick={() => setIsActive('contact')} 
        className={`transition-colors duration-300 ${isActive === 'contact' ? 'text-primary  border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
      >
        Contact
      </a>
    </nav>
  );
};

export default Navbar;
