import express from "express";
import {listOrders, placeOrder, updateSattus, userOrders, verifyOrder }from "../controllers/order.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/order", isAuthorized, placeOrder);
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/getorders',isAuthorized,userOrders)
orderRouter.get('/list/orders',listOrders)
orderRouter.post('/order/status',updateSattus)

export default orderRouter;
