import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jyhentouri651:i8d0IW3rnQoFDeqs@cluster0.mjlyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1); 
    }
};
