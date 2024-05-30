import Stripe from "stripe";
import orderModel from "../models/order-model.js";
import userModel from "../models/user-model.js";



// Place an order
const placeOrder = async (req, res) => {
    const frontEnd_url = "https://food-del-psi.vercel.app";
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    try {
        // Create a new order
        const neworder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await neworder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create line items for the Stripe checkout session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // Calculate delivery charges based on the order amount
        let deliveryCharges = 40 * 100; // Default delivery charge
        if (req.body.amount < 40) {
            deliveryCharges = 15 * 100;
        } else if (req.body.amount > 499) {
            deliveryCharges = 0;
        }

        // Add delivery charges as a line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharges
            },
            quantity: 1
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontEnd_url}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${frontEnd_url}/verify?success=false&orderId=${neworder._id}`,
        });

        // Send the session URL in the response
        res.status(201).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};

// Webhook to verify the order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            // Update the order payment status to true
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ success: true, message: "Payment Successful" });
        } else {
            // Delete the order if payment failed
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error verifying order" });
    }
};

// Get user's orders for FrontEnd
const userOrder = async (req, res) => {
    try {
        // Retrieve orders for the user
        const orders = await orderModel.find({ userId: req.body.userId });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error fetching user orders" });
    }
}

// List all orders for Admin panel
const listOrders = async (req, res) => {
    try {
        // Retrieve all orders
        const orders = await orderModel.find({});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
}

// Update order status
const updateStatus = async (req, res) => {
    try {
        // Update the order status
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.status(200).json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ success: false, message: "Error updating status" });
    }
}

export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus };
