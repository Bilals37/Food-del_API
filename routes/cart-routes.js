import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cart-controllers.js';
import authmiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/add", authmiddleware, addToCart)
cartRouter.post("/remove", authmiddleware, removeFromCart)
cartRouter.post("/get", authmiddleware, getCart)

export default cartRouter;