import express from "express";
import {placeOrder, userOrders, verifyOrder }from "../controllers/order.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/order", isAuthorized, placeOrder);
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/getorders',isAuthorized,userOrders)

export default orderRouter;
