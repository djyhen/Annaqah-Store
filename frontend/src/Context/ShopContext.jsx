import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [all_products, setAllProducts] = useState([]);
    const url = "http://localhost:4000";

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] <= 1) {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            } else {
                return {
                    ...prev,
                    [itemId]: prev[itemId] - 1
                };
            }
        });

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_products.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/`);
            if (response.status === 200) {
                setAllProducts(response.data);
            } else {
                console.error("Error fetching products");
            }
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            // Make a GET request to the /api/cart/get endpoint
            const response = await axios.get(`${url}/api/cart/get`, { headers: { token } });
            if (response.status === 200) {
                const cartData = response.data.cartData || {};
                setCartItems(cartData);
            } else {
                console.error("Error fetching cart data");
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        all_products,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        url,
        token,
        setToken,
        fetchList,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
