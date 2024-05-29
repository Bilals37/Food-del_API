import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    // Name of the user, a required field
    name: { type: String, required: true },
    // Email address of the user, required and unique
    email: { type: String, required: true, unique: true },
    // Password of the user, required for authentication
    password: { type: String, required: true },
    // Cart data of the user, defaults to an empty object
    cartData: { type: Object, default: {} },
}, { minimize: false });

// Create the user model if it does not already exist
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// Export the user model for use in other parts of the application
export default userModel;
