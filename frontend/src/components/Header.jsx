import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose, MdMenu } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { FiPackage } from 'react-icons/fi';
import { TbLogout } from 'react-icons/tb';
import { FaUserCircle } from 'react-icons/fa';
import { ShopContext } from '../Context/ShopContext';
import logo from '../assets/logooo.jpg';
import Navbar from './Navbar';

const Header = ({ setShowLogin }) => {
    const { getTotalCartItems, token, setToken } = useContext(ShopContext);
    const [menuOpened, setMenuOpened] = useState(false);
    const [header, setHeader] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpened(!menuOpened);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(""); // Clear token in context
        navigate("/"); // Redirect to homepage
        setShowLogin(true); // Show login popup
    };

    useEffect(() => {
        const handleScroll = () => {
            setHeader(window.scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [token]); // Re-run on token change

    return (
        <header className={` ${header ? "!py-3 bg-white shadow-sm " : ""}fixed w-full top-0 left-0 right-0 py-4 z-30 bg-white shadow-md flex items-center justify-between px-6 lg:px-12`}>
            {/* Logo */}
            <Link to={"/"}>
                <img src={logo} alt="logoImg" height={55} width={55} className="w-55 h-auto object-contain rounded-full border-secondary border-solid" />
            </Link>
            <div className="flexBetween gap-x-20">
                {/* Navbar DESKTOP */}
                <Navbar containerstyles="hidden md:flex gap-x-5 xl:gap-x-10 text-sm medium-15" />

                {/* Navbar Mobile */}
                <Navbar containerstyles={`${menuOpened ? "flex items-start flex-col gap-y-6 fixed top-20 right-6 p-12 bg-[rgba(0,0,0,0.1)] backdrop-blur-md rounded-2xl shadow-md w-[45%] ring-1 ring-slate-900/5 transition-all duration-300"
                  : "flex items-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"}`} />
                
                <div className="flexBetween gap-x-3 sm:gap-x-8">
                    {/* buttons */}
                    {!menuOpened ? (
                        <MdMenu onClick={toggleMenu} className="md:hidden cursor-pointer hover:text-primary text-2xl" />
                    ) : (
                        <MdClose onClick={toggleMenu} className="md:hidden cursor-pointer hover:text-primary text-2xl" />
                    )}

                    <Link to={"/cart"} className="flex relative">
                        <GiShoppingBag className="text-[22px] text-white bg-primary h-9 w-9 p-2 rounded-xl" />
                        <span className="bg-white text-sm absolute -top-2 -right-3 flexCenter w-5 h-5 rounded-full shadow-md">{getTotalCartItems()}</span>
                    </Link>
                    
                    {!token ? (
                        <button onClick={() => setShowLogin(true)} className="btn-secondary bold-15 rounded-full flex items-center gap-x-2">
                            Login
                        </button>
                    ) : (
                        <div className="group relative">
                            <FaUserCircle className="text-2xl" />
                            <ul className="border-secondary shadow-sm p-3 w-24 ring-1 ring-slate-900/15 rounded absolute right-0 group-hover:flex flex-col hidden">
                                <li className="flexCenter gap-x-2 cursor-pointer">
                                    <FiPackage className="text-[19px]" />
                                    <p>Orders</p>
                                </li>
                                <hr className="my-2" />
                                <li onClick={logout} className="flexCenter gap-x-2 cursor-pointer">
                                    <TbLogout />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
