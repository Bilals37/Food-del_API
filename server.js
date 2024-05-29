// Importing necessary modules
import express from 'express'; // Import Express framework
import cors from 'cors'; // Import CORS middleware for handling cross-origin requests
import { connectDB } from './config/db.js'; // Import database connection function
import foodRouter from './routes/foodRoutes.js'; // Import router for food-related routes
import userRouter from './routes/user-routes.js'; // Import router for user-related routes
import cartRouter from './routes/cart-routes.js'; // Import router for cart-related routes
import orderRouter from './routes/order-routes.js'; // Import router for order-related routes
import "dotenv/config"; // Import configuration from .env file
import dotenv from 'dotenv';
dotenv.config();


// App configuration
const app = express(); // Create Express app
const port = 4000; // Define port number

// // Middleware setup
// app.use(express.json()); // Parse JSON request bodies
// app.use(cors()); // Enable Cross-Origin Resource Sharing

// // Database connection
// connectDB(); // Call function to connect to the database

// // Define API Endpoints
// app.use("/api/food", foodRouter); // Food-related API endpoints
// app.use("/images", express.static('uploads')); // Serve static images from 'uploads' directory
// app.use("/api/user", userRouter); // User-related API endpoints
// app.use("/api/cart", cartRouter); // Cart-related API endpoints
// app.use("/api/order", orderRouter); // Order-related API endpoints

// // Default route
// app.get("/", (req, res) => {
//     res.send("API working"); // Send a simple message indicating that the API is working
// });


app.get('/api/hello', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

app.get('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Start the server
// app.listen(port, () => {
//     console.log(`Server started on http://localhost:${port}`); // Log a message indicating that the server has started
// });
