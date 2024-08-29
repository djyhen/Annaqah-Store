import axios from 'axios'; 
import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'


const placeOrder = async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";
    const { userId, items, amount, address } = req.body;

    if (amount == null || isNaN(amount)) {
        return res.status(400).send('Amount is required and must be a number.');
    }

    const amountInCents = parseInt(parseFloat(amount) * 1000, 10);

    const payload = {
        app_token: process.env.FLOUCI_PUBLIC_KEY,
        app_secret: process.env.FLOUCI_SECRET_KEY,
        amount: amountInCents,
        accept_card: "true",
        session_timeout_secs: 1200,
        success_link: "http://localhost:5173/verify?success=true", 
        fail_link: "http://localhost:5173/verify?success=false",
        developer_tracking_id: "74b5c855-fad3-4ed9-b2fd-4b539d8d4ad0"
    };

    try {
        const result = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Flouci API response:', result.data);

        const paymentId = result.data.result.payment_id; 

        
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentId: paymentId,  
            status: 'pending'  
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        
        res.send({
            success: true,
            payment_link: result.data.result.link,
            paymentdata: result.data
        });
    } catch (err) {
        console.error('Error details:', err.response ? err.response.data : err.message);
        res.status(500).send('Internal Server Error');
    }
};






// Verify payment status and update order
{/*
const verifyOrder = async (req, res) => {
    const { id_payment } = req.params; // Extract payment ID from URL parameters
    const url = `https://developers.flouci.com/api/verify_payment/${id_payment}`;

    try {
        // Verify payment with Flouci API
        const result = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'apppublic': process.env.FLOUCI_PUBLIC_KEY,
                'appsecret': process.env.FLOUCI_SECRET_KEY
            }
        });

        console.log('Flouci API response:', result.data);

        const { success } = result.data;

        // Find the order by payment ID
        const order = await orderModel.findOne({ paymentId: id_payment });
        console.log('Order found:', order);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (success) {
            // Update the order status to paid
            await orderModel.findByIdAndUpdate(order._id, { status: 'paid' });
            res.json({ success: true, message: "Payment verified and order updated to paid" });
        } else {
            // Delete the order if payment failed
            await orderModel.findByIdAndDelete(order._id);
            res.json({ success: false, message: "Payment failed, order deleted" });
        }
    } catch (error) {
        console.error('Error details:', error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
*/}
const verifyOrder = async (req, res) => {
    const { payment_d, success } = req.body;
    console.log("Request received:", req.body);

    try {
        if (success === "true") {
            const order = await orderModel.findOne({ paymentId: payment_d });
            if (order) {
                await orderModel.findByIdAndUpdate(order._id, { payment: true });
                console.log("Payment updated to true for order ID:", order._id);
                res.json({ success: true, message: "Payment verified and order updated to paid" });
            } else {
                console.log("Order not found for payment ID:", payment_d);
                res.status(404).json({ success: false, message: "Order not found" });
            }
        } else {
            await orderModel.findOneAndDelete({ paymentId: payment_d });
            console.log("Order deleted for payment ID:", payment_d);
            res.json({ success: false, message: "Not Paid, order deleted" });
        }
    } catch (error) {
        console.error('Error details:', error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};




// user orders for frontend
const userOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}


    //listing listOrders for admin panel
    const listOrders = async (req,res)=>{
        try {
            const orders = await orderModel.find({});
            res.json({success:true,data:orders});
        } catch (error) {
            console.log(err)
            res.json({success:false,message:"Error fetching orders"});
        }
    }


    // api for updating order status by admin
    const updateStatus = async (req,res)=>{
        try {
            await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
            res.json({success:true,message:"Status Updated"});
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Failed update status"});
        }
    }


export { placeOrder, verifyOrder,userOrders ,listOrders,updateStatus};
