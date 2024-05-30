import Stripe from 'stripe';
import orderModel from "../models/order-model.js";
import userModel from "../models/user-model.js";

// Handler to place a new order
const placeOrder = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const frontEnd_url = process.env.FRONTEND_URL
    // const frontEnd_url = "http://localhost:3000";
    try {
        // Create a new order
        const neworder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await neworder.save();

        // Clear the user's cart after saving the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create line items for Stripe payment
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

        // Calculate delivery charges
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

        // Respond with the session URL
        res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};

// Handler to verify the order payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            // Mark the order as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ success: true, message: "Payment Successful" });
        } else {
            // Delete the order if payment failed
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.error('Error verifying order:', error);
        res.status(500).json({ success: false, message: "Error verifying order" });
    }
};

// Handler to get orders for a specific user
const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ success: false, message: "Error fetching user orders" });
    }
}

// Handler to list all orders (for admin panel)
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error listing orders:', error);
        res.status(500).json({ success: false, message: "Error listing orders" });
    }
}

// Handler to update the status of an order
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.status(200).json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: "Error updating order status" });
    }
}

export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus };
