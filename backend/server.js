import 'dotenv/config.js'
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Connect to the database
connectDB();

// API endpoint
app.use('/api/product', productRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
