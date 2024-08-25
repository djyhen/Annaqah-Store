import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone, FaYoutube, FaTiktok, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id='contact' className="bg-secondary text-black py-8 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content row */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-start mb-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start lg:w-1/3 mb-8 lg:mb-0">
            <Link  to="/" className="flex items-center space-x-2 mb-4">
              <h3  className="text-2xl font-bold text-center lg:text-left">
                Annaqah <span className="text-primary">Store</span>
              </h3>
            </Link>
            <p className="text-sm font-semibold text-center lg:text-left">
              Welcome to Annaqah Store, your ultimate destination for stylish and high-quality hijabs.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-center lg:w-1/3 mb-8 lg:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-center">Quick Links</h4>
            <ul className="space-y-2 text-sm font-medium text-center">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col items-center lg:items-end lg:w-1/3">
            <h4 className="text-lg font-semibold mb-4 text-center lg:text-right">Contact Us</h4>
            <p className="text-sm font-medium flex items-center space-x-2 text-center lg:text-right mb-2">
              <FaMapMarkerAlt className="text-black cursor-pointer hover:text-primary" size={16} />
              <span className="hover:text-primary transition-colors cursor-pointer">123 Hijab St, Tunisia</span>
            </p>
            <p className="text-sm font-medium flex items-center space-x-2 text-center lg:text-right mb-2">
              <FaEnvelope className="text-black cursor-pointer hover:text-primary" size={16} />
              <a href="mailto:annaqah@store.tn" className="hover:text-primary transition-colors">annaqah@store.tn</a>
            </p>
            <p className="text-sm font-medium flex items-center space-x-2 text-center lg:text-right">
              <FaPhone className="text-black cursor-pointer hover:text-primary" size={16} />
              <a href="tel:+216123456" className="hover:text-primary transition-colors"> +216 12 345 678 102</a>
            </p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors">
              <FaYoutube size={20} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors">
              <FaTiktok size={20} />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors">
              <FaGoogle size={20} />
            </a>
          </div>
        </div>
      </div>
      <hr className="hr-custom" />
      <div className="bg-secondary text-black py-4 mt-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium">&copy; {new Date().getFullYear()} Annaqah Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
