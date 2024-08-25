import React, { useContext, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(ShopContext);
    const [state, setState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (state === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false); // Close the login popup
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className='absolute inset-0 bg-black/40 z-50 flex items-center justify-center'>
            <form onSubmit={onLogin} className='bg-white w-[366px] p-7 rounded-xl shadow-md'>
                <div className='flex justify-between items-center mb-6'>
                    <h4 className='medium-22'>{state}</h4>
                    <FaXmark className='text-xl cursor-pointer' onClick={() => setShowLogin(false)} />
                </div>
                {state === "Sign Up" && (
                    <input
                        className='w-full py-4 px-4 outline-none bg-secondary rounded-lg mb-4'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={data.name}
                        onChange={onChangeHandler}
                    />
                )}
                <input
                    className='w-full py-4 px-4 outline-none bg-secondary rounded-lg mb-4'
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={data.email}
                    onChange={onChangeHandler}
                />
                <input
                    className='w-full py-4 px-4 outline-none bg-secondary rounded-lg mb-6'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={data.password}
                    onChange={onChangeHandler}
                />
                <button
                    type='submit'
                    className='w-full btn-primary py-3 text-white mb-6'>
                    {state}
                </button>
                <p className='medium-14 flex justify-center'>
                    {state === "Sign Up" ? (
                        <span>Already have an account? <b onClick={() => setState("Login")} className="cursor-pointer">Login</b></span>
                    ) : (
                        <span>Don't have an account? <b onClick={() => setState("Sign Up")} className="cursor-pointer">Sign Up</b></span>
                    )}
                </p>
            </form>
        </div>
    );
};

export default LoginPopup;
