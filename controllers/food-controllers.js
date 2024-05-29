import foodModel from "../models/food-model.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    // Create a new food item instance
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        // Save the new food item to the database
        await food.save();
        // Send a success response
        res.status(201).json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error adding food item" });
    }
}

// List all food items
const listFood = async (req, res) => {
    try {
        // Retrieve all food items from the database
        const foods = await foodModel.find({});
        // Send a success response with the retrieved food items
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error fetching food items" });
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try {
        // Find the food item by ID
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            // If the food item is not found, send a 404 response
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        // Remove the food item's image file
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error(err);
                // If there is an error deleting the image, send an error response
                return res.status(500).json({ success: false, message: "Error deleting food image" });
            }
        });
        // Delete the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        // Send a success response
        res.status(200).json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
}

export { addFood, listFood, removeFood };
