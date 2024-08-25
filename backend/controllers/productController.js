import productModel from "../models/productModel.js";

// Add product item (Create)
const addProduct = async (req, res) => {
    let image_filename = req.file.filename;

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding product" });
    }
};

// Get all products (Read)
const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};

// Get a single product by ID (Read)
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching product" });
    }
};

// Update a product by ID (Update)
const updateProduct = async (req, res) => {
    let image_filename = req.file ? req.file.filename : req.body.image; // Keep existing image if not replaced

    try {
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                image: image_filename
            },
            { new: true } // Return the updated document
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product Updated", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating product" });
    }
};

// Delete a product by ID (Delete)
const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
};

export { addProduct, getProducts, getProductById, updateProduct, deleteProduct };
