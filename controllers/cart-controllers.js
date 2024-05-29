import userModel from "../models/user-model.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findById({ _id: req.body.userId });
        // Get the user's cart data
        let cartData = await userData.cartData;
        // If the item is not in the cart, add it with quantity 1
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            // If the item is already in the cart, increment the quantity by 1
            cartData[req.body.itemId] += 1;
        }
        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        // Send a success response
        res.status(200).json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findById(req.body.userId);
        // Get the user's cart data
        let cartData = await userData.cartData;
        // If the item is in the cart, decrement the quantity by 1
        if (cartData[req.body.itemId]) {
            cartData[req.body.itemId] -= 1;
        }
        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        // Send a success response
        res.status(200).json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

// Fetch items in user cart
const getCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findById(req.body.userId);
        // Get the user's cart data
        let cartData = await userData.cartData;
        // Send a success response with the cart data
        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
};

export { addToCart, removeFromCart, getCart };
