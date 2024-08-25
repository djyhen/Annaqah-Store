import express from "express";
import multer from "multer";
import {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const productRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes for CRUD operations
productRouter.post("/add", upload.single("image"), addProduct);             // Create
productRouter.get("/", getProducts);                                       // Read all
productRouter.get("/:id", getProductById);                                 // Read by ID
productRouter.put("/update/:id", upload.single("image"), updateProduct);   // Update
productRouter.delete("/delete/:id", deleteProduct);                        // Delete

export default productRouter;
