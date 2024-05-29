import userModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import validator from 'validator';

// Function to create a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        // Create a JWT token
        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error logging in" });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a stronger password" });
        }

        // Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        const user = await newUser.save();

        // Create a token
        const token = createToken(user._id);
        return res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error registering user" });
    }
};

export { loginUser, registerUser };
