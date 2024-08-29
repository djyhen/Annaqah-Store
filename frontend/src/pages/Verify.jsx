import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const payment_id = searchParams.get("payment_id");

  const { url } = useContext(ShopContext);
  const navigate = useNavigate();

  const verifyOrder = async () => {
    console.log("Verifying order with success:", success, "and payment_id:", payment_id);

    if (!payment_id || !success) {
      console.error("Missing parameters: payment_id or success");
      navigate("/"); 
      return;
    }

    try {
      const response = await axios.post(url +'/api/order/verify', { success, payment_d:payment_id });
      console.log("Response from backend:", response.data);
      console.log("Verifying order with success:", success, "and payment_id:", payment_id);
      if (response.data.success) {
        navigate("/myorders"); 
      } else {
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error during verification:", error.message);
      navigate("/"); 
    }
  };

  useEffect(() => {
    verifyOrder();
  }, []);

  return (
    <section>
      <div>
        <div></div>
      </div>
    </section>
  );
};

export default Verify;
