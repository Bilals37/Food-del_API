import mongoose from "mongoose";

// Define the order schema
const orderSchema = new mongoose.Schema({
    // User ID who placed the order
    userId: {
        type: String,
        required: true
    },
    // Array of items in the order
    items: {
        type: Array,
        required: true
    },
    // Total amount for the order
    amount: {
        type: Number,
        required: true
    },
    // Address for the order delivery
    address: {
        type: Object,
        required: true
    },
    // Status of the order, default is "Food Processing"
    status: {
        type: String,
        default: "Food Processing"
    },
    // Date when the order was placed, default is the current date
    date: {
        type: Date,
        default: Date.now
    },
    // Payment status of the order, default is false (not paid)
    payment: {
        type: Boolean,
        default: false
    },
});

// Create the order model if it does not already exist
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// Export the order model for use in other parts of the application
export default orderModel;
