import express from "express"
import { isAuthorized } from "../middlewares/auth.middleware.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";

const cartRouter = express.Router()

cartRouter.post('/add',isAuthorized,addToCart)
cartRouter.delete('/remove',isAuthorized,removeFromCart)
cartRouter.get('/get',isAuthorized,getCart)

export default cartRouter