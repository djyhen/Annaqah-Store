import axios from 'axios'; // We'll use axios for making HTTP requests to Flouci
 // Assuming you'll use this for JWT verification, though it's not used here

// Placing user order for frontend 
const placeOrder = async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";
    
    // Get the amount from the request body
    const amount = req.body.amount;
    
    // Validate that the amount is provided and is a number
    if (amount == null || isNaN(amount)) {
        return res.status(400).send('Amount is required and must be a number.');
    }

    // Prepare the payload
    const payload = {
        app_token: process.env.FLOUCI_PUBLIC_KEY,
        app_secret: process.env.FLOUCI_SECRET_KEY,
        amount: parseFloat(amount), // Ensure amount is a number
        accept_card: "true",
        session_timeout_secs: 1200,
        success_link: "http://localhost:5173/success",
        fail_link: "http://localhost:5173/fail",
        developer_tracking_id: "74b5c855-fad3-4ed9-b2fd-4b539d8d4ad0"
    };

    // Log environment variables and payload for debugging
    console.log('FLOUCI_PUBLIC_KEY:', process.env.FLOUCI_PUBLIC_KEY);
    console.log('FLOUCI_SECRET_KEY:', process.env.FLOUCI_SECRET_KEY);
    console.log('Payload:', payload);

    try {
        const result = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.send(result.data);
    } catch (err) {
        console.error('Error details:', err.response ? err.response.data : err.message);
        res.status(500).send('Internal Server Error');
    }
};

// Verify payment status
const verifyPayment = async (req, res) => {
    const id_payment = req.params.id;
    const url = `https://developers.flouci.com/api/verify_payment/${id_payment}`;
    
    try {
        const result = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'apppublic':process.env.FLOUCI_PUBLIC_KEY,
                'appsecret':process.env.FLOUCI_SECRET_KEY
            }
        });
        res.send(result.data);
    } catch (err) {
        console.error('Error details:', err.response ? err.response.data : err.message);
        res.status(500).send('Internal Server Error');
    }
};

export { placeOrder, verifyPayment };
