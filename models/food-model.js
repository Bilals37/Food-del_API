import mongoose from 'mongoose';

// Define the food schema
const foodSchema = new mongoose.Schema({
    // Name of the food item
    name: {
        type: String,
        required: true
    },
    // Description of the food item
    description: {
        type: String,
        required: true
    },
    // Price of the food item
    price: {
        type: Number,
        required: true
    },
    // Image filename or URL of the food item
    image: {
        type: String,
        required: true
    },
    // Category of the food item (e.g., appetizer, main course, dessert)
    category: {
        type: String,
        required: true
    }
});

// Create the food model if it does not already exist
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// Export the food model for use in other parts of the application
export default foodModel;
