import express from 'express'
import authmiddleware from '../middleware/auth.js'
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from '../controllers/order-controller.js'

const orderRouter = express.Router();



orderRouter.post("/place", authmiddleware, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authmiddleware, userOrder)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter;